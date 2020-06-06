// vou no site do ibge API - localidades - ufs
// querySelector procura por um elemento
// EventListener - fica ouvindo eventos - a mudança do valor 
// outro jeito de criar função () => {}
// document
// .querySelector("select[name=uf]")
// .addEventListener("change", ()=>{console.log("mudei")})



function populateUFs() {
    // quero pegar o select e popular ele
    const ufSelect = document.querySelector("select[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then((states) => {
            // innerHTML é uma propriedade de elementos html
            for (const state of states) {
                // esse for irá criar vários options no html preenchendo com os estados 
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex

    // target é onde o evento foi executado
    const ufValue = event.target.value
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
    citySelect.disabled = true

    fetch(url)
        .then((res) => { return res.json() })
        .then((cities) => {
            // innerHTML é uma propriedade de elementos html

            for (const city of cities) {
                // esse for irá criar vários options no html preenchendo com os estados 
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            // tinha colocado o disable nele no css, entao eu desativo o disable
            citySelect.disabled = false;
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//pegar cada clique em cada item
//pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    //click é o evento que ele irá ouvir
    item.addEventListener("click", handdleSelectedItems)
}

//para atualizar o input hidden com os itens que adicionei
const collectedItems = document.querySelector("input[name=items]")
//variavel para que os itens selecionados sejam adicionados ao input hidden que criamos no html o enviar o formulario
let SelectedItems = []

//quando o evento é disparado passa para a função
function handdleSelectedItems(event) {
    //quando clicar quero adicionar uma classe e quando clicar de novo tirar essa classe
    //isso é para o css de um item selecionado funcionar
    const itemLi = event.target
    //toggle adiciona ou remove, se já tiver ele remove, se nao tiver ele adiciona
    itemLi.classList.toggle("selected")

    //configuramos data-set id no html para os li
    //quando clico no formulario no item, eu pego o id e jogo nessa variavel
    const itemId = itemLi.dataset.id

    //para enviar o formulario
    //verificar se existem itens selecionados e quais são e pegar eles
    //findIndex - procura por um index do array, o retorno é um boolean
    //se retornar true ele vai colocar na variavel alreadySelected
    const alreadySelected = SelectedItems.findIndex(item => {
        //achei o item se o item for igual ao itemId
        const itemFound = item == itemId
        return itemFound//true ou false pela condicional acima
    })
    //se ja tiver selecionado aquele item, tenho que tirar da selecao
    //esse >= 0 indica que o indice existe no array
    if (alreadySelected >= 0) {
        //filter precisa de um retorno boolean, se true adiciona no novo array, se false retira do array
        //filter roda uma função passando um elemento item, para cada item retornando um booleano
        //caso ache verdadeiro adiciona o elemento num novo array e retira ele quando o retorno for falso

        const filteredItems = SelectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        //selectedItems recebe o valor dos itens filtrados
        SelectedItems = filteredItems
    } else {    //se ainda nao tiver, vou adicionar
        //adicionar um elemento em um array
        SelectedItems.push(itemId)
    }
    //atualizo o input hidden com os itens que adicionei
    collectedItems.value = SelectedItems

}