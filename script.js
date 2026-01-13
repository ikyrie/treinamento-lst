let cartoesSection = document.getElementById("cartoes");

let filmes = [];

async function getFilmes() {
  let filmes; 
  try {
    filmes = await fetch("http://localhost:3000/movies").then((res) =>
      res.json()
    );
  } catch (error) {
    console.log(error);
  }
  return filmes
}

function createCard(filme) {
  return `
        <div class="cartao" id="${filme.id}">
          <h2>${filme.title}</h2>
          <p><span>Descrição</span>: ${filme.description}</p>
          <div class="cartao_botoes">
            <button class="botao botao--primario" id="editar">editar</button>
            <button class="botao botao--secundario" id="excluir">
              excluir
            </button>
          </div>
        </div>
  `
}

function prepareConcat(filmes) {
  let concat = "";
  filmes.forEach((filme) => {concat += createCard(filme)});
  return concat;
}

function renderCartoes(concatFilmes) {
  cartoesSection.innerHTML = concatFilmes;
}

filmes = await getFilmes();
let filmesHTML = prepareConcat(filmes);
renderCartoes(filmesHTML);

function getInputs() {
  return document.querySelectorAll("#formulario input");
}

let botaoSalvar = document.getElementById("salvar");
let formulario = document.getElementById("formulario");

formulario.onsubmit = (e) => {e.preventDefault();}

async function addMovie() {
  let endereco = "http://localhost:3000/movies";
  let metodo = "POST";
  let headers = {"Content-Type": "application/json"};
  let body = {"title": "", "description": ""};
  let inputs = getInputs();
  inputs.forEach((input, index) => {
    switch (index) {
      case 0:
        body.id = input.value
        break;

      case 1:
        body.title = input.value
        break;

      case 2:
        body.description = input.value
        break;
    
      default:
        break;
    }
  })
  await fetch(endereco, {method: metodo, body: JSON.stringify(body), headers: headers});
}

botaoSalvar.onclick = async () => {addMovie()};
