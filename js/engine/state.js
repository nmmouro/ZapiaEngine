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

const stores =

    new Map();

// ============================================================================
// CRIAR ESTADO
// ============================================================================

export function createState(config = {}){


    const name =
        config.name;


    if(!name){

        throw new Error(
            "Nome do estado não informado."
        );

    }


    return {

        name,

        entity:
            config.entity,


        data:[],

        selected:null,

        editing:null,

        loading:false

    };


}
// ============================================================================
// OBTER ESTADO
// ============================================================================

export function getState(

    name

) {

    return stores.get(name);

}

// ============================================================================
// DEFINIR VALOR
// ============================================================================

export function setState(

    name,

    values

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
// LER VALOR
// ============================================================================

export function state(

    name

) {

    return getState(

        name

    )?.data;

}

// ============================================================================
// GET
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
// SET
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

    Object.keys(

        store.data

    ).forEach(

        chave =>

            delete store.data[chave]

    );

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
// OBSERVAR
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
// REMOVER OBSERVADOR
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
// NOTIFICAR
// ============================================================================

function notify(

    store

) {

    store.listeners.forEach(

        listener =>

            listener(

                store.data

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
