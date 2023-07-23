import React, {useState, useEffect} from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=9")
  const [pokemonUrl, setPokemonUrl] = useState([])
  const [pokemonDetails, setPokemonDetails] = useState([])
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [loadFirst, setLoadFirst] = useState(false)

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name ))
      setPokemonUrl(res.data.results.map(p => p.url))
      setLoadFirst(true)
  }).catch((error) => {
    setLoading(false);
    console.log('Error occurred:', error);
  })

    return () => cancel.cancel

  }, [currentPageUrl])

  useEffect(() => {
    if (loadFirst)  {
      const fetchPokemonIds = async () => {
        const promises = pokemonUrl.map(url => axios.get(url));
        try {
          const responses = await Promise.all(promises);
          const pokemonIds = responses.map(response => response.data);
          setPokemonDetails(pokemonIds)
        } catch (error) {
          console.log('Error fetching Pokemon Data:', error);
        }
      }
      fetchPokemonIds()
    }
  }, [pokemonUrl, loadFirst])

  function accessNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function accessPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) 
  return <div>Loading...</div>

  return (
    <>
      <PokemonList pokemon={pokemon} pokemonDetails={pokemonDetails}/>
      <Pagination 
        accessNextPage={nextPageUrl ? accessNextPage : null}
        accessPrevPage={prevPageUrl ? accessPrevPage : null}
      />
    </>
  );
}

export default App;