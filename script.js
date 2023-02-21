let pokemonNames = [];
let pokemonImages = [];
let pokemonTypes = [];
let pokemonAbilities = [];
let pokemonId = [];
let pokemonStats = [];
let pokemonHeights = [];
let pokemonWeights = [];
let cache = [];
const COUNT_OF_POKEMON = 1008;
let offsetPokemonLoaded = 0;
let currentPokemonLoaded = 18;
let loadingPokemonId;
let scrollOn = 1;

async function getPokemonData() {
    startPokemonData();
    ifEndpoint();
    for (let i = offsetPokemonLoaded + 1; i < currentPokemonLoaded + 1; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        response = await response.json();
        names = response.species.name;
        images = response.sprites.other['official-artwork'].front_default;
        id = response.id;
        height = response.height;
        weight = response.weight;
        stats = addStatsToJson(response);
        pokemonNames.push(names);
        pokemonImages.push(images);
        pokemonStats.push(stats);
        pokemonId.push(id);
        pokemonHeights.push(height);
        pokemonWeights.push(weight);
        filterTypesfromAPI(response);
        filterAbilitiesfromAPI(response);
    }
    endPokemonData();
}

function startPokemonData() {
    scrollOn = 0;
    document.getElementById('loader-container').classList = '';
}

function endPokemonData() {
    renderPokemonToCards();
    currentPokemonLoaded += 20;
    offsetPokemonLoaded = currentPokemonLoaded - 20;
    scrollOn = 1;
    document.getElementById('loader-container').classList = 'db-none';
}

function ifEndpoint() {
    if (currentPokemonLoaded > COUNT_OF_POKEMON) currentPokemonLoaded = COUNT_OF_POKEMON;
    if (offsetPokemonLoaded > COUNT_OF_POKEMON) offsetPokemonLoaded = COUNT_OF_POKEMON;
}

function filterTypesfromAPI(response) {
    let cache = [];

    for (let i = 0; i < response.types.length; i++) {
        let type = response.types[i].type.name;
        cache.push(type);
    }
    pokemonTypes.push(cache);
}

function filterAbilitiesfromAPI(response) {
    let cache = [];

    for (let i = 0; i < response.abilities.length; i++) {
        let abilities = response.abilities[i].ability.name;
        cache.push(abilities);
    }
    pokemonAbilities.push(cache);
}

function addStatsToJson(response, i) {
    let stats = {
        'hp': response.stats[0].base_stat,
        'attack': response.stats[1].base_stat,
        'defense': response.stats[2].base_stat,
        'spezialattack': response.stats[3].base_stat,
        'spezialdefense': response.stats[4].base_stat,
        'speed': response.stats[5].base_stat
    }
    return stats
}

function openScaleX() {
    document.getElementById('dialogId').style.transform = 'scaleX(1)';
}

function closeScaleX() {
    document.getElementById('dialogId').style.transform = 'scaleX(0)';
}

function closeClassList() {
    document.getElementById('overlayId').classList.add('db-none');
    document.getElementById('bodyId').classList.remove('overflow-hidden');
}

function doNotClose(event) {
    event.stopPropagation();
}

function barLoader() {

    document.getElementById('meterId1').style.top = '50%';
    document.getElementById('meterId2').style.top = '20%';
}

function filterPokemonsBySearching() {
    let search = document.getElementById('inputId').value;
    search = search.toLowerCase();
    if (search == '') {
        scrollOn = 1;
        renderPokemonToCards();
        offsetPokemonLoaded = (currentPokemonLoaded - 20);
    } else {
        scrollOn = 0;
        offsetPokemonLoaded = 0;
        document.getElementById('card-containerId').innerHTML = '';
        indexesOfSearching(search);
        window.scrollTo(0, 0);
    }
}

function indexesOfSearching(search) {
    let indexesOfSearching = [];
    for (let i = 0; i < pokemonNames.length; i++) {
        let name = pokemonNames[i];
        if (name.toLowerCase().includes(search)) indexesOfSearching.push(i);
    }

    for (let i = 0; i < indexesOfSearching.length; i++) {
        renderPokemonToCardsBySearching(indexesOfSearching[i]);

    }
}