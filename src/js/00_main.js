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

  console.log(valueInput);

  if (valueInput) {
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
  } else {
    searchmargarita();
  }
}

btnSearch.addEventListener("click", handleClickSearch);

// Pintar el listado

function renderList(cockails) {
  ulList.innerHTML = "";
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
    titleElement.setAttribute("class", "titlecocktails js-titlecocktails");
    imgElement.setAttribute("class", "imgcocktails");
    liElement.setAttribute("class", "listcoktails ");
    liElement.setAttribute("id", `${list.id}`);

    imgElement.setAttribute("alt", "cocktail image");
    imgElement.setAttribute("title", "select cocktail");

    titleElement.appendChild(titleContent);

    liElement.append(titleElement, imgElement);

    liElement.addEventListener("click", handleClickList);

    ulList.append(liElement);

    const favorite = cockailsFavorite.find((element) => element.id === list.id);
    console.log(favorite);

    if (favorite) {
      titleElement.classList.add("color");
    } else {
      titleElement.classList.remove("color");
    }
  }
}

// Función pintar listado Favorito

function renderListFavorite(cockails) {
  ulFavorite.innerHTML = "";
  for (const list of cockails) {
    const liElement = document.createElement("li");
    const titleElement = document.createElement("h3");
    const imgElement = document.createElement("img");
    const deleteElement = document.createElement("i");

    const titleContent = document.createTextNode(`${list.name}`);
    // const deleteConctent = document.createTextNode("X");
    if (list.img) {
      imgElement.setAttribute("src", `${list.img}`);
    } else {
      imgElement.setAttribute(
        "src",
        "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
      );
    }
    deleteElement.setAttribute("class", " fa-regular fa-trash-can delete-x");
    titleElement.setAttribute("class", "titlecocktails");
    imgElement.setAttribute("class", "imgcocktails");
    liElement.setAttribute("class", "listcoktails ");
    // liElement.setAttribute("id", `${list.id}`);
    // deleteElement.setAttribute("class", "");

    deleteElement.setAttribute("id", `${list.id}`);

    imgElement.setAttribute("alt", "favorite cocktail image");
    imgElement.setAttribute("title", "favorite cocktail");

    titleElement.appendChild(titleContent);
    // deleteElement.appendChild(deleteConctent);
    deleteElement.addEventListener("click", handleClickFavorite);

    liElement.append(titleElement, imgElement, deleteElement);

    ulFavorite.append(liElement);
  }
}

// FUNCIÓN LISTA DE CÓCTELES

function handleClickList(ev) {
  // console.log(cockailsFavorite);
  ev.preventDefault();
  const idContent = ev.currentTarget.id;

  // Cambia al pintar
  // const prueba = document.querySelectorAll(".js-titlecocktails");
  // const titlecocktails = document.querySelector(".js-titlecocktails");

  const h3Element = ev.currentTarget.querySelector(".js-titlecocktails");

  // Agrega en la lista de favoritos el selecionado

  const searchCocktails = cockailsList.find(
    (element) => element.id === idContent
  );

  const indexCoktails = cockailsFavorite.findIndex(
    (palette) => palette.id === idContent
  );

  if (indexCoktails === -1) {
    cockailsFavorite.push(searchCocktails);
    h3Element.classList.add("color");
  } else {
    cockailsFavorite.splice(indexCoktails, 1);
    h3Element.classList.remove("color");
  }
  renderListFavorite(cockailsFavorite);

  localStorage.setItem("ListFavorite", JSON.stringify(cockailsFavorite));
}

// Carga del localstorage

function listLocalStore() {
  const listLocalstorage = JSON.parse(localStorage.getItem("ListFavorite"));

  if (listLocalstorage) {
    cockailsFavorite = listLocalstorage;
    renderListFavorite(listLocalstorage);
  }
}

listLocalStore();

// FUNCIÓN LISTA FAVORITOS CÓCTELES

function handleClickFavorite(ev) {
  ev.preventDefault();

  const idContent = ev.currentTarget.id;

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
  renderList(cockailsList);
  localStorage.setItem("ListFavorite", JSON.stringify(cockailsFavorite));
}
