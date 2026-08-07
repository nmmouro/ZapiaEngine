// ============================================================================
// MODULE ENGINE
// Painel Frota
// Arquivo: js/engine/module.js
// Responsável por montar automaticamente um módulo do sistema.
// ============================================================================

import {

    createModule

} from "../engine/module.js";

import {

    SCHEMA_VEICULOS

} from "../schemas/veiculos.schema.js";

document.addEventListener(

    "DOMContentLoaded",

    () =>

        createModule({

            schema:

                SCHEMA_VEICULOS

        })

);
