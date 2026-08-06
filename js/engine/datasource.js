// ============================================================================
// DATASOURCE ENGINE
// Painel Frota
// Arquivo: js/engine/datasource.js
// ============================================================================

import {

    uuid

} from "./engine.js";

// ============================================================================
// DATASOURCE
// ============================================================================

export function createDataSource({

    service,

    autoLoad = false,

    pageSize = 20

} = {}) {

    const state = {

        id:

            uuid(),

        data: [],

        filter: {},

        sort: null,

        page: 1,

        total: 0,

        loading: false,

        pageSize,

        listeners:

            new Set()

    };

    const datasource = {

        load:

            () =>

                load(

                    state,

                    service

                ),

        reload:

            () =>

                load(

                    state,

                    service,

                    true

                ),

        save:

            registro =>

                save(

                    state,

                    service,

                    registro

                ),

        update:

            (id, registro) =>

                update(

                    state,

                    service,

                    id,

                    registro

                ),

        remove:

            id =>

                remove(

                    state,

                    service,

                    id

                ),

        find:

            id =>

                find(

                    state,

                    id

                ),

        clear:

            () =>

                clear(

                    state

                ),

        destroy:

            () =>

                destroy(

                    state

                ),

        setFilter:

            filtro =>

                setFilter(

                    state,

                    filtro

                ),

        setSort:

            (campo, ordem) =>

                setSort(

                    state,

                    campo,

                    ordem

                ),

        setPage:

            pagina =>

                setPage(

                    state,

                    pagina

                ),

        getData:

            () =>

                state.data,

        getRecord:

            id =>

                find(

                    state,

                    id

                ),

        getState:

            () =>

                state,

        subscribe:

            callback =>

                state.listeners.add(

                    callback

                ),

        unsubscribe:

            callback =>

                state.listeners.delete(

                    callback

                )

    };

    if (

        autoLoad

    ) {

        datasource.load();

    }

    return datasource;

}


/*
EXEMPLOS=================================================

Carregar
async function load(

    state,

    service,

    force = false

) {

    state.loading = true;

    notify(state);

    const resposta =

        await service.listar({

            page:

                state.page,

            pageSize:

                state.pageSize,

            filter:

                state.filter,

            sort:

                state.sort

        });

    const dados =

        resposta?.data ??

        resposta?.dados ??

        resposta ??

        [];

    state.data = dados;

    state.total =

        dados.length;

    state.loading = false;

    notify(state);

    return dados;

}
Salvar
async function save(

    state,

    service,

    registro

) {

    const resposta =

        await service.salvar(

            registro

        );

    await load(

        state,

        service,

        true

    );

    return resposta;

}
Atualizar
async function update(

    state,

    service,

    id,

    registro

) {

    const resposta =

        await service.editar(

            id,

            registro

        );

    await load(

        state,

        service,

        true

    );

    return resposta;

}
Excluir
async function remove(

    state,

    service,

    id

) {

    const resposta =

        await service.excluir(

            id

        );

    await load(

        state,

        service,

        true

    );

    return resposta;

}
Localizar
function find(

    state,

    id

) {

    return state.data.find(

        item =>

            item.ID === id

    );

}
Filtro
function setFilter(

    state,

    filtro

) {

    state.filter =

        filtro;

    notify(state);

}
Ordenação
function setSort(

    state,

    campo,

    ordem

) {

    state.sort = {

        campo,

        ordem

    };

    notify(state);

}
Paginação
function setPage(

    state,

    pagina

) {

    state.page =

        pagina;

    notify(state);

}
Limpar
function clear(

    state

) {

    state.data = [];

    state.total = 0;

    notify(state);

}
Destruir
function destroy(

    state

) {

    clear(

        state

    );

    state.listeners.clear();

}
Eventos
function notify(

    state

) {

    state.listeners.forEach(

        callback =>

            callback(

                state

            )

    );

}
Exemplo de uso
const datasource =

    createDataSource({

        service:

            VeiculosService,

        autoLoad: true

    });

datasource.subscribe(

    estado => {

        renderTable(

            tabela,

            {

                columns:

                    COLUNAS,

                data:

                    estado.data

            }

        );

    }

);

*/
