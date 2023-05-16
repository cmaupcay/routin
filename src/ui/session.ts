import * as ui from "../utils/ui";

const SELECTEUR = "#routin-init";
const SELECTEUR_MDP = SELECTEUR + ">.mdp";
const SELECTEUR_MESSAGE = SELECTEUR + ">.message";
const SELECTEUR_EFFACER = SELECTEUR + ">.effacer";
const SELECTEUR_ENTRER = SELECTEUR + ">.entrer";

const MESSAGE_CONNU = "Bonjour, veuillez entrer votre mot de passe pour contineur.";
const MESSAGE_INCONNU = "Bienvenue ! Pour commencer, veuillez créer un mot de passe.";
const MESSAGE_EFFACEMENT = "Informations locales effacées.";
const MESSAGE_DECHIFFREMENT = "Déchiffrement des informations locales en cours...";

export type Effacer = () => Promise<void>;
export type Entrer = (mdp: string) => Promise<void>;

const init_effacer = async (effacer: Effacer, message: ui.ÉlémentHTML) => {
    ui.selectionner(SELECTEUR_EFFACER)?.addEventListener("click",
        () => effacer().then(
            () => ui.ecrire(message, MESSAGE_EFFACEMENT),
            (e) => ui.ecrire_erreur(message, e)
        )
    );
};

const entrer = (f: Entrer, mdp: ui.Champs, fenetre: ui.Élément, message: ui.ÉlémentHTML) => ui.lire(mdp).then(
    mdp => {
        if (!!mdp)
        {
            ui.ecrire(message, MESSAGE_DECHIFFREMENT);
            f(mdp).then(
                () => ui.fermer(fenetre),
                e => ui.ecrire_erreur(message, e)
            );
        }
    },
    e => ui.ecrire_erreur(message, e)
);

const init_entrer = async (_entrer: Entrer, fenetre: ui.Élément, message: ui.ÉlémentHTML) => {
    const mdp = ui.selectionner(SELECTEUR_MDP) as HTMLInputElement;
    mdp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") entrer(_entrer, mdp, fenetre, message);
    });
    ui.selectionner(SELECTEUR_ENTRER)?.addEventListener("click", () => entrer(_entrer, mdp, fenetre, message));
}

export const init = async (connu: boolean, effacer: Effacer, entrer: Entrer) => {
    const fenetre = ui.selectionner(SELECTEUR);
    ui.ouvrir(fenetre);
    const message = ui.selectionner(SELECTEUR_MESSAGE) as HTMLInputElement;
    ui.ecrire(message, connu ? MESSAGE_CONNU : MESSAGE_INCONNU);
    init_effacer(effacer, message);
    init_entrer(entrer, fenetre, message)
};