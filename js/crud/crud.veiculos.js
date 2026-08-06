import {

    createCrud

} from "../engine/crud.js";

import {

    createDataSource

} from "../engine/datasource.js";

import {

    createForm

} from "../components/form.js";

import {

    createTable

} from "../components/table.js";

import {

    createFilter

} from "../components/filter.js";

import {

    SCHEMA_VEICULOS

} from "../schemas/veiculos.schema.js";

import {

    COLUNAS_VEICULOS

} from "../config/tabelas/veiculos.js";

export default createCrud({

    entity: "VEICULOS",

    datasource:

        createDataSource({

            aba: "VEICULOS"

        }),

    form:

        createForm({

            schema:

                SCHEMA_VEICULOS,

            container:

                "#formVeiculo"

        }),

    table:

        createTable({

            columns:

                COLUNAS_VEICULOS,

            container:

                "#tabelaVeiculos"

        }),

    filter:

        createFilter({

            container:

                "#filtroVeiculos"

        })

});
