import * as date from "../../utils/date";
import * as ui from "../../utils/ui";

import { Routines } from "../../types/Routines";
import { Performances } from "../../types/Performances";
import { Historique } from "../../types/Historique";

const SELECTEUR_MESSAGE = "#routin-sync";

const MESSAGE_DESYNC = "Modifications non sauvegardées.";
const MESSAGE_SYNC = "À jour.";

export type Sauvegarder = (mdp: string) => Promise<void>;

var sauvegarde: Sauvegarder | undefined = undefined;
var message: ui.ÉlémentHTML = undefined;

export var sync = false;
export var routines: Routines | undefined = undefined;
export var historique: Historique | undefined = undefined;
export var performances_actuelles: [number, Performances] | undefined = undefined;

export const observateurs: Function[] = [];

const creer_performances = () => {
    const performances: Performances = [];
    if (!!routines)
        for (let routine of routines)
            performances.push({
                routine: routine.id,
                valeur: 0
            });
    return performances;
};

export const init = async (_routines: Routines, _historique: Historique, sauvegarder: Sauvegarder) => {
    routines = _routines;
    const actuelle = date.aujourdhui();
    const derniere = _historique.at(_historique.length - 1);
    if (derniere == undefined || derniere[0] < actuelle)
    {
        performances_actuelles = [actuelle, creer_performances()];
        _historique.push(performances_actuelles);
    }
    else performances_actuelles = derniere;
    historique = _historique;
    sauvegarde = sauvegarder;
    message = ui.selectionner(SELECTEUR_MESSAGE);
};

export const desync = () => {
    sync = false;
    ui.ecrire(message, MESSAGE_DESYNC);
    observateurs.forEach(f => f());
};

export const sauvegarder = async (mdp: string) => {
    if (!!sauvegarde)
        return sauvegarde(mdp).then(
            () => {
                sync = true;
                ui.ecrire(message, MESSAGE_SYNC);
            }
        );
};