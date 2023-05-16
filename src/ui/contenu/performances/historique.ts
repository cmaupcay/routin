import * as data from "../data";
import * as ui from "../../../utils/ui";

const SELECTEUR = "#routin-performances-historique";
const SELECTEUR_LISTE = SELECTEUR + ">ul";

const PERFORMANCES_TAG = "li";
const PERFORMANCES_PREFIX = "routin-performances-";

var historique: ui.ÉlémentHTML = undefined;

export const rafraichir = async () => {
    if (!!historique && !!data.historique)
    {
        ui.vider(historique);
        ui.remplir(historique, data.historique.slice(0, -1), PERFORMANCES_TAG, (e, v) => {
            e.id = PERFORMANCES_PREFIX + v[0].toString();
            e.innerText = `${v[1].length} performances le ${(new Date(v[0])).toLocaleDateString()}`;
        });
    }
};

export const init = async () => {
    historique = ui.selectionner(SELECTEUR_LISTE) as HTMLElement;
    rafraichir();
    data.observateurs.push(rafraichir);
};