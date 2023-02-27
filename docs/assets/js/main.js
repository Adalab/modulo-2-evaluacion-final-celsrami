"use strict";const btnSearch=document.querySelector(".js-search"),input=document.querySelector(".js-input"),ulList=document.querySelector(".js-ul"),ulFavorite=document.querySelector(".js-ul-favorite");let cockailsList=[],cockailsFavorite=[];function searchmargarita(){fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita").then(t=>t.json()).then(t=>{cockailsList=t.drinks.map(t=>({name:t.strDrink,img:t.strDrinkThumb,id:t.idDrink})),renderList(cockailsList)})}function handleClickSearch(t){t.preventDefault(),ulList.innerHTML="";const e=input.value.toLowerCase();console.log(e),e?fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+e).then(t=>t.json()).then(t=>{cockailsList=t.drinks.map(t=>({name:t.strDrink,img:t.strDrinkThumb,id:t.idDrink})),renderList(cockailsList)}):searchmargarita()}function renderList(t){ulList.innerHTML="";for(const e of t){const t=document.createElement("li"),i=document.createElement("h3"),c=document.createElement("img"),s=document.createTextNode(""+e.name);e.img?c.setAttribute("src",""+e.img):c.setAttribute("src","https://via.placeholder.com/210x295/ffffff/666666/?text=TV"),i.setAttribute("class","titlecocktails js-titlecocktails"),c.setAttribute("class","imgcocktails"),t.setAttribute("class","listcoktails "),t.setAttribute("id",""+e.id),c.setAttribute("alt","cocktail image"),c.setAttribute("title","select cocktail"),i.appendChild(s),t.append(i,c),t.addEventListener("click",handleClickList),ulList.append(t);const a=cockailsFavorite.find(t=>t.id===e.id);console.log(a),a?i.classList.add("color"):i.classList.remove("color")}}function renderListFavorite(t){ulFavorite.innerHTML="";for(const e of t){const t=document.createElement("li"),i=document.createElement("h3"),c=document.createElement("img"),s=document.createElement("i"),a=document.createTextNode(""+e.name);e.img?c.setAttribute("src",""+e.img):c.setAttribute("src","https://via.placeholder.com/210x295/ffffff/666666/?text=TV"),s.setAttribute("class"," fa-regular fa-trash-can delete-x"),i.setAttribute("class","titlecocktails"),c.setAttribute("class","imgcocktails"),t.setAttribute("class","listcoktails "),s.setAttribute("id",""+e.id),c.setAttribute("alt","favorite cocktail image"),c.setAttribute("title","favorite cocktail"),i.appendChild(a),s.addEventListener("click",handleClickFavorite),t.append(i,c,s),ulFavorite.append(t)}}function handleClickList(t){t.preventDefault();const e=t.currentTarget.id,i=t.currentTarget.querySelector(".js-titlecocktails"),c=cockailsList.find(t=>t.id===e),s=cockailsFavorite.findIndex(t=>t.id===e);-1===s?(cockailsFavorite.push(c),i.classList.add("color")):(cockailsFavorite.splice(s,1),i.classList.remove("color")),renderListFavorite(cockailsFavorite),localStorage.setItem("ListFavorite",JSON.stringify(cockailsFavorite))}function listLocalStore(){const t=JSON.parse(localStorage.getItem("ListFavorite"));t&&(cockailsFavorite=t,renderListFavorite(t))}function handleClickFavorite(t){t.preventDefault();const e=t.currentTarget.id,i=cockailsList.find(t=>t.id===e),c=cockailsFavorite.findIndex(t=>t.id===e);-1===c?cockailsFavorite.push(i):cockailsFavorite.splice(c,1),renderListFavorite(cockailsFavorite),renderList(cockailsList),localStorage.setItem("ListFavorite",JSON.stringify(cockailsFavorite))}searchmargarita(),btnSearch.addEventListener("click",handleClickSearch),listLocalStore();const reset=document.querySelector(".js-reset");function handleClickReset(t){const e=document.querySelectorAll(".js-titlecocktails");console.log("click"),t.preventDefault(),localStorage.removeItem("ListFavorite"),ulList.innerHTML="",ulFavorite.innerHTML="",input.value="",cockailsFavorite=[],handleClickSearch(t);for(const t of e)t.classList.remove("color")}reset.addEventListener("click",handleClickReset);