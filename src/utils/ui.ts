const ERREUR_CLASSE = "erreur";
const ERREUR_MDP = "Impossible de lire le mot de passe car le champs HTML n'existe pas.";

const FERME_CLASSE = "ferme";

export type Élément = Element | null | undefined;
export type ÉlémentHTML = HTMLElement | null | undefined;
export type Champs = HTMLInputElement | null | undefined;
export type ChampsSelection = HTMLSelectElement | null | undefined;

export const selectionner = (selecteur: string) => document.querySelector(selecteur) as ÉlémentHTML;

export const vider = async (e: Élément) => {
    if (!!e) while (!!e.lastElementChild)
        e.removeChild(e.lastElementChild);
};

export async function remplir<T> (
    e: Élément, valeurs: Iterable<T>, tag: string,
    operation: (e: HTMLElement, v: T) => void = (e, v) => {}
)
{
    if (!!e)
        for (let valeur of valeurs)
        {
           const element = document.createElement(tag);
           e.append(element);
           operation(element, valeur); 
        }
}

export async function lire<T = string>(
    champs: Champs, _effacer: boolean = true,
    extraction: (v: string) => T = v => v as T,
    verificiation: (v: T) => boolean = v => {
        if (typeof v === "string")
            return v.length > 0;
        return true;
    }
): Promise<T | undefined>
{
    if (!!champs)
    {
        const valeur = extraction(champs.value);
        if (verificiation(valeur))
        {
            if (_effacer) effacer(champs);
            return valeur;
        }
        else champs.classList.add(ERREUR_CLASSE);
        return undefined;
    }
    throw new Error(ERREUR_MDP);
};

export const effacer = (champs: Champs) => {
    if (!!champs)
    {
        champs.classList.remove(ERREUR_CLASSE);
        champs.value = "";
    }
};

export const ecrire = async (e: ÉlémentHTML, msg: string, reinitialiser = true) => {
    if (!!e)
    {
        if (reinitialiser)
            e.classList.remove(ERREUR_CLASSE);
        e.innerText = msg;
    }
};

export const ecrire_erreur = async (e: ÉlémentHTML, erreur: Error, msg: string = erreur.message) => {
    if (!!e) e.classList.add(ERREUR_CLASSE);
    ecrire(e, msg, false).then(() => console.error(erreur));
};

export const fermer = async (e: Élément) => e?.classList.add(FERME_CLASSE);

export const ouvrir = async (e: Élément) => e?.classList.remove(FERME_CLASSE);

export const creer_options = async (
    champs: ChampsSelection, options: Iterable<string>,
    prefix: string, textes: Map<string, string>
) => remplir(champs, options, "option", (e, v) => {
    e.id = prefix + v;
    e.innerText = textes.get(v) ?? v;
});