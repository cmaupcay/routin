import * as data from "../data";
import * as ui from "../../../utils/ui";

const SELECTEUR = "#routin-performances-actuelles";
const SELECTEUR_DATE = SELECTEUR + ">.date";
const SELECTEUR_LISTE = SELECTEUR + ">ul";

const PERFORMANCE_TAG = "li";
const PERFORMANCE_PREFIX = "routin-performance-actuelle-";

var liste: ui.ÉlémentHTML = undefined;

export const rafraichir = async () => {
    if (!!liste && !!data.performances_actuelles)
    {
        ui.vider(liste);
        ui.remplir(liste, data.performances_actuelles[1], PERFORMANCE_TAG, (e, p) => {
            e.id = PERFORMANCE_PREFIX + p.routine;
            const routine = data.routines?.filter(r => r.id == p.routine)[0];
            if (!!routine)
                e.innerText = `${routine.nom} : ${p.valeur}`;
        });
    }
};

export const init = async () => {
    const date = ui.selectionner(SELECTEUR_DATE);
    if (!!date && !!data.performances_actuelles)
        date.innerText = (new Date(data.performances_actuelles[0])).toLocaleDateString();
    liste = ui.selectionner(SELECTEUR_LISTE);
    rafraichir();
    data.observateurs.push(rafraichir);
};