import * as data from "../data";
import * as liste from "./liste";
import * as ui from "../../../utils/ui";

import * as RoutineType from "../../../types/RoutineType";

const SELECTEUR = "#routin-routines-ajout";
const SELECTEUR_NOM = SELECTEUR + ">.nom";
const SELECTEUR_OBJECTIF = SELECTEUR + ">.objectif";
const SELECTEUR_TYPE = SELECTEUR + ">.type";
const SELECTEUR_AJOUTER = SELECTEUR + ">.ajouter";

const ROUTINE_TYPE_PREFIX = "routin-routine-type-";
const ROUTINE_TYPE_MESSAGES = new Map([
    [ RoutineType.MAX, "au plus" ],
    [ RoutineType.MIN, "au moins" ]
]);

const creer_routine = (nom: string, objectif: number, type: RoutineType.type) => {
    data.routines?.push({
        id: crypto.randomUUID(),
        nom: nom,
        objectif: objectif,
        type: type
    });
    data.desync();
};

const ajout = (champsNom: ui.Champs, champsObjectif: ui.Champs, champsType: ui.ChampsSelection) => {
    if (!!champsNom && !!champsObjectif && !!champsType)
        return () => {
            ui.lire(champsNom, false).then(nom => {
                if (!!nom)
                    return ui.lire<number>(champsObjectif, true, parseInt, v => v > 0).then(objectif => {
                        if (!!objectif)
                        {
                            creer_routine(
                                nom, objectif,
                                champsType.options.item(champsType.selectedIndex)?.id.replace(ROUTINE_TYPE_PREFIX, "") as RoutineType.type
                            );
                            ui.effacer(champsNom);
                            liste.rafraichir();
                        }
                    })
            });
        };
};

export const init = async () => {
    const type = ui.selectionner(SELECTEUR_TYPE) as HTMLSelectElement;
    ui.creer_options(type, RoutineType.types, ROUTINE_TYPE_PREFIX, ROUTINE_TYPE_MESSAGES);
    const nom = ui.selectionner(SELECTEUR_NOM) as HTMLInputElement;
    const objectif = ui.selectionner(SELECTEUR_OBJECTIF) as HTMLInputElement;
    const ajouter = ajout(nom, objectif, type);
    if (!!ajouter) ui.selectionner(SELECTEUR_AJOUTER)?.addEventListener("click", ajouter);
};