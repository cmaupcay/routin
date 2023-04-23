import * as sauvegarder from "./controles/sauvegarder";
import * as exporter from "./controles/exporter";
import * as importer from "./controles/importer";
import * as ui from "../../utils/ui";

const SELECTEUR = "#routin-controles";
const SELECTEUR_MDP = SELECTEUR + ">.mdp";
const SELECTEUR_MESSAGE = SELECTEUR + ">.message";

export const init = async () => {
    const mdp = ui.selectionner(SELECTEUR_MDP) as HTMLInputElement;
    const message = ui.selectionner(SELECTEUR_MESSAGE) as HTMLElement;
    sauvegarder.init(mdp, message);
    exporter.init(mdp, message);
    importer.init(mdp, message);
};