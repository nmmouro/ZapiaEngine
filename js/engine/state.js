// ============================================================================
// STATE ENGINE
// Painel Frota
// Arquivo: js/engine/state.js
// Responsável pelo gerenciamento global de estados.
// ============================================================================

import {

    uuid

} from "./engine.js";

// ============================================================================
// STORE
// ============================================================================

const stores = new Map();

// ============================================================================
// CRIAR ESTADO
// ============================================================================

export function createState({

    entity,

    name = entity.toLowerCase(),

    initialState = {}

}) {

    if (stores.has(name)) {

        return stores.get(name);

    }

    const store = {

        id:

            uuid(),

        name,

        entity,

        data: {

            ...initialState

        },

        selected:

            null,

        editing:

            null,

        loading:

            false,

        listeners:

            new Set()

    };

    stores.set(

        name,

        store

    );

    return store;

}

// ============================================================================
// OBTER ESTADO
// ============================================================================

export function getState(

    name

) {

    return stores.get(

        name

    );

}

// ============================================================================
// DEFINIR OBJETO
// ============================================================================

export function setState(

    name,

    values = {}

) {

    const store =

        getState(

            name

        );

    if (!store) {

        return;

    }

    Object.assign(

        store.data,

        values

    );

    notify(

        store

    );

}

// ============================================================================
// RETORNAR OBJETO
// ============================================================================

export function state(

    name

) {

    return getState(

        name

    )?.data;

}

// ============================================================================
// GET PROPERTY
// ============================================================================

export function get(

    name,

    property

) {

    return state(

        name

    )?.[property];

}

// ============================================================================
// SET PROPERTY
// ============================================================================

export function set(

    name,

    property,

    value

) {

    const store =

        getState(

            name

        );

    if (!store) {

        return;

    }

    store.data[property] =

        value;

    notify(

        store

    );

}

// ============================================================================
// LOADING
// ============================================================================

export function setLoading(

    name,

    value

) {

    const store =

        getState(

            name

        );

    if (!store) {

        return;

    }

    store.loading =

        Boolean(

            value

        );

    notify(

        store

    );

}

// ============================================================================
// SELEÇÃO
// ============================================================================

export function setSelected(

    name,

    registro

) {

    const store =

        getState(

            name

        );

    if (!store) {

        return;

    }

    store.selected =

        registro;

    notify(

        store

    );

}

// ============================================================================
// EDIÇÃO
// ============================================================================

export function setEditing(

    name,

    registro

) {

    const store =

        getState(

            name

        );

    if (!store) {

        return;

    }

    store.editing =

        registro;

    notify(

        store

    );

}

// ============================================================================
// RESET
// ============================================================================

export function reset(

    name

) {

    const store =

        getState(

            name

        );

    if (!store) {

        return;

    }

    store.data = {};

    store.selected = null;

    store.editing = null;

    store.loading = false;

    notify(

        store

    );

}

// ============================================================================
// DESTRUIR
// ============================================================================

export function destroyState(

    name

) {

    stores.delete(

        name

    );

}

// ============================================================================
// SUBSCRIBE
// ============================================================================

export function subscribe(

    name,

    callback

) {

    const store =

        getState(

            name

        );

    if (!store) {

        return;

    }

    store.listeners.add(

        callback

    );

}

// ============================================================================
// UNSUBSCRIBE
// ============================================================================

export function unsubscribe(

    name,

    callback

) {

    const store =

        getState(

            name

        );

    if (!store) {

        return;

    }

    store.listeners.delete(

        callback

    );

}

// ============================================================================
// NOTIFY
// ============================================================================

function notify(

    store

) {

    store.listeners.forEach(

        listener =>

            listener(

                store

            )

    );

}

// ============================================================================
// EXISTE
// ============================================================================

export function hasState(

    name

) {

    return stores.has(

        name

    );

}

// ============================================================================
// LISTAR
// ============================================================================

export function getStates() {

    return [

        ...stores.values()

    ];

}

// ============================================================================
// LIMPAR TODOS
// ============================================================================

export function clearStates() {

    stores.clear();

}

/*


Exemplo de uso
Veículos
createState({

    name: "veiculos",

    state: {

        registros: [],

        registroEditando: null,

        carregando: false

    }

});
Alterando
set(

    "veiculos",

    "registros",

    lista

);
Lendo
const registros =

    get(

        "veiculos",

        "registros"

    );
Observando
subscribe(

    "veiculos",

    estado => {

        renderTable(

            tabela,

            {

                columns: COLUNAS,

                data:

                    estado.registros

            }

        );

    }

);   */
