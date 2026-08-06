// ============================================================================
// VALIDATION ENGINE
// Painel Frota
// Arquivo: js/engine/validation.js
// Responsável pelas validações do Framework.
// ============================================================================

// ============================================================================
// VALIDADORES
// ============================================================================

const validators = new Map();

// ============================================================================
// REGISTRAR VALIDADOR
// ============================================================================

export function registerValidator(

    name,

    callback

) {

    validators.set(

        name,

        callback

    );

}

// ============================================================================
// OBTER VALIDADOR
// ============================================================================

export function getValidator(

    name

) {

    return validators.get(

        name

    );

}

// ============================================================================
// VALIDAR CAMPO
// ============================================================================

export function validateField(

    value,

    rules = []

) {

    const errors = [];

    rules.forEach(rule => {

        const validator =

            validators.get(

                rule.type

            );

        if (!validator) {

            return;

        }

        const result =

            validator(

                value,

                rule

            );

        if (

            result !== true

        ) {

            errors.push(

                result

            );

        }

    });

    return {

        valid:

            errors.length === 0,

        errors

    };

}

// ============================================================================
// VALIDAR OBJETO
// ============================================================================

export function validate(

    data,

    schema

) {

    const errors = {};

    Object.entries(

        schema

    ).forEach(

        ([campo, rules]) => {

            const result =

                validateField(

                    data[campo],

                    rules

                );

            if (

                !result.valid

            ) {

                errors[campo] =

                    result.errors;

            }

        }

    );

    return {

        valid:

            Object.keys(errors)

                .length === 0,

        errors

    };

}

// ============================================================================
// LIMPAR VALIDADORES
// ============================================================================

export function clearValidators() {

    validators.clear();

}

// ============================================================================
// VALIDADORES PADRÃO
// ============================================================================

registerValidator(

    "required",

    value =>

        value !== null &&

        value !== undefined &&

        String(value).trim() !== ""

            ? true

            : "Campo obrigatório."

);

registerValidator(

    "email",

    value =>

        !value ||

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

            ? true

            : "E-mail inválido."

);

registerValidator(

    "number",

    value =>

        value === "" ||

        !isNaN(value)

            ? true

            : "Número inválido."

);

registerValidator(

    "min",

    (value, rule) =>

        String(value).length >= rule.value

            ? true

            : `Mínimo ${rule.value} caracteres.`

);

registerValidator(

    "max",

    (value, rule) =>

        String(value).length <= rule.value

            ? true

            : `Máximo ${rule.value} caracteres.`

);

registerValidator(

    "pattern",

    (value, rule) =>

        new RegExp(

            rule.value

        ).test(value)

            ? true

            : rule.message ||

              "Valor inválido."

);

registerValidator(

    "cpf",

    value => {

        const cpf =

            String(value || "")

                .replace(/\D/g, "");

        if (

            cpf.length !== 11

        ) {

            return "CPF inválido.";

        }

        return true;

    }

);

registerValidator(

    "cnpj",

    value => {

        const cnpj =

            String(value || "")

                .replace(/\D/g, "");

        if (

            cnpj.length !== 14

        ) {

            return "CNPJ inválido.";

        }

        return true;

    }

);

registerValidator(

    "date",

    value =>

        !value ||

        !isNaN(

            new Date(value)

        )

            ? true

            : "Data inválida."

);

registerValidator(

    "time",

    value =>

        !value ||

        /^\d{2}:\d{2}$/.test(value)

            ? true

            : "Hora inválida."

);


/*


Exemplo de utilização
Definição do schema
const schema = {

    Placa: [

        {

            type: "required"

        }

    ],

    Modelo: [

        {

            type: "required"

        },

        {

            type: "min",

            value: 3

        }

    ],

    Email: [

        {

            type: "email"

        }

    ]

};
Validação
const resultado =

    validate(

        dados,

        schema

    );

if (!resultado.valid) {

    console.log(

        resultado.errors

    );

}
Registro de um novo validador
registerValidator(

    "placa",

    value =>

        /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/

            .test(value)

            ? true

            : "Placa inválida."

);


*/
