// ============================================================================
// MODULE ENGINE
// Painel Frota
// Arquivo: js/engine/module.js
// Responsável por montar automaticamente um módulo.
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

import {

    getTableFields,

    getContainers,

    getPermissions,

    getActions,

    getOptions,

    getService

} from "./schema.js";

// ============================================================================
// CACHE
// ============================================================================

const modules = new Map();

// ============================================================================
// CREATE MODULE
// ============================================================================

export async function createModule({

    schema

} = {}) {

    if (!schema) {

        throw new Error(

            "Schema não informado."

        );

    }

    const entity =

        schema.entity;

    if (

        modules.has(

            entity

        )

    ) {

        return modules.get(

            entity

        );

    }

    // ========================================================================
    // CONFIGURAÇÕES DO SCHEMA
    // ========================================================================

    const containers =

        getContainers(

            entity

        );

    const permissions =

        getPermissions(

            entity

        );

    const actions =

        getActions(

            entity

        );

    const options =

        getOptions(

            entity

        );

    const service =

        getService(

            entity

        );

    // ========================================================================
    // PERMISSÕES
    // ========================================================================

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

    // ========================================================================
    // STATE
    // ========================================================================

    const state =

        createState({

                                 name: config.stateName,
            entity

        });

    // ========================================================================
    // DATASOURCE
    // ========================================================================

    const datasource =

        createDataSource({

            service,

            pageSize:

                schema.pageSize,

            autoLoad:

                schema.autoLoad

        });

    // ========================================================================
    // FORM
    // ========================================================================

    const form =

        containers.form

            ? createForm({

                  schema,

                  container:

                      containers.form

              })

            : null;

    // ========================================================================
    // TABLE
    // ========================================================================

    const table =

        containers.table

            ? createTable({

                  container:

                      containers.table,

                  columns:

                      getTableFields(

                          entity

                      ),

                  actions

              })

            : null;

    // ========================================================================
    // FILTER
    // ========================================================================

    const filter =

        containers.filter

            ? createFilter({

                  schema,

                  container:

                      containers.filter

              })

            : null;

    // ========================================================================
    // TOOLBAR
    // ========================================================================

    const toolbar =

        containers.toolbar

            ? createToolbar({

                  schema,

                  container:

                      containers.toolbar

              })

            : null;

    // ========================================================================
    // CRUD
    // ========================================================================

    const crud =

        createCrud({

            entity,

            schema,

            datasource,

            state,

            form,

            table,

            filter

        });

    // ========================================================================
    // MODULE
    // ========================================================================

    const module = {

        entity,

        schema,

        state,

        datasource,

        crud,

        form,

        table,

        filter,

        toolbar,

        options,

        async init() {

            await crud.load();

            emit(

                "module:init",

                module

            );

        },

        async refresh() {

            await crud.refresh();

        },

        destroy() {

            datasource.destroy?.();

            form?.destroy?.();

            table?.destroy?.();

            filter?.destroy?.();

            toolbar?.destroy?.();

            modules.delete(

                entity

            );

            emit(

                "module:destroy",

                module

            );

        }

    };

    modules.set(

        entity,

        module

    );

    await module.init();

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

    getModule(

        entity

    )?.destroy();

}

// ============================================================================
// MODULES
// ============================================================================

export function getModules() {

    return [

        ...modules.values()

    ];

}

// ============================================================================
// CLEAR
// ============================================================================

export function clearModules() {

    modules.forEach(

        module =>

            module.destroy()

    );

    modules.clear();

}
