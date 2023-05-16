import * as actuelles from "./performances/actuelles";
import * as ajout from "./performances/ajout";
import * as historique from "./performances/historique";

const SELECTEUR = "#routin-performances";

export const init = async () => {
    actuelles.init();
    ajout.init();
    historique.init();
};