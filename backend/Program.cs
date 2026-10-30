using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

// 1. CONFIGURACIÓN DE CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 2. CONFIGURACIÓN DE CLOUDINARY
builder.Services.AddSingleton<Cloudinary>(sp =>
{
    var config = builder.Configuration.GetSection("CloudinarySettings");
    var cloudName = config["CloudName"];
    var apiKey = config["ApiKey"];
    var apiSecret = config["ApiSecret"];

    var account = new Account(cloudName, apiKey, apiSecret);
    return new Cloudinary(account);
});

var app = builder.Build();
app.UseCors("AllowFrontend");

// 3. SUBIR CÉDULA (Detecta si es PDF o Imagen)
app.MapPost("/api/upload/cedula", async (IFormFile file, Cloudinary cloudinary) =>
{
    if (file == null || file.Length == 0)
        return Results.BadRequest("No se envió ningún archivo.");

    using var stream = file.OpenReadStream();
    
    var isPdf = file.ContentType == "application/pdf" || 
                Path.GetExtension(file.FileName).Equals(".pdf", StringComparison.OrdinalIgnoreCase);

    var uploadResult = default(UploadResult);

    if (isPdf)
    {
        var uploadParams = new RawUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Type = "private",
            Folder = "autolatino/cedulas"
        };
        uploadResult = await cloudinary.UploadAsync(uploadParams);
    }
    else
    {
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Type = "private",
            Folder = "autolatino/cedulas"
        };
        uploadResult = await cloudinary.UploadAsync(uploadParams);
    }

    if (uploadResult.Error != null)
        return Results.Problem(uploadResult.Error.Message);

    return Results.Ok(new
    {
        publicId = uploadResult.PublicId,
        // Le decimos a React si es "raw" o "image"
        resourceType = isPdf ? "raw" : "image", 
        message = "Cédula subida exitosamente como privada."
    });
})
.DisableAntiforgery();

// 4. OBTENER URL FIRMADA
app.MapGet("/api/cedula-url/{publicId}", (string publicId, Cloudinary cloudinary) =>
{
    var path = Uri.UnescapeDataString(publicId).Replace("_", "/");
    
    var signedUrl = cloudinary.Api.UrlImgUp
        .Type("private")
        .Signed(true)
        .BuildUrl(path);

    return Results.Ok(new { url = signedUrl });
});

// 5. DESCARGAR ARCHIVO
app.MapGet("/api/download/{publicId}", async (string publicId, Cloudinary cloudinary) =>
{
    var path = Uri.UnescapeDataString(publicId).Replace("_", "/");
    
    // Detectamos si es PDF por el nombre (para saber cómo pedir la URL)
    var isPdf = path.ToLower().Contains(".pdf");

    string signedUrl;

    if (isPdf)
    {
        // Para PDFs (raw), usamos UrlImgUp pero forzando el ResourceType a "raw"
        signedUrl = cloudinary.Api.UrlImgUp
            .ResourceType("raw")
            .Type("private")
            .Signed(true)
            .BuildUrl(path);
    }
    else
    {
        // Para imágenes, la URL normal
        signedUrl = cloudinary.Api.UrlImgUp
            .Type("private")
            .Signed(true)
            .BuildUrl(path);
    }

    using var httpClient = new HttpClient();
    var response = await httpClient.GetAsync(signedUrl);

    if (!response.IsSuccessStatusCode)
        return Results.NotFound("Archivo no encontrado.");

    var fileBytes = await response.Content.ReadAsByteArrayAsync();
    var contentType = response.Content.Headers.ContentType?.ToString() ?? "application/octet-stream";

    var fileName = Path.GetFileName(path);
    
    // Solo agregamos la extensión si el archivo no la tiene ya
    if (!fileName.ToLower().EndsWith(".pdf") && contentType.Contains("pdf"))
        fileName += ".pdf";
    else if (!fileName.ToLower().EndsWith(".jpg") && !fileName.ToLower().EndsWith(".jpeg") && (contentType.Contains("jpeg") || contentType.Contains("jpg")))
        fileName += ".jpg";
    else if (!fileName.ToLower().EndsWith(".png") && contentType.Contains("png"))
        fileName += ".png";

    return Results.File(fileBytes, contentType, fileDownloadName: fileName);
});

// 6. ELIMINAR ARCHIVO
app.MapPost("/api/delete", async (HttpRequest request, Cloudinary cloudinary) =>
{
    // Leemos el JSON que viene de React
    var body = await request.ReadFromJsonAsync<dynamic>();
    string publicId = body?.GetProperty("publicId").GetString() ?? "";

    if (string.IsNullOrEmpty(publicId))
        return Results.BadRequest("El publicId es requerido.");

    var path = publicId.Replace("_", "/");

    // 1. Intentamos borrar como imagen (por si es foto de carro o foto de cédula)
    var imgParams = new DeletionParams(path) { ResourceType = ResourceType.Image, Type = "private" };
    var imgResult = await cloudinary.DestroyAsync(imgParams);
    
    if (imgResult.Result == "ok") 
        return Results.Ok(new { message = "Imagen eliminada." });

    // 2. Si falló, es porque es un PDF. Intentamos borrar como raw/private.
    var rawParams = new DeletionParams(path) { ResourceType = ResourceType.Raw, Type = "private" };
    var rawResult = await cloudinary.DestroyAsync(rawParams);
    
    if (rawResult.Result == "ok") 
        return Results.Ok(new { message = "PDF eliminado." });

    // 3. Si ambos fallan, el archivo no existía.
    return Results.BadRequest(new { message = "No se pudo eliminar el archivo." });
});

app.Run();
