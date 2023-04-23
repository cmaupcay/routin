import * as RoutineType from "./RoutineType";

export interface Routine
{
    id: string,
    nom: string,
    objectif: number,
    type: RoutineType.type
};