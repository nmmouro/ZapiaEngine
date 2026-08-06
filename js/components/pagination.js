// ============================================================================
// PAGINATION COMPONENT
// Painel Frota
// Arquivo: js/components/pagination.js
// Responsável pela paginação genérica.
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

const paginations = new WeakMap();

// ============================================================================
// CRIAR
// ============================================================================

export function createPagination({

    page = 1,

    pageSize = 10,

    total = 0,

    onChange = null

} = {}) {

    const container =

        createElement(

            "div",

            {

                className:

                    "pagination"

            }

        );

    return {

        container,

        page,

        pageSize,

        total,

        onChange

    };

}

// ============================================================================
// RENDER
// ============================================================================

export function renderPagination(

    element,

    options = {}

) {

    if (!element) {

        return;

    }

    let pagination =

        paginations.get(element);

    if (!pagination) {

        pagination =

            createPagination(options);

        paginations.set(

            element,

            pagination

        );

        element.replaceChildren(

            pagination.container

        );

    }

    refreshPagination(

        element,

        options

    );

}

// ============================================================================
// REFRESH
// ============================================================================

export function refreshPagination(

    element,

    options = {}

) {

    const pagination =

        paginations.get(element);

    if (!pagination) {

        return;

    }

    Object.assign(

        pagination,

        options

    );

    draw(

        pagination

    );

}

// ============================================================================
// DESENHAR
// ============================================================================

function draw(

    pagination

) {

    clear(

        pagination.container

    );

    const totalPages =

        Math.max(

            1,

            Math.ceil(

                pagination.total /

                pagination.pageSize

            )

        );

    append(

        pagination.container,

        button("«",

            () => first(pagination),

            pagination.page === 1
        ),

        button("‹",

            () => previous(pagination),

            pagination.page === 1
        ),

        info(

            pagination.page,

            totalPages

        ),

        button("›",

            () => next(pagination),

            pagination.page >= totalPages
        ),

        button("»",

            () => last(pagination),

            pagination.page >= totalPages
        )

    );

}

// ============================================================================
// BOTÃO
// ============================================================================

function button(

    texto,

    callback,

    disabled = false

) {

    const bt =

        createElement(

            "button",

            {

                className:

                    "pagination-button",

                text:

                    texto

            }

        );

    bt.disabled =

        disabled;

    bt.onclick =

        callback;

    return bt;

}

// ============================================================================
// INFO
// ============================================================================

function info(

    pagina,

    total

) {

    return createElement(

        "span",

        {

            className:

                "pagination-info",

            text:

                `Página ${pagina} de ${total}`

        }

    );

}

// ============================================================================
// NAVEGAÇÃO
// ============================================================================

function next(p){

    set(p,p.page+1);

}

function previous(p){

    set(p,p.page-1);

}

function first(p){

    set(p,1);

}

function last(p){

    set(

        p,

        Math.ceil(

            p.total /

            p.pageSize

        )

    );

}

function set(

    pagination,

    page

){

    const totalPages =

        Math.max(

            1,

            Math.ceil(

                pagination.total /

                pagination.pageSize

            )

        );

    page =

        Math.min(

            totalPages,

            Math.max(1,page)

        );

    if (

        page ===

        pagination.page

    ){

        return;

    }

    pagination.page =

        page;

    draw(

        pagination

    );

    pagination.onChange?.(

        page,

        pagination.pageSize

    );

}

// ============================================================================
// API
// ============================================================================

export function nextPage(container){

    next(

        paginations.get(container)

    );

}

export function previousPage(container){

    previous(

        paginations.get(container)

    );

}

export function firstPage(container){

    first(

        paginations.get(container)

    );

}

export function lastPage(container){

    last(

        paginations.get(container)

    );

}

export function setPage(

    container,

    page

){

    set(

        paginations.get(container),

        page

    );

}

export function getPage(container){

    return paginations

        .get(container)

        ?.page ?? 1;

}

// ============================================================================
// DESTRUIR
// ============================================================================

export function destroyPagination(

    container

){

    const pagination =

        paginations.get(container);

    if(!pagination){

        return;

    }

    destroy(

        pagination.container

    );

    removeCache(

        container

    );

    paginations.delete(

        container

    );

}
