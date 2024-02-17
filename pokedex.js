const pokedexList = document.getElementById("pokedex");

async function fetchPokemons() {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    
    for (let i = 1; i <= 150; i++) {
        const response = await fetch(`${baseUrl}${i}`);
        const pokemon = await response.json();
        
        const pokemonInfo = {
            name: pokemon.name,
            image: pokemon.sprites['front_default'],
            type: pokemon.types.map(type => type.type.name).join(', '),
            id: pokemon.id
        };

        renderPokemon(pokemonInfo);
    }
}

fetchPokemons();

function renderPokemon(pokemon) {
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    // Eliminar espacios en blanco y convertir a minúsculas antes de agregar la clase del tipo pokemon, esto lo hago para poder poner color segun el tipo de pokemon
    const typeClass = pokemon.type.toLowerCase().replace(' ', '');
    pokemonElement.classList.add(`type-${typeClass}`);

    const pokemonInnerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <div class="info">
            <span class="number">#${pokemon.id}</span>
            <h2 class="name">${pokemon.name}</h2>
            <span class="type">Type: ${pokemon.type}</span>
        </div>
    `;
    
    pokemonElement.innerHTML = pokemonInnerHTML;
    pokedexList.appendChild(pokemonElement);
}
