import * as controles from "./contenu/controles";
import * as data from "./contenu/data";
import * as routines from "./contenu/routines";
import * as ui from "../utils/ui";

import { Routines } from "../types/Routines";
import { Historique } from "../types/Historique";

const SELECTEUR = "#routin-contenu";

export const init = async (_routines: Routines, _historique: Historique, _sauvegarder: data.Sauvegarder) => {
    ui.ouvrir(ui.selectionner(SELECTEUR));
    data.init(_routines, _historique, _sauvegarder);
    controles.init();
    routines.init();
};