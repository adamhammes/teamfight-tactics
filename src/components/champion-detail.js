import React from "react";

const ChampionDetails = data => {
  const champion = data.pageContext;
  return <div>{champion.name}</div>
}

export default ChampionDetails;
