import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";

const synergyBonusesStyles = css`
  td:first-of-type {
    min-width: 1rem;
  }
`;

const SynergyView = ({ synergy }) => (
  <>
    <h2>{synergy.name}</h2>
    {synergy.description && <p>{synergy.description}</p>}
    <table>
      <tbody css={synergyBonusesStyles}>
        {synergy.bonuses.map(bonus => (
          <tr key={bonus.needed}>
            <td>
              <strong>({bonus.needed})</strong>
            </td>
            <td>{bonus.effect}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

const synergyListStyles = css`
  list-style-type: none;
  padding: 1rem 2rem 2rem;
  margin: 0;
`;

const SynergiesPage = ({ data }) => {
  const synergies = data.synergies.edges.map(edge => edge.node);

  return (
    <ul css={synergyListStyles}>
      {synergies.map(synergy => (
        <li key={synergy.key}>
          <SynergyView synergy={synergy} />
        </li>
      ))}
    </ul>
  );
};

export default SynergiesPage;

export const pageQuery = graphql`
  query AllSynergies {
    synergies: allSynergiesJson {
      edges {
        node {
          bonuses {
            effect
            needed
          }
          description
          key
          name
        }
      }
    }
  }
`;
