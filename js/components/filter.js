// ============================================================================
// FILTER COMPONENT
// Painel Frota
// Arquivo: js/components/filter.js
// Responsável pela criação dinâmica de filtros.
// ============================================================================

// ============================================================================
// CACHE
// ============================================================================

const filtros = new WeakMap();

// ============================================================================
// CRIAR FILTRO
// ============================================================================

export function createFilter({

    fields = [],

    buttons = [],

    onChange = null

} = {}) {

    const form =

        document.createElement("form");

    form.className =

        "filter";

    fields.forEach(field => {

        form.appendChild(

            createField(

                field,

                onChange

            )

        );

    });

    if (buttons.length) {

        form.appendChild(

            createButtons(

                buttons

            )

        );

    }

    return {

        form,

        fields,

        buttons,

        onChange

    };

}

// ============================================================================
// RENDER
// ============================================================================

export function renderFilter(

    container,

    options

) {

    if (!container) {

        return;

    }

    let filtro =

        filtros.get(container);

    if (!filtro) {

        filtro =

            createFilter(options);

        filtros.set(

            container,

            filtro

        );

        container.replaceChildren(

            filtro.form

        );

    }

}

// ============================================================================
// REFRESH
// ============================================================================

export function refreshFilter(

    container,

    data

) {

    setData(

        container,

        data

    );

}

// ============================================================================
// GET DATA
// ============================================================================

export function getData(

    container

) {

    const filtro =

        filtros.get(container);

    if (!filtro) {

        return {};

    }

    const dados = {};

    [...filtro.form.elements].forEach(

        elemento => {

            if (!elemento.name) {

                return;

            }

            if (

                elemento.type ===

                "checkbox"

            ) {

                dados[elemento.name] =

                    elemento.checked;

            }

            else {

                dados[elemento.name] =

                    elemento.value;

            }

        }

    );

    return dados;

}

// ============================================================================
// SET DATA
// ============================================================================

export function setData(

    container,

    dados = {}

) {

    const filtro =

        filtros.get(container);

    if (!filtro) {

        return;

    }

    Object.entries(dados).forEach(

        ([campo, valor]) => {

            const input =

                filtro.form.elements[campo];

            if (!input) {

                return;

            }

            if (

                input.type ===

                "checkbox"

            ) {

                input.checked =

                    Boolean(valor);

            }

            else {

                input.value =

                    valor ?? "";

            }

        }

    );

}

// ============================================================================
// CLEAR
// ============================================================================

export function clearFilter(

    container

) {

    const filtro =

        filtros.get(container);

    if (!filtro) {

        return;

    }

    filtro.form.reset();

}

// ============================================================================
// DESTROY
// ============================================================================

export function destroyFilter(

    container

) {

    const filtro =

        filtros.get(container);

    if (!filtro) {

        return;

    }

    container.replaceChildren();

    filtros.delete(container);

}

// ============================================================================
// FIELD
// ============================================================================

function createField(

    config,

    onChange

) {

    const div =

        document.createElement("div");

    div.className =

        "filter-group";

    const label =

        document.createElement("label");

    label.textContent =

        config.label ??

        config.field;

    label.htmlFor =

        config.field;

    div.appendChild(label);

    div.appendChild(

        createInput(

            config,

            onChange

        )

    );

    return div;

}

// ============================================================================
// INPUT
// ============================================================================

function createInput(

    config,

    onChange

) {

    switch (

        config.type

    ) {

        case "select":

            return createSelect(

                config,

                onChange

            );

        case "checkbox":

            return createCheckbox(

                config,

                onChange

            );

        case "date":

            return createText(

                {

                    ...config,

                    type:"date"

                },

                onChange

            );

        default:

            return createText(

                config,

                onChange

            );

    }

}

// ============================================================================
// INPUT TEXT
// ============================================================================

function createText(

    config,

    onChange

) {

    const input =

        document.createElement("input");

    input.type =

        config.type ??

        "text";

    input.id =

        config.field;

    input.name =

        config.field;

    input.placeholder =

        config.placeholder ??

        "";

    input.addEventListener(

        "input",

        () => {

            onChange?.(

                getData(

                    input.form.parentNode

                )

            );

        }

    );

    return input;

}

// ============================================================================
// SELECT
// ============================================================================

function createSelect(

    config,

    onChange

) {

    const select =

        document.createElement("select");

    select.id =

        config.field;

    select.name =

        config.field;

    (

        config.options ??

        []

    ).forEach(opcao => {

        const option =

            document.createElement("option");

        if (

            typeof opcao ===

            "object"

        ) {

            option.value =

                opcao.value;

            option.textContent =

                opcao.label;

        }

        else {

            option.value =

                opcao;

            option.textContent =

                opcao;

        }

        select.appendChild(

            option

        );

    });

    select.addEventListener(

        "change",

        () => {

            onChange?.(

                getData(

                    select.form.parentNode

                )

            );

        }

    );

    return select;

}

// ============================================================================
// CHECKBOX
// ============================================================================

function createCheckbox(

    config,

    onChange

) {

    const input =

        document.createElement("input");

    input.type =

        "checkbox";

    input.id =

        config.field;

    input.name =

        config.field;

    input.addEventListener(

        "change",

        () => {

            onChange?.(

                getData(

                    input.form.parentNode

                )

            );

        }

    );

    return input;

}

// ============================================================================
// BUTTONS
// ============================================================================

function createButtons(

    buttons

) {

    const div =

        document.createElement("div");

    div.className =

        "filter-actions";

    buttons.forEach(config => {

        const button =

            document.createElement("button");

        button.type =

            config.type ??

            "button";

        button.className =

            config.className ??

            "";

        button.textContent =

            config.label;

        if (

            config.onClick

        ) {

            button.addEventListener(

                "click",

                config.onClick

            );

        }

        div.appendChild(

            button

        );

    });

    return div;

}
