// ============================================================================
// GRID COMPONENT
// Painel Frota
// Arquivo: js/components/grid.js
// ============================================================================

import {

    createElement,
    clear,
    destroy

} from "./engine.js";

// ============================================================================
// CACHE
// ============================================================================

const grids = new WeakMap();

// ============================================================================
// CRIAR GRID
// ============================================================================

export function createGrid({

    columns = 4,

    gap = "16px",

    data = []

} = {}) {

    const grid =

        createElement(

            "div",

            {

                className:

                    "grid"

            }

        );

    grid.style.gridTemplateColumns =

        `repeat(${columns},1fr)`;

    grid.style.gap = gap;

    return {

        grid,

        columns,

        gap,

        data,

        items:

            new Map()

    };

}

/*
Render================================


export function renderGrid(

    container,

    options = {}

) {

    if (!container) {

        return;

    }

    let instance =

        grids.get(container);

    if (!instance) {

        instance =

            createGrid(options);

        grids.set(

            container,

            instance

        );

        container.replaceChildren(

            instance.grid

        );

    }

    refreshGrid(

        container,

        options.data

    );

}


Refresh===========================================

export function refreshGrid(

    container,

    data = []

) {

    const instance =

        grids.get(container);

    if (!instance) {

        return;

    }

    instance.data = data;

    clear(

        instance.grid

    );

    instance.items.clear();

    data.forEach(item=>{

        instance.grid.appendChild(

            createItem(

                instance,

                item

            )

        );

    });

}

Criar Item===================================


function createItem(

    instance,

    item

) {

    const div =

        createElement(

            "div",

            {

                className:

                    "grid-item"

            }

        );

    div.dataset.id =

        item.ID;

    if (

        item.html

    ) {

        div.innerHTML =

            item.html;

    }

    instance.items.set(

        item.ID,

        div

    );

    return div;

}


Adicionar===================================

export function addItem(

    container,

    item

) {

    const instance =

        grids.get(container);

    if (!instance) {

        return;

    }

    instance.data.push(item);

    instance.grid.appendChild(

        createItem(

            instance,

            item

        )

    );

}


Atualizar===================================


export function updateItem(

    container,

    item

) {

    const instance =

        grids.get(container);

    if (!instance) {

        return;

    }

    const antigo =

        instance.items.get(

            item.ID

        );

    if (!antigo) {

        return;

    }

    const novo =

        createItem(

            instance,

            item

        );

    antigo.replaceWith(

        novo

    );

}


Remover=================================================


export function removeItem(

    container,

    id

) {

    const instance =

        grids.get(container);

    if (!instance) {

        return;

    }

    const item =

        instance.items.get(id);

    if (!item) {

        return;

    }

    item.remove();

    instance.items.delete(id);

}

Consulta==========================


export function getItem(

    container,

    id

) {

    return grids

        .get(container)

        ?.data

        .find(

            item=>item.ID===id

        );

}

export function getItems(

    container

) {

    return grids

        .get(container)

        ?.data ?? [];

}


Limpar==============================================


export function clearGrid(

    container

) {

    const instance =

        grids.get(container);

    if (!instance) {

        return;

    }

    clear(

        instance.grid

    );

    instance.items.clear();

}



Destruir==============================================

export function destroyGrid(

    container

) {

    const instance =

        grids.get(container);

    if (!instance) {

        return;

    }

    destroy(

        instance.grid

    );

    grids.delete(

        container

    );

}

*/


