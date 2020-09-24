let baseURL = 'https://pokeapi.co/api/v2/pokemon/';
let limit = '?limit=151';
let select = document.querySelector('select');
let section = document.querySelector('section');
let pokedex = document.getElementById('pokedex-entry');
let url;

let flavorURL = 'https://pokeapi.co/api/v2/pokemon-species/';

// Initialize and assign stat cells
let hp = document.getElementById('hp');
let attack = document.getElementById('attack');
let defense = document.getElementById('defense');
let specAttack = document.getElementById('spec-attack');
let specDefense = document.getElementById('spec-defense');
let speed = document.getElementById('speed');

//Add event listeners for dropdown selection
let selectDropDown = document.addEventListener('change', fetchInfo);

//Fetch list of Pokemon and populate a dropdown list
fetch(baseURL + limit)
  .then(results => {
    return results.json();
  })
  .then(json => {
    makeDropDown(json);
  });

function makeDropDown(json) {
  for (let i = 0; i < json.results.length; i++) {
    let name = json.results[i].name;
    let option = document.createElement('option');

    option.value = name;
    option.innerHTML = `<span> ${name} - ${i + 1} </span>`;

    select.appendChild(option);
  }
}

function fetchInfo(e) {
  e.preventDefault();
  let pokemon = select.value;

  url = `${baseURL}${pokemon}/`;

  fetch(url)
    .then(results => {
      return results.json();
    })
    .then(json => {
      displayImage(json);
      displayStats(json);
      fetchFlavorText(json);
    })
}

function displayImage(json) {
  console.log(json);
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  let img = document.createElement('img');
  img.src = json.sprites.front_default;
  img.width = '300';

  section.style.background = '#606060';
  section.appendChild(img);
}

function displayStats(json) {
  let hpStat = json.stats[0].base_stat;
  let attackStat = json.stats[1].base_stat;
  let defenseStat = json.stats[2].base_stat;
  let specAttackStat = json.stats[3].base_stat;
  let specDefenseStat = json.stats[4].base_stat;
  let speedStat = json.stats[5].base_stat;

  hp.innerHTML = hpStat;
  attack.innerHTML = attackStat;
  defense.innerHTML = defenseStat;
  specAttack.innerHTML = specAttackStat;
  specDefense.innerHTML = specDefenseStat;
  speed.innerHTML = speedStat;
}

function fetchFlavorText(json) {
  let pokemon = select.value;
  fetch(flavorURL + pokemon)
    .then(results => {
      return results.json();
    })
    .then(json => {
      let flavorText = json.flavor_text_entries[0].flavor_text;
      pokedex.textContent = flavorText;
      pokedex.style.background = '#606060';
    })
}