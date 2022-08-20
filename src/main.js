

import { filterSpells } from './data.js'; //Importamos las funciones.

import { sortSpells } from './data.js';

import { percentage } from './data.js';

import data from './data/harrypotter/data.js'; //Importamos la data.

const spells = data.spells;  //Declaramos una constante para la data
const firstPage = document.getElementById('firstPage'); //Traemos elementos del DOM 
const secondPage = document.getElementById('secondPage');
const spellsButton = document.getElementById("spellsButton");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");
const percentageMessage = document.getElementById("percentageMessage");
let spellsContainer = document.getElementById("spellsContainer");
const btn = document.getElementById("btn-back-to-top");
const btnLogo = document.getElementById("btnLogo");

//Funcion para imprimir las tarjetas con la data.
function cards(obj) {
    let printSpells = "";

    for (let spell of obj) {

        if (spell.spell_type !== null) {
            printSpells += `<article class="card">
                <figure class="cardImage">
                    <img class="spellsPic" src="https://www.ecipic.com/material/img/cultura-y-ocio/38673_1605530324_hechizos-de-harry-potter-2.jpg"> 
                </figure>
                <article class="cardText">
                    <h4>${spell.name}</h4>
                    <h4>Type: ${spell.spell_type}</h4>
                </article>
                </article>`;
        }

        else {
            printSpells += `<article class= "card">
            <figure class="cardImage">
                <img class="spellsPic" src="https://www.ecipic.com/material/img/cultura-y-ocio/38673_1605530324_hechizos-de-harry-potter-2.jpg"> 
            </figure>
            <article class="cardText">
                <h4>${spell.name}</h4>
            </article>    
            </article>`;
        }
    }

    //Se introducen las tarjetas en el container.
    spellsContainer.innerHTML = printSpells;
}

spellsButton.addEventListener("click", showSpells)

//Mostramos la data en la página dos.
function showSpells() {

    firstPage.style.display = "none";
    secondPage.style.display = "block";
    document.body.scroll = 0;
    document.documentElement.scrollTop = 0;
    cards(spells);
}

filterSelect.addEventListener("change", showSpellsByType)

//Mostramos la data filtrada y el mensaje de porcentaje.
function showSpellsByType() {

    firstPage.style.display = "none";
    secondPage.style.display = "block";
    let filterValue = filterSelect.value;
    let arrSpellsFiltered;
    let message;

    arrSpellsFiltered = filterSpells(spells, filterValue);
    cards(arrSpellsFiltered);

    if (filterValue !== ""){
        message = percentage(spells, arrSpellsFiltered)
        percentageMessage.innerHTML = `<article class="cardMessage">
        ${filterValue} spells represent ${message}% </article>`
    }
    else{
        percentageMessage.innerHTML = ""
    }  
}

sortSelect.addEventListener("change", showSpellsSorted)

//Mostramos la data ordenada A-Z y Z-A
function showSpellsSorted() {

    firstPage.style.display = "none";
    secondPage.style.display = "block";
    let sortValue = sortSelect.value;
    let arrSpellsSorted;

    arrSpellsSorted = sortSpells(spells, sortValue);
    cards(arrSpellsSorted);
}

//Botón back-to-top
//Cuando el usuario se desplace 20px hacia abajo desde la parte superior del documento, se muestra el botón
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

//Para volver a la página inicial

btnLogo.addEventListener("click", ()=>{
    secondPage.style.display = "none";
    firstPage.style.display = "block";
})
