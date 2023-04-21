import * as cookie from "./utils/cookie";
import { Session } from "./types/Session";

const COOKIE = "routin.session";

const ERREUR_SAUVER = "Impossible de sauvegarder les informations localement.";

const defaut = (): Session => {
    return {
        routines: []
    }
};

export var data: Session = defaut();

export const charger = async (mdp: string) => cookie.lire(COOKIE, mdp) as Promise<Session>;

export const sauver = async (mdp: string) => charger(mdp).then(
    () => cookie.ecrire(COOKIE, data, mdp),
    (e) => {
        throw new Error(ERREUR_SAUVER, { cause: e });
    }
);

export const effacer = async () => cookie.supprimer(COOKIE);

export const init = async (mdp: string) => {
    if (cookie.existe(COOKIE))
        return charger(mdp).then(() => {});
    else return cookie.ecrire(COOKIE, data, mdp);
};