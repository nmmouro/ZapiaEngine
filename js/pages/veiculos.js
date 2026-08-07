import {

    createModule

} from "../engine/module.js";

import {

    SCHEMA_VEICULOS

} from "../schemas/veiculos.schema.js";

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        await createModule({

            schema:
                SCHEMA_VEICULOS

        });

    }

);
