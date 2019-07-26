import React from "react";
import { graphql, Link } from "gatsby";
import { css } from "@emotion/core";
import { Image } from "../utils/index";

const listStyle = css`
  list-style-type: none;
  padding: 0.5rem;
  margin: 0;

  li {
    display: flex;

    a {
      margin-left: 1rem;
      align-self: center;
    }
  }

  li + li {
    margin-top: 1rem;
  }
`;

const ChampionListing = ({ data }) => {
  const champions = data.allChampionListJson.edges.map(edge => edge.node);

  return (
    <ul css={listStyle}>
      {champions.map(champion => (
        <li key={champion.slug}>
          <div
            style={{
              width: `3rem`,
              height: `3rem`,
              borderRadius: "50%",
              overflow: "hidden"
            }}
          >
            <Image
              src={`champion-icons/${champion.slug}.jpg`}
              height="100"
              width="100"
            />
          </div>
          <Link to={`/champions/${champion.slug}`}>{champion.name}</Link>
        </li>
      ))}
    </ul>
  );
};

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
`;
