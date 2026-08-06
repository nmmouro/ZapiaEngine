// ============================================================================
// ENGINE
// Painel Frota
// Arquivo: js/engine/engine.js
// Núcleo comum para todos os componentes.
// ============================================================================

// ============================================================================
// CRIAR ELEMENTO
// ============================================================================

export function createElement(

    tag,

    options = {}

) {

    const element =

        document.createElement(

            tag

        );

    aplicarOpcoes(

        element,

        options

    );

    return element;

}

// ============================================================================
// APLICAR OPÇÕES
// ============================================================================

export function aplicarOpcoes(

    element,

    options = {}

) {

    if (!element) {

        return element;

    }

    Object.entries(options).forEach(

        ([chave, valor]) => {

            if (

                valor === undefined ||

                valor === null

            ) {

                return;

            }

            switch (chave) {

                case "className":

                    element.className =

                        valor;

                    break;

                case "text":

                    element.textContent =

                        valor;

                    break;

                case "html":

                    element.innerHTML =

                        valor;

                    break;

                case "style":

                    Object.assign(

                        element.style,

                        valor

                    );

                    break;

                case "dataset":

                    Object.assign(

                        element.dataset,

                        valor

                    );

                    break;

                default:

                    if (

                        chave.startsWith("on") &&

                        typeof valor === "function"

                    ) {

                        element.addEventListener(

                            chave.substring(2),

                            valor

                        );

                    }

                    else {

                        element[chave] =

                            valor;

                    }

            }

        }

    );

    return element;

}

// ============================================================================
// APPEND
// ============================================================================

export function append(

    parent,

    ...children

) {

    if (!parent) {

        return;

    }

    children

        .flat()

        .filter(Boolean)

        .forEach(

            child =>

                parent.appendChild(

                    child

                )

        );

}

// ============================================================================
// PREPEND
// ============================================================================

export function prepend(

    parent,

    child

) {

    if (

        parent &&

        child

    ) {

        parent.prepend(

            child

        );

    }

}

// ============================================================================
// LIMPAR
// ============================================================================

export function clear(

    element

) {

    if (

        element

    ) {

        element.replaceChildren();

    }

}

// ============================================================================
// REMOVER
// ============================================================================

export function remove(

    element

) {

    element?.remove();

}

// ============================================================================
// DESTRUIR
// ============================================================================

export function destroy(

    element

) {

    if (!element) {

        return;

    }

    clear(

        element

    );

    remove(

        element

    );

}

// ============================================================================
// MOSTRAR
// ============================================================================

export function show(

    element

) {

    if (

        element

    ) {

        element.hidden = false;

    }

}

// ============================================================================
// OCULTAR
// ============================================================================

export function hide(

    element

) {

    if (

        element

    ) {

        element.hidden = true;

    }

}

// ============================================================================
// TOGGLE
// ============================================================================

export function toggle(

    element,

    visible

) {

    if (

        visible

    ) {

        show(

            element

        );

    }

    else {

        hide(

            element

        );

    }

}

// ============================================================================
// ATRIBUTOS
// ============================================================================

export function attr(

    element,

    name,

    value

) {

    if (!element) {

        return;

    }

    if (

        value === undefined

    ) {

        return element.getAttribute(

            name

        );

    }

    element.setAttribute(

        name,

        value

    );

}

// ============================================================================
// CLASSES
// ============================================================================

export function addClass(

    element,

    ...classes

) {

    element?.classList.add(

        ...classes

    );

}

export function removeClass(

    element,

    ...classes

) {

    element?.classList.remove(

        ...classes

    );

}

export function toggleClass(

    element,

    classe,

    force

) {

    element?.classList.toggle(

        classe,

        force

    );

}

export function hasClass(

    element,

    classe

) {

    return element?.classList.contains(

        classe

    );

}

// ============================================================================
// EVENTOS
// ============================================================================

export function on(

    element,

    evento,

    callback,

    options

) {

    element?.addEventListener(

        evento,

        callback,

        options

    );

}

export function off(

    element,

    evento,

    callback,

    options

) {

    element?.removeEventListener(

        evento,

        callback,

        options

    );

}

// ============================================================================
// QUERY
// ============================================================================

export function $(

    selector,

    root = document

) {

    return root.querySelector(

        selector

    );

}

export function $$(

    selector,

    root = document

) {

    return [

        ...root.querySelectorAll(

            selector

        )

    ];

}

// ============================================================================
// UUID
// ============================================================================

export function uuid() {

    if (

        crypto?.randomUUID

    ) {

        return crypto.randomUUID();

    }

    return "id-" +

        Date.now() +

        "-" +

        Math.random()

            .toString(36)

            .slice(2);

}
