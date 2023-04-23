import * as data from "../data";
import * as ui from "../../../utils/ui";

const SELECTEUR = "#routin-exporter";

const MESSAGE_SUCCES = "Informations locales exportées.";
const MESSAGE_ERREUR = "Impossible d'exporter les informations locales."

export const init = async (champsMdp: ui.Champs, message: ui.ÉlémentHTML) => {
    if (!!champsMdp && !!message)
        ui.selectionner(SELECTEUR)?.addEventListener("click",
            () => ui.lire(champsMdp).then(
                mdp => {
                    console.log("export...");
                    // if(!!mdp && !!data.exporter)
                    //     return data.exporter(mdp).then(
                    //         () => ui.ecrire(message, MESSAGE_SUCCES),
                    //         (e) => ui.ecrire_erreur(message, e, MESSAGE_ERREUR)
                    //     )
                }
            )
        );
};