// ============================================================================
// SCHEMA EMPREGADOS
// Painel Frota
// Arquivo: js/schemas/empregados.schema.js
// ============================================================================

import {

    createSchema

} from "../engine/schema.js";

export const SCHEMA_EMPREGADOS =

createSchema({

    entity:

        "EMPREGADOS",

    title:

        "Empregados",

    description:

        "Cadastro de empregados.",

    icon:

        "badge",

    primaryKey:

        "ID",

    defaultSort: {

        field:

            "Empregado",

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
        // EMPREGADO
        // ================================================================

        {

            name:

                "Empregado",

            label:

                "Empregado",

            type:

                "text",

            required:

                true,

            searchable:

                true,

            sortable:

                true,

            unique:

                false,

            table:

                true,

            form:

                true,

            filter:

                true

        },

        // ================================================================
        // MATRÍCULA
        // ================================================================

        {

            name:

                "Matrícula",

            label:

                "Matrícula",

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
        // DIRETORIA
        // ================================================================

        {

            name:

                "Diretoria",

            label:

                "Diretoria",

            type:

                "text",

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
        // SETOR
        // ================================================================

        {

            name:

                "Setor",

            label:

                "Setor",

            type:

                "text",

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
        // USUÁRIO
        // ================================================================

        {

            name:

                "Usuário",

            label:

                "Usuário",

            type:

                "text",

            searchable:

                true,

            table:

                false,

            form:

                true,

            filter:

                true

        },

        // ================================================================
        // CONDIÇÃO
        // ================================================================

        {

            name:

                "Condição",

            label:

                "Condição",

            type:

                "select",

            options: [

                "MOTORISTA",

                "PASSAGEIRO",

                "MOTORISTA / PASSAGEIRO"

            ],

            table:

                true,

            form:

                true,

            filter:

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

                "FÉRIAS",

                "LICENÇA",

                "AFASTADO",

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
