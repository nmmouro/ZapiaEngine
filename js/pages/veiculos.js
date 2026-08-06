// ============================================================================
// VEÍCULOS ENGINE
// Painel Frota
// Arquivo: js/pages/veiculos.js
// Responsável pela inicialização da página.
// ============================================================================

import crud from "../crud/crud.veiculos.js";

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        await crud.load();

    }

);
