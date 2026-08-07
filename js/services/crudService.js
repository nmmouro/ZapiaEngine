// ============================================================================
// CRUD SERVICE
// Painel Frota
// Arquivo: js/services/crudService.js
// Responsável pela comunicação com a API do Framework.
// ============================================================================

import {

    API_URL

} from "../config/config.js";

// ============================================================================
// FACTORY
// ============================================================================

export function createCrudService({

    entity

}) {

    return {

        list,

        get,

        create,

        update,

        remove,

        search,

        count,

        exists

    };

    // ========================================================================
    // LISTAR
    // ========================================================================

    async function list(params = {}) {

        return request(

            "listar",

            {

                ...params,

                aba:

                    entity

            }

        );

    }

    // ========================================================================
    // OBTER
    // ========================================================================

    async function get(id) {

        return request(

            "obter",

            {

                aba:

                    entity,

                id

            }

        );

    }

    // ========================================================================
    // CRIAR
    // ========================================================================

    async function create(data) {

        return request(

            "salvar",

            {

                aba:

                    entity,

                ...data

            },

            "POST"

        );

    }

    // ========================================================================
    // ATUALIZAR
    // ========================================================================

    async function update(

        id,

        data

    ) {

        return request(

            "atualizar",

            {

                aba:

                    entity,

                id,

                ...data

            },

            "POST"

        );

    }

    // ========================================================================
    // REMOVER
    // ========================================================================

    async function remove(id) {

        return request(

            "excluir",

            {

                aba:

                    entity,

                id

            },

            "POST"

        );

    }

    // ========================================================================
    // PESQUISAR
    // ========================================================================

    async function search(filter = {}) {

        return request(

            "pesquisar",

            {

                aba:

                    entity,

                ...filter

            }

        );

    }

    // ========================================================================
    // CONTAR
    // ========================================================================

    async function count() {

        return request(

            "contar",

            {

                aba:

                    entity

            }

        );

    }

    // ========================================================================
    // EXISTE
    // ========================================================================

    async function exists(id) {

        return request(

            "existe",

            {

                aba:

                    entity,

                id

            }

        );

    }

}

// ============================================================================
// REQUEST
// ============================================================================

async function request(

    action,

    params = {},

    method = "GET"

) {

    const payload = {

        acao:

            action,

        ...params

    };

    let response;

    if (

        method === "GET"

    ) {

        const url =

            new URL(

                API_URL

            );

        Object.entries(

            payload

        ).forEach(

            ([key, value]) =>

                url.searchParams.append(

                    key,

                    value

                )

        );

        response =

            await fetch(

                url

            );

    }

    else {

        response =

            await fetch(

                API_URL,

                {

                    method:

                        "POST",

                    headers: {

                        "Content-Type":

                            "application/json"

                    },

                    body:

                        JSON.stringify(

                            payload

                        )

                }

            );

    }

    if (

        !response.ok

    ) {

        throw new Error(

            `Erro HTTP ${response.status}`

        );

    }

    const json =

        await response.json();

    if (

        json.sucesso === false

    ) {

        throw new Error(

            json.erro ||

            json.message ||

            "Erro desconhecido."

        );

    }

    return (

        json.data ??

        json.dados ??

        json

    );

}
