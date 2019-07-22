import React from "react";
import { Link, graphql } from "gatsby";

const ItemsListing = ({ data }) => {
  const items = data.items.edges.map(edge => edge.node);
  return (
    <ul>
    {items.map(item => (
      <li key={item.key}>
        <Link to={`/items/${item.key}`}>
          {item.name}
        </Link>
      </li>
    ))}
    </ul>
  );
}

export default ItemsListing;

export const pageQuery = graphql`
  query BasicItems {
    items: allItemsJson {
      edges {
        node {
          name
          type
          key
        }
      }
    }
  }
`;
