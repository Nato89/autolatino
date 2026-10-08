export interface CreditApplication {
    id: number;
    nombres: string;
    cedula: string;
    celular: string;
    email: string;
    ocupacion: string;
    ingresos: string;
    refPersonalNombre: string;
    refPersonalTel: string;
    refFamiliarNombre: string;
    refFamiliarTel: string;
    archivos: string[];
    estado: 'Inicial' | 'En estudio' | 'Aprobado' | 'Negado';
    razonNegacion?: string;
    createdAt: string;
    updatedAt: string;
}