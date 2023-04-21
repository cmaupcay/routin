import * as controles from "./contenu/controles";
import * as routines from "./contenu/routines";
import * as ui from "../utils/ui";

const SELECTEUR_FENETRE = "#routin-contenu";

export const init = async (sauvegarder: controles.Sauvegarder) => {
    ui.ouvrir(document.querySelector(SELECTEUR_FENETRE));
    controles.init(sauvegarder);
    routines.init();
};