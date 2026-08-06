// ============================================================================
// TABLE COMPONENT
// Painel Frota
// Arquivo: js/components/table.js
// Responsável pela renderização de tabelas.
// ============================================================================

import {

    renderStatus

} from "../ui/status.js";

// ============================================================================
// CACHE
// ============================================================================

// ============================================================================
// FORM COMPONENT
// Painel Frota
// Arquivo: js/components/form.js
// Responsável pela criação dinâmica de formulários.
// ============================================================================

const formularios = new WeakMap();

// ============================================================================
// CRIAR TABELA
// ============================================================================

export function createForm({

    fields = [],

    buttons = []

} = {}) {

    const form = document.createElement("form");

    form.className = "form-engine";

    fields.forEach(field => {

        form.appendChild(

            createField(field)

        );

    });

    if (buttons.length) {

        form.appendChild(

            createButtons(buttons)

        );

    }

    return {

        form,

        fields

    };

}

// ============================================================================
// CRIAR FIELD
// ============================================================================

function createField(config) {

    const wrapper = document.createElement("div");

    wrapper.className = "form-group";

    wrapper.append(

        createLabel(config),

        createInput(config)

    );

    return wrapper;

}

// ============================================================================
// CRIAR LABEL
// ============================================================================

function createLabel(config) {

    const label = document.createElement("label");

    label.htmlFor = config.field;

    label.textContent =

        config.label ??

        config.field;

    return label;

}

// ============================================================================
// CRIAR INPUT
// ============================================================================

function createInput(config) {

    switch (config.type) {

        case "select":

            return createSelect(config);

        case "textarea":

            return createTextarea(config);

        case "checkbox":

            return createCheckbox(config);

        default:

            return createText(config);

    }

}

// ============================================================================
// CRIAR TEXTO
// ============================================================================

function createText(config) {

    const input = document.createElement("input");

    input.type = config.type ?? "text";

    input.id = config.field;

    input.name = config.field;

    input.required =

        config.required ?? false;

    return input;

}

// ============================================================================
// CRIAR SELECT
// ============================================================================


function createSelect(config) {

    const select = document.createElement("select");

    select.id = config.field;

    select.name = config.field;

    (config.options ?? []).forEach(opcao => {

        const option = document.createElement("option");

        option.value = opcao;

        option.textContent = opcao;

        select.appendChild(option);

    });

    return select;

}

// ============================================================================
// CRIAR TEXTO REAL
// ============================================================================

function createTextarea(config) {

    const textarea =

        document.createElement("textarea");

    textarea.id = config.field;

    textarea.name = config.field;

    return textarea;

}

// ============================================================================
// CRIAR CHECKBOX
// ============================================================================

function createCheckbox(config) {

    const input =

        document.createElement("input");

    input.type = "checkbox";

    input.id = config.field;

    input.name = config.field;

    return input;

}

// ============================================================================
// CRIAR BOTÃO
// ============================================================================

function createButtons(buttons) {

    const footer =

        document.createElement("div");

    footer.className = "form-actions";

    buttons.forEach(config => {

        const button =

            document.createElement("button");

        button.type =

            config.type ?? "button";

        button.textContent =

            config.label;

        button.className =

            config.className ?? "";

        footer.appendChild(button);

    });

    return footer;

}

// ============================================================================
// RENDER FORM
// ============================================================================

export function renderForm(

    container,

    options

) {

    if (!container) {

        return;

    }

    let formulario =

        formularios.get(container);

    if (!formulario) {

        formulario =

            createForm(options);

        formularios.set(

            container,

            formulario

        );

        container.replaceChildren(

            formulario.form

        );

    }

    if (options.data) {

        setData(

            container,

            options.data

        );

    }

}

// ============================================================================
// SET DATA
// ============================================================================

export function setData(

    container,

    dados

) {

    const formulario =

        formularios.get(container);

    if (!formulario) {

        return;

    }

    Object.entries(dados).forEach(

        ([campo, valor]) => {

            const input =

                formulario.form.elements[campo];

            if (!input) {

                return;

            }

            if (input.type === "checkbox") {

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
// GET DATA
// ============================================================================

export function getData(container) {

    const formulario =

        formularios.get(container);

    if (!formulario) {

        return {};

    }

    const dados = {};

    [...formulario.form.elements].forEach(elemento => {

        if (!elemento.name) {

            return;

        }

        dados[elemento.name] =

            elemento.type === "checkbox"

                ? elemento.checked

                : elemento.value;

    });

    return dados;

}

// ============================================================================
// CLEAR FORM
// ============================================================================

export function clearForm(container) {

    const formulario =

        formularios.get(container);

    formulario?.form.reset();

}

// ============================================================================
// DESTROY FORM
// ============================================================================

export function destroyForm(container) {

    const formulario =

        formularios.get(container);

    if (!formulario) {

        return;

    }

    formulario.form.remove();

    formularios.delete(container);

}
