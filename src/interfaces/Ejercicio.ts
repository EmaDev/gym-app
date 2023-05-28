import { DiaSemanaInterface } from "./Semana";
import {  SerieInterface  } from "./Serie";

export interface EjercicioInterface {
    id?:string;
    nombre: string;
    descripcion: string;
    dias: DiaSemanaInterface[];
    cantidadSeries: number;
    rpe?: number;
    rir?:number;
    series: SerieInterface[];
    creadoPor: string;
    publico:true;
} 
export interface ResultadoRepeticionInterface {
    ordenRep: number;
    peso: number;
    rir: number;
    rpe:number;
}
export interface ResultadosSerieInterface {
    ordenRep: number;
    repeticiones: number;
    peso: number;
    rir: number;
    rpe:number;
    observaciones?: string;
}
export interface EjercioUsuarioInterface {
    id?:string;
    uid: string;
    fecha: Date;
    dia:number; 
    ejercioId:string;
    resultados: ResultadosSerieInterface[];
    observaciones: string;
}