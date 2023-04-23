import * as ui_contenu from "./ui/contenu";
import * as ui_session from "./ui/session";
import * as session from "./session";

import "./style.scss"

const init = async () => ui_session.init(
    session.effacer,
    mdp => session.init(mdp).then(
        () => ui_contenu.init(
            session.data.routines,
            session.data.historique,
            session.sauver
        )
    )
);

init();