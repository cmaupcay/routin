import * as ui from "../utils/ui";

const SELECTEUR_FENETRE = "#routin-init";
const SELECTEUR_MDP = SELECTEUR_FENETRE + ">.mdp";
const SELECTEUR_MESSAGE = SELECTEUR_FENETRE + ">.message";
const SELECTEUR_EFFACER = SELECTEUR_FENETRE + ">.effacer";
const SELECTEUR_ENTRER = SELECTEUR_FENETRE + ">.entrer";

const MESSAGE_EFFACEMENT = "Informations locales effacées.";

export type Effacer = () => Promise<void>;
export type Entrer = (mdp: string) => Promise<void>;

export const init = async (effacer: Effacer, entrer: Entrer) => {
    const fenetre = document.querySelector(SELECTEUR_FENETRE);
    ui.ouvrir(fenetre);
    const mdp = document.querySelector(SELECTEUR_MDP) as HTMLInputElement;
    const message = document.querySelector(SELECTEUR_MESSAGE) as HTMLInputElement;
    // EFFACER
    document.querySelector(SELECTEUR_EFFACER)?.addEventListener("click",
        () => effacer().then(
            () => ui.ecrire(message, MESSAGE_EFFACEMENT),
            (e) => ui.ecrire_erreur(message, e)
        )
    );
    // ENTRER
    document.querySelector(SELECTEUR_ENTRER)?.addEventListener("click", 
        () => ui.lire_mdp(mdp).then(
            mdp => {
                if (mdp.length > 0)
                    entrer(mdp).then(
                        () => ui.fermer(fenetre),
                        e => ui.ecrire_erreur(message, e)
                    );
            },
            e => ui.ecrire_erreur(message, e)
        )
    );
};