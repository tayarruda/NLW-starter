// vou no site do ibge API - localidades - ufs
// querySelector procura por um elemento
// EventListener - fica ouvindo eventos - a mudança do valor 
// outro jeito de criar função () => {}
// document
// .querySelector("select[name=uf]")
// .addEventListener("change", ()=>{console.log("mudei")})


//bugs - as cidades não esta atualizando e o id nao some quando envia o formulario

function populateUFs(){
    // quero pegar o select e popular ele
    const ufSelect = document.querySelector("select[name=uf")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res)=>{return res.json()})
    .then((states)=>{
        // innerHTML é uma propriedade de elementos html
        for (const state of states){
            // esse for irá criar vários options no html preenchendo com os estados 
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex

    // target é onde o evento foi executado
    const ufValue = event.target.value
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then((res)=>{return res.json()})
    .then((cities)=>{
        // innerHTML é uma propriedade de elementos html
        citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
        for (const city of cities){
            // esse for irá criar vários options no html preenchendo com os estados 
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
        // tinha colocado o disable nele no css, entao eu desativo o disable
        citySelect.disabled = false;
    })
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)
