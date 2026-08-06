// ============================================================================
// TABS COMPONENT
// Painel Frota
// Arquivo: js/components/tabs.js
// Responsável pela criação dinâmica de abas.
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
// CRIAR
// ============================================================================

export function createTabs({

    tabs = [],

    selected = 0,

    onChange = null

} = {}) {

    const container =

        createElement(

            "div",

            {

                className:

                    "tabs"

            }

        );

    const header =

        createElement(

            "div",

            {

                className:

                    "tabs-header"

            }

        );

    const body =

        createElement(

            "div",

            {

                className:

                    "tabs-body"

            }

        );

    append(

        container,

        header,

        body

    );

    const instance = {

        container,

        header,

        body,

        tabs,

        selected,

        onChange

    };

    atualizar(instance);

    return instance;

}

// ============================================================================
// RENDER
// ============================================================================

export function renderTabs(

    container,

    options

) {

    if (!container) {

        return;

    }

    let instance =

        getCache(container);

    if (!instance) {

        instance =

            createTabs(options);

        setCache(

            container,

            instance

        );

        container.replaceChildren(

            instance.container

        );

    }

    else {

        instance.tabs =

            options.tabs;

        atualizar(instance);

    }

}

// ============================================================================
// ATUALIZA
// ============================================================================

function atualizar(instance) {

    clear(

        instance.header

    );

    clear(

        instance.body

    );

    instance.tabs.forEach(

        (tab, indice) => {

            const button =

                createElement(

                    "button",

                    {

                        className:

                            indice === instance.selected

                            ? "tab-button active"

                            : "tab-button",

                        text:

                            tab.label

                    }

                );

            button.addEventListener(

                "click",

                () => {

                    selectTab(

                        instance,

                        indice

                    );

                }

            );

            append(

                instance.header,

                button

            );

            const panel =

                createElement(

                    "div",

                    {

                        className:

                            indice === instance.selected

                            ? "tab-panel active"

                            : "tab-panel"

                    }

                );

            if (

                tab.content

            ) {

                append(

                    panel,

                    tab.content

                );

            }

            append(

                instance.body,

                panel

            );

        }

    );

}

// ============================================================================
// SELECIONAR
// ============================================================================

export function selectTab(

    container,

    indice

) {

    const instance =

        container.tabs

        ? container

        : getCache(container);

    if (!instance) {

        return;

    }

    instance.selected =

        indice;

    atualizar(instance);

    instance.onChange?.(

        indice,

        instance.tabs[indice]

    );

}

// ============================================================================
// ABA SELECIONADA
// ============================================================================

export function getSelectedTab(

    container

) {

    const instance =

        getCache(container);

    if (!instance) {

        return null;

    }

    return instance.tabs[

        instance.selected

    ];

}

// ============================================================================
// ADICIONAR
// ============================================================================

export function addTab(

    container,

    tab

) {

    const instance =

        getCache(container);

    if (!instance) {

        return;

    }

    instance.tabs.push(

        tab

    );

    atualizar(

        instance

    );

}

// ============================================================================
// REMOVER
// ============================================================================

export function removeTab(

    container,

    indice

) {

    const instance =

        getCache(container);

    if (!instance) {

        return;

    }

    instance.tabs.splice(

        indice,

        1

    );

    if (

        instance.selected >=

        instance.tabs.length

    ) {

        instance.selected =

            instance.tabs.length - 1;

    }

    atualizar(

        instance

    );

}

// ============================================================================
// REFRESH
// ============================================================================

export function refreshTabs(

    container,

    tabs

) {

    const instance =

        getCache(container);

    if (!instance) {

        return;

    }

    instance.tabs =

        tabs;

    atualizar(

        instance

    );

}

// ============================================================================
// DESTRUIR
// ============================================================================

export function destroyTabs(

    container

) {

    const instance =

        getCache(container);

    if (!instance) {

        return;

    }

    destroy(

        instance.container

    );

    removeCache(

        container

    );

}
