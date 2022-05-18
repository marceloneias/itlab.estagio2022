let saldTot = 0
let despTot = 0

let descricao, valor, desconto, dtVenc, dtLiq, origem

listaId = ['txtDescricao', 'txtValor', 'desconto', 'dtVenc', 'dtLiq', 'origem']
listaCampos = [descricao, valor, desconto, dtVenc, dtLiq, origem]

function removeMask(val) {
    // LIMPAR MÁSCARA DE FORMATAÇÃO
    const n1$ = val.replace('R$ ', '')
    const n1Com = n1$.replace(',', '')
    const n1Dot = n1Com.replace('.', '')
    const valor = parseFloat(n1Dot)

    return valor
} 

function cadastrar() {
    let saldo, despesa
    saldo = despesa = 0

    const tn1 = document.getElementById('valor')
    const tn2 = document.getElementById('desconto')

    const n1 = tn1.value
    const n2 = tn2.value

    const valor = removeMask(n1)
    let desc = 0

    if (n2 != '') {
        desc = removeMask(n2)
    }

    var radios = document.getElementsByName("radio");
    tipo = ''
    // VERIFICA SE DESCONTO É MAIOR QUE VALOR
    if (n1 != '') {
        if (desc > valor) {
            alert('Desconto maior que o Valor da movimentação!')
        } else {
            // SELECIONA A RECEITA OU DESPESA PARA CÁLC
            if (n1 != '') {
                if (radios[0].checked) {
                    tipo = radios[0].value
                    saldo = valor
                    if (n2 != '') {
                        saldo -= desc
                    }
                }

                if (radios[1].checked) {
                    tipo = radios[1].value
                    saldo -= valor
                    despesa += valor
                    if (n2 != '') {
                        despesa -= desc
                        saldo += desc
                    }
                }
            }
            validador(tipo, saldo, despesa)
        }
    }

}

function validador(tipo, saldo, despesa) {
    if (
        document.getElementById('txtDescricao').value != '' &&
        document.getElementById('valor').value != '' &&
        document.getElementById('dtVenc').value != '' &&
        document.getElementById('dtLiq').value != '' &&
        document.getElementById('origem').value != ''
    ) {
        addRegister(tipo, saldo, despesa)
        $('#element').toast('show')
        limpaCampos()
    } else {
        saldo = 0
        despesa = 0
        alert('Preencha todos os campos obrigatórios *')
    }

}

// LIMPAR PREENCHIMENTO 
function limpaCampos() {
    document.getElementById('radio1').checked = true

    for (let i in listaId) {
        document.getElementById(listaId[i]).value = ''
    }
}

// MÁSCARA DE MOEDA
$(function () {
    $('#valor').maskMoney();
    $('#desconto').maskMoney();
})

// INSERE DADOS NA TABELA
let n = 0

function addRegister(type, saldo, despesa) {
    var resSaldo = document.getElementById('totSaldo')
    var resDesc = document.getElementById('totDesp')

    n += 1
    var registro = document.getElementById('dados')

    let linha = document.createElement('tr')

    let head = document.createElement('th')
    head.setAttribute('scope', 'row')
    head.innerText = n

    let tipo = document.createElement('td')
    tipo.innerText = type

    registro.appendChild(linha)
    linha.appendChild(head)
    linha.appendChild(tipo)

    for (let i in listaCampos) {
        listaCampos[i] = document.createElement('td')
        listaCampos[i].innerText = document.getElementById(listaId[i]).value
        linha.appendChild(listaCampos[i])
    }

    // RETORNA OS VALORES EM CARD: INFORMAÇÕES GERAIS
    saldTot += saldo
    despTot += despesa
    resSaldo.innerText = saldTot / 100
    resDesc.innerText = despTot / 100
}
