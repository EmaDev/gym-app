import { TIType } from "./TecnicaIntensidad";

export interface SerieInterface {
    orden: number;
    repeticiones: number;
    tecnica: TIType;
    observacion?: string;
}