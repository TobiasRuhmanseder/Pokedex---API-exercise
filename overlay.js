let interval = [0, 0, 0, 0, 0, 0];
let counter = [0, 0, 0, 0, 0, 0];
let bg;
let counterArrow;


function closeDialog() {
    closeScaleX();
    setTimeout(closeClassList, 600);
    document.getElementById('dialogId').classList = 'dialog';/* remove bordertype from class List */
    removeDialogBackground();
    resetProgressBar();
    clearAllInterval();
}

function resetProgressBar() {
    for (let i = 0; i < 6; i++) {
        document.getElementById('meterId' + i).style.transition = 'none';
        document.getElementById('meterId' + i).style.top = '100%';
    }

    document.getElementById('span-hp-Id').innerHTML = 0;
    document.getElementById('span-attack-Id').innerHTML = 0;
    document.getElementById('span-defense-Id').innerHTML = 0;
    document.getElementById('span-sAttack-Id').innerHTML = 0;
    document.getElementById('span-sDefense-Id').innerHTML = 0;
    document.getElementById('span-speed-Id').innerHTML = 0;
    setTimeout(meterIdTransition, 1000);
    key = true;
}

function meterIdTransition() {
    for (let i = 0; i < 6; i++) {
        document.getElementById('meterId' + i).style.transition = 'all 2000ms ease-in-out';
    }
}

function openDialog(i) {
    document.getElementById('overlayId').classList.remove('db-none');
    document.getElementById('bodyId').classList.add('overflow-hidden');
    setTimeout(openScaleX, 100);
    renderOverlay(i);
    counterArrow = i;
}

function renderOverlay(i) {
    let headerDialog = document.getElementById('dialog-headerId');
    let pokemonName = pokemonNames[i];
    let id = pokemonId[i];
    let abilities = pokemonAbilities[i];
    let height = pokemonHeights[i];
    let weight = pokemonWeights[i];
    let pokemonImage = pokemonImages[i];
    let backgroundImage = pokemonTypes[i][0] + '.png';
    setDialogBorder(pokemonTypes[i][0]);
    setDialogBackground(pokemonTypes[i][0]);
    setPokemonName(pokemonName);
    setPokemonId(id);
    setPokemonAbilities(abilities);
    setPokemonHeight(height);
    setPokemonWeight(weight);
    headerDialog.innerHTML = overlayContentTemplate(pokemonImage, backgroundImage);
    setTimeout(setProgressBar, 1000, i);
}

function overlayContentTemplate(pokemonImage, backgroundImage) {
    return `<img class="dialog-header-typeImage" src="img/types/${backgroundImage}" alt="">
            <img class="dialog-header-pokemon"
            src="${pokemonImage}"
            alt="">`
}

function setPokemonName(pokemonName) {
    document.getElementById('dialog-pokemon-nameId').innerHTML = pokemonName;
}

function setPokemonId(id) {
    roundId = calcId(id);
    document.getElementById('dialog-pokemon-Id').innerHTML = roundId;
}

function setPokemonAbilities(abilities) {
    let abilityId = document.getElementById('container-ability-Ids');
    abilityId.innerHTML = '';
    abilityId.innerHTML = `<td class="td-left">Abilities:</td>`;
    for (let i = 0; i < abilities.length; i++) {
        let element = abilities[i];
        abilityId.innerHTML += `<td id="dialog-pokemon-abilitesId">${element}</td>`;
    }
}

function setPokemonHeight(height) {
    document.getElementById('dialog-pokemon-heightId').innerHTML = height + 'dm';
}

function setPokemonWeight(weight) {
    weightInKg = weight / 10;
    document.getElementById('dialog-pokemon-weightId').innerHTML = weightInKg + 'kg';
}

function setDialogBorder(type) {
    let border = 'bo-' + type;
    document.getElementById('dialogId').classList.add(border);
}

function setDialogBackground(type) {
    bg = 'bg-' + type;
    for (let i = 0; i < 6; i++) {
        document.getElementById('meterId' + i).classList.add(bg);
    }
}

function removeDialogBackground(type) {
    for (let i = 0; i < 6; i++) {
        document.getElementById('meterId' + i).classList.remove(bg);
    }
}

