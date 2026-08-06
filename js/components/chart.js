// ============================================================================
// CHART COMPONENT
// Painel Frota
// Arquivo: js/components/chart.js
// ============================================================================

const charts = new WeakMap();

// ============================================================================
// CRIAR
// ============================================================================

export function createChart({

    type = "bar",

    labels = [],

    datasets = [],

    options = {}

} = {}) {

    const canvas =

        document.createElement(

            "canvas"

        );

    const chart =

        new Chart(

            canvas,

            {

                type,

                data:{

                    labels,

                    datasets

                },

                options

            }

        );

    return {

        canvas,

        chart

    };

}


/*

MODELO 

renderChart(

    document.querySelector("#grafico"),

    {

        type:"bar",

        labels:[

            "Livre",

            "Ocupado"

        ],

        datasets:[

            {

                label:"Veículos",

                data:[

                    2,

                    2

                ]

            }

        ]

    }

);

RENDER====================


export function renderChart(

    container,

    options

){

    if(!container){

        return;

    }

    let instance =

        charts.get(container);

    if(!instance){

        instance =

            createChart(options);

        charts.set(

            container,

            instance

        );

        container.replaceChildren(

            instance.canvas

        );

        return;

    }

    refreshChart(

        container,

        options

    );

}


ATUALIZAÇÃO

export function refreshChart(

    container,

    options

){

    const instance =

        charts.get(container);

    if(!instance){

        return;

    }

    instance.chart.data.labels =

        options.labels;

    instance.chart.data.datasets =

        options.datasets;

    instance.chart.update();

}


Atualizar somente os dados========================


export function updateChart(

    container,

    datasets

){

    const instance =

        charts.get(container);

    if(!instance){

        return;

    }

    instance.chart.data.datasets =

        datasets;

    instance.chart.update();

}

Obter gráfico===================================


export function getChart(

    container

){

    return charts.get(container);

}



Limpar===============================

export function clearChart(

    container

){

    const instance =

        charts.get(container);

    if(!instance){

        return;

    }

    instance.chart.data.labels=[];

    instance.chart.data.datasets=[];

    instance.chart.update();

}

Destruir===========================================



export function destroyChart(

    container

){

    const instance =

        charts.get(container);

    if(!instance){

        return;

    }

    instance.chart.destroy();

    charts.delete(container);

}

*/
