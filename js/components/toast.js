// ============================================================================
// TOAST COMPONENT
// Painel Frota
// Arquivo: js/components/toast.js
// ============================================================================

import {

    createElement,
    destroy

} from "./engine.js";

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const CONFIG = {

    duration: 3000,

    position: "top-right"

};

// ============================================================================
// ESTADO
// ============================================================================

let container = null;

const fila = [];

/*

Inicialização==============================


function init() {

    if (container) {

        return;

    }

    container =

        createElement(

            "div",

            {

                className:

                    `toast-container ${CONFIG.position}`

            }

        );

    document.body.appendChild(

        container

    );

}


Mostrar Toast===============================


export function showToast({

    type = "info",

    title = "",

    message = "",

    duration = CONFIG.duration

} = {}) {

    init();

    const toast =

        createToast({

            type,

            title,

            message

        });

    fila.push(toast);

    container.appendChild(

        toast

    );

    requestAnimationFrame(

        () =>

            toast.classList.add(

                "show"

            )

    );

    setTimeout(

        () =>

            removeToast(

                toast

            ),

        duration

    );

}

Criar Toast===============================

function createToast({

    type,

    title,

    message

}) {

    const div =

        createElement(

            "div",

            {

                className:

                    `toast toast-${type}`

            }

        );

    div.innerHTML = `

        <div class="toast-title">

            ${title}

        </div>

        <div class="toast-message">

            ${message}

        </div>

    `;

    return div;

}


Remover Toast=================================


function removeToast(

    toast

) {

    toast.classList.remove(

        "show"

    );

    setTimeout(

        () => {

            toast.remove();

        },

        300

    );

}


Atalhos========================================


export function success(

    message,

    title = "Sucesso"

) {

    showToast({

        type: "success",

        title,

        message

    });

}

export function error(

    message,

    title = "Erro"

) {

    showToast({

        type: "error",

        title,

        message

    });

}

export function warning(

    message,

    title = "Atenção"

) {

    showToast({

        type: "warning",

        title,

        message

    });

}

export function info(

    message,

    title = "Informação"

) {

    showToast({

        type: "info",

        title,

        message

    });

}


Limpar===============================

export function clearToasts() {

    if (!container) {

        return;

    }

    container.replaceChildren();

    fila.length = 0;

}


Destruir================================


export function destroyToasts() {

    if (!container) {

        return;

    }

    destroy(

        container

    );

    container = null;

    fila.length = 0;

}


Posição===============================================


export function setPosition(

    position

) {

    CONFIG.position =

        position;

    if (!container) {

        return;

    }

    container.className =

        `toast-container ${position}`;

}

*/