function setProgressBar(i) {
    let hp = pokemonStats[i].hp;
    let attack = pokemonStats[i].attack;
    let defense = pokemonStats[i].defense;
    let spezialattack = pokemonStats[i].spezialattack;
    let spezialdefense = pokemonStats[i].spezialdefense;
    let speed = pokemonStats[i].speed;
    clearAllInterval();
    document.getElementById('meterId0').style.top = `${100 - (100 / (200 / hp))}%`;
    document.getElementById('meterId1').style.top = `${100 - (100 / (200 / attack))}%`;
    document.getElementById('meterId2').style.top = `${100 - (100 / (200 / defense))}%`;
    document.getElementById('meterId3').style.top = `${100 - (100 / (200 / spezialattack))}%`;
    document.getElementById('meterId4').style.top = `${100 - (100 / (200 / spezialdefense))}%`;
    document.getElementById('meterId5').style.top = `${100 - (100 / (200 / speed))}%`;
    setProgressBarNumber(hp, attack, defense, spezialattack, spezialdefense, speed);
}

function setProgressBarNumber(hp, attack, defense, spezialattack, spezialdefense, speed) {
    interval[0] = setInterval(countNumberHp, 2000 / hp, hp);
    interval[1] = setInterval(countNumberAttack, 2000 / attack, attack);
    interval[2] = setInterval(countNumberDefense, 2000 / defense, defense);
    interval[3] = setInterval(countNumberSAttack, 2000 / spezialattack, spezialattack);
    interval[4] = setInterval(countNumberSDefense, 2000 / spezialdefense, spezialdefense);
    interval[5] = setInterval(countNumberSpeed, 2000 / speed, speed);
}

function countNumberHp(hp) {
    if (counter[0] !== hp) {
        document.getElementById('span-hp-Id').innerHTML = counter[0]++;
    }
    else {
        document.getElementById('span-hp-Id').innerHTML = counter[0]++;
        clearInterval(interval[0]);
        counter[0] = 0;
        interval[0] = 0;
    }
}

function countNumberAttack(attack) {
    if (counter[1] !== attack) {
        document.getElementById('span-attack-Id').innerHTML = counter[1]++;
    }
    else {
        document.getElementById('span-attack-Id').innerHTML = counter[1]++;
        clearInterval(interval[1]);
        counter[1] = 0;
    }
}

function countNumberDefense(defense) {
    if (counter[2] !== defense) {
        document.getElementById('span-defense-Id').innerHTML = counter[2]++;
    }
    else {
        document.getElementById('span-defense-Id').innerHTML = counter[2]++;
        clearInterval(interval[2]);
        counter[2] = 0;
    }
}

function countNumberSAttack(spezialattack) {
    if (counter[3] !== spezialattack) {
        document.getElementById('span-sAttack-Id').innerHTML = counter[3]++;
    }
    else {
        document.getElementById('span-sAttack-Id').innerHTML = counter[3]++;
        clearInterval(interval[3]);
        counter[3] = 0;
    }
}

function countNumberSDefense(spezialdefense) {
    if (counter[4] !== spezialdefense) {
        document.getElementById('span-sDefense-Id').innerHTML = counter[4]++;
    }
    else {
        document.getElementById('span-sDefense-Id').innerHTML = counter[4]++;
        clearInterval(interval[4]);
        counter[4] = 0;
    }
}

function countNumberSpeed(speed) {
    if (counter[5] !== speed) {
        document.getElementById('span-speed-Id').innerHTML = counter[5]++;
    }
    else {
        document.getElementById('span-speed-Id').innerHTML = counter[5]++;
        clearInterval(interval[5]);
        counter[5] = 0;
    }
}

function nextPokemonArrow() {
    counterArrow++;
    if (counterArrow == COUNT_OF_POKEMON);
    else {
        if (counterArrow == offsetPokemonLoaded) {
            loadMorePokemonsbyClickOnArrow();
        } else {
            clearAllInterval();
            removeDialogBackground();
            resetProgressBar();
            document.getElementById('dialogId').classList = 'dialog';/* remove bordertype from class List */
            renderOverlay(counterArrow);
        }
    }
}

function previousPokemonArrow() {
    if (counterArrow == 0) {

    }
    else {
        counterArrow--;
        clearAllInterval();
        removeDialogBackground();
        resetProgressBar();
        document.getElementById('dialogId').classList = 'dialog';/* remove bordertype from class List */
        renderOverlay(counterArrow);
    }
}

function clearAllInterval() {
    for (let i = 0; i < 6; i++) {
        clearInterval(interval[i]);
        interval[i] = 0;
        counter[i] = 0;
    }
}

async function loadMorePokemonsbyClickOnArrow() {
    await getPokemonData();
    counterArrow--;
    nextPokemonArrow();
}
