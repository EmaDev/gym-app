export type DiaSemanalType = "LUNES"|"MARTES"|"MIERCOLES"|"JUEVES"|"VIERNES"|"SABADO"|"DOMINGO";
export interface DiaSemanaInterface {
    nombre: DiaSemanalType;
    codigo: number;
    activo: boolean;
}

export const SEMANA_INICIAL:DiaSemanaInterface[] = [
    {nombre: "LUNES", activo: false, codigo: 1},
    {nombre: "MARTES", activo: false, codigo: 2},
    {nombre: "MIERCOLES", activo: false, codigo: 3},
    {nombre: "JUEVES", activo: false, codigo: 4},
    {nombre: "VIERNES", activo: false, codigo: 5},
    {nombre: "SABADO", activo: false, codigo: 6},
    {nombre: "DOMINGO", activo: false, codigo: 0},
];