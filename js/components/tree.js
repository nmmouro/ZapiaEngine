// ============================================================================
// TREE COMPONENT
// Painel Frota
// Arquivo: js/components/tree.js
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

const trees = new WeakMap();

// ============================================================================
// CRIAR
// ============================================================================

export function createTree({

    data = [],

    onSelect = null,

    onToggle = null

} = {}) {

    const tree =

        createElement(

            "div",

            {

                className:

                    "tree"

            }

        );

    return {

        tree,

        data,

        selected:null,

        onSelect,

        onToggle

    };

}

// ============================================================================
// RENDER
// ============================================================================

export function renderTree(

    container,

    options = {}

){

    if(!container){

        return;

    }

    let instance =

        trees.get(container);

    if(!instance){

        instance =

            createTree(options);

        trees.set(

            container,

            instance

        );

        container.replaceChildren(

            instance.tree

        );

    }

    refreshTree(

        container,

        options.data

    );

}

// ============================================================================
// REFRESH
// ============================================================================

export function refreshTree(

    container,

    data = []

){

    const instance =

        trees.get(container);

    if(!instance){

        return;

    }

    instance.data = data;

    clear(instance.tree);

    data.forEach(node =>

        instance.tree.appendChild(

            createNode(

                instance,

                node,

                0

            )

        )

    );

}

// ============================================================================
// NÓ
// ============================================================================

function createNode(

    instance,

    node,

    level

){

    const wrapper =

        createElement(

            "div"

        );

    const row =

        createElement(

            "div",

            {

                className:

                    "tree-node"

            }

        );

    row.style.paddingLeft =

        `${level*20}px`;

    const arrow =

        createElement(

            "span",

            {

                className:

                    "tree-arrow",

                text:

                    node.children?.length

                    ? node.expanded

                        ? "▼"

                        : "▶"

                    : ""

            }

        );

    arrow.onclick =

        e=>{

            e.stopPropagation();

            node.expanded=

                !node.expanded;

            instance.onToggle?.(

                node

            );

            refreshTree(

                wrapper.closest(".tree").parentNode,

                instance.data

            );

        };

    const label =

        createElement(

            "span",

            {

                className:

                    "tree-label",

                text:

                    `${node.icon??""} ${node.label}`

            }

        );

    row.onclick=()=>{

        instance.selected=node.ID;

        instance.onSelect?.(

            node

        );

    };

    append(

        row,

        arrow,

        label

    );

    append(

        wrapper,

        row

    );

    if(

        node.expanded &&

        node.children?.length

    ){

        node.children.forEach(child=>{

            append(

                wrapper,

                createNode(

                    instance,

                    child,

                    level+1

                )

            );

        });

    }

    return wrapper;

}


/*



Estrutura dos dados


[
    {

        ID:"1",

        label:"Painel Frota",

        icon:"🚗",

        expanded:true,

        children:[

            {

                ID:"2",

                label:"Veículos"

            },

            {

                ID:"3",

                label:"Empregados"

            }

        ]

    }

]


Exemplo 

renderTree(

    document.querySelector("#menu"),

    {

        data:[

            {

                ID:"1",

                label:"Cadastros",

                expanded:true,

                children:[

                    {

                        ID:"2",

                        label:"Veículos"

                    },

                    {

                        ID:"3",

                        label:"Empregados"

                    }

                ]

            },

            {

                ID:"4",

                label:"Dashboard"

            }

        ],

        onSelect(node){

            console.log(node);

        }

    }

);



*/
