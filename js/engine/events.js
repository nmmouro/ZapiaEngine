// ============================================================================
// EVENTS ENGINE
// Painel Frota
// Arquivo: js/engine/events.js
// Responsável pelo gerenciamento centralizado de eventos.
// ============================================================================

// ============================================================================
// CACHE
// ============================================================================

const listeners = new WeakMap();

const channels = new Map();

// ============================================================================
// EVENTOS DOM
// ============================================================================

export function on(

    element,

    event,

    callback,

    options

) {

    if (!element) {

        return;

    }

    element.addEventListener(

        event,

        callback,

        options

    );

    registrar(

        element,

        event,

        callback,

        options

    );

}

// ============================================================================
// REMOVER EVENTO
// ============================================================================

export function off(

    element,

    event,

    callback,

    options

) {

    if (!element) {

        return;

    }

    element.removeEventListener(

        event,

        callback,

        options

    );

    remover(

        element,

        event,

        callback

    );

}

// ============================================================================
// EXECUTAR UMA ÚNICA VEZ
// ============================================================================

export function once(

    element,

    event,

    callback

) {

    function handler(e) {

        off(

            element,

            event,

            handler

        );

        callback(e);

    }

    on(

        element,

        event,

        handler

    );

}

// ============================================================================
// DISPARAR EVENTO DOM
// ============================================================================

export function emit(

    element,

    event,

    detail = {}

) {

    if (!element) {

        return;

    }

    element.dispatchEvent(

        new CustomEvent(

            event,

            {

                detail,

                bubbles: true

            }

        )

    );

}

// ============================================================================
// REMOVER TODOS OS EVENTOS
// ============================================================================

export function removeAll(

    element

) {

    const eventos =

        listeners.get(

            element

        );

    if (!eventos) {

        return;

    }

    eventos.forEach(item => {

        element.removeEventListener(

            item.event,

            item.callback,

            item.options

        );

    });

    listeners.delete(

        element

    );

}

// ============================================================================
// REGISTRAR
// ============================================================================

function registrar(

    element,

    event,

    callback,

    options

) {

    if (

        !listeners.has(

            element

        )

    ) {

        listeners.set(

            element,

            []

        );

    }

    listeners

        .get(element)

        .push({

            event,

            callback,

            options

        });

}

// ============================================================================
// REMOVER
// ============================================================================

function remover(

    element,

    event,

    callback

) {

    const lista =

        listeners.get(

            element

        );

    if (!lista) {

        return;

    }

    const indice =

        lista.findIndex(

            item =>

                item.event === event &&

                item.callback === callback

        );

    if (

        indice >= 0

    ) {

        lista.splice(

            indice,

            1

        );

    }

}

// ============================================================================
// EVENT BUS
// ============================================================================

export function subscribe(

    canal,

    callback

) {

    if (

        !channels.has(

            canal

        )

    ) {

        channels.set(

            canal,

            new Set()

        );

    }

    channels

        .get(canal)

        .add(callback);

}

// ============================================================================
// REMOVER SUBSCRIÇÃO
// ============================================================================

export function unsubscribe(

    canal,

    callback

) {

    channels

        .get(canal)

        ?.delete(callback);

}

// ============================================================================
// PUBLICAR
// ============================================================================

export function publish(

    canal,

    payload

) {

    channels

        .get(canal)

        ?.forEach(

            callback =>

                callback(

                    payload

                )

        );

}

// ============================================================================
// LIMPAR CANAL
// ============================================================================

export function clearChannel(

    canal

) {

    channels.delete(

        canal

    );

}

// ============================================================================
// LIMPAR TODOS
// ============================================================================

export function clearEvents() {

    channels.clear();

}

// ============================================================================
// EXISTE CANAL
// ============================================================================

export function hasChannel(

    canal

) {

    return channels.has(

        canal

    );

}

// ============================================================================
// LISTAR CANAIS
// ============================================================================

export function getChannels() {

    return [

        ...channels.keys()

    ];

}


/*

Exemplo de utilização
Eventos do DOM
import {

    on,

    off

} from "../engine/events.js";

on(

    btnSalvar,

    "click",

    salvarRegistro

);

off(

    btnSalvar,

    "click",

    salvarRegistro

);
Eventos entre componentes (Event Bus)
import {

    publish,

    subscribe

} from "../engine/events.js";
Dashboard
subscribe(

    "veiculos:alterado",

    carregarDashboard

);
Veículos
publish(

    "veiculos:alterado",

    registro
);
Limpeza
removeAll(formulario);

clearChannel("dashboard");

clearEvents();


*/

