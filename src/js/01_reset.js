/* eslint-disable quotes */
"use strict";
const reset = document.querySelector(".js-reset");

function handleClickReset(ev) {
  console.log("click");
  ev.preventDefault();
  localStorage.removeItem("ListFavorite");
  ulList.innerHTML = "";
  ulFavorite.innerHTML = "";
  input.value = "";
  handleClickSearch(ev);
}

reset.addEventListener("click", handleClickReset);
