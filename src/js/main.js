/* eslint-disable quotes */
"use strict";

const btnSearch = document.querySelector(".js-search");
const input = document.querySelector(".js-input");
const ulList = document.querySelector(".js-ul");
const ulFavorite = document.querySelector(".js-ul-favorite");

let cockailsList = [];
let cockailsFavorite = [];

// Función buscador por defecto margarita al cargar la página

function searchmargarita() {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then((response) => response.json())
    .then((data) => {
      cockailsList = data.drinks.map((a) => ({
        name: a.strDrink,
        img: a.strDrinkThumb,
        id: a.idDrink,
      }));
      renderList(cockailsList);
    });
}

searchmargarita();

// Función buscador de listado de cócteles

function handleClickSearch(ev) {
  ev.preventDefault();
  ulList.innerHTML = "";
  const valueInput = input.value.toLowerCase();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${valueInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      cockailsList = data.drinks.map((a) => ({
        name: a.strDrink,
        img: a.strDrinkThumb,
        id: a.idDrink,
      }));
      renderList(cockailsList);
    });
}

btnSearch.addEventListener("click", handleClickSearch);

// Pintar el listado

function renderList(cockails) {
  for (const list of cockails) {
    const liElement = document.createElement("li");
    const titleElement = document.createElement("h3");
    const imgElement = document.createElement("img");

    const titleContent = document.createTextNode(`${list.name}`);

    if (list.img) {
      imgElement.setAttribute("src", `${list.img}`);
    } else {
      imgElement.setAttribute(
        "src",
        "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
      );
    }
    titleElement.setAttribute("class", "titlecocktails");
    imgElement.setAttribute("class", "imgcocktails");
    liElement.setAttribute("class", "listcoktails ");
    liElement.setAttribute("id", `${list.id}`);
    // liElement.setAttribute("class", "color");

    titleElement.appendChild(titleContent);

    liElement.append(titleElement, imgElement);

    liElement.addEventListener("click", handleClickList);

    ulList.append(liElement);
  }
}

function renderListFavorite(cockails) {
  ulFavorite.innerHTML = "";
  for (const list of cockails) {
    const liElement = document.createElement("li");
    const titleElement = document.createElement("h3");
    const imgElement = document.createElement("img");

    const titleContent = document.createTextNode(`${list.name}`);

    if (list.img) {
      imgElement.setAttribute("src", `${list.img}`);
    } else {
      imgElement.setAttribute(
        "src",
        "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
      );
    }
    titleElement.setAttribute("class", "titlecocktails");
    imgElement.setAttribute("class", "imgcocktails");
    liElement.setAttribute("class", "listcoktails ");
    liElement.setAttribute("id", `${list.id}`);

    titleElement.appendChild(titleContent);

    liElement.append(titleElement, imgElement);
    ulFavorite.append(liElement);
  }
}

// favoritos
function listLocalStore() {
  const listLocalstorage = JSON.parse(localStorage.getItem("ListFavorite"));

  if (listLocalstorage) {
    cockailsFavorite = listLocalstorage;
    renderListFavorite(listLocalstorage);
  }
}

listLocalStore();

function handleClickList(ev) {
  // console.log(cockailsFavorite);
  ev.preventDefault();
  const idContent = ev.currentTarget.id;

  // Cambia al pintar
  ev.currentTarget.classList.toggle("color");

  // Agrega en la lista de favoritos el selecionado

  const searchCocktails = cockailsList.find(
    (element) => element.id === idContent
  );

  const indexCoktails = cockailsFavorite.findIndex(
    (palette) => palette.id === idContent
  );

  if (indexCoktails === -1) {
    cockailsFavorite.push(searchCocktails);
  } else {
    cockailsFavorite.splice(indexCoktails, 1);
  }

  // Me pinta la lista de favoritos

  renderListFavorite(cockailsFavorite);

  localStorage.setItem("ListFavorite", JSON.stringify(cockailsFavorite));
}
