export function valida (input){
    const tipoDeInput = input.dataset.tipo;/*O dataset faz a verificação de todos os datas existentes,
    precisamos colocar no final o data que queremos, nesse caso o dataset.tipo que foi o data passado no HTML */

    
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
        /*Estamos verificando se o tipo de input encontrado no data é o dataNascimento que já realizamos a 
        verificação com uma variável validadores, se for então irmenos executar o validadores que irá pegar 
    
        o tipoDoInput e irá receber o seu valor input */
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalido");
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = " ";
    } else {
        input.parentElement.classList.add("input-container--invalido");
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
        /*Aqui ele irá verificar qual o tipo do input, se é nome,email..., e verificar no objeto validity qual é o erro. */
    }
    
    
    /*Criamos dentro da função valida para que seja executada no momento que essa função for executada, o if
    está pegando o campo input e com ele acessamos a propriedade validity, que é uma propriedade que realiza
    toda a validação do formulário e podemos atráves dessa propriedade verificar quais são as mensagens de erro
    possíveis para o navegador apresentar. O .valid estamos pegando o campo que verifica se o campo está válido
    atáves do preenchimento do input. Se o campo estiver preenchido ele irá remove a mensagem de erro que foi
    criada com span no html e estilizada no css. Estamos subindo no dom atavés do input.parentElement e pegando
    a div, atráves do classList estamos acessando o css e removendo essa class com o remove. Se o campo não 
    for preenchido iremos adicionar essa classe que aparece a mensagem de erro.
    
    Estamos subindo o dom e acessando a div, com o querySelector pegamos o span através da class e vamos alterar o seu 
    texto através do innerHTML, se for true a mensagem será um campo vazio, se for false iremos colocar a mensagem 
    customizada para cada campo atráves pela função mostraMensagemDeErro.*/
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
    
    /*Aqui temos um vetor de string, estamos informando todos os erros possíveis para que ocorra a verificação e escolha
    o erro correto. */
]


const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.' 
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo senaha não pode estar vazio.',
        patternMismatch: "A senha deve conter entre 6 a 12 caracteres, pelo menos uma letra maiúscula, um número e não deve conter símbolos."
    }, 
    dataNascimento: {
        valueMissing: 'O campo data de nascimento não pode estar vazio.',
        customError: 'Você precisa ser maior que 18 anos para se cadastrar'
    },

    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.'
    },

    cep: {
        valueMissing: 'O campo de CEP não pode está vazio.',
        patternMismatch: 'O CEP digitado não é valido',
        customError: 'Não foi possível localizar o CEP.'
    },
    logradouro: {
        valueMissing: 'O campo logradouro não pode está vazio.'
    },
    cidade: {
        valueMissing: 'O campo cidade não pode está vazio.'
    }, 
    estado: {
        valueMissing: 'O campo estado não pode está vazio.'
    },

    preco: {
        valueMissing: 'O campo preço não pode está vazio.'
    }
    /*Criamos um objeto para definir as mensagens que queremos que o navegador apresente quando dê erro. 
    valueMissing significa que o campo não está preenchido e definimos uma mensagem de erro. typeMismatch 
    significa que o email digitado não está no padrão de um email. patternMismatch significa que a senha 
    não foi digitada conforme o padrão que definimos. customError é porque para dataNascimento que criamos
    não existe um erro especifico e por isso iremos usar a opção de erro customizado. */
}


const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    /*Para cada tipo de input teremos uma função diferente, criamos um objeto e caso tenhamos dentro desse 
    input o tipo dataNascimento iremos passar esse valor através do :input => para a função 
    validaDataNascimento ser executado. Quem realiza a verificação se existe o tipo dataNascimento é o if 
    acima */

    cpf:input => validaCPF(input),
    /*Estamos chamando a função validaCPF que recebe o valor do input e passa esse valor para função */

    cep:input => recuperarCEP(input)
    /*Estamos chamando a função recuperarCEP que recebe o valor do input e passa esse valor para função. Estamos pegando essas informações atráves do data-tipo="cep" */

}

/*Outra forma de fazer, mas de forma mais trabalhosa*/

/*const dataNascimento = document.querySelector('#nascimento');//Estamos pegando o input

dataNascimento.addEventListener('blur', (evento) => {
    validaDataNascimento(evento.target);
    Criamos um evento para poder executar a função, o parâmetro "blur", serve para quando o campo 
    perder o foco ele executa a função validaDataNascimento, colocamos evento.target para verificar qual foi
    o campo que perdeu o foco e mostrar para nossa aplicação
})*/


