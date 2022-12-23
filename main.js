let $box = document.querySelector("#box");
let $form = document.getElementById("form");
let $eltype = document.getElementsByName("type");
let $elbtn = document.getElementById("btn")
let $modal = document.getElementById("modal")
let $el_iconX = document.querySelector(".aside_btn")
let el_modal = document.getElementById("modal-card")

$form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    let {
        search,
        typs,
        sort
    } = evt.target.elements

    let regex = new RegExp(search.value.trim(), "gi");

    let filteredFilms = pokemons.filter((pokemon) => pokemon.name.match(regex));

    let genreFilteredFilms = []
    if (typs.value === "all") {
        genreFilteredFilms = filteredFilms
    } else {
        genreFilteredFilms = filteredFilms.filter(pokem => pokem.type.includes(typs.value))
    }

    if (sort.value === "a-z") {
        genreFilteredFilms.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    } else {
        genreFilteredFilms.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1)
    }
    console.log(genreFilteredFilms);
    renderFilms(genreFilteredFilms, $box)
});

function renderFilms(array, element) {
    element.innerHTML = null;
    let newLi = "";

    array.forEach((pokemon) => {
        newLi += `
               <li class="card">
                  <img class="card_img" src='${pokemon.img}' alt="sjhas" >
                  <ul class="card_text">
                       <li class="name_check">
                           <h2>${pokemon.name}</h2>
                       <label class="check_heard">
                           <input class="check" type="checkbox" name="check">
                           <div onclick="likeClick(${pokemon.id})" class="heard"> &#x2764;</div>
                       </label>
                       </li>
                       <li>${pokemon.type}</li>
                       <li class="nums">
                           <strong>${pokemon.weight} </strong>
                           <strong>Agg:${pokemon.candy_count} </strong>
                       </li>
                       </ul> 
                 </li>
                          `;
    });
    element.innerHTML = newLi;
}
renderFilms(pokemons, $box);


$elbtn.addEventListener('click', () => {
    $modal.style.transform = 'scale(1)'
})



$el_iconX.addEventListener('click', () => {
    $modal.style.transform = 'scale(0)'
})


function likeClick(ids) {
    console.log(ids);
    // let logFech = pokemons.filter(item => item.id.includes(ids));
    // console.log(logFech);
    localStorage.setItem("pokemon", JSON.stringify(pokemons))
    let localGet = JSON.parse(localStorage.getItem("pokemon"))
    console.log(localGet);

    let asideLI = "";
    localGet.forEach((pokemon) => {
        asideLI += `
        <li class="card">
                  <img class="card_img" src='${pokemon.img}' alt="sjhas" >
                  <ul class="card_text">
                       <li class="name_check">
                           <h2>${pokemon.name}</h2>
                       <label class="check_heard">
                           <input class="check" type="checkbox" name="check">
                           <div onclick="likeClick(${pokemon.id})" class="heard"> &#x2764;</div>
                       </label>
                       </li>
                       <li>${pokemon.type}</li>
                       <li class="nums">
                           <strong>${pokemon.weight} </strong>
                           <strong>Agg:${pokemon.candy_count} </strong>
                       </li>
                       </ul> 
                 </li>
        `;
    });

    el_modal.innerHTML += asideLI;
}
