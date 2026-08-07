// ============================================================================
// VEÍCULOS
// Painel Frota
// Arquivo: js/pages/veiculos.js
// ============================================================================

/**
 * Página VEÍCULOS
 * 
 * Responsabilidade:
 * Apenas inicializar o módulo Engine.
 * 
 * Regras:
 * - Não manipular DOM diretamente.
 * - Não fazer fetch/API.
 * - Não controlar formulário.
 * - Não conhecer colunas da planilha.
 */


import { createModule } from "../engine/module.js";

import { SCHEMA_VEICULOS } from "../schemas/veiculos.schema.js";



document.addEventListener(
    
    "DOMContentLoaded",

    async () => {


        await createModule({

            entity: "VEICULOS",


            schema: SCHEMA_VEICULOS,


            container: "#app",
            

                                                      stateName:"veiculos"


            options: {


                /**
                 * Configurações opcionais
                 * específicas da entidade
                 */


                titulo:
                    "Cadastro de Veículos",



                tabela:
                    "Veículos Cadastrados",



                permitirNovo:
                    true,



                permitirEditar:
                    true,



                permitirExcluir:
                    true


            }


        });


    }

);
