import * as data from "../data";
import * as ui from "../../../utils/ui";

const SELECTEUR = "#routin-sauvegarder";

const MESSAGE_SUCCES = "Informations sauvegardées localement.";
const MESSAGE_ERREUR = "Impossible de sauvegarder les informations localement."

export const init = async (champsMdp: ui.Champs, message: ui.ÉlémentHTML) => {
    if (!!champsMdp && !!message)
        ui.selectionner(SELECTEUR)?.addEventListener("click",
            () => ui.lire(champsMdp).then(
                mdp => {
                    if(!!mdp && !!data.sauvegarder)
                        return data.sauvegarder(mdp).then(
                            () => { ui.ecrire(message, MESSAGE_SUCCES) },
                            (e) => { ui.ecrire_erreur(message, e, MESSAGE_ERREUR) }
                        )
                }
            )
        );
};