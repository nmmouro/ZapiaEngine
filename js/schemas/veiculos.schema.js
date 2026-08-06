// ============================================================================
// SCHEMA VEÍCULOS
// Painel Frota
// Arquivo: js/schemas/veiculos.schema.js
// ============================================================================

import {

    createSchema

} from "../engine/schema.js";

export const SCHEMA_VEICULOS =

createSchema({

    entity:

        "VEICULOS",

    title:

        "Veículos",

    description:

        "Cadastro de veículos da frota.",

    icon:

        "directions_car",

    primaryKey:

        "ID",

    defaultSort: {

        field:

            "Placa",

        order:

            "asc"

    },

    fields: [

        // ================================================================
        // ID
        // ================================================================

        {

            name:

                "ID",

            label:

                "ID",

            type:

                "id",

            visible:

                false,

            table:

                false,

            form:

                false,

            filter:

                false

        },

        // ================================================================
        // DATA
        // ================================================================

        {

            name:

                "Data",

            label:

                "Data",

            type:

                "date",

            required:

                true,

            table:

                false,

            form:

                true,

            filter:

                true

        },

        // ================================================================
        // FOTO
        // ================================================================

        {

            name:

                "Foto",

            label:

                "Foto",

            type:

                "image",

            table:

                false,

            form:

                true

        },

        // ================================================================
        // PLACA
        // ================================================================

        {

            name:

                "Placa",

            label:

                "Placa",

            type:

                "text",

            required:

                true,

            unique:

                true,

            searchable:

                true,

            sortable:

                true,

            table:

                true,

            form:

                true,

            filter:

                true

        },

        // ================================================================
        // MODELO
        // ================================================================

        {

            name:

                "Modelo",

            label:

                "Modelo",

            type:

                "text",

            required:

                true,

            searchable:

                true,

            sortable:

                true,

            table:

                true,

            form:

                true,

            filter:

                true

        },

        // ================================================================
        // MARCA
        // ================================================================

        {

            name:

                "Marca",

            label:

                "Marca",

            type:

                "text",

            table:

                true,

            form:

                true,

            filter:

                true

        },

        // ================================================================
        // ANO
        // ================================================================

        {

            name:

                "Ano",

            label:

                "Ano",

            type:

                "number",

            table:

                true,

            form:

                true,

            filter:

                true

        },

        // ================================================================
        // COMBUSTÍVEL
        // ================================================================

        {

            name:

                "Combustível",

            label:

                "Combustível",

            type:

                "select",

            options: [

                "GASOLINA",

                "ETANOL",

                "FLEX",

                "DIESEL",

                "ELÉTRICO"

            ],

            table:

                true,

            form:

                true,

            filter:

                true

        },

        // ================================================================
        // KM INICIAL
        // ================================================================

        {

            name:

                "Km Inicial",

            label:

                "Km Inicial",

            type:

                "number",

            align:

                "right",

            table:

                false,

            form:

                true

        },

        // ================================================================
        // KM FINAL
        // ================================================================

        {

            name:

                "Km Final",

            label:

                "Km Atual",

            type:

                "number",

            align:

                "right",

            table:

                true,

            form:

                true

        },

        // ================================================================
        // STATUS
        // ================================================================

        {

            name:

                "Status",

            label:

                "Status",

            type:

                "status",

            default:

                "ATIVO",

            options: [

                "ATIVO",

                "MANUTENÇÃO",

                "INATIVO"

            ],

            table:

                true,

            form:

                true,

            filter:

                true

        }

    ]

});
