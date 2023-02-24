"use strict";

console.log(">> Ready :)");

const btnSearch = document.querySelector(".js-search");

let prueba = [];

function handleClickSearch(ev) {
    ev.preventDefault();

    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then((response) => response.json())
        .then((data) => {
            console.log(data.drinks);
            prueba = data.drinks.map((a) => ({
                name: a.strDrink,
                img: a.strDrinkThumb,
            }));
            console.log(prueba);
        });
}

btnSearch.addEventListener("click", handleClickSearch);