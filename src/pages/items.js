import React from "react";
import { Link, graphql } from "gatsby";

const ItemsListing = ({ data }) => {
  const items = data.items.edges.map(edge => edge.node);
  console.log(items);
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
          bonus
          stats {
            amount
            name
            title
          }
          buildsFrom {
            key
            name
          }
          buildsInto {
            bfsword {
              key
              name
              bonus
            }
            chainvest {
              bonus
              key
              name
            }
            giantsbelt {
              bonus
              key
              name
            }
            needlesslylargerod {
              bonus
              key
              name
            }
            negatroncloak {
              bonus
              key
              name
            }
            recurvebow {
              bonus
              key
              name
            }
            spatula {
              bonus
              key
              name
            }
            tearofthegoddess {
              bonus
              key
              name
            }
          }
        }
      }
    }
  }
`;
