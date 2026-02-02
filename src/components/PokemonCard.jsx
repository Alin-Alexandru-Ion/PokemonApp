import PropTypes from 'prop-types'

function extractTypeId(url) {
  return url.replace(/\/$/, '').split('/').pop();
}

export default function PokemonList({ pokemon, pokemonDetails, fadeIn, fadeOut }) {
  
  if (!pokemon)
  {
    return null
  }

  const TYPE_GRADIENTS = {
    normal:  ["#A8A77A", "#535334"],
    fire:    ["#F08030", "#793014"],
    water:   ["#6890F0", "#2d4886"],
    electric:["#F8D030", "#7e6a19"],
    grass:   ["#78C850", "#386323"],
    ice:     ["#98D8D8", "#3c6868"],
    fighting:["#C03028", "#5c1511"],
    poison:  ["#A040A0", "#4b1c4b"],
    ground:  ["#E0C068", "#695724"],
    flying:  ["#A890F0", "#473a6d"],
    psychic: ["#F85888", "#702139"],
    bug:     ["#A8B820", "#4c550c"],
    rock:    ["#B8A038", "#5e5119"],
    ghost:   ["#705898", "#35274b"],
    dragon:  ["#7038F8", "#381983"],
    dark:    ["#705848", "#362920"],
    steel:   ["#B8B8D0", "#5d5d6e"],
    fairy:   ["#EE99AC", "#794752"]
  };

  let currentAudio = null;

  const canPlayOgg = () => {
    const audio = document.createElement("audio");
    return audio.canPlayType("audio/ogg") !== "";
  };

  const playCry = (url) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = new Audio(url);
  audio.volume = 0.1;

  currentAudio = audio;

  audio.play().catch(() => {
    // Abort is expected when user clicks fast
    // Intentionally ignored
  });
};

  return (
    <div id="out-container" className={fadeOut ? `fade-out` : null}>
      <div id="in-container" className={fadeIn ? `fade-in`: null}>
        <div className='card-group'>
          {pokemonDetails.map((item) => {

            const primaryType = item.types.find(t => t.slot === 1);
            const secondaryType = item.types.find(t => t.slot === 2);

            const primaryTypeId = extractTypeId(primaryType.type.url);
            const secondaryTypeId = secondaryType
              ? extractTypeId(secondaryType.type.url)
              : null;

            const typeName = item.types.find(t => t.slot === 1)?.type.name;
            
            const [light, dark] = TYPE_GRADIENTS[typeName] || ["#ccc", "#999"];

            const patternRotation = typeName === "grass" ? "15deg" : "35deg";

            return (
            <div className="pokemon-card" key={item.id} style={{
                "--type-light": light,
                "--type-dark": dark,
                "--type-icon": `url(https://raw.githubusercontent.com/msikma/pokesprite/master/misc/type-logos/gen8/${typeName}.png)`,
                "--pattern-rotation": patternRotation
              }}
            >

              <div className="pokemon-top">

                <p className="pokemon-name">{item.name}</p>

                {canPlayOgg() && (
                  <button
                    className="pokemon-sound"
                    onClick={() =>
                      playCry(
                        `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${item.id}.ogg`
                      )
                    }
                    aria-label="Play Pokémon cry"
                  >
                    🔊
                  </button>
                )}
              </div>

                <img
                  className="pokemon-image"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`}
                  alt={item.name}
                />

                <div className="pokemon-types">
                  <img
                    className="pokemon-ptype"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${primaryTypeId}.png`}
                    alt={item.types[0].type.name}
                  />

                  {secondaryTypeId && (
                    <img
                      className="pokemon-stype"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${secondaryTypeId}.png`}
                      alt={secondaryType.type.name}
                    />
                  )}
                </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

PokemonList.propTypes = {
   pokemon: PropTypes.any,
   pokemonDetails: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
   })
  ).isRequired,
    fadeIn: PropTypes.bool.isRequired,
    fadeOut: PropTypes.bool.isRequired,
}