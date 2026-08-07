// ============================================================================
// SCHEMA ENGINE
// Painel Frota
// Arquivo: js/engine/schema.js
// Responsável pelo gerenciamento dos Schemas do Framework.
// ============================================================================

// ============================================================================
// CACHE
// ============================================================================

const schemas = new Map();

// ============================================================================
// CREATE
// ============================================================================

export function createSchema({

    entity,

    title = "",

    description = "",

    icon = "",

    primaryKey = "ID",

    service = null,

    fields = [],

    containers = {},

    permissions = "",

    actions = [],

    options = {},

    defaultValues = {},

    defaultSort = null,

    defaultFilter = {},

    pageSize = 20,

    autoLoad = true

} = {}) {

    if (!entity) {

        throw new Error(

            "Schema sem entidade."

        );

    }

    if (

        schemas.has(

            entity

        )

    ) {

        return schemas.get(

            entity

        );

    }

    const schema = {

        entity,

        title,

        description,

        icon,

        primaryKey,

        service,

        fields,

        containers,

        permissions,

        actions,

        options,

        defaultValues,

        defaultSort,

        defaultFilter,

        pageSize,

        autoLoad

    };

    schemas.set(

        entity,

        schema

    );

    return schema;

}

// ============================================================================
// GET
// ============================================================================

export function getSchema(

    entity

) {

    return schemas.get(

        entity

    );

}

// ============================================================================
// EXISTS
// ============================================================================

export function hasSchema(

    entity

) {

    return schemas.has(

        entity

    );

}

// ============================================================================
// REMOVE
// ============================================================================

export function removeSchema(

    entity

) {

    schemas.delete(

        entity

    );

}

// ============================================================================
// CLEAR
// ============================================================================

export function clearSchemas() {

    schemas.clear();

}

// ============================================================================
// LIST
// ============================================================================

export function getSchemas() {

    return [

        ...schemas.values()

    ];

}

// ============================================================================
// FIELD
// ============================================================================

export function getField(

    entity,

    name

) {

    return getSchema(

        entity

    )?.fields.find(

        field =>

            field.name === name

    );

}

// ============================================================================
// FIELDS
// ============================================================================

export function getFields(

    entity

) {

    return (

        getSchema(

            entity

        )?.fields ??

        []

    );

}

// ============================================================================
// FORM FIELDS
// ============================================================================

export function getFormFields(

    entity

) {

    return getFields(

        entity

    ).filter(

        field =>

            field.form !== false

    );

}

// ============================================================================
// TABLE FIELDS
// ============================================================================

export function getTableFields(

    entity

) {

    return getFields(

        entity

    ).filter(

        field =>

            field.table !== false

    );

}

// ============================================================================
// FILTER FIELDS
// ============================================================================

export function getFilterFields(

    entity

) {

    return getFields(

        entity

    ).filter(

        field =>

            field.filter === true

    );

}

// ============================================================================
// REQUIRED
// ============================================================================

export function getRequiredFields(

    entity

) {

    return getFields(

        entity

    ).filter(

        field =>

            field.required

    );

}

// ============================================================================
// CONTAINERS
// ============================================================================

export function getContainers(

    entity

) {

    return (

        getSchema(

            entity

        )?.containers ??

        {}

    );

}

// ============================================================================
// SERVICE
// ============================================================================

export function getService(

    entity

) {

    return getSchema(

        entity

    )?.service;

}

// ============================================================================
// PERMISSIONS
// ============================================================================

export function getPermissions(

    entity

) {

    return getSchema(

        entity

    )?.permissions;

}

// ============================================================================
// ACTIONS
// ============================================================================

export function getActions(

    entity

) {

    return (

        getSchema(

            entity

        )?.actions ??

        []

    );

}

// ============================================================================
// OPTIONS
// ============================================================================

export function getOptions(

    entity

) {

    return (

        getSchema(

            entity

        )?.options ??

        {}

    );

}

// ============================================================================
// DEFAULT SORT
// ============================================================================

export function getDefaultSort(

    entity

) {

    return getSchema(

        entity

    )?.defaultSort;

}

// ============================================================================
// DEFAULT FILTER
// ============================================================================

export function getDefaultFilter(

    entity

) {

    return (

        getSchema(

            entity

        )?.defaultFilter ??

        {}

    );

}

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export function getDefaultValues(

    entity

) {

    return (

        getSchema(

            entity

        )?.defaultValues ??

        {}

    );

}

// ============================================================================
// PAGE SIZE
// ============================================================================

export function getPageSize(

    entity

) {

    return (

        getSchema(

            entity

        )?.pageSize ??

        20

    );

}

// ============================================================================
// AUTO LOAD
// ============================================================================

export function isAutoLoad(

    entity

) {

    return (

        getSchema(

            entity

        )?.autoLoad ??

        true

    );

}
