```javascript
// ============================================================================
// INDEX
// Painel Frota
// Arquivo: js/pages/index.js
// ============================================================================

/**
 * Página INDEX
 *
 * Responsabilidade:
 * Apenas inicializar os módulos principais do Painel Frota.
 *
 * Módulos:
 * - VEÍCULOS
 * - EMPREGADOS
 * - LANÇAMENTOS
 *
 * Regras:
 * - Não manipular DOM diretamente.
 * - Não fazer fetch/API.
 * - Não controlar formulários.
 * - Não conhecer colunas das planilhas.
 * - Não implementar regras de negócio.
 *
 * O Engine é responsável por:
 * - State
 * - DataSource
 * - CRUD
 * - Form
 * - Table
 * - Filter
 * - Toolbar
 */

// ============================================================================
// ENGINE
// ============================================================================

import {

    createModule

} from "../engine/module.js";


// ============================================================================
// SCHEMAS
// ============================================================================

import {

    SCHEMA_VEICULOS

} from "../schemas/veiculos.schema.js";


import {

    SCHEMA_EMPREGADOS

} from "../schemas/empregados.schema.js";


import {

    SCHEMA_LANCAMENTOS

} from "../schemas/lancamentos.schema.js";


// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener(

    "DOMContentLoaded",

    async () => {


        try {


            // ================================================================
            // VEÍCULOS
            // ================================================================

            await createModule({

                schema:

                    SCHEMA_VEICULOS

            });


            // ================================================================
            // EMPREGADOS
            // ================================================================

            await createModule({

                schema:

                    SCHEMA_EMPREGADOS

            });


            // ================================================================
            // LANÇAMENTOS
            // ================================================================

            await createModule({

                schema:

                    SCHEMA_LANCAMENTOS

            });


        }

        catch (erro) {


            console.error(

                "Erro ao inicializar o Painel Frota:",

                erro

            );


        }


    }

);
```
