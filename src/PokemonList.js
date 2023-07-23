import React from 'react'

export default function PokemonList({pokemon}) {
  
  if (!pokemon)
  {
    return null
  }

  const testUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`
  const restUrl = `.png`

  return (
    <div>
      <div class="card-group">
          {pokemon?.map(p => (
              <div class="card" key={p}> 
                <div>{p}</div>
                <img src={testUrl + {p} + restUrl} alt=''/>
              </div>
          ) )}
      </div>
    </div>
  )
}
