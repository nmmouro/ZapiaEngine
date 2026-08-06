// ============================================================================
// WINDOW COMPONENT
// Painel Frota
// Arquivo: js/components/window.js
// ============================================================================

import {

    createElement,
    append,
    destroy

} from "./engine.js";

// ============================================================================
// CACHE
// ============================================================================

const windows = new Map();

let zIndex = 1000;


/*

Criar Janela======================================


export function createWindow({

    id,

    title = "Janela",

    content = null,

    width = 800,

    height = 600,

    modal = false,

    resizable = true,

    draggable = true

} = {}) {

    if (!id) {

        id =

            crypto.randomUUID();

    }

    const window =

        createElement(

            "div",

            {

                className:

                    "window"

            }

        );

    window.dataset.id = id;

    window.style.width =

        width + "px";

    window.style.height =

        height + "px";

    window.style.zIndex =

        ++zIndex;

    const header =

        createHeader(

            id,

            title

        );

    const body =

        createElement(

            "div",

            {

                className:

                    "window-body"

            }

        );

    if (content) {

        body.appendChild(

            content

        );

    }

    window.append(

        header,

        body

    );

    document.body.appendChild(

        window

    );

    const instance = {

        id,

        window,

        header,

        body,

        modal,

        draggable,

        resizable,

        state: "normal"

    };

    windows.set(

        id,

        instance

    );

    if (draggable) {

        enableDrag(instance);

    }

    return instance;

}

Cabeçalho====================================


function createHeader(

    id,

    title

) {

    const header =

        createElement(

            "div",

            {

                className:

                    "window-header"

            }

        );

    header.innerHTML = `

        <span class="window-title">

            ${title}

        </span>

        <div class="window-buttons">

            <button data-action="minimize">─</button>

            <button data-action="maximize">□</button>

            <button data-action="close">✕</button>

        </div>

    `;

    header

        .querySelector(

            '[data-action="close"]'

        )

        .onclick = () =>

            closeWindow(id);

    header

        .querySelector(

            '[data-action="maximize"]'

        )

        .onclick = () =>

            maximizeWindow(id);

    header

        .querySelector(

            '[data-action="minimize"]'

        )

        .onclick = () =>

            minimizeWindow(id);

    return header;

}


Mostrar==================================================


export function showWindow(

    id

) {

    windows

        .get(id)

        ?.window

        .classList.remove(

            "hidden"

        );

}



Ocultar==========================================


export function hideWindow(

    id

) {

    windows

        .get(id)

        ?.window

        .classList.add(

            "hidden"

        );

}


Fechar=====================================================



export function closeWindow(

    id

) {

    const instance =

        windows.get(id);

    if (!instance) {

        return;

    }

    instance.window.remove();

    windows.delete(id);

}

Maximizar=====================================================


export function maximizeWindow(

    id

) {

    const instance =

        windows.get(id);

    if (!instance) {

        return;

    }

    instance.window.classList.toggle(

        "maximized"

    );

}


Minimizar=============================================================


export function minimizeWindow(

    id

) {

    const instance =

        windows.get(id);

    if (!instance) {

        return;

    }

    instance.window.classList.toggle(

        "minimized"

    );

}


Restaurar==========================================================


export function restoreWindow(

    id

) {

    const instance =

        windows.get(id);

    if (!instance) {

        return;

    }

    instance.window.classList.remove(

        "maximized",

        "minimized"

    );

}

Foco==================================================================


export function focusWindow(

    id

) {

    const instance =

        windows.get(id);

    if (!instance) {

        return;

    }

    instance.window.style.zIndex =

        ++zIndex;

}


Drag=====================================================


function enableDrag(

    instance

) {

    let x = 0;

    let y = 0;

    let left = 0;

    let top = 0;

    instance.header.onmousedown = e => {

        focusWindow(

            instance.id

        );

        x = e.clientX;

        y = e.clientY;

        left =

            instance.window.offsetLeft;

        top =

            instance.window.offsetTop;

        document.onmousemove = ev => {

            instance.window.style.left =

                left +

                (ev.clientX - x) +

                "px";

            instance.window.style.top =

                top +

                (ev.clientY - y) +

                "px";

        };

        document.onmouseup = () => {

            document.onmousemove = null;

            document.onmouseup = null;

        };

    };

}


Consultas====================================================================


export function getWindow(

    id

) {

    return windows.get(id);

}

export function getWindows() {

    return [

        ...windows.values()

    ];

}


Destruir=================================================


export function destroyWindow(

    id

) {

    closeWindow(id);

}


*/
