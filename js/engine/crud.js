// ============================================================================
// CRUD ENGINE
// Painel Frota
// Arquivo: js/engine/crud.js
// Responsável por integrar DataSource, Form, Table e Filter.
// ============================================================================

// ============================================================================
// CRUD ENGINE
// ============================================================================

import {

    createState

} from "./state.js";

import {

    emit

} from "./events.js";

// ============================================================================
// CRIAR CRUD
// ============================================================================

export function createCrud({

    entity,

    datasource,

    form,

    table,

    filter = null

}) {

    const state =

        createState({

            registros: [],

            filtrados: [],

            editando: null

        });

    // ------------------------------------------------------------
    // CARREGAR
    // ------------------------------------------------------------

    async function load() {

        const lista =

            await datasource.list();

        state.set(

            "registros",

            lista

        );

        state.set(

            "filtrados",

            lista

        );

        table.refresh(

            lista

        );

        emit(

            "crud:loaded",

            entity

        );

    }

    // ------------------------------------------------------------
    // NOVO
    // ------------------------------------------------------------

    function novo() {

        state.set(

            "editando",

            null

        );

        form.clear();

        emit(

            "crud:new",

            entity

        );

    }

    // ------------------------------------------------------------
    // EDITAR
    // ------------------------------------------------------------

    async function edit(id) {

        const registro =

            await datasource.get(id);

        state.set(

            "editando",

            registro.ID

        );

        form.fill(

            registro

        );

        emit(

            "crud:edit",

            registro

        );

    }

    // ------------------------------------------------------------
    // SALVAR
    // ------------------------------------------------------------

    async function save() {

        const dados =

            form.getData();

        form.validate();

        if (

            state.get(

                "editando"

            )

        ) {

            await datasource.update(

                state.get(

                    "editando"

                ),

                dados

            );

        }

        else {

            await datasource.create(

                dados

            );

        }

        await load();

        form.clear();

        state.set(

            "editando",

            null

        );

        emit(

            "crud:saved",

            entity

        );

    }

    // ------------------------------------------------------------
    // EXCLUIR
    // ------------------------------------------------------------

    async function remove(id) {

        await datasource.remove(id);

        await load();

        emit(

            "crud:removed",

            id

        );

    }

    // ------------------------------------------------------------
    // FILTRAR
    // ------------------------------------------------------------

    function applyFilter() {

        if (!filter) {

            return;

        }

        const resultado =

            filter.apply(

                state.get(

                    "registros"

                )

            );

        state.set(

            "filtrados",

            resultado

        );

        table.refresh(

            resultado

        );

    }

    // ------------------------------------------------------------
    // CANCELAR
    // ------------------------------------------------------------

    function cancel() {

        state.set(

            "editando",

            null

        );

        form.clear();

    }

    // ------------------------------------------------------------
    // REFRESH
    // ------------------------------------------------------------

    async function refresh() {

        await load();

    }

    // ------------------------------------------------------------
    // EXPORTS
    // ------------------------------------------------------------

    return {

        load,

        refresh,

        novo,

        edit,

        save,

        remove,

        cancel,

        state

    };

}
