export type TIType = "NINGUNA"|"AMRAP"|"SUPERSERIE"|"RAMP TO MAX"|"REST PAUSE"|"CLUSTERS"|"DROP SET"|"MYO SET";
export type TITColorype = ""|"red"|"green"|"blue"|"yellow"|"purple"|"orange"|"brown";
export interface TIInterface {
    nombre: TIType;
    activo:boolean;
    color?: string;
} 

export const TI_INICIAL:TIInterface[] = [
    {nombre: "NINGUNA", activo:false, color: ""},
    {nombre: "AMRAP", activo: false, color: "red"},
    {nombre: "CLUSTERS", activo: false, color: "blue"},
    {nombre: "DROP SET", activo: false, color: "green"},
    {nombre: "SUPERSERIE", activo: false, color: "purple"},
    {nombre: "MYO SET", activo: false,color: "#f9e81a"},
    {nombre: "RAMP TO MAX", activo: false, color: "orange"},
    {nombre: "REST PAUSE", activo: false, color: "brown"},
]