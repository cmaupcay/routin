import * as cookie from "./utils/cookie";
import { Session } from "./types/Session";

const COOKIE = "routin.session";

const ERREUR_SAUVER = "Impossible de sauvegarder les informations localement.";

const defaut = (): Session => {
    return {
        routines: [],
        historique: new Map()
    }
};

export var data: Session = defaut();

export const existe = () => cookie.existe(COOKIE);

export const charger = async (mdp: string) => cookie.lire(COOKIE, mdp) as Promise<Session>;

export const sauver = async (mdp: string) => charger(mdp).then(
    () => cookie.ecrire(COOKIE, data, mdp),
    (e) => {
        throw new Error(ERREUR_SAUVER, { cause: e });
    }
);

export const effacer = async () => cookie.supprimer(COOKIE);

export const init = async (mdp: string) => {
    if (existe()) return charger(mdp).then(_data => data = _data);
    else return cookie.ecrire(COOKIE, data, mdp);
};