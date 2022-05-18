export function validate(input) {
    const inputType = input.dataset.tipo

    if (validators[inputType]) {
        validators[inputType](input)
    }

    if (input.validity.valid) {
        input.classList.remove('is-invalid')
    } else {
        input.classList.add('is-invalid')
        input.parentElement.querySelector('.invalid-feedback').innerHTML = showErrorMessage(inputType, input)
    }
    return;
}

export function validateSelect(select) {
    const inputType = select.dataset.tipo

    checkCategory(select)

    if (select.validity.valid) {
        select.classList.remove('is-invalid')
    } else {
        select.classList.add('is-invalid')
        select.parentElement.querySelector('.invalid-feedback').innerHTML = showErrorMessage(inputType, select)
    }
    return;
}

const errorMessages = {
    sltCategoria: {
        valueMissing: 'O campo nome não pode estar vazio.',
        customError: 'Categoria inválida'
    },
    txtDescricao: {
        valueMissing: 'O campo nome não pode estar vazio.',
        customError: 'Informação inválida.'
    },
    txtValor: {
        valueMissing: 'Preencha este campo',
        customError: 'Valor inválido.'
    },
    txtDesconto: {
        customError: 'Inválido - Desconto maior do que o valor.'
    },
    dtVencimento: {
        valueMissing: 'informe a data de vencimento.',
        customError: 'Data inválida!'
    },
    dtLiquidacao: {
        valueMissing: 'informe a data de liquidação.',
        customError: 'Data inválida!'
    },
    txtOrigem: {
        valueMissing: 'O campo nome não pode estar vazio.',
        customError: 'Informação inválida.'
    }
}

const validators = {
    txtDescricao: input => textValidate(input),
    txtValor: input => valueValidate(input),
    txtDesconto: input => discountValidate(input),
    dtVencimento: input => checkDate(input),
    dtLiquidacao: input => checkDate(input),
    txtOrigem: input => textValidate(input)
}

const errorsType = [
    'valueMissing',
    'customError'
]

function showErrorMessage(inputType, input) {
    let message = ''
    errorsType.forEach(err => {
        if (input.validity[err]) {
            message = errorMessages[inputType][err]
        }
    })
    return message
}

const categories = {
    1: 'Moradia',
    2: 'Supermercado',
    3: 'TV/Internet/Telefone',
    4: 'Transporte',
    5: 'Lazer',
    6: 'Saúde',
    7: 'Bares e restaurantes'
}

function checkCategory(select) {
    let message ='';
    let index = Number(select.value);
    const selectedOption = select.options[index].text;

    if(!(categories[index] === selectedOption)){
        message = 'Categoria inválida';
    }
    select.setCustomValidity(message);
}



function textValidate(input) {
    let textArray = input.value.split(' ');
    let message = '';

    textArray = textArray.filter(item => item !== '');

    let len = input.value.length;

    if (textArray.length < 2 || len > 80 || isSpecialChar(input.value)) {
        message = 'Informação inválida.';
    }
    input.setCustomValidity(message);
    input.value = textArray.join(' ');
}

function isSpecialChar(myText) {
    let myTextLowerCase = myText.toLowerCase()
    let charCode = 0
  
    for (let i in myTextLowerCase) {
      charCode = myTextLowerCase.charCodeAt(i)
      if (!(charCode > 47 && charCode < 58 || // números
        charCode > 96 && charCode < 123 ||    // letras
        charCode > 223 && charCode < 247 ||   // letras acentuadas
        charCode > 248 && charCode < 383 ||   // letras acentuadas
        charCode == 32)) { //espaço
  
        return true
      }
    }
    return false
  }


let value = 0;
function valueValidate(input) {
    value = removeMaskMoney(input.value);
    value = value / 100;
    let message = '';

    if (value == 0 || value > 999999.99) {
        message = 'Valor inválido'
    }
    input.setCustomValidity(message);
}

function discountValidate(input) {
    let message = '';

    if (input.value !== 'R$ 0,00') {
        let discount = removeMaskMoney(input.value);
        discount = discount / 100;
        if (!isNaN(discount)) {
            if (discount == 0 || discount > 999999.99) {
                message = 'Valor inválido'
            } else if (discount > value) {
                message = 'Inválido - Desconto maior do que o valor.'
            }
        } else {
            message = 'Valor inválido'
        }
    }
    input.setCustomValidity(message);
}

function removeMaskMoney(input) {
    let str = input.split('.').join('').replace('R$ ', '').replace(',', '');

    return str;
}

function checkDate(input) {
    let message = '';

    let dateArray = input.value.split('/').reverse().join('-')

    dateArray = dateArray.split('-');

    if (isValidDate(dateArray[0], Number(dateArray[1]) - 1, Number(dateArray[2]))) {

        let date = new Date(input.value.split('/').reverse().join('-'));

        const year = date.getFullYear();
        const currentYear = new Date().getFullYear();

        if (date instanceof Date && isNaN(date)) {
            message = 'Data inválida!';
        }

        if (year < 1994 || year - currentYear > 50) {
            message = 'Data inválida!';
        }  
    }else{
        message = 'Data inválida!';
    }
    input.setCustomValidity(message);
}


const isValidDate = (year, month, day) => {
    const dayZone = new Date(year, month, day).toLocaleString('pt-BR', {day:'numeric', timeZone: 'UTC'});
    const monthZone = new Date(year, month, day).toLocaleString('pt-BR', {month:'numeric', timeZone: 'UTC'}) ;
    const yearZone = new Date(year, month, day).toLocaleString('pt-BR', {year:'numeric', timeZone: 'UTC'});

    return yearZone == year && monthZone == month + 1 && dayZone == day;
}
