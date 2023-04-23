import * as ajout from "./routines/ajout";
import * as liste from "./routines/liste";

const SELECTEUR = "#routin-routines";

export const init = async () => {
    ajout.init();
    liste.init();
};