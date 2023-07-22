import React, {useState} from "react";
import PokemonList from "./PokemonList";

function App() {
  const [pokemon, setPokemon] = useState(["pikachu", "meow"])
  return (
    <PokemonList pokemon = {pokemon} />
  );
}

export default App;
