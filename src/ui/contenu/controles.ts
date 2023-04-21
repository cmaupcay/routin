import * as ui from "../../utils/ui";

const SELECTEUR = "#routin-controles";
const SELECTEUR_MDP = SELECTEUR + ">.mdp";
const SELECTEUR_SAUVEGARDER = SELECTEUR + ">.sauvegarder";
const SELECTEUR_MESSAGE = SELECTEUR + ">.message";

const MESSAGE_SAUVEGARDE_SUCCES = "Informations sauvegardées localement.";
const MESSAGE_SAUVEGARDE_ERREUR = "Impossible de sauvegarder les informations localement."

export type Sauvegarder = (mdp: string) => Promise<void>;

const init_sauvegarder = (sauvegarder: Sauvegarder) => {
    const mdp = document.querySelector(SELECTEUR_MDP) as HTMLInputElement;
    const message = document.querySelector(SELECTEUR_MESSAGE) as HTMLElement;
    document.querySelector(SELECTEUR_SAUVEGARDER)?.addEventListener("click", () => ui.lire_mdp(mdp).then(
        mdp => {
            if(mdp.length > 0)
                sauvegarder(mdp).then(
                    () => ui.ecrire(message, MESSAGE_SAUVEGARDE_SUCCES),
                    (e) => ui.ecrire_erreur(message, e, MESSAGE_SAUVEGARDE_ERREUR)
                )
        }
    ));
};

export const init = async (sauvegarder: Sauvegarder) => {
    init_sauvegarder(sauvegarder);
};