import React, { useState } from "react";
import SynergyExplorerChampionView from "./synergy-explorer-champion-view";

const SynergyExplorerChampions = ({ champions, deleteChampion }) => {
  const [indexOfModifiedChampion, setIndexofModifiedChampion] = useState(null);

  const onChampionClick = index => {
    if (indexOfModifiedChampion === null) {
      setIndexofModifiedChampion(index);
    } else {
      setIndexofModifiedChampion(null);
    }
  };

  const _deleteChampion = index => {
    if (index === indexOfModifiedChampion) {
      setIndexofModifiedChampion(null);
    }

    deleteChampion(index);
  };

  return (
    <>
      {champions.map((champion, index) => (
        <li key={champion.slug}>
          <SynergyExplorerChampionView
            champion={champion}
            deleteMe={() => _deleteChampion(index)}
            modifyingChampion={index === indexOfModifiedChampion}
            onClick={() => onChampionClick(index)}
          />
        </li>
      ))}
    </>
  );
};

export default SynergyExplorerChampions;
