// ============================================================================
// TIMELINE COMPONENT
// Painel Frota
// Arquivo: js/components/timeline.js
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

const timelines = new WeakMap();

// ============================================================================
// CRIAR
// ============================================================================

export function createTimeline({

    data = [],

    onClick = null

} = {}) {

    const timeline =

        createElement(

            "div",

            {

                className:

                    "timeline"

            }

        );

    return {

        timeline,

        data,

        events:

            new Map(),

        onClick

    };

}

/*

Render=========================================


export function renderTimeline(

    container,

    options = {}

) {

    if (!container) {

        return;

    }

    let instance =

        timelines.get(container);

    if (!instance) {

        instance =

            createTimeline(options);

        timelines.set(

            container,

            instance

        );

        container.replaceChildren(

            instance.timeline

        );

    }

    refreshTimeline(

        container,

        options.data

    );

}


Atualização====================================


export function refreshTimeline(

    container,

    data = []

) {

    const instance =

        timelines.get(container);

    if (!instance) {

        return;

    }

    instance.data = data;

    clear(

        instance.timeline

    );

    instance.events.clear();

    data.forEach(evento => {

        instance.timeline.appendChild(

            createEvent(

                instance,

                evento

            )

        );

    });

}


Evento=====================================

function createEvent(

    instance,

    evento

) {

    const card =

        createElement(

            "div",

            {

                className:

                    "timeline-event"

            }

        );

    card.dataset.id =

        evento.ID;

    card.innerHTML = `

        <div class="timeline-date">

            ${evento.date}

            ${evento.time ?? ""}

        </div>

        <div class="timeline-icon">

            ${evento.icon ?? "•"}

        </div>

        <div class="timeline-content">

            <div class="timeline-title">

                ${evento.title}

            </div>

            <div class="timeline-subtitle">

                ${evento.subtitle ?? ""}

            </div>

            <div class="timeline-description">

                ${evento.description ?? ""}

            </div>

        </div>

    `;

    card.onclick = () =>

        instance.onClick?.(

            evento

        );

    instance.events.set(

        evento.ID,

        card

    );

    return card;

}


Adicionar Evento========================================

export function addEvent(

    container,

    evento

) {

    const instance =

        timelines.get(container);

    if (!instance) {

        return;

    }

    instance.data.push(evento);

    instance.timeline.appendChild(

        createEvent(

            instance,

            evento

        )

    );

}


Atualizar Evento==========================================


export function updateEvent(

    container,

    evento

) {

    const instance =

        timelines.get(container);

    if (!instance) {

        return;

    }

    const antigo =

        instance.events.get(

            evento.ID

        );

    if (!antigo) {

        return;

    }

    const novo =

        createEvent(

            instance,

            evento

        );

    antigo.replaceWith(

        novo

    );

}


Remover Evento=========================================

export function removeEvent(

    container,

    id

) {

    const instance =

        timelines.get(container);

    if (!instance) {

        return;

    }

    const evento =

        instance.events.get(id);

    if (!evento) {

        return;

    }

    evento.remove();

    instance.events.delete(id);

}


Consulta===========================================================


export function getEvent(

    container,

    id

) {

    return timelines

        .get(container)

        ?.data

        .find(

            item =>

                item.ID === id

        );

}

export function getEvents(

    container

) {

    return timelines

        .get(container)

        ?.data ?? [];

}


Limpar=======================================


export function clearTimeline(

    container

) {

    const instance =

        timelines.get(container);

    if (!instance) {

        return;

    }

    clear(

        instance.timeline

    );

    instance.events.clear();

}


Destruir==========================================


export function destroyTimeline(

    container

) {

    const instance =

        timelines.get(container);

    if (!instance) {

        return;

    }

    destroy(

        instance.timeline

    );

    timelines.delete(

        container

    );

}





