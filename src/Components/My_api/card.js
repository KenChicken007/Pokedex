import React, { useState } from "react";

export default function Card({ pokemon, loading }) {
  const [flippedIndex, setFlippedIndex] = useState(true);

  const flipCard = (index) => {
    setFlippedIndex(index === flippedIndex ? -1 : index);
  };

  const template = (item) => {
    return (
      <>
        {loading ? (
          "...Loading"
        ) : (
          <div className="card-front">
            <div className="image">
              <img src={item.sprites.front_default} alt="Charmander" />
            </div>
            <div className="info">
              <h1 className="name">{item.name}</h1>
              <div className="type">
                {item.types.map((poke) => {
                  return <h2 key={poke.slot}>{poke.type.name}</h2>;
                })}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const pokeinfo = (item) => {
    return (
      <div className="card-back">
        <div className="details">
          <h2>Weight: {item.weight + " kg"}</h2>
          <h2>Height: {item.height + " cm"}</h2>
          <div className="stats">
            {item.stats.map((poke, index) => {
              return (
                <>
                  <span>
                    <h2 key={index}>{poke.stat.name}:</h2>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={poke.base_stat}
                      disabled
                    />
                  </span>
                </>
              );
            })}
          </div>
          <div className="ability">
            <h1>Abilities:</h1>
            {item.abilities.map((poke, index) => {
              return <h2 key={index}>{poke.ability.name}</h2>;
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="box">
        {pokemon.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`Card ${index === flippedIndex ? "flipped" : ""}`}
              onClick={() => flipCard(index)}
            >
              <div className="card-inner">
                {template(item)}
                {pokeinfo(item)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
