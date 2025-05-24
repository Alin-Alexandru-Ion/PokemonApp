import React from 'react'
import PropTypes from 'prop-types'

export default function PokemonList({ pokemon, pokemonDetails, fadeIn, fadeOut }) {
  
  if (!pokemon)
  {
    return null
  }

  return (
    <div className={fadeOut ? `fade-out` : null}>
      <div className={fadeIn ? `fade-in`: null}>
        <div className='card-group'>
          {pokemonDetails.map((item) => (
            <div className="pokemon-card" key={item.id}>
              <img className="pokemon-image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} alt=''/>
              <p className="pokemon-name">{item.name}</p>
            </div>
          ))}
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