// ============================================================================
// CARDS COMPONENT
// Painel Frota
// Arquivo: js/components/cards.js
// Responsável pela renderização de Cards.
// ============================================================================

import {

    createElement,

    append,

    clear,

    destroy,

    getCache,

    setCache,

    removeCache

} from "./engine.js";

// ============================================================================
// CACHE
// ============================================================================

const cardsCache = new WeakMap();

// ============================================================================
// CRIAR CONTAINER
// ============================================================================

export function createCards({

    render,

    actions = []

} = {}) {

    const container =

        createElement(

            "div",

            {

                className:

                    "cards"

            }

        );

    return {

        container,

        render,

        actions,

        cards:

            new Map()

    };

}

// ============================================================================
// RENDER
// ============================================================================

export function renderCards(

    element,

    options

) {

    if (!element) {

        return;

    }

    let instancia =

        cardsCache.get(element);

    if (!instancia) {

        instancia =

            createCards(options);

        cardsCache.set(

            element,

            instancia

        );

        element.replaceChildren(

            instancia.container

        );

    }

    refreshCards(

        element,

        options.data ?? []

    );

}

// ============================================================================
// REFRESH
// ============================================================================

export function refreshCards(

    element,

    data = []

) {

    const instancia =

        cardsCache.get(element);

    if (!instancia) {

        return;

    }

    const existentes =

        new Set();

    data.forEach(item => {

        existentes.add(

            item.ID

        );

        if (

            instancia.cards.has(item.ID)

        ) {

            updateCard(

                element,

                item

            );

        }

        else {

            addCard(

                element,

                item

            );

        }

    });

    [...instancia.cards.keys()]

        .forEach(id => {

            if (

                !existentes.has(id)

            ) {

                removeCard(

                    element,

                    id

                );

            }

        });

}

// ============================================================================
// ADICIONAR
// ============================================================================

export function addCard(

    element,

    registro

) {

    const instancia =

        cardsCache.get(element);

    if (!instancia) {

        return;

    }

    const card =

        instancia.render(

            registro

        );

    card.dataset.id =

        registro.ID;

    instancia.cards.set(

        registro.ID,

        card

    );

    append(

        instancia.container,

        card

    );

}

// ============================================================================
// UPDATE
// ============================================================================

export function updateCard(

    element,

    registro

) {

    const instancia =

        cardsCache.get(element);

    if (!instancia) {

        return;

    }

    const antigo =

        instancia.cards.get(

            registro.ID

        );

    if (!antigo) {

        addCard(

            element,

            registro

        );

        return;

    }

    const novo =

        instancia.render(

            registro

        );

    novo.dataset.id =

        registro.ID;

    antigo.replaceWith(

        novo

    );

    instancia.cards.set(

        registro.ID,

        novo

    );

}

// ============================================================================
// REMOVER
// ============================================================================

export function removeCard(

    element,

    id

) {

    const instancia =

        cardsCache.get(element);

    if (!instancia) {

        return;

    }

    const card =

        instancia.cards.get(id);

    if (!card) {

        return;

    }

    destroy(card);

    instancia.cards.delete(id);

}

// ============================================================================
// LIMPAR
// ============================================================================

export function clearCards(

    element

) {

    const instancia =

        cardsCache.get(element);

    if (!instancia) {

        return;

    }

    clear(

        instancia.container

    );

    instancia.cards.clear();

}

// ============================================================================
// DESTRUIR
// ============================================================================

export function destroyCards(

    element

) {

    const instancia =

        cardsCache.get(element);

    if (!instancia) {

        return;

    }

    destroy(

        instancia.container

    );

    instancia.cards.clear();

    cardsCache.delete(

        element

    );

}
