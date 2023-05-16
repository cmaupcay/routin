import * as cookie from "./utils/cookie";

import { Session } from "./types/Session";
import { Performances } from "./types/Performances";

const COOKIE = "routin.session";

const ERREUR_SAUVER = "Impossible de sauvegarder les informations localement.";

const defaut = (): Session => {
    return {
        routines: [],
        historique: []
    }
};

export var data: Session = defaut();

export const existe = () => cookie.existe(COOKIE);

export const charger = async (mdp: string) => cookie.lire(COOKIE, mdp) as Promise<Session>;

const ecrire = async (mdp: string) => cookie.ecrire(COOKIE, data, mdp);

export const sauver = async (mdp: string) => charger(mdp).then(
    () => ecrire(mdp),
    (e) => {
        throw new Error(ERREUR_SAUVER, { cause: e });
    }
);

export const effacer = async () => cookie.supprimer(COOKIE);

export const init = async (mdp: string) => {
    if (existe()) return charger(mdp).then(_data => data = _data);
    else
    {
        data = defaut();
        return ecrire(mdp);
    };
};