// ============================================================================
// DASHBOARD COMPONENT
// Painel Frota
// Arquivo: js/components/dashboard.js
// Responsável pela montagem de dashboards.
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

const dashboards = new WeakMap();

// ============================================================================
// CRIAR DASHBOARD
// ============================================================================

export function createDashboard({

    toolbar = null,

    filters = null,

    cards = null,

    content = [],

    footer = null

} = {}) {

    const dashboard =

        createElement(

            "div",

            {

                className:

                    "dashboard"

            }

        );

    if (toolbar) {

        dashboard.appendChild(toolbar);

    }

    if (filters) {

        dashboard.appendChild(filters);

    }

    if (cards) {

        dashboard.appendChild(cards);

    }

    content.forEach(item =>

        dashboard.appendChild(item)

    );

    if (footer) {

        dashboard.appendChild(footer);

    }

    return {

        dashboard,

        toolbar,

        filters,

        cards,

        content,

        footer

    };

}




/*

RENDER


// ============================================================================
// RENDER
// ============================================================================

export function renderDashboard(

    container,

    options

) {

    if (!container) {

        return;

    }

    let dashboard =

        dashboards.get(container);

    if (!dashboard) {

        dashboard =

            createDashboard(options);

        dashboards.set(

            container,

            dashboard

        );

        container.replaceChildren(

            dashboard.dashboard

        );

    }

}





REFRESH

// ============================================================================
// REFRESH
// ============================================================================

export function refreshDashboard(

    container,

    options = {}

) {

    const dashboard =

        dashboards.get(container);

    if (!dashboard) {

        return;

    }

    if (options.toolbar) {

        dashboard.toolbar?.replaceWith(

            options.toolbar

        );

        dashboard.toolbar =

            options.toolbar;

    }

    if (options.filters) {

        dashboard.filters?.replaceWith(

            options.filters

        );

        dashboard.filters =

            options.filters;

    }

}



LIMPAR

// ============================================================================
// LIMPAR
// ============================================================================

export function clearDashboard(

    container

) {

    const dashboard =

        dashboards.get(container);

    if (!dashboard) {

        return;

    }

    clear(

        dashboard.dashboard

    );

}




DESTRUIR


// ============================================================================
// DESTRUIR
// ============================================================================

export function destroyDashboard(

    container

) {

    const dashboard =

        dashboards.get(container);

    if (!dashboard) {

        return;

    }

    destroy(

        dashboard.dashboard

    );

    dashboards.delete(container);

}






EXEMPLO UTILIZAÇÃO

const dashboard = createDashboard({

    toolbar:

        createToolbar(...),

    filters:

        createFilter(...),

    cards:

        createCards(...),

    content: [

        createTable(...).table,

        createKanban(...).board,

        createCalendar(...).calendar

    ]

});

renderDashboard(

    document.querySelector("#app"),

    dashboard

);
*/
