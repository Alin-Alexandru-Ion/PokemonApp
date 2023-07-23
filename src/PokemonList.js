import React from 'react'

export default function PokemonList({pokemon, pokemonDetails}) {
  
  if (!pokemon)
  {
    return null
  }
  
  return (
    <div>
      <div className="card-group">
      {pokemonDetails.map((item) => (
        <div className="card" key={item.id}>
          <h1>{item.name}</h1>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} alt=''/>
        </div>
      ))}
      </div>
    </div>
  )
}