import * as ui from "../../utils/ui";

import { Routines } from "../../types/Routines";
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

export const init = async (_routines: Routines, _historique: Historique, sauvegarder: Sauvegarder) => {
    routines = _routines;
    historique = _historique;
    sauvegarde = sauvegarder;
    message = ui.selectionner(SELECTEUR_MESSAGE);
};

export const desync = () => {
    sync = false;
    ui.ecrire(message, MESSAGE_DESYNC);
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