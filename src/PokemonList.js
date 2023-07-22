import React from 'react'

export default function PokemonList({pokemon}) {

    if (!pokemon)
    {
        return null
    }

  return (
    <div>
        {pokemon?.map(p => (
            <div key={p}> {p} </div>
        ) )}
    </div>
  )
}
