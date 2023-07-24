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

  //  Initial data fetch using Axios also used for pagination
  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name ))
      setPokemonUrl(res.data.results.map(p => p.url))
      setTimeout(() => setLoading(false), 2500);   // 500ms time of timeout to assure that the resources are properly loaded
      setLoadFirst(true)
    }).catch((error) => {
      setLoading(false);
      console.log('Error occurred:', error);
  })

    return () => cancel.cancel

  }, [currentPageUrl])


  //  Second data fetch for individual Pokemon
  useEffect(() => {
    if (loadFirst)  {
      const fetchPokemonData = async () => {
        const promises = pokemonUrl.map(url => axios.get(url));
        try {
          const responses = await Promise.all(promises);
          const pokemonData = responses.map(response => response.data);
          setPokemonDetails(pokemonData)
        } catch (error) {
          console.log('Error fetching Pokemon Data:', error);
        }
      }
      fetchPokemonData()
    }
  }, [pokemonUrl, loadFirst])


  //  Pagination & Animation trigger
  function accessNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  //  Pagination & Animation trigger
  function accessPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  //  Loading Pokeball animation
  if (loading) 
    return (
    <div className="pokeball">
      <div className="pokeball_button"></div>
    </div>
    )

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