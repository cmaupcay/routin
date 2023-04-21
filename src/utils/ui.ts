const CLASSE_FERME = "ferme";

const ERREUR_MDP = "Impossible de lire le mot de passe car le champs HTML n'existe pas.";

export type Élément = Element | null | undefined;
export type ÉlémentHTML = HTMLElement | null | undefined;
export type Champs = HTMLInputElement | null | undefined;

export const vider = async (e: Élément) => {
    if (!!e) while (!!e.lastElementChild)
        e.removeChild(e.lastElementChild);
};

export const lire_mdp = async (e: Champs) => {
    if (!!e)
    {
        const mdp = e.value;
        e.value = "";
        return mdp;
    }
    throw new Error(ERREUR_MDP);
};

export const ecrire = async (e: ÉlémentHTML, msg: string) => {
    if (!!e) e.innerText = msg;
};

export const ecrire_erreur = async (e: ÉlémentHTML, erreur: Error, msg: string = erreur.message) => {
    ecrire(e, msg).then(() => console.error(erreur));
};

export const fermer = async (e: Élément) => e?.classList.add(CLASSE_FERME);

export const ouvrir = async (e:Élément) => e?.classList.remove(CLASSE_FERME);