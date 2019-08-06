import React, { useRef, useState, useEffect } from "react";
import SynergyExplorerChampionView from "./synergy-explorer-champion-view";
import { css } from "@emotion/core";

const championListCss = css`
  padding: 0;
  margin-right: 0;
  flex-grow: 0;

  list-style-type: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    margin-bottom: 0.5rem;
  }
`;

const SynergyExplorerChampions = ({ champions, deleteChampion }) => {
  const [indexOfModifiedChampion, setIndexofModifiedChampion] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const listener = document.addEventListener("click", event => {
      if (
        containerRef.current !== null &&
        !containerRef.current.contains(event.target)
      ) {
        setIndexofModifiedChampion(null);
      }
    });

    return () => document.removeEventListener("click", listener);
  });

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
    <ul ref={containerRef} css={championListCss}>
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
    </ul>
  );
};

export default SynergyExplorerChampions;
