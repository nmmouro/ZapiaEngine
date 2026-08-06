// ============================================================================
// MODAL COMPONENT
// Painel Frota
// Arquivo: js/components/modal.js
// Responsável pela criação dinâmica de janelas modais.
// ============================================================================

import {

    createElement,

    append,

    clear,

    destroy,

    setCache,

    getCache,

    removeCache

} from "./engine.js";

// ============================================================================
// CRIAR MODAL
// ============================================================================

export function createModal({

    title = "",

    content = null,

    footer = null,

    closeOnOverlay = true

} = {}) {

    const overlay =

        createElement(

            "div",

            {

                className:

                    "modal-overlay"

            }

        );

    const modal =

        createElement(

            "div",

            {

                className:

                    "modal"

            }

        );

    const header =

        createHeader(

            title

        );

    const body =

        createElement(

            "div",

            {

                className:

                    "modal-body"

            }

        );

    const footerDiv =

        createElement(

            "div",

            {

                className:

                    "modal-footer"

            }

        );

    if (content) {

        append(

            body,

            content

        );

    }

    if (footer) {

        append(

            footerDiv,

            footer

        );

    }

    append(

        modal,

        header,

        body,

        footerDiv

    );

    append(

        overlay,

        modal

    );

    if (closeOnOverlay) {

        overlay.addEventListener(

            "click",

            evento => {

                if (

                    evento.target ===

                    overlay

                ) {

                    closeModal(

                        overlay.parentNode

                    );

                }

            }

        );

    }

    return {

        overlay,

        modal,

        header,

        body,

        footer: footerDiv

    };

}

// ============================================================================
// HEADER
// ============================================================================

function createHeader(

    titulo

) {

    const header =

        createElement(

            "div",

            {

                className:

                    "modal-header"

            }

        );

    const title =

        createElement(

            "h2",

            {

                text:

                    titulo

            }

        );

    const button =

        createElement(

            "button",

            {

                className:

                    "modal-close",

                text:

                    "✕

            }

        );

    header.append(

        title,

        button

    );

    return header;

}

// ============================================================================
// RENDER
// ============================================================================

export function renderModal(

    container,

    options

) {

    if (!container) {

        return;

    }

    let modal =

        getCache(

            container

        );

    if (!modal) {

        modal =

            createModal(

                options

            );

        setCache(

            container,

            modal

        );

        container.appendChild(

            modal.overlay

        );

        modal

            .header

            .querySelector(

                ".modal-close"

            )

            .addEventListener(

                "click",

                () =>

                    closeModal(

                        container

                    )

            );

    }

}

// ============================================================================
// ABRIR
// ============================================================================

export function openModal(

    container

) {

    const modal =

        getCache(

            container

        );

    if (!modal) {

        return;

    }

    modal.overlay.style.display =

        "flex";

}

// ============================================================================
// FECHAR
// ============================================================================

export function closeModal(

    container

) {

    const modal =

        getCache(

            container

        );

    if (!modal) {

        return;

    }

    modal.overlay.style.display =

        "none";

}

// ============================================================================
// ALTERAR TÍTULO
// ============================================================================

export function setTitle(

    container,

    titulo

) {

    const modal =

        getCache(

            container

        );

    if (!modal) {

        return;

    }

    modal.header.querySelector(

        "h2"

    ).textContent =

        titulo;

}

// ============================================================================
// ALTERAR CONTEÚDO
// ============================================================================

export function setContent(

    container,

    elemento

) {

    const modal =

        getCache(

            container

        );

    if (!modal) {

        return;

    }

    clear(

        modal.body

    );

    if (elemento) {

        modal.body.appendChild(

            elemento

        );

    }

}

// ============================================================================
// ABERTO
// ============================================================================

export function isOpen(

    container

) {

    const modal =

        getCache(

            container

        );

    if (!modal) {

        return false;

    }

    return (

        modal.overlay.style.display ===

        "flex"

    );

}

// ============================================================================
// DESTRUIR
// ============================================================================

export function destroyModal(

    container

) {

    const modal =

        getCache(

            container

        );

    if (!modal) {

        return;

    }

    destroy(

        modal.overlay

    );

    removeCache(

        container

    );

}
