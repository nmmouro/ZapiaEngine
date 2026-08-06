// ============================================================================
// CALENDAR COMPONENT
// Painel Frota
// Arquivo: js/components/calendar.js
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

const calendars = new WeakMap();

// ============================================================================
// CRIAR
// ============================================================================

export function createCalendar({

    date = new Date(),

    events = [],

    onSelect = null,

    onEventClick = null

} = {}) {

    const calendar =

        createElement(

            "div",

            {

                className:

                    "calendar"

            }

        );

    const header =

        createElement(

            "div",

            {

                className:

                    "calendar-header"

            }

        );

    const body =

        createElement(

            "div",

            {

                className:

                    "calendar-body"

            }

        );

    append(

        calendar,

        header,

        body

    );

    return {

        calendar,

        header,

        body,

        date,

        events,

        onSelect,

        onEventClick

    };

}

// ============================================================================
// RENDER
// ============================================================================

export function renderCalendar(

    container,

    options = {}

) {

    if (!container) {

        return;

    }

    let instance =

        calendars.get(container);

    if (!instance) {

        instance =

            createCalendar(options);

        calendars.set(

            container,

            instance

        );

        container.replaceChildren(

            instance.calendar

        );

    }

    refreshCalendar(

        container,

        options

    );

}

// ============================================================================
// REFRESH
// ============================================================================

export function refreshCalendar(

    container,

    options = {}

) {

    const instance =

        calendars.get(container);

    if (!instance) {

        return;

    }

    Object.assign(

        instance,

        options

    );

    draw(instance);

}

// ============================================================================
// DESENHAR
// ============================================================================

function draw(instance) {

    clear(instance.header);

    clear(instance.body);

    const mes =

        instance.date.toLocaleDateString(

            "pt-BR",

            {

                month:"long",

                year:"numeric"

            }

        );

    const titulo =

        createElement(

            "h3",

            {

                text:mes

            }

        );

    append(

        instance.header,

        titulo

    );

    const diasSemana =

        [

            "Dom",

            "Seg",

            "Ter",

            "Qua",

            "Qui",

            "Sex",

            "Sáb"

        ];

    diasSemana.forEach(nome => {

        append(

            instance.body,

            createElement(

                "div",

                {

                    className:

                        "calendar-weekday",

                    text:nome

                }

            )

        );

    });

    const ano =

        instance.date.getFullYear();

    const mesAtual =

        instance.date.getMonth();

    const primeiroDia =

        new Date(

            ano,

            mesAtual,

            1

        );

    const ultimoDia =

        new Date(

            ano,

            mesAtual + 1,

            0

        );

    for (

        let i = 0;

        i < primeiroDia.getDay();

        i++

    ) {

        append(

            instance.body,

            createElement(

                "div",

                {

                    className:

                        "calendar-empty"

                }

            )

        );

    }

    for (

        let dia = 1;

        dia <= ultimoDia.getDate();

        dia++

    ) {

        const cell =

            createElement(

                "div",

                {

                    className:

                        "calendar-day"

                }

            );

        append(

            cell,

            createElement(

                "div",

                {

                    className:

                        "calendar-number",

                    text:String(dia)

                }

            )

        );

        const dataTexto =

            `${ano}-${String(mesAtual+1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;

        instance.events

            .filter(

                e => e.start === dataTexto

            )

            .forEach(evento => {

                const item =

                    createElement(

                        "div",

                        {

                            className:

                                "calendar-event",

                            text:evento.title

                        }

                    );

                item.style.background =

                    evento.color ||

                    "#1565C0";

                item.onclick = () =>

                    instance.onEventClick?.(

                        evento

                    );

                append(

                    cell,

                    item

                );

            });

        cell.onclick = () =>

            instance.onSelect?.(

                dataTexto

            );

        append(

            instance.body,

            cell

        );

    }

}
