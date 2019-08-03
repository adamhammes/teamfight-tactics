import React, { useState } from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";

import ChampionSelector from "../components/champion-selector";
import synergyCalculator from "../utils/synergy-calculator";

const synergyExplorerCss = css`
  display: flex;
`;

const championPickerCss = css`
  margin-right: 2rem;
  flex-grow: 0;
`;

const championListCss = css`
  margin-right: 2rem;
  flex-grow: 0;
`;

const synergyListCss = css``;

const SynergyExplorer = ({ data }) => {
  const champions = data.champions.edges.map(edge => edge.node);
  const synergies = data.synergies.edges.map(edge => edge.node);

  const [selectedChampions, setSelectedChampions] = useState([]);

  const achievedSynergies = synergyCalculator(synergies, selectedChampions);

  const onSelectChampion = champion => {
    setSelectedChampions([...selectedChampions, champion]);
  };

  return (
    <div css={synergyExplorerCss}>
      <div css={championPickerCss}>
        <ChampionSelector
          champions={champions}
          onSelectChampion={onSelectChampion}
        />
      </div>

      <ul css={championListCss}>
        {selectedChampions.map(champion => (
          <li key={champion.slug}>{champion.name}</li>
        ))}
      </ul>
      <ul css={synergyListCss}>
        {achievedSynergies.map(({ synergy, bonus }) => (
          <li key={synergy.key}>
            <div>
              <strong>{synergy.name}</strong>
            </div>
            <p>{bonus.effect}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SynergyExplorer;

export const pageQuery = graphql`
  query SynergyExplorer {
    champions: allChampionListJson {
      edges {
        node {
          slug
          name
          ability {
            description
            name
          }
          class
          origin
          cost
        }
      }
    }
    synergies: allSynergiesJson {
      edges {
        node {
          bonuses {
            effect
            needed
            exclusive
          }
          description
          key
          name
        }
      }
    }
  }
`;
