# 1. Usamos la imagen oficial de .NET 10 para compilar
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# 2. Copiamos el archivo del proyecto y restauramos dependencias
COPY *.csproj ./
RUN dotnet restore

# 3. Copiamos todo el código y lo compilamos
COPY . ./
RUN dotnet publish -c Release -o out

# 4. Usamos la imagen ligera de .NET 10 para ejecutar
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .

# 5. Configuramos el puerto (Render usa el 8080 por defecto)
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# 6. Encendemos la app
ENTRYPOINT ["dotnet", "backend.dll"]