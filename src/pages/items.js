import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import { css } from "@emotion/core";
import { Image } from "../utils/index";

const tabList = css`
  list-style-type: none;
  margin: 0 1rem 0 0;
  padding: 0;

  li {
    display: flex;

    > div:first-child {
      flex-shrink: 0;
    }
  }

  li + li {
    margin-top: 1rem;
  }
`

const ItemsListing = ({ data }) => {
  const items = data.items.edges.map(edge => edge.node);

  const basicItems = items.filter(item => item.kind === 'basic');
  const [selectedItemKey, setSelectedItemKey] = useState(basicItems[0].key);

  const selectedItem = basicItems.find(item => item.key === selectedItemKey);
  const buildsInto = selectedItem.buildsInto;

  const zippedItems = basicItems.map(item => [item, buildsInto[item.key]]);
  console.log(zippedItems);

  return (
    <table style={{ fontSize: 15 }}>
      <thead>
        <tr>
          <td>&nbsp;</td>
          <td>
            <div style={{ width: `3rem`, height: `3rem`, overflow: 'hidden' }}>
              <Image src={`item-icons/${selectedItem.key}.jpg`}/>
            </div>
          </td>
          <td>
            {selectedItem.bonus}
          </td>
        </tr>
      </thead>
      <tbody>
        {zippedItems.map(([item, combined]) => (
          <tr valign="top" key={`${item.key} - ${combined.key}`}>
            <td onClick={() => setSelectedItemKey(item.key)}>
              <div style={{ width: `3rem`, height: `3rem`, overflow: 'hidden' }}>
                <Image src={`item-icons/${item.key}.jpg`}/>
              </div>
            </td>
            <td style={{ height: '3.5rem' }}>
              <div style={{ width: `3rem`, height: `3rem`, overflow: 'hidden' }}>
                <Image src={`item-icons/${combined.key}.jpg`}/>
              </div>
            </td>
            <td>
              {combined.bonus}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ItemsListing;

export const pageQuery = graphql`
  query BasicItems {
    items: allItemsJson {
     edges {
        node {
          kind
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
