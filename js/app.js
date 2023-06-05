import {valida} from "./validacao.js";

const inputs = document.querySelectorAll('input');/*Com o querySelector all estamos querendo pegar todos os 
inputs e para isso podemos passar a tag como parâmetro. */

inputs.forEach(input => {
     //Para obter essa máscara acessamos o github do codemarcos.
    //Criamos um if que verifica se o campo que está sendo digitado é o do preço, se for iremos exevutar o if que recebe uma função SimpleMaskMoney que recebe dois parâmetros input e os argumentos são objetos, os argumentos irão definir a formatação da máscara.
    if(input.dataset.tipo === 'preco'){
        SimpleMaskMoney.setMask(input, {
            // afterFormat(e) { console.log('afterFormat', e); }, Não queremos um console.log por isso tiramos.
            // allowNegative: false, Pergunta se esse campo terá valores negativos e não queremos.
            // negativeSignAfter: false, Não precisamos de valores negativos.
            prefix: 'R$ ', //Significa o que vem antes do número
            // suffix: '',Significa o que vem depois do número
            fixed: true, //Receberemos valores fixos.
            fractionDigits: 2,//Número de casas décimais.
            decimalSeparator: ',', //O décimal separador será a virgula.
            thousandsSeparator: '.',//Separador de milhar.
            cursor: 'end' //Os números irão aparecer apartir do final.
        })
    }


    //Antes de ocorrer o evento listener vou executar uma condição que irá verificar se o input é o do preço
    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
    /*Fazemos um laço forEach pegando o valor do input e fazendo uma arow funciton que recebe o input com um
    evento blur, que é quando o campo perde o foco e como segundo parâmetro passamos o evento que recebe também
    uma arow funtion que recebe a funçã valida que recebe como parâmetro o evento.target que verifica qual 
    elemento foi clicado*/
})