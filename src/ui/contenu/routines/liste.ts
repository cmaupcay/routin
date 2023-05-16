import * as data from "../data";
import * as ui from "../../../utils/ui";

import { Routine } from "../../../types/Routine";

const SELECTEUR = "#routin-routines-liste";
const SELECTEUR_LISTE = SELECTEUR + ">ul";

const ROUTINE_TAG = "li";
const ROUTINE_PREFIX = "routin-routine-";

var liste: ui.ÉlémentHTML = undefined;

const generer = (e: HTMLElement, r: Routine) => {
    e.id = ROUTINE_PREFIX + r.id;
    e.innerText = `${r.nom} [${r.objectif} ${r.type}]`;
};

export const rafraichir = async () => {
    if (!!liste && !!data.routines)
    {
        ui.vider(liste);
        ui.remplir(liste, data.routines, ROUTINE_TAG, generer);
    }
};

export const init = async () => {
    liste = ui.selectionner(SELECTEUR_LISTE) as HTMLElement;
    rafraichir();
    data.observateurs.push(rafraichir);
};