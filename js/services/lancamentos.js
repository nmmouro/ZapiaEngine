// ============================================================================
// VEÍCULOS SERVICE
// Painel Frota
// Arquivo: js/services/veiculos.js
// Responsável pelos serviços da entidade VEÍCULOS.
// ============================================================================

import {

    createCrudService

} from "./crudService.js";

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const ENTITY = "LANCAMENTOS";

// ============================================================================
// SERVICE
// ============================================================================

const service = createCrudService({

    entity: ENTITY

});

// ============================================================================
// EXPORTAÇÃO
// ============================================================================

export default service;

// ============================================================================
// COMPATIBILIDADE
// ============================================================================

export const listarVeiculos =
    service.list;

export const obterVeiculo =
    service.get;

export const salvarVeiculo =
    service.create;

export const atualizarVeiculo =
    service.update;

export const excluirVeiculo =
    service.remove;

export const pesquisarVeiculos =
    service.search;

export const contarVeiculos =
    service.count;

export const existeVeiculo =
    service.exists;
