import * as data from "../data";
import * as ui from "../../../utils/ui";

const SELECTEUR = "#routin-performances-ajout";
const SELECTEUR_ROUTINES = SELECTEUR + ">.routine";
const SELECTEUR_PERFORMANCE = SELECTEUR + ">.performance";
const SELECTEUR_AJOUTER = SELECTEUR + ">.ajouter";

const PERFORMANCES_ROUTINE_PREFIX = "routin-performances-routine-";

var routines: ui.ChampsSelection = undefined;

const creer_performance = (routine: string, performance: number) => {
    const performances = data.performances_actuelles?.[1];
    if (!!performances)
    {
        const index = performances.map(p => p.routine).indexOf(routine);
        if (index == -1)
            performances.push({
                routine: routine,
                valeur: performance
            });
        else performances[index].valeur = performance;
    }
    data.desync();
};

const ajout = (champsPerformance: ui.Champs) => {
    if (!!champsPerformance)
        return () => {
            ui.lire<number>(champsPerformance, true, parseInt, v => v > 0).then(performance => {
                if (!!performance && !!routines)
                {
                    const routine = routines.options.item(routines.selectedIndex)?.id.replace(PERFORMANCES_ROUTINE_PREFIX, "");
                    if (!!routine) creer_performance(routine, performance);
                }
            });
        };
};

export const rafraichir_routines = async () => {
    if (!!routines && !!data.routines)
    {
        ui.vider(routines);
        const ids: string[] = [], noms: Map<string, string> = new Map();
        data.routines.forEach(r => {
            ids.push(r.id);
            noms.set(r.id, r.nom);
        });
        ui.creer_options(routines, ids, PERFORMANCES_ROUTINE_PREFIX, noms);
    }
};

export const init = async () => {
    routines = ui.selectionner(SELECTEUR_ROUTINES) as HTMLSelectElement;
    rafraichir_routines();
    data.observateurs.push(rafraichir_routines);
    const performance = ui.selectionner(SELECTEUR_PERFORMANCE) as HTMLInputElement;
    const ajouter = ajout(performance);
    if (!!ajouter) ui.selectionner(SELECTEUR_AJOUTER)?.addEventListener("click", ajouter);
};