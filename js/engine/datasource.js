// ============================================================================
// DATASOURCE ENGINE
// Painel Frota
// Arquivo: js/engine/datasource.js
// ============================================================================

import {

    uuid

} from "./engine.js";

// ============================================================================
// DATASOURCE
// ============================================================================

export function createDataSource({

    entity,

    service,

    cache = true,

    autoLoad = false,

    pageSize = 20

} = {}) {

    const state = {

        id:

            uuid(),

        data: [],

        filter: {},

        sort: null,

        page: 1,

        total: 0,

        loading: false,

        pageSize,

        listeners:

            new Set()

    };

   const datasource = {

    // Nova API

    list: () => load(state, service),

    get: id => find(state, id),

    create: registro => save(state, service, registro),

    update: (id, registro) =>
        update(state, service, id, registro),

    remove: id =>
        remove(state, service, id),

    refresh: () =>
        load(state, service, true),

    // Compatibilidade

    load() {
        return this.list();
    },

    reload() {
        return this.refresh();
    },

    save(registro) {
        return this.create(registro);
    },

    find(id) {
        return this.get(id);
    }
