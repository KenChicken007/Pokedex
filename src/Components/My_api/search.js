import axios from "axios";
import { useState, useRef } from "react";

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

  async function storeData() {
    if (allData.length < 1) {
      await fetchAllPoke().then((data) => {
        setAlldata(data);
        console.log("Data: ", data);
      });
    }
  }

  // useEffect(() => {
  //   if (num < 1) {
  //     fetchAllPoke().then((date) => {
  //       setAlldata(data);
  //       console.log("Data: ", data);
  //     });
  //   }
  // }, []);

  const HandleSearch = async () => {
    await storeData();

    const filteredPokemon = allData.filter((poke) => {
      return poke.name.includes(searchQuery.toLowerCase());
    });
    if (filteredPokemon.length < 1) {
      alert(
        `${num.current > 1 ? "No Such Pokemon Found" : "Click Search Again"}`
      );
    } else {
      setFilteredPokemon(filteredPokemon);
    }
    num.current++;
    console.log(num);
    console.log("Filtered pokemon: ", filteredPokemon);
  };

  // async function HandleSearch() {
  //   const res = await fetch(
  //     `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
  //   );
  //   const jSON = await res.json();
  //   console.log(jSON);
  // }

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
            searchQuery.length < 1 ? () => setFilteredPokemon("") : HandleSearch
          }
        >
          Search
        </button>
      </div>
    </>
  );
};
export default Search;
