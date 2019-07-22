import React from "react";

const ChampionDetails = data => {
  const champion = data.pageContext;

  const synergies = [...champion.origin, ...champion['class']];

  return (
    <>
      <h1>{champion.name}</h1>
      {synergies.join(', ')}
      <h2>Ability:</h2>
      {champion.ability.description}
    </>
  );
}

export default ChampionDetails;
