import React, {useState, useEffect} from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=9");
  const [pokemonUrl, setPokemonUrl] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [loadFirst, setLoadFirst] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [ball, setBall] = useState(true);
  const [aux, setAux] = useState(true);

  //  Initial data fetch using Axios also used for pagination
  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p => p.name ));
      setPokemonUrl(res.data.results.map(p => p.url));
      setTimeout(() => setLoading(false), 3000);   // 3000ms time of timeout to assure that the resources are properly loaded
      setLoadFirst(true);
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
        };
      }
      fetchPokemonData();
    }
  }, [pokemonUrl, loadFirst])

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );


  //  Delayed Pagination & Animation trigger
  const nextButtonPress = async event => {
      setFadeOut(true);
      setTimeout(() => setFadeOut(false), 1200);

      await delay(850);

      setBall(true);
      setTimeout(() => setBall(false), 3200);
      setAux(true);
      setTimeout(() => setAux(false), 3200);
      setCurrentPageUrl(nextPageUrl);
      setFadeIn(true);
      setTimeout(() => setFadeIn(false), 6200);
  }

  //Delayed Pagination & Animation trigger
  const prevButtonPress = async event => {
    setFadeOut(true);
    setTimeout(() => setFadeOut(false), 1200);

    await delay(850);

    setBall(true);
    setTimeout(() => setBall(false), 3200);
    setAux(true);
    setTimeout(() => setAux(false), 3200);
    setCurrentPageUrl(prevPageUrl);
    setFadeIn(true);
    setTimeout(() => setFadeIn(false), 6200);
}

  //  Loading Pokeball animation
  if (loading) {
    return (
    <div id="pokeball" className={ball ? `ball` : null}>
      <div id="pokeball_button" className={aux ? `aux` : null}></div>
    </div>
    )
  }

  return (
    <>
      <PokemonList 
        pokemon={pokemon} 
        pokemonDetails={pokemonDetails} 
        fadeIn={fadeIn} 
        fadeOut={fadeOut}
      />
      <Pagination 
        accessNextPage = {nextPageUrl ? nextButtonPress : null}
        accessPrevPage = {prevPageUrl ? prevButtonPress : null}
        fadeIn = {fadeIn}
        fadeOut = {fadeOut}
      />
    </>
  );
}

export default App;