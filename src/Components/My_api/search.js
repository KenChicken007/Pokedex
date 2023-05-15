import axios from "axios";
import { useState, useEffect, useRef } from "react";

const Search = ({ setFilteredPokemon }) => {
  const [searchQuery, setsearchQuery] = useState("");
  const [allData, setAlldata] = useState([]);
  const num = useRef(0);

  async function fetchAllPoke() {
    const allPoke = [];
    let nexUrl = "https://pokeapi.co/api/v2/pokemon";
    while (nexUrl) {
      const result = await axios
        .get(nexUrl)
        .then((res) => res.data)
        .catch((error) => console.log(error));
      nexUrl = result.next;
      allPoke.push(...result.results);
    }
    const data = Promise.all(
      allPoke.map(async (item) => {
        const poke = await axios
          .get(item.url)
          .then((res) => res.data)
          .catch((error) => console.log(error));
        return poke;
      })
    );
    return data;
  }

  useEffect(() => {
    if (num.current < 1) {
      fetchAllPoke().then((data) => {
        setAlldata(data);
        console.log("Data: ", data);
      });
      num.current += 1;
    }
  }, []);

  function HandleSearch() {
    const filteredPokemon = allData.filter((poke) => {
      return poke.name.includes(searchQuery.toLowerCase());
    });
    if (filteredPokemon.length < 1) {
      alert("No Such Pokemon Found");
    } else {
      setFilteredPokemon(filteredPokemon);
    }
  }

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Pikachu"
          value={searchQuery}
          className="SearchInp"
          onChange={(e) => setsearchQuery(e.target.value)}
        />
        <button
          className="SearchBtn"
          onClick={
            searchQuery.length < 1 ? setFilteredPokemon("") : HandleSearch
          }
        >
          Search
        </button>
      </div>
    </>
  );
};
export default Search;
