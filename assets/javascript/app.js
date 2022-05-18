import {  validate, validateSelect } from "./validation.js";

window.onload = () => {
    const inputDateVenc = document.getElementById('dtVencimento');
    const inputDateLiq = document.getElementById('dtVencimento');

    inputDateVenc.onpaste = e => e.preventDefault();
    inputDateLiq.onpaste = e => e.preventDefault();
}


const select = document.querySelector('select')
const inputs = document.querySelectorAll('input')

select.addEventListener('blur', (e) => {
  validateSelect(e.target)
})


inputs.forEach(input => {
    input.addEventListener('blur', (e) => {
        validate(e.target)
        if(input.dataset.tipo === 'txtDescricao'){
            maskMoney(inputs.item(3));
        }

        if(input.dataset.tipo === 'txtValor'){
            maskMoney(inputs.item(4));
        }
    })
})


dateInputMask(inputs.item(5))
dateInputMask(inputs.item(6))

function maskMoney(value){
    SimpleMaskMoney.setMask(value, {
        prefix: 'R$ ',
        fixed: true,
        fractionDigits: 2,
        decimalSeparator: ',',
        thousandsSeparator: '.',
        cursor: 'end'
    })
}


function dateInputMask(elm) {
    elm.addEventListener('keypress', function(e) {
      if(e.keyCode < 47 || e.keyCode > 57) {
        e.preventDefault();
      }
      
      var len = elm.value.length;
      
      // If we're at a particular place, let the user type the slash
      // i.e., 12/12/1212
      if(len !== 1 || len !== 3) {
        if(e.keyCode == 47) {
          e.preventDefault();
        }
      }
      
      // If they don't add the slash, do it for them...
      if(len === 2) {
        elm.value += '/';
      }
  
      // If they don't add the slash, do it for them...
      if(len === 5) {
        elm.value += '/';
      }
    });
  };