/*Com a funçao abaixo para poder saber qual a mensagem a ser inserida, precisamos saber o tipoDeInput, ou seja, se é nome,
email..., por isso passamos como parâmetro o tipoDeInput para ocorrer essa verificação e precisamos saber o tipo de erro, 
para saber precisamos do objeto validity e para obter passamos como parâmetro o input. */
function mostraMensagemDeErro (tipoDeInput, input) {
    let mensagem = " ";

    tiposDeErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    /*O laço de repetição recebe um tipo de erro e verifica dentro do input no objeto validity qual é o erro que está com 
    o valor true, se existe um erro com o valor true, ele executa o if com a mensagem que recebe como valor mensagens 
    de erro, ou seja ele irá verificar qual o erro está com o valor true e depois irá verificar no objeto mensagensDeErro
    qual é o tipo do input, se é nome, email... que está com o erro e verificar qual é o erro correspondente ao erro que
    aprensentou true. No final para ocorrer a execução da mensagem, colocamos um return. */

    return mensagem;
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value);//está pegando o valor digitado no input e passando como nova data
    let mensagem = '';//Serve para quando a data for verdadeira, não executará o if abaixo e não apresentará erro.
    
    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Você precisa ser maior que 18 anos para se cadastrar'
        /*temos uma condição, colocamos o "!" porque inicialmento o retorno que vamos ter é falso e queremos o
        inverso disso e a "!" serve para inverter.Se deixarmos sem o "!" irá apresentar a mensagem de erro caso
        o usuário seja maior que 18 e não menor de 18. Estamos pegando o valor recebido digitado pelo usuário e se
        for menor que 18 irá retornar essa mensagem, estamos fazendo essa comparação chamando a função 
        maiorQue18  e passando como parâmetro a data digitada pelo usuário*/
    }

    input.setCustomValidity(mensagem)/*Essa propriedade que faz a validação da comparação, ela precisa receber 
    um parâmetro, no caso recebe uma string que se a idade for menor que 18 irá apresentar a mensagem acima,
    mas se a idade for maior que 18 irá retornar uma string vazia.*/
}

function maiorQue18(data) {//Função que verifica se a idade é maior que 18
    const dataAtual = new Date();//Se colocarmos new Date() e não passamos nenhum parâmentro, pegamos a data atual
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())
    /*Estamos passando parâmentro para formular como queremos a data, FullYear é o ano, ou seja, estamos pegando
    o ano informado pelo usuário e somando com 18, as outras propriedades pegam o mês e o dia atual. O data 
    colocado antes das propriedades é passado no início da função e poderia ser qualquer nome, desde que esteja
    definido no início da função primeiro.*/
    return dataMais18 <= dataAtual;/*Aqui verificamos se a dataAtual é maior ou igual a dataMais18, se a dataMais18
    for maior que a dataAtual que dizer que o usuário é menor de idade, se a dataMais18 for menor que a dataAtual
    quer dizer que o usuário é maior de idade.*/
}

function validaCPF (input) {
    const cpfFormatado = input.value.replace(/\D/g, '');
    /*Estamos formatando o cpf para aceitar apenas digitos e pra isso usamos o replace que é um método do
    javaScript que alterar o valor para um padrão que passamos como parâmetro uma regex.*/

    let mensagem = '';

    console.log(checaEstruturaCPF(cpfFormatado));
    if(!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)){
        mensagem = 'O CPF digitado não é válido.'
    }
    /*O if está fazendo a verificação se o checaCPFRepetido é o igual ao cpf formatado, que o cpf digitado, se for igual
    irá apresentar a mensagem, usamos exclamação porque o if sem a exclamação o if seria executada quando o cpf realmente 
    fosse válido devido a outra condição que temos na função abaixo.*/
    input.setCustomValidity(mensagem)
    /*O set está colocando a mensagem para o usuário. */
}


