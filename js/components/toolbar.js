// ============================================================================
// TOOLBAR COMPONENT
// Painel Frota
// Arquivo: js/components/toolbar.js
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

const toolbars = new WeakMap();

// ============================================================================
// CRIAR
// ============================================================================

export function createToolbar() {

    const toolbar =

        createElement(

            "div",

            {

                className:

                    "toolbar"

            }

        );

    const left =

        createElement(

            "div",

            {

                className:

                    "toolbar-left"

            }

        );

    const center =

        createElement(

            "div",

            {

                className:

                    "toolbar-center"

            }

        );

    const right =

        createElement(

            "div",

            {

                className:

                    "toolbar-right"

            }

        );

    append(

        toolbar,

        left,

        center,

        right

    );

    return {

        toolbar,

        left,

        center,

        right,

        buttons:new Map()

    };

}

// ============================================================================
// RENDER
// ============================================================================

export function renderToolbar(

    container,

    options={}

){

    if(!container){

        return;

    }

    let instancia =

        toolbars.get(container);

    if(!instancia){

        instancia=

            createToolbar();

        toolbars.set(

            container,

            instancia

        );

        container.replaceChildren(

            instancia.toolbar

        );

    }

    refreshToolbar(

        container,

        options

    );

}

/*


renderToolbar(

    toolbar,

    {

        left:[

            {

                id:"novo",

                icon:"➕",

                label:"Novo",

                onClick:novoRegistro

            },

            {

                id:"salvar",

                icon:"💾",

                label:"Salvar",

                onClick:salvarRegistro

            }

        ],

        center:[

            {

                type:"search",

                placeholder:"Pesquisar..."

            }

        ],

        right:[

            {

                id:"refresh",

                icon:"🔄",

                onClick:carregarTabela

            }

        ]

    }

);


*/

// ============================================================================
// REFRESH
// ============================================================================

export function refreshToolbar(

    container,

    {

        left=[],

        center=[],

        right=[]

    }

){

    const instancia=

        toolbars.get(container);

    if(!instancia){

        return;

    }

    clear(instancia.left);

    clear(instancia.center);

    clear(instancia.right);

    left.forEach(

        item=>

            instancia.left.appendChild(

                createControl(

                    instancia,

                    item

                )

            )

    );

    center.forEach(

        item=>

            instancia.center.appendChild(

                createControl(

                    instancia,

                    item

                )

            )

    );

    right.forEach(

        item=>

            instancia.right.appendChild(

                createControl(

                    instancia,

                    item

                )

            )

    );

}

// ============================================================================
// CONTROLE
// ============================================================================

function createControl(

    instancia,

    config

){

    if(

        config.type==="search"

    ){

        const input=

            createElement(

                "input",

                {

                    className:

                        "toolbar-search"

                }

            );

        input.placeholder=

            config.placeholder??

            "";

        input.addEventListener(

            "input",

            e=>

                config.onInput?.(

                    e.target.value

                )

        );

        return input;

    }

    const button=

        createElement(

            "button",

            {

                className:

                    "toolbar-button"

            }

        );

    button.dataset.id=

        config.id;

    button.innerHTML=

        (config.icon??"")+

        " "+

        (config.label??"");

    if(

        config.disabled

    ){

        button.disabled=true;

    }

    if(

        config.onClick

    ){

        button.addEventListener(

            "click",

            config.onClick

        );

    }

    instancia.buttons.set(

        config.id,

        button

    );

    return button;

}

// ============================================================================
// ENABLE
// ============================================================================

export function enableButton(

    container,

    id

){

    const toolbar = toolbars.get(container);


    if(!toolbar){

        return;

    }


    const button = toolbar.buttons.get(id);


    if(!button){

        return;

    }


    button.disabled = false;

}

// ============================================================================
// DISABLE
// ============================================================================

export function disableButton(

    container,

    id

){

    const toolbar = toolbars.get(container);


    if(!toolbar){

        return;

    }


    const button = toolbar.buttons.get(id);


    if(!button){

        return;

    }


    button.disabled = true;

}

// ============================================================================
// SHOW
// ============================================================================

export function showButton(

    container,

    id

){


    const toolbar = toolbars.get(container);


    if(!toolbar){

        return;

    }


    const button = toolbar.buttons.get(id);


    if(!button){

        return;

    }


    button.style.display = "";


}

// ============================================================================
// HIDE
// ============================================================================

export function hideButton(

    container,

    id

){


    const toolbar = toolbars.get(container);


    if(!toolbar){

        return;

    }


    const button = toolbar.buttons.get(id);


    if(!button){

        return;

    }


    button.style.display = "none";


}

// ============================================================================
// REMOVER
// ============================================================================

export function removeButton(

    container,

    id

){

    const botao=

        toolbars

        .get(container)

        ?.buttons

        .get(id);

    if(!botao){

        return;

    }

    botao.remove();

}

// ============================================================================
// DESTRUIR
// ============================================================================

export function destroyToolbar(

    container

){

    const instancia=

        toolbars.get(container);

    if(!instancia){

        return;

    }

    destroy(

        instancia.toolbar

    );

    removeCache(

        container

    );

    toolbars.delete(

        container

    );

}
