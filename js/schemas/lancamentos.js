// ============================================================================
// SCHEMA LANÇAMENTOS
// Painel Frota
// Arquivo: js/schemas/lancamentos.schema.js
// ============================================================================

import {

    createSchema

} from "../engine/schema.js";

export const SCHEMA_LANCAMENTOS =

createSchema({

    entity:

        "LANCAMENTOS",

    title:

        "Lançamentos",

    description:

        "Registro de utilização da frota.",

    icon:

        "assignment",

    primaryKey:

        "ID",

    defaultSort: {

        field:

            "Data",

        order:

            "desc"

    },

    fields: [

        // ================================================================
        // ID
        // ================================================================

        {

            name: "ID",

            label: "ID",

            type: "id",

            visible: false,

            table: false,

            form: false,

            filter: false

        },

        // ================================================================
        // DATA
        // ================================================================

        {

            name: "Data",

            label: "Data",

            type: "date",

            required: true,

            sortable: true,

            table: true,

            form: true,

            filter: true

        },

        // ================================================================
        // HORA
        // ================================================================

        {

            name: "Hora",

            label: "Hora",

            type: "time",

            required: true,

            sortable: true,

            table: true,

            form: true,

            filter: false

        },

        // ================================================================
        // ID EMPREGADO
        // ================================================================

        {

            name: "ID Empregado",

            label: "ID Empregado",

            type: "lookup",

            entity: "EMPREGADOS",

            valueField: "ID",

            textField: "Empregado",

            table: false,

            form: false,

            filter: false

        },

        // ================================================================
        // EMPREGADO
        // ================================================================

        {

            name: "Empregado / Matrícula",

            label: "Empregado",

            type: "lookup",

            entity: "EMPREGADOS",

            valueField: "ID",

            textField: "Empregado",

            required: true,

            searchable: true,

            sortable: true,

            table: true,

            form: true,

            filter: true

        },

        // ================================================================
        // ID VEÍCULO
        // ================================================================

        {

            name: "ID Veículo",

            label: "ID Veículo",

            type: "lookup",

            entity: "VEICULOS",

            valueField: "ID",

            textField: "Placa",

            table: false,

            form: false,

            filter: false

        },

        // ================================================================
        // VEÍCULO
        // ================================================================

        {

            name: "Veículo",

            label: "Veículo",

            type: "lookup",

            entity: "VEICULOS",

            valueField: "ID",

            textField: "Placa",

            required: true,

            searchable: true,

            sortable: true,

            table: true,

            form: true,

            filter: true

        },

        // ================================================================
        // PASSAGEIRO / SETOR / MOTIVO
        // ================================================================

        {

            name: "Passageiro / Setor / Motivo",

            label: "Passageiro / Setor / Motivo",

            type: "textarea",

            table: true,

            form: true,

            filter: false

        },

        // ================================================================
        // ITINERÁRIO
        // ================================================================

        {

            name: "Itinerário",

            label: "Itinerário",

            type: "textarea",

            required: true,

            searchable: true,

            table: true,

            form: true,

            filter: true

        },

        // ================================================================
        // KM INICIAL
        // ================================================================

        {

            name: "Km Inicial",

            label: "Km Inicial",

            type: "number",

            align: "right",

            table: true,

            form: true,

            filter: false

        },

        // ================================================================
        // KM FINAL
        // ================================================================

        {

            name: "Km Final",

            label: "Km Final",

            type: "number",

            align: "right",

            table: true,

            form: true,

            filter: false

        },

        // ================================================================
        // OBSERVAÇÃO
        // ================================================================

        {

            name: "Observação",

            label: "Observação",

            type: "textarea",

            table: false,

            form: true,

            filter: false

        },

        // ================================================================
        // STATUS
        // ================================================================

        {

            name: "Status",

            label: "Status",

            type: "status",

            required: true,

            default: "ABERTO",

            options: [

                "ABERTO",

                "EM ANDAMENTO",

                "FINALIZADO",

                "CANCELADO"

            ],

            table: true,

            form: true,

            filter: true

        }

    ]

});
