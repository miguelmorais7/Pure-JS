//const URL = `https://pokeapi.co/api/v2/pokemon/`;

/*const fetchPokemon = () => {
    const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemonPromises = [];

    for(let i = 1; i <= 150; i++){
        if(i === 101) break;
        pokemonPromises.push(fetch(getPokemonURL(i)).then((response) => response.json()));     
    }

    Promise.all(pokemonPromises)
        .then((pokemons) => {
            //console.log(pokemons);

            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name);
                accumulator += `
                    <li class="card ${types[0]}">
                    <img class="card-image" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" />
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join(' | ')}</p>
                    </li>
                `;
                return accumulator;
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]');

            //console.log(ul);

            ul.innerHTML = lisPokemons;
        })
}*/

//Função Refatorada
const getPokemonURL = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

/*const generatePokemonPromises = () => Array(100).fill().map((_, index) => {
        fetch(getPokemonURL(index + 1)).then((response) => response.json())
})*/

const generatePokemonPromises = () => {
    const pokemonPromises = [];

    for(let i = 1; i <= 150; i++){
        if(i === 101) break;
        pokemonPromises.push(fetch(getPokemonURL(i)).then((response) => response.json()));     
    }

    return pokemonPromises;
}

const generateHTML = (pokemons) => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = 
    types.map(typeInfo => typeInfo.type.name);
    accumulator += `
        <li class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>
    `;
    return accumulator;
}, '');


const insertPokemonsIntoPage = (pokemons) => {
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons;
}

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)

//fetchPokemon();
