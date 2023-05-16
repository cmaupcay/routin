import * as data from "../data";
import * as ui from "../../../utils/ui";

const SELECTEUR = "#routin-sauvegarder";

const MESSAGE_SUCCES = "Informations sauvegardées localement.";
const MESSAGE_ERREUR = "Impossible de sauvegarder les informations localement."

const sauvegarder = (champsMdp: ui.Champs, message: ui.ÉlémentHTML) => ui.lire(champsMdp).then(
    mdp => {
        if(!!mdp && !!data.sauvegarder)
            return data.sauvegarder(mdp).then(
                () => { ui.ecrire(message, MESSAGE_SUCCES) },
                (e) => { ui.ecrire_erreur(message, e, MESSAGE_ERREUR) }
            )
    }
);

export const init = async (champsMdp: ui.Champs, message: ui.ÉlémentHTML) => {
    if (!!champsMdp && !!message)
    {
        champsMdp.addEventListener("keydown", (e) => {
            if (e.key === "Enter") sauvegarder(champsMdp, message);
        });
        ui.selectionner(SELECTEUR)?.addEventListener("click", () => sauvegarder(champsMdp, message));
    }
};