export default async function fetchRandomPokemonData() {
  try {
    const randomPokemonIds = generateRandomPokemonIds(10); // Generate 10 random Pokemon IDs
    const pokemonDataArray = [];

    // Fetch details for each random Pokémon
    for (const id of randomPokemonIds) {
      const detailsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

      if (!detailsResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const detailsData = await detailsResponse.json();

      const pokemonName = detailsData.name;
      const pokemonSprite = detailsData.sprites.other["official-artwork"].front_default;

      const pokemonData = {
        name: pokemonName,
        sprite: pokemonSprite,
        isClicked: false,
      };

      pokemonDataArray.push(pokemonData);
    }

    return pokemonDataArray;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}

function generateRandomPokemonIds(count) {
  const randomPokemonIds = [];
  while (randomPokemonIds.length < count) {
    const randomId = Math.floor(Math.random() * 898) + 1; // Generate a random Pokemon ID
    if (!randomPokemonIds.includes(randomId)) {
      randomPokemonIds.push(randomId); // Add unique random IDs to the array
    }
  }
  return randomPokemonIds;
}
