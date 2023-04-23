import { Historique } from "./Historique";
import { Routines } from "./Routines";

export interface Session
{
    routines: Routines,
    historique: Historique
};