import React from "react";
import SynergyExplorerChampionView from "./synergy-explorer-champion-view";

const SynergyExplorerChampions = ({ champions, deleteChampion }) => {
  return (
    <>
      {champions.map((champion, index) => (
        <li key={champion.slug}>
          <SynergyExplorerChampionView
            champion={champion}
            deleteMe={() => deleteChampion(index)}
          />
        </li>
      ))}
    </>
  );
};

export default SynergyExplorerChampions;
