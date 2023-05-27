import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./card";
import Page from "./Page";
import Search from "./search";
import Header from "./header";

export default function Main() {
  const [pokeData, setPokeData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filteredPokemon, setFilteredPokemon] = useState("");
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  const gotoNext = () => {
    setUrl(nextUrl);
    window.scrollTo(0, 0);
  };

  const gotoPrev = () => {
    setUrl(prevUrl);
    window.scrollTo(0, 0);
  };

  async function fetchpoke() {
    setLoading(true);
    const result = await axios.get(url).then((res) => res.data);
    setNextUrl(result.next);
    setPrevUrl(result.previous);
    const data = Promise.all(
      result.results.map(async (item) => {
        const poke = await axios.get(item.url).then((res) => res.data);
        return poke;
      })
    );
    return data;
  }

  useEffect(() => {
    fetchpoke().then((poke) => {
      setPokeData(poke);
      setLoading(false);
    });
  }, [url]);

  return (
    <>
      <Header />
      <Search pokemon={pokeData} setFilteredPokemon={setFilteredPokemon} />
      <Card
        pokemon={filteredPokemon.length < 1 ? pokeData : filteredPokemon}
        isLoading={isLoading}
      />
      <Page
        gotoNext={nextUrl ? gotoNext : null}
        gotoPrev={prevUrl ? gotoPrev : null}
      />
    </>
  );
}
