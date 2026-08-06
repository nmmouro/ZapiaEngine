// ============================================================================
// PERMISSIONS ENGINE
// Painel Frota
// Arquivo: js/engine/permissions.js
// Responsável pelo controle de permissões do Framework.
// ============================================================================

// ============================================================================
// PERFIL ATUAL
// ============================================================================

let usuario = null;

let perfil = null;

// ============================================================================
// PERMISSÕES
// ============================================================================

const permissoes = new Map();

// ============================================================================
// DEFINIR USUÁRIO
// ============================================================================

export function setUser(

    dados

) {

    usuario =

        dados ?? null;

}

// ============================================================================
// OBTER USUÁRIO
// ============================================================================

export function getUser() {

    return usuario;

}

// ============================================================================
// DEFINIR PERFIL
// ============================================================================

export function setProfile(

    nome

) {

    perfil = nome;

}

// ============================================================================
// OBTER PERFIL
// ============================================================================

export function getProfile() {

    return perfil;

}

// ============================================================================
// REGISTRAR PERFIL
// ============================================================================

export function registerProfile(

    nome,

    regras = []

) {

    permissoes.set(

        nome,

        new Set(regras)

    );

}

// ============================================================================
// ADICIONAR PERMISSÃO
// ============================================================================

export function addPermission(

    perfil,

    regra

) {

    if (

        !permissoes.has(

            perfil

        )

    ) {

        permissoes.set(

            perfil,

            new Set()

        );

    }

    permissoes

        .get(perfil)

        .add(regra);

}

// ============================================================================
// REMOVER PERMISSÃO
// ============================================================================

export function removePermission(

    perfil,

    regra

) {

    permissoes

        .get(perfil)

        ?.delete(regra);

}

// ============================================================================
// VERIFICAR PERMISSÃO
// ============================================================================

export function can(

    regra

) {

    if (

        !perfil

    ) {

        return false;

    }

    return permissoes

        .get(perfil)

        ?.has(regra) ??

        false;

}

// ============================================================================
// NEGAR
// ============================================================================

export function cannot(

    regra

) {

    return !can(

        regra

    );

}

// ============================================================================
// POSSUI PERFIL
// ============================================================================

export function isProfile(

    nome

) {

    return perfil === nome;

}

// ============================================================================
// LIMPAR
// ============================================================================

export function clearPermissions() {

    permissoes.clear();

    usuario = null;

    perfil = null;

}

// ============================================================================
// LISTAR PERMISSÕES
// ============================================================================

export function getPermissions() {

    if (

        !perfil

    ) {

        return [];

    }

    return [

        ...(

            permissoes.get(

                perfil

            ) ??

            []

        )

    ];

}


/*


Exemplo
Registrar perfis
registerProfile(

    "ADMIN",

    [

        "veiculos:listar",
        "veiculos:salvar",
        "veiculos:editar",
        "veiculos:excluir",

        "empregados:listar",
        "empregados:salvar",
        "empregados:editar",
        "empregados:excluir",

        "dashboard:visualizar"

    ]

);

registerProfile(

    "OPERADOR",

    [

        "veiculos:listar",

        "empregados:listar",

        "dashboard:visualizar"

    ]

);
Login
setUser({

    nome: "Nei",

    matricula: "5000199"

});

setProfile(

    "ADMIN"

);
Crud
if (

    cannot(

        "veiculos:editar"

    )

) {

    return;

}
Toolbar
btnExcluir.hidden =

    cannot(

        "veiculos:excluir"

    );
Form
campo.disabled =

    cannot(

        "veiculos:editar"

    );
Table
const actions = [];

if (

    can(

        "veiculos:editar"

    )

) {

    actions.push({

        label: "Editar",

        onClick: editar

    });

}

if (

    can(

        "veiculos:excluir"

    )

) {

    actions.push({

        label: "Excluir",

        onClick: excluir

    });

}


*/
