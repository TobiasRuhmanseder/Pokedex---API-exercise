
function renderPokemonToCards() {
    let cardContainer = document.getElementById('card-containerId');
    for (let i = offsetPokemonLoaded; i < pokemonNames.length; i++) {
        let pokemonName = pokemonNames[i];
        let pokemonImage = pokemonImages[i];
        let cardBackgroundColor = 'bg-' + pokemonTypes[i][0];
        let cardBackgroundImage = pokemonTypes[i][0] + '.png';
        let id = calcId(pokemonId[i]);
        let cardTypes = renderTypesinCard(i, cardBackgroundColor);
        cardContainer.innerHTML += cardTemplate(pokemonName, pokemonImage, cardBackgroundColor, cardBackgroundImage, cardTypes, id, i);
        renderTypesinCard(i);
    }
}

function cardTemplate(pokemonName, pokemonImage, cardBackgroundColor, cardBackgroundImage, cardTypes, id, i) {
    return `    
        <div class="card-container ${cardBackgroundColor}" onclick=openDialog(${i});>
            <img class="card-pokemon-image"
                src="${pokemonImage}"
                alt="">
            <img class="card-type-image" src="img/types/${cardBackgroundImage}" alt="">
            <h1>${pokemonName}</h1>
            <div id="card-typesId" class="card-types">
                ${cardTypes}
                
            </div>
            <div class= card-id> #${id} </div>
        </div>
     `
}

function renderTypesinCard(i, cardBackgroundColor) {
    let types = '';
    for (let z = 0; z < pokemonTypes[i].length; z++) {
        let type = pokemonTypes[i][z];

        types += `<div class="card-type ${cardBackgroundColor} ">${type} </div>`;
    }
    return types;
}

function calcId(i) {
    if (i < 10) return `000${i}`;
    if (i >= 10 && i < 100) return `00${i}`;
    if (i >= 100) return `0${i}`;
}

function renderPokemonToCardsBySearching(i) {
    let cardContainer = document.getElementById('card-containerId');
    let pokemonName = pokemonNames[i];
    let pokemonImage = pokemonImages[i];
    let cardBackgroundColor = 'bg-' + pokemonTypes[i][0];
    let cardBackgroundImage = pokemonTypes[i][0] + '.png';
    let id = calcId(pokemonId[i]);
    let cardTypes = renderTypesinCard(i, cardBackgroundColor);
    cardContainer.innerHTML += cardTemplate(pokemonName, pokemonImage, cardBackgroundColor, cardBackgroundImage, cardTypes, id, i);
    renderTypesinCard(i);
}
