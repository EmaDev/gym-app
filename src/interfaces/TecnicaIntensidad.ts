export type TIType = "NINGUNA"|"AMRAP"|"SUPERSERIE"|"RAMP TO MAX"|"REST PAUSE"|"CLUSTERS"|"DROP SET"|"MYO SET";
export interface TIInterface {
    nombre: TIType;
    activo:boolean;
} 

export const TI_INICIAL:TIInterface[] = [
    {nombre: "NINGUNA", activo:false},
    {nombre: "AMRAP", activo: false},
    {nombre: "CLUSTERS", activo: false},
    {nombre: "DROP SET", activo: false},
    {nombre: "SUPERSERIE", activo: false},
    {nombre: "MYO SET", activo: false},
    {nombre: "RAMP TO MAX", activo: false},
    {nombre: "REST PAUSE", activo: false},
]