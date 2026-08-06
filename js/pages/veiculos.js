// ============================================================================
// VEÍCULOS
// Painel Frota
// Arquivo: js/pages/veiculos.js
// ============================================================================

import {

    createModule

} from "../engine/module.js";

import {

    SCHEMA_VEICULOS

} from "../schemas/veiculos.schema.js";

import {

    COLUNAS_VEICULOS

} from "../config/tabelas/veiculos.js";

document.addEventListener(

    "DOMContentLoaded",

    () =>

        createModule({

            entity: "VEICULOS",

            schema: SCHEMA_VEICULOS,

            columns: COLUNAS_VEICULOS,

            form: "#formVeiculo",

            table: "#tabelaVeiculos",

            filter: "#filtroVeiculos",

            permissions: "veiculos"

        })

);
