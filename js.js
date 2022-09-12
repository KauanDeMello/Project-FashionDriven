const nome = prompt("Qual é o seu nome?");
let modelo, gola, tecido, imagem;



// selecionar camisetas

function selecionarModelo(modeloSelecionado) {

    const modeloSelecionadoAntes = document.querySelector('.modelo .borda-selecionado');

    if (modeloSelecionadoAntes !== null) {
        modeloSelecionadoAntes.classList.remove('borda-selecionado');
    }

    modeloSelecionado.classList.add('borda-selecionado');

    modelo = modeloSelecionado.id;

    ativarBotaoFecharPedido();
}


function selecionarGola(golaSelecionada) {

    const golaSelecionadaAntes = document.querySelector('.gola .borda-selecionado');

    if (golaSelecionadaAntes !== null) {
        golaSelecionadaAntes.classList.remove('borda-selecionado');
    }

    golaSelecionada.classList.add('borda-selecionado');

    gola = golaSelecionada.id

    ativarBotaoFecharPedido();
}


function selecionarTecido(tecidoSelecionado) {

    const tecidoSelecionadoAntes = document.querySelector('.tecido .borda-selecionado');

    if (tecidoSelecionadoAntes !== null) {
        tecidoSelecionadoAntes.classList.remove('borda-selecionado');
    }

    tecidoSelecionado.classList.add('borda-selecionado');

    tecido = tecidoSelecionado.id

    ativarBotaoFecharPedido();
}



//botao

const button = document.querySelector('.botao')
button.disabled = true;

function ativarBotaoFecharPedido() {

    if (modelo !== undefined && gola !== undefined && tecido !== undefined && imagem !== undefined) {

        button.classList.add('pedido-confirmado')
        button.disabled = false;
    }
}


// pegar api

getAPI()

function getAPI() {

    const promise = axios.get('https://mock-api.driven.com.br/api/v4/shirts-api/shirts');
    promise.then(renderizarcamisetas);
}

//renderizarBlusa

function renderizarcamisetas(dados) {

    let box = document.querySelector('.container-order');

    box.innerHTML = 0

    for (let i = 0; i < 10; i++) {

        let blusa = dados.data[i];

        box.innerHTML +=
            ` <div class="pedidos" onclick="encomendarCriada(this)" id="${blusa.id}">
            <img src='${blusa.image}'>
            <h2><span class="bold">Criador: </span>${blusa.owner}</h2>
        </div>`
    }
}

// encomendar 

function encomendarBlusa() {

    let pedido =
    {
        model: "",
        neck: "",
        material: "",
        image: "",
        owner: "",
        author: ""
    };

    pedido.model = modelo;
    pedido.neck = gola;
    pedido.material = tecido;
    pedido.image = imagem;
    pedido.owner = nome;
    pedido.author = nome;

    console.log("esse é o pedido", pedido)

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', pedido);
    promise.then(confirmarEncomenda);
    promise.catch(erroEncomenda);
}


//confirmar

function confirmarEncomenda() {
    alert('Sua encomenda foi confirmada!')

    getAPI();
}

// encomendar

function encomendarCriada(blusinha) {

    confirm("Deseja encomendar esta blusa?")
    console.log(blusinha)
}

//encomendar post

function atualizarpedido(){

    const promiseSegunda = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts', atualizarpedido);
    promiseSegunda.then(encomendarCriada);
}


// salvar url e img

function salvarImagem() {


    let image = document.querySelector('.image');
    imagem = image.value;

    ativarBotaoFecharPedido();
}