import * as ui from "../utils/ui";

const SELECTEUR = "#routin-init";
const SELECTEUR_MDP = SELECTEUR + ">.mdp";
const SELECTEUR_MESSAGE = SELECTEUR + ">.message";
const SELECTEUR_EFFACER = SELECTEUR + ">.effacer";
const SELECTEUR_ENTRER = SELECTEUR + ">.entrer";

const MESSAGE_EFFACEMENT = "Informations locales effacées.";

export type Effacer = () => Promise<void>;
export type Entrer = (mdp: string) => Promise<void>;

export const init = async (effacer: Effacer, entrer: Entrer) => {
    const fenetre = ui.selectionner(SELECTEUR);
    ui.ouvrir(fenetre);
    const mdp = ui.selectionner(SELECTEUR_MDP) as HTMLInputElement;
    const message = ui.selectionner(SELECTEUR_MESSAGE) as HTMLInputElement;
    // EFFACER
    ui.selectionner(SELECTEUR_EFFACER)?.addEventListener("click",
        () => effacer().then(
            () => ui.ecrire(message, MESSAGE_EFFACEMENT),
            (e) => ui.ecrire_erreur(message, e)
        )
    );
    // ENTRER
    ui.selectionner(SELECTEUR_ENTRER)?.addEventListener("click", 
        () => ui.lire(mdp).then(
            mdp => {
                if (!!mdp)
                    entrer(mdp).then(
                        () => ui.fermer(fenetre),
                        e => ui.ecrire_erreur(message, e)
                    );
            },
            e => ui.ecrire_erreur(message, e)
        )
    );
};