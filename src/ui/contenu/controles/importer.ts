import * as data from "../data";
import * as ui from "../../../utils/ui";

const SELECTEUR = "#routin-importer";

const MESSAGE_SUCCES = "Informations locales exportées.";
const MESSAGE_ERREUR = "Impossible d'importer les informations locales."

export const init = async (champsMdp: ui.Champs, message: ui.ÉlémentHTML) => {
    if (!!champsMdp && !!message)
        ui.selectionner(SELECTEUR)?.addEventListener("click",
            () => ui.lire(champsMdp).then(
                mdp => {
                    console.log("import...");
                    // if(!!mdp && !!data.importer)
                    //     return data.importer(mdp).then(
                    //         () => ui.ecrire(message, MESSAGE_SUCCES),
                    //         (e) => ui.ecrire_erreur(message, e, MESSAGE_ERREUR)
                    //     )
                }
            )
        );
};