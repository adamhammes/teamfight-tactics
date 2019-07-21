import React from "react";
import { graphql, Link } from "gatsby";

const ChampionListing = ({ data }) => {
  const champions = data.allChampionListJson.edges
    .map(edge => edge.node);

  return (
    <ul>
      {champions.map(champion => (
        <li key={champion.slug}>
          <Link to={`/champions/${champion.slug}`}>
            {champion.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ChampionListing;

export const query = graphql`
  query ChampionListing {
    allChampionListJson {
      edges {
        node {
          slug
          name
        }
      }
    }
  }
`