function checaCPFRepetido (cpf) {/*O parâmetro que ele está recebendo é o cpf digitado pelo usuário */
    const valoresRepetidos =  [ /*Vetor com todos os números repetidos */
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido = true;/*Inicia com o valor true */

    valoresRepetidos.forEach(valor => {//Está verificando se o valoresRepetidos é igual ao cpf digitado do usuário.
        if(valor == cpf){
            cpfValido = false;
        }
    });

    return cpfValido
    //No final irá retornar o cpfValido.
}

/*Essa função checa se os CPFs são digitos iguais, para isso criamos um vetor que recebe todos os valores possíveis de 
um cpf que poderia ser igual, depois disso passando que o cpfValido é declarado como verdadeiro e fazemos um laço de 
repetição para verifica se o valor digitado pelo usuário é o mesmo do vetor, se o valor digitado for o mesmo, o CPF 
válido receberá o valor false e com isso retonaremos o cpfvalido com o valor false e ao chamar a função checaCPFRepetido
dentro da função validaCPF irá executar o if, que irá apresentar a mensagem de erro para o usuário. */
function checaEstruturaCPF (cpf) {
    const multiplicador = 10;
    // console.log(checaDigitoVerificador(cpf,multiplicador))
    return checaDigitoVerificador(cpf, multiplicador);
}

/*Com a função checaDigitoVerificador, iremos separar em duas partes, uma com os 9 primeiros digitos e outra com os digitos verificador.Isso irá garantir que conseguimos checar a estrutura de um cpf para saber se realmente tem chance de ser válido. */
function checaDigitoVerificador(cpf, multiplicador){
    if(multiplicador >= 12 ){
        return true
    } //Limita o multiplicador a no máximo 11 e com isso não iremos ficar chamando sempre a função dentro dela mesmo.
    
    let multiplicadorInicial = multiplicador; /*Declaramos multiplicador inicial, ao inves de passar o multiplicador direto porque, no momento de fazer recursão, que é chamar uma função dentro dela iria se passarmos o multiplicador diretamente ele irá sempre sobreescrever devido ao laço for.*/
    
    let soma = 0;
    
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');//Com o metodo substr é possível escolher onde inicia a posição dos digitos, colocamos que ela inicia na posição 0 e termina na posição 9, porque o multiplicador tem valor 10 - 1, pegamos a posição 9, com isso estamos pegando somente os 9 primeiros digitos
    const digitoVerificador = cpf.charAt(multiplicador - 1);/*Com o charAt conseguimos pegar a posição exata dentro do vetor, como queremos pegar a primeira posição do digito verificador, colocamos multiplicador, que vale 10, -1 e pegamos a 9 posição.   */


                        //Enquanto multiplicador for maior que 1
    for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--){
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial;
        /*Aqui estamos somando a soma + o cpfSemDigitos e passamos a 
        posição do contador, ou seja, se o contador valer zero, ele irá pegar o digito do cpfSemDigito do índice 0 e irá multiplicar pelo multiplicadorInicial. */
        contador++;/*Após a multiplicação, o contador que valia zero agora será somado com mais um e o contador passa a valer 1 e irá pegar o digito da posição 1. */
        //O laço for só irá finalizar após a verifição de todos os 9 primeiros digitos.
        //Toda vez que ocorre o laço for a soma passa a valer esse valor e ela é somada com o próximo valor do cpfSemDigito * MultplicadorInicial. Ex= a soma inicia com o valor 0, o primeiro digito do cpf digitado será 0, e o primeiro valor do mulplicador inicial é 10, somando tudo isso será 0, quando o loop inicia novamente a soma valerá 0, o segundo número do cpf digitado será 8 e o multiplicadorInicial será 9, tudo dará 72 e a soma passa a valer 72, quando o loop iniciar novamente a soma valerá 72, o terceiro cpf digitado será 4 e o multiplicador valerá 8, tudo isso dará 104. A soma sempre irá valer o último número somado.    
        
    }

    if(digitoVerificador == confirmaDigito(soma)){
        return checaDigitoVerificador(cpf, multiplicador + 1);
        /*Primeiro será executado todo o for para fazer a verificação do primeiro digito verificador, que toda a verificação do primeiro digito verificador ocorrer passaremos para o segundo digito, para isso criamos esse if porque só iremos passar para o segundo digito quando o primeiro for válido, ou seja, pegamos o digito verificador digitado pelo usuário e esse digito será comparado com o confirma digito que é a função que executa o cálculo da soma de todos os 9 digitos, se for true iremos chamar novamente a função checaDigitoVerificador, mas agora passamos que o multiplicador valerá 11, isso serve para que a gente some todos os 10 primeiros digitos do CPF, ou seja, os 9 primeiros, mas o primeiro digito verificador. Temos um if logo no início da função que quebra a sequência, porque quando ocorre a segunda verificação do digito verificador e ela fosse true iria cair novamente nesse IF e a função sempre iria ficar sendo chamado, para isso criamos um IF que quando o multiplicador valer 12, o IF será executado retornando true e isso já irá parar a função. Com o multiplicador valendo 11, quando chegar na variável cpfSemDigito comecará na posição 0 e do multiplicador será subtraido 1 e com isso pegaremos os dez primeiros digitos, ou seja, os 9 digitos + o digito verifador já válidado.*/
    }
    /*Estamos verificando com esse if se o digitoVerificador é igual ao cálculo que confirmaDigito, se for igual irá retorna a própria função checaDigitoVerificador, o chamamento de uma função dentro dela mesmo se chama recursão.*/
    return false
}


