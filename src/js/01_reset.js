/* eslint-disable quotes */
"use strict";
const reset = document.querySelector(".js-reset");

function handleClickReset(ev) {
  const prueba = document.querySelectorAll(".js-titlecocktails");

  console.log("click");
  ev.preventDefault();
  localStorage.removeItem("ListFavorite");
  ulList.innerHTML = "";
  ulFavorite.innerHTML = "";
  input.value = "";
  handleClickSearch(ev);

  for (const element of prueba) {
    element.classList.remove("color");
  }
}

reset.addEventListener("click", handleClickReset);
