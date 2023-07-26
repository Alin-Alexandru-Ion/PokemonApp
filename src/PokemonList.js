import React from 'react'

export default function PokemonList({ pokemon, pokemonDetails, fadeIn, fadeOut }) {
  
  if (!pokemon)
  {
    return null
  }

  return (
    <div className={fadeOut ? `fade-out` : null}>
      <div id="card-group" className={fadeIn ? `fade-in`: null}>
      {pokemonDetails.map((item) => (
        <div id="card" key={item.id}>
          <img id="picture" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} alt=''/>
          <p id="text">{item.name}</p>
        </div>
      ))}
      </div>
    </div>
  )
}