function confirmaDigito (soma) {
    // console.log(soma)
    let calculo = 11 - (soma % 11);/*recebemos o resultado da soma, que será divido por 11 e o resto desse resultado será subtraido de 11*/
    if(calculo == 11){
        calculo = 0;
    }/*Criamos esse IF por que quando o resto da divisão for 0, o resultado será 11, e com isso mesmo o CPF sendo válido ele irá retornar true porque o resultado da variável cálculo será 11, para corrigir foi necessário criar esse if para quando o resultado do cálculo for 11, o valor da variável cálculo passará a valer zero e com isso o return será true.*/
    // console.log(calculo);
    return calculo;
    
}

/*Cálculo do CPF para verificação do digito */

//123 456 789 09
/* let soma = (10 * 1) + (9 * 2) + (8 * 3) ... (2 * 9) conta para o primeiro digito verificador, começa com 10 porque é a
posição do primeiro digito verificador */
/*let soma2 = (11 * 1) + (10 * 2) + (9 * 3) ... (2 * 0) o segundo digito verificador depende da execução do primeiro, começa
com 11 por que é a posição do segundo digito verificador e no último cálculo termina com 0 porque multiplicamos também o 
primeiro digito verificador */

/* return 11 - (soma % 11) por fim, tudo isso será retornado por 11 menos o resto da soma dividido por 11. Com isso conseguiremos
definir uma regra para verificar o CPF já que não usamos a API da receita federeal para verificar a existência dele*/

function recuperarCEP (input){
    const cep = input.value.replace(/\D/g, '');
    /*Estamos fazendo a formatação dos número digitos pelo usuário, com o replace acima garantimos que tudo que não for número será trocado por uma string vazia. */

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const opcoes = {
        method: 'GET', //Temos que informar o metodo de requisição.
        mode: 'cors', //Como estamos fazendo requisição entre APIs tem que usar o cors.
        headers: {
            //É o que a gente espera de resposta dessa API, ele é um outro objeto.
            'content-type': 'application/json;charset:utf-8' //Estou garantindo que o padrão que espero receber será o utf-8
            // o headers recebe como parâmetro o content e o seu valor é o aplication
        }   
    }
   
    /*Para não fazer uma requisição com cep inválidos, vamos criar uma condição. Com essa condição se o valor digitado pelo usuário for inválido o validity vai retornar true e por isso precisamos fazer a requisição quando o valor for false, ou seja, quando o valor é false quer dizer que o valor digitado é válido. Passamos dois parâmetros para quando o usuário digita o cep inválido e quando ele deixa em branco, quando isso acontecer não será executado o if e não ocorrerá a requisição a API. */
    if(!input.validity.patternMismatch && !input.validity.valueMissing) {
        /*O fetch vai fazer a requisição e depois vamos fazer um then que vai mandar uma response=resposta e essa resposta será transformada no tipo json  */
        fetch(url, opcoes).then(
            Response => Response.json()
        ).then(
            data => {
                /*O data serve para receber os dados da API */
                /*Esse if serve para tratar o erro que acontece quando o usuário digita um CEP inválido, quando isso acontece e damos um console.log(data) aparece a mensagem erro:true e com o data.erro estamos manipulando esse erro para apresentar uma mensagem de erro para o usuário. */
                if(data.erro) {
                    input.setCustomValidity('Não foi possível localizar o CEP');
                    return

                }
                input.setCustomValidity('');
                preenchendoCamposComCEP(data);//Chamando a função que preenche os campos.
                return
            }
        )
        //O último then está recebendo a resposta no formato json e passando para a propriedade data
        /*Depois de transformar no tipo json, iremos ter uma outra função e vamos receber um data que é um objeto. É esse data que será usada para preencher as informações dos outros campos. */
    }

    /*Com essa função primeiro pegamos todos os inputs de cada campo e substituimos seu valor pelo valor do data que vem da API, para isso precisamos colocar o nome depois do data que aparece no array que é retornado quando é requisitado. */
    function preenchendoCamposComCEP(data) {
        const logradouro = document.querySelector("[data-tipo=logradouro]");
        const cidade = document.querySelector("[data-tipo=cidade]");
        const estado = document.querySelector("[data-tipo=estado]");

        logradouro.value = data.logradouro;
        cidade.value = data.localidade;
        estado.value = data.uf;

    }

    /*Iremos fazer uma requisição para a API via cep e para fazer essa requisição usamos o fetch do javaScript e pra usar precisamos passar dois parâmetros a URL e um objeto de opções */
}