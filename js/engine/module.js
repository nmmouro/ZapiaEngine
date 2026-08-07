// ============================================================================
// MODULE ENGINE
// Painel Frota
// Arquivo: js/engine/module.js
// Responsável por montar automaticamente um módulo do sistema.
// ============================================================================

import {

    createCrud

} from "./crud.js";

import {

    createDataSource

} from "./datasource.js";

import {

    createState

} from "./state.js";

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

    createToolbar

} from "../components/toolbar.js";

import {

    can

} from "./permissions.js";

import {

    emit

} from "./events.js";

// ============================================================================
// CACHE
// ============================================================================

const modules = new Map();

// ============================================================================
// CREATE MODULE
// ============================================================================

export function createModule({

    entity,

    schema,

    columns,

    form,

    table,

    filter,

    toolbar,

    permissions,

    actions = [],

    options = {}

}) {

    // ------------------------------------------------------------------------
    // EVITAR DUPLICIDADE
    // ------------------------------------------------------------------------

    if (

        modules.has(entity)

    ) {

        return modules.get(entity);

    }

    // ------------------------------------------------------------------------
// ESTADO
// ------------------------------------------------------------------------

    const state =

    createState({

        entity

    });

    // ------------------------------------------------------------------------
    // DATASOURCE
    // ------------------------------------------------------------------------

    const datasource =

        createDataSource({

            aba:

                entity

        });

    // ------------------------------------------------------------------------
    // FORM
    // ------------------------------------------------------------------------

    const formEngine =

        createForm({

            schema,

            container:

                form

        });

    // ------------------------------------------------------------------------
    // TABLE
    // ------------------------------------------------------------------------

    const tableEngine =

        createTable({

            container:

                table,

            columns,

            actions

        });

    // ------------------------------------------------------------------------
    // FILTER
    // ------------------------------------------------------------------------

    const filterEngine =

        filter

            ? createFilter({

                  container:

                      filter

              })

            : null;

    // ------------------------------------------------------------------------
    // TOOLBAR
    // ------------------------------------------------------------------------

    const toolbarEngine =

        toolbar

            ? createToolbar({

                  container:

                      toolbar

              })

            : null;

    // ------------------------------------------------------------------------
    // CRUD
    // ------------------------------------------------------------------------

    const crud =

        createCrud({

            entity,

            datasource,

            form:

                formEngine,

            table:

                tableEngine,

            filter:

                filterEngine

        });

    // ------------------------------------------------------------------------
    // INICIALIZAÇÃO
    // ------------------------------------------------------------------------

    async function init() {

        if (

            permissions &&

            !can(

                permissions +

                ":listar"

            )

        ) {

            throw new Error(

                "Acesso negado."

            );

        }

        await crud.load();

        emit(

            "module:init",

            entity

        );

    }

    // ------------------------------------------------------------------------
    // REFRESH
    // ------------------------------------------------------------------------

    async function refresh() {

        await crud.refresh();

    }

    // ------------------------------------------------------------------------
    // DESTRUIR
    // ------------------------------------------------------------------------

    function destroy() {

        modules.delete(

            entity

        );

        emit(

            "module:destroy",

            entity

        );

    }

    // ------------------------------------------------------------------------
    // API PÚBLICA
    // ------------------------------------------------------------------------

    const module = {

        entity,

        schema,

        columns,

        datasource,

        state,

        form:

            formEngine,

        table:

            tableEngine,

        filter:

            filterEngine,

        toolbar:

            toolbarEngine,

        crud,

        init,

        refresh,

        destroy,

        options

    };

    modules.set(

        entity,

        module

    );

    init();

    return module;

}

// ============================================================================
// GET MODULE
// ============================================================================

export function getModule(

    entity

) {

    return modules.get(

        entity

    );

}

// ============================================================================
// REMOVE MODULE
// ============================================================================

export function removeModule(

    entity

) {

    modules

        .get(entity)

        ?.destroy();

}

// ============================================================================
// LIST MODULES
// ============================================================================

export function getModules() {

    return [

        ...modules.values()

    ];

}

// ============================================================================
// CLEAR MODULES
// ============================================================================

export function clearModules() {

    modules.forEach(

        module =>

            module.destroy()

    );

    modules.clear();

}
