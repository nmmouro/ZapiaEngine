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

const tabelas = new WeakMap();

// ============================================================================
// CRIAR TABELA
// ============================================================================

export function createTable({

    columns = [],

    actions = []

} = {}) {

    const table =

        document.createElement("table");

    table.className = "table";

    const thead =

        createHeader(

            columns,

            actions

        );

    const tbody =

        document.createElement("tbody");

    table.append(

        thead,

        tbody

    );
   
    return {

    table,

    tbody,

    rows: new Map(),

    columns,

    actions

};

}

// ============================================================================
// RENDER TABELA
// ============================================================================

export function renderTable(

    container,

    options

) {

    if (!container) {

        return;

    }

    let tabela =

        tabelas.get(container);

    if (!tabela) {

        tabela =

            createTable(options);

        tabelas.set(

            container,

            tabela

        );

        container.replaceChildren(

            tabela.table

        );

    }

    atualizarBody(

        tabela.tbody,

        options.columns,

        options.data,

        options.actions ?? [],

        tabela.rows

    );

}

// ============================================================================
// REFRECH TABELA
// ============================================================================

refreshTable(container, novosDados);

export function refreshTable(
    container,
    data
) {

    const tabela = tabelas.get(container);

    if (!tabela) {

        return;

    }

    atualizarBody(

        tabela.tbody,

        tabela.columns,

        data,

        tabela.actions,

        tabela.rows

    );

}

// ============================================================================
// UPDATE LINHA
// ============================================================================

export function updateRow(
    container,
    registro
) {

    const tabela =

        tabelas.get(container);

    if (!tabela) {

        return;

    }

    const linha =

        tabela.rows.get(registro.ID);

    if (!linha) {

        return;

    }

    atualizarLinha(

        linha,

        registro,

        tabela.columns

    );

}

// ============================================================================
// ADICIONAR LINHA
// ============================================================================

export function addRow(
    container,
    registro
) {

    const tabela =

        tabelas.get(container);

    if (!tabela) {

        return;

    }

    if (

        tabela.rows.has(registro.ID)

    ) {

        return;

    }

    const linha =

        createRow(

            registro,

            tabela.columns,

            tabela.actions

        );

    tabela.tbody.appendChild(

        linha

    );

    tabela.rows.set(

        registro.ID,

        linha

    );

}

// ============================================================================
// REMOVER LINHA
// ============================================================================

export function removeRow(
    container,
    id
) {

    const tabela =

        tabelas.get(container);

    if (!tabela) {

        return;

    }

    const linha =

        tabela.rows.get(id);

    if (!linha) {

        return;

    }

    linha.remove();

    tabela.rows.delete(id);

}

// ============================================================================
// CLEAR TABELA
// ============================================================================

export function clearTable(
    container
) {

    const tabela =

        tabelas.get(container);

    if (!tabela) {

        return;

    }

    tabela.tbody.replaceChildren();

    tabela.rows.clear();

}

// ============================================================================
// DESTROY TABELA
// ============================================================================

export function destroyTable(
    container
) {

    const tabela =

        tabelas.get(container);

    if (!tabela) {

        return;

    }

    container.replaceChildren();

    tabelas.delete(container);

}

// ============================================================================
// CABEÇALHO
// ============================================================================

// ============================================================================
// CRIAR CABEÇALHO
// ============================================================================

function createHeader(

    columns,

    actions = []

) {

    const thead =

        document.createElement("thead");

    const tr =

        document.createElement("tr");

    columns.forEach(col => {

        const th =

            document.createElement("th");

        th.textContent =

            col.label ??

            col.field ??

            "";

        if (col.className) {

            th.className =

                col.className;

        }

        if (col.width) {

            th.style.width =

                col.width;

        }

        if (col.align) {

            th.style.textAlign =

                col.align;

        }

        tr.appendChild(th);

    });

    if (actions.length) {

        const th =

            document.createElement("th");

        th.textContent =

            "Ações";

        th.className =

            "table-actions-header";

        tr.appendChild(th);

    }

    thead.appendChild(tr);

    return thead;

}

// ============================================================================
// ATUALIZAR CORPO
// ============================================================================

function atualizarBody(

    tbody,

    columns,

    data,

    actions,

    rows

) {

    if (

        !Array.isArray(data) ||

        data.length === 0

    ) {

        tbody.replaceChildren(

            createEmptyRow(

                columns.length +

                (actions.length ? 1 : 0)

            )

        );

        rows.clear();

        return;

    }

    const existentes =

        new Set();

    data.forEach(item => {

        const id =

            item.ID;

        existentes.add(id);

        if (

            rows.has(id)

        ) {

            atualizarLinha(

                rows.get(id),

                item,

                columns

            );

        }

        else {

            const linha =

                createRow(

                    item,

                    columns,

                    actions

                );

            tbody.appendChild(

                linha

            );

            rows.set(

                id,

                linha

            );

        }

    });

    [...rows.keys()].forEach(id => {

        if (

            existentes.has(id)

        ) {

            return;

        }

        rows.get(id).remove();

        rows.delete(id);

    });

}

// ============================================================================
// CRIAR LINHA
// ============================================================================

function createRow(

    item,

    columns,

    actions

) {

    const tr =

        document.createElement("tr");

    tr.dataset.id =

        item.ID;

    columns.forEach(col => {

        const td =

            document.createElement("td");

        preencherCelula(

            td,

            item,

            col

        );

        tr.appendChild(td);

    });

    if (actions.length) {

        tr.appendChild(

            createActions(

                item,

                actions

            )

        );

    }

    return tr;

}

// ============================================================================
// ATUALIZAR LINHA
// ============================================================================

function atualizarLinha(

    tr,

    item,

    columns

) {

    columns.forEach(

        (col, indice) => {

            preencherCelula(

                tr.children[indice],

                item,

                col

            );

        }

    );

}


// ============================================================================
// PREENCHER CÉLULA
// ============================================================================

function preencherCelula(

    td,

    item,

    col

) {

    const valor =

        getValue(

            item,

            col.field

        );

    if (

        typeof col.render ===

        "function"

    ) {

        td.innerHTML =

            col.render(

                valor,

                item

            );

    }

    else if (

        col.type ===

        "status"

    ) {

        td.innerHTML =

            renderStatus(

                valor

            );

    }

    else {

        td.textContent =

            valor ?? "";

    }

}

// ============================================================================
// AÇÕES
// ============================================================================

function createActions(

    item,

    actions

) {

    const td =

        document.createElement("td");

    td.className =

        "table-actions";

    actions.forEach(action => {

        const button =

            document.createElement("button");

        button.type =

            "button";

        button.className =

            action.className ?? "";

        button.textContent =

            action.label;

        button.addEventListener(

            "click",

            () =>

                action.onClick(item)

        );

        td.appendChild(button);

    });

    return td;

}

// ============================================================================
// LINHA VAZIA
// ============================================================================

function createEmptyRow(

    colspan

) {

    const tr =

        document.createElement("tr");

    const td =

        document.createElement("td");

    td.colSpan =

        colspan;

    td.className =

        "table-empty";

    td.textContent =

        "Nenhum registro encontrado.";

    tr.appendChild(td);

    return tr;

}

// ============================================================================
// OBTER VALOR
// ============================================================================

function getValue(

    objeto,

    caminho

) {

    if (!caminho) {

        return "";

    }

    return caminho

        .split(".")

        .reduce(

            (valor, chave) =>

                valor?.[chave],

            objeto

        );

}
