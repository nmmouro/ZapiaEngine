// ============================================================================
// DATASOURCE ENGINE
// Painel Frota
// Arquivo: js/engine/datasource.js
// Responsável pelo gerenciamento dos dados.
// ============================================================================

import {

    uuid

} from "./engine.js";

// ============================================================================
// CREATE
// ============================================================================

export function createDataSource({

    entity,

    service,

    cache = true,

    autoLoad = false,

    pageSize = 20

} = {}) {

    if (!service) {

        throw new Error(

            `Datasource '${entity}' sem service.`

        );

    }

    const state = {

        id: uuid(),

        entity,

        service,

        cache,

        loading: false,

        page: 1,

        pageSize,

        total: 0,

        filter: {},

        sort: null,

        data: [],

        listeners: new Set()

    };

    const datasource = {

        entity,

        //------------------------------------------------------------
        // CRUD
        //------------------------------------------------------------

        list,

        get,

        create,

        update,

        remove,

        refresh,

        //------------------------------------------------------------
        // Estado
        //------------------------------------------------------------

        getData,

        getState,

        clear,

        //------------------------------------------------------------
        // Configuração
        //------------------------------------------------------------

        setFilter,

        getFilter,

        setSort,

        getSort,

        setPage,

        getPage,

        //------------------------------------------------------------
        // Eventos
        //------------------------------------------------------------

        subscribe,

        unsubscribe

    };

    if (autoLoad) {

        datasource.list();

    }

    return datasource;

    //=================================================================
    // LIST
    //=================================================================

    async function list() {

        state.loading = true;

        notify();

        const resposta =

            await service.list({

                filter: state.filter,

                sort: state.sort,

                page: state.page,

                pageSize: state.pageSize

            });

       state.data =

    Array.isArray(resposta)

        ? resposta

        : (
            resposta?.data ??
            resposta?.dados ??
            []
        );

        state.total =

    !Array.isArray(resposta)
        ? (
            resposta?.total ??
            state.data.length
        )
        : state.data.length;

        notify();

        return state.data;

    }

    //=================================================================
    // REFRESH
    //=================================================================

    async function refresh() {

        return list();

    }

    //=================================================================
    // GET
    //=================================================================

    async function get(id) {

        if (!id) {

            return null;

        }

        const local =

            state.data.find(

                item => item.ID == id

            );

        if (local) {

            return local;

        }

        return service.get(id);

    }

    //=================================================================
    // CREATE
    //=================================================================

    async function create(registro) {

        const novo =

            await service.create(

                registro

            );

        await refresh();

        return novo;

    }

    //=================================================================
    // UPDATE
    //=================================================================

    async function update(

        id,

        registro

    ) {

        const atualizado =

            await service.update(

                id,

                registro

            );

        await refresh();

        return atualizado;

    }

    //=================================================================
    // REMOVE
    //=================================================================

    async function remove(id) {

        await service.remove(id);

        await refresh();

    }

    //=================================================================
    // FILTER
    //=================================================================

    function setFilter(filtro = {}) {

        state.filter = filtro;

    }

    function getFilter() {

        return state.filter;

    }

    //=================================================================
    // SORT
    //=================================================================

    function setSort(

        field,

        order = "asc"

    ) {

        state.sort = {

            field,

            order

        };

    }

    function getSort() {

        return state.sort;

    }

    //=================================================================
    // PAGE
    //=================================================================

    function setPage(page = 1) {

        state.page = page;

    }

    function getPage() {

        return state.page;

    }

    //=================================================================
    // DATA
    //=================================================================

    function getData() {

        return state.data;

    }

    function getState() {

        return state;

    }

    function clear() {

        state.data = [];

        notify();

    }

    //=================================================================
    // OBSERVERS
    //=================================================================

    function subscribe(listener) {

        state.listeners.add(

            listener

        );

    }

    function unsubscribe(listener) {

        state.listeners.delete(

            listener

        );

    }

    function notify() {

        state.listeners.forEach(

            listener =>

                listener(state)

        );

    }

}
