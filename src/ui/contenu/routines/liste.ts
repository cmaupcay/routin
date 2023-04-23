import * as data from "../data";
import * as ui from "../../../utils/ui";

const SELECTEUR = "#routin-routines-liste";

const ROUTINE_TAG = "li";
const ROUTINE_PREFIX = "routin-routine-";

var liste: ui.ÉlémentHTML = undefined;

export const rafraichir = async () => {
    if (!!liste && !!data.routines)
    {
        ui.vider(liste);
        ui.remplir(liste, data.routines, ROUTINE_TAG, (e, v) => {
            e.id = ROUTINE_PREFIX + v.id;
            e.innerText = `${v.nom} [${v.objectif} ${v.type}]`;
        });
    }
};

export const init = async () => {
    liste = ui.selectionner(SELECTEUR) as HTMLElement;
    rafraichir();
};