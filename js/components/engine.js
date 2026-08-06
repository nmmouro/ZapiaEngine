// ============================================================================
// ENGINE
// Painel Frota
// Arquivo: js/components/engine.js
// Biblioteca base utilizada por todos os componentes.
// ============================================================================

// ============================================================================
// CACHE
// ============================================================================

const cache = new WeakMap();

// ============================================================================
// CACHE
// ============================================================================

export function setCache(

    container,

    instancia

) {

    cache.set(

        container,

        instancia

    );

}

export function getCache(

    container

) {

    return cache.get(

        container

    );

}

export function removeCache(

    container

) {

    cache.delete(

        container

    );

}

// ============================================================================
// ELEMENTO
// ============================================================================

export function createElement(

    tag,

    {

        className,

        id,

        text,

        html,

        attributes = {},

        dataset = {}

    } = {}

) {

    const elemento =

        document.createElement(tag);

    if (className) {

        elemento.className =

            className;

    }

    if (id) {

        elemento.id =

            id;

    }

    if (text !== undefined) {

        elemento.textContent =

            text;

    }

    if (html !== undefined) {

        elemento.innerHTML =

            html;

    }

    Object.entries(attributes)

        .forEach(

            ([nome, valor]) =>

                elemento.setAttribute(

                    nome,

                    valor

                )

        );

    Object.entries(dataset)

        .forEach(

            ([nome, valor]) =>

                elemento.dataset[nome] =

                    valor

        );

    return elemento;

}

// ============================================================================
// APPEND
// ============================================================================

export function append(

    parent,

    ...children

) {

    children

        .flat()

        .forEach(

            child => {

                if (child) {

                    parent.appendChild(child);

                }

            }

        );

}

// ============================================================================
// CLEAR
// ============================================================================

export function clear(

    element

) {

    element.replaceChildren();

}

// ============================================================================
// DESTROY
// ============================================================================

export function destroy(

    element

) {

    if (

        element?.parentNode

    ) {

        element.remove();

    }

}

// ============================================================================
// EVENTOS
// ============================================================================

export function on(

    element,

    event,

    callback

) {

    element.addEventListener(

        event,

        callback

    );

}

// ============================================================================
// ATRIBUTOS
// ============================================================================

export function updateAttributes(

    element,

    attributes = {}

) {

    Object.entries(attributes)

        .forEach(

            ([nome, valor]) => {

                if (

                    valor ===

                    undefined

                ) {

                    return;

                }

                element.setAttribute(

                    nome,

                    valor

                );

            }

        );

}

// ============================================================================
// DATASET
// ============================================================================

export function updateDataset(

    element,

    dataset = {}

) {

    Object.entries(dataset)

        .forEach(

            ([nome, valor]) => {

                element.dataset[nome] =

                    valor;

            }

        );

}

// ============================================================================
// DIFF
// ============================================================================

export function changed(

    antigo,

    novo

) {

    return JSON.stringify(

        antigo

    ) !==

    JSON.stringify(

        novo

    );

}

// ============================================================================
// CLONE
// ============================================================================

export function clone(

    objeto

) {

    return structuredClone(

        objeto

    );

}

// ============================================================================
// ID
// ============================================================================

export function uid(

    prefix = "id"

) {

    return (

        prefix +

        "_" +

        Math.random()

            .toString(36)

            .substring(2,10)

    );

}
