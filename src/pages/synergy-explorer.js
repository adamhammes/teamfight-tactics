import React, { useState } from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";

import ChampionSelector from "../components/champion-selector";
import synergyCalculator from "../utils/synergy-calculator";
import SynergyExplorerChampionView from "../components/synergy-explorer-champion-view";

const synergyExplorerCss = css`
  display: flex;
`;

const championPickerCss = css`
  margin-right: 2rem;
  flex: 0 0 20rem;

  display: flex;
  flex-direction: column;
`;

const championListCss = css`
  padding: 0;
  margin-right: 0;
  flex-grow: 0;

  list-style-type: none;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  li {
    flex: 1 0 50%;
  }

  li + li {
    margin-top: 0.5rem;
  }
`;

const synergyListCss = css`
  list-style-type: none;
  padding: 0;

  li + li {
    margin-top: 2rem;
  }
`;

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
        <h2>Construct your team...</h2>
        <ChampionSelector
          champions={champions}
          onSelectChampion={onSelectChampion}
        />
        <ul css={championListCss}>
          {selectedChampions.map(champion => (
            <li key={champion.slug}>
              <SynergyExplorerChampionView champion={champion} />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>and see your synergies!</h2>
        <ul css={synergyListCss}>
          {achievedSynergies.map(({ synergy, bonus }) => (
            <li key={synergy.key}>
              <div>
                <strong>{synergy.name}</strong>
              </div>
              <p>{synergy.description}</p>
              <p>{bonus.effect}</p>
            </li>
          ))}
        </ul>
      </div>
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
