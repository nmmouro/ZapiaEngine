// ============================================================================
// KANBAN COMPONENT
// Painel Frota
// Arquivo: js/components/kanban.js
// ============================================================================

import {

    createElement,
    append,
    clear,
    destroy

} from "./engine.js";

// ============================================================================
// CACHE
// ============================================================================

const boards = new WeakMap();

// ============================================================================
// CRIAR BOARD
// ============================================================================

export function createKanban({

    columns = [],

    onCardClick = null,

    onMove = null

} = {}) {

    const board =

        createElement(

            "div",

            {

                className: "kanban"

            }

        );

    return {

        board,

        columns,

        cards: new Map(),

        onCardClick,

        onMove

    };

}

// ============================================================================
// RENDER
// ============================================================================

export function renderKanban(

    container,

    options = {}

) {

    if (!container) {

        return;

    }

    let instance =

        boards.get(container);

    if (!instance) {

        instance =

            createKanban(options);

        boards.set(

            container,

            instance

        );

        container.replaceChildren(

            instance.board

        );

    }

    refreshKanban(

        container,

        options.columns

    );

}

// ============================================================================
// REFRESH
// ============================================================================

export function refreshKanban(

    container,

    columns = []

) {

    const instance =

        boards.get(container);

    if (!instance) {

        return;

    }

    instance.columns = columns;

    clear(

        instance.board

    );

    instance.cards.clear();

    columns.forEach(coluna => {

        instance.board.appendChild(

            createColumn(

                instance,

                coluna

            )

        );

    });

}

// ============================================================================
// COLUNA
// ============================================================================

function createColumn(

    instance,

    coluna

) {

    const column =

        createElement(

            "div",

            {

                className:

                    "kanban-column"

            }

        );

    const header =

        createElement(

            "div",

            {

                className:

                    "kanban-header",

                text:

                    coluna.title

            }

        );

    const body =

        createElement(

            "div",

            {

                className:

                    "kanban-body"

            }

        );

    coluna.cards.forEach(card => {

        body.appendChild(

            createCard(

                instance,

                card

            )

        );

    });

    append(

        column,

        header,

        body

    );

    return column;

}

// ============================================================================
// CARD
// ============================================================================

function createCard(

    instance,

    card

) {

    const div =

        createElement(

            "div",

            {

                className:

                    "kanban-card"

            }

        );

    div.dataset.id =

        card.ID;

    div.innerHTML = `

        <div class="kanban-title">

            ${card.titulo ?? ""}

        </div>

        <div class="kanban-subtitle">

            ${card.subtitulo ?? ""}

        </div>

        <div class="kanban-description">

            ${card.descricao ?? ""}

        </div>

    `;

    div.addEventListener(

        "click",

        () =>

            instance.onCardClick?.(

                card

            )

    );

    instance.cards.set(

        card.ID,

        div

    );

    return div;

}

// ============================================================================
// ADICIONAR CARD
// ============================================================================

export function addCard(

    container,

    colunaId,

    card

) {

    const board =

        boards.get(container);

    if (!board) {

        return;

    }

    const coluna =

        board.board.querySelector(

            `.kanban-column[data-id="${colunaId}"] .kanban-body`

        );

    if (!coluna) {

        return;

    }

    coluna.appendChild(

        createCard(

            board,

            card

        )

    );

}

// ============================================================================
// ATUALIZAR CARD
// ============================================================================

export function updateCard(

    container,

    card

) {

    const board =

        boards.get(container);

    if (!board) {

        return;

    }

    const antigo =

        board.cards.get(card.ID);

    if (!antigo) {

        return;

    }

    const novo =

        createCard(

            board,

            card

        );

    antigo.replaceWith(

        novo

    );

}

// ============================================================================
// REMOVER CARD
// ============================================================================

export function removeCard(

    container,

    id

) {

    const board =

        boards.get(container);

    if (!board) {

        return;

    }

    const card =

        board.cards.get(id);

    if (!card) {

        return;

    }

    card.remove();

    board.cards.delete(id);

}

// ============================================================================
// MOVER CARD
// ============================================================================

export function moveCard(

    container,

    id,

    colunaDestino

) {

    const board =

        boards.get(container);

    if (!board) {

        return;

    }

    const card =

        board.cards.get(id);

    if (!card) {

        return;

    }

    const destino =

        board.board.querySelector(

            `.kanban-column[data-id="${colunaDestino}"] .kanban-body`

        );

    if (!destino) {

        return;

    }

    destino.appendChild(card);

    board.onMove?.(

        id,

        colunaDestino

    );

}

// ============================================================================
// LIMPAR
// ============================================================================

export function clearKanban(

    container

) {

    const board =

        boards.get(container);

    if (!board) {

        return;

    }

    clear(board.board);

    board.cards.clear();

}

// ============================================================================
// DESTRUIR
// ============================================================================

export function destroyKanban(

    container

) {

    const board =

        boards.get(container);

    if (!board) {

        return;

    }

    destroy(board.board);

    boards.delete(container);

}




/*

    Estrutura=======================

const board = {

    columns: [

        {

            id: "aberto",

            title: "Em andamento",

            cards: [

                {

                    ID: "LAN0001",

                    titulo: "TXJ6F20",

                    subtitulo: "NEI / 5000199",

                    descricao: "Viagem Curitiba",

                    status: "ABERTO"

                }

            ]

        },

        {

            id: "fechado",

            title: "Finalizados",

            cards: []

        }

    ]

};
