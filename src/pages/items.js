import React, { useState } from "react";
import { graphql } from "gatsby";
import { Image, useMatchMedia, useIsMounted } from "../utils/index";
import { css } from "@emotion/core";

const ItemImage = ({ item }) => (
  <div
    style={{
      borderRadius: "0.25rem",
      width: `3rem`,
      height: `3rem`,
      overflow: "hidden"
    }}
  >
    <Image src={`item-icons/${item.key}.jpg`} />
  </div>
);

const MobileLayout = ({ zippedItems, setSelectedItemKey, selectedItem }) => (
  <table style={{ fontSize: 15 }}>
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>
          <ItemImage item={selectedItem} />
        </th>
        <th>{selectedItem.bonus}</th>
      </tr>
    </thead>
    <tbody>
      {zippedItems.map(([item, combined]) => (
        <tr valign="top" key={`${item.key} - ${combined.key}`}>
          <td onClick={() => setSelectedItemKey(item.key)}>
            <ItemImage item={item} />
          </td>
          <td style={{ height: "3.5rem" }}>
            <ItemImage item={combined} />
          </td>
          <td>{combined.bonus}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const desktopCss = css`
  display: flex;
  justify-content: center;

  td,
  th {
    padding: 0.25rem;
  }
`;

const DesktopLayout = ({ basicItems, itemGrid }) => (
  <div css={desktopCss}>
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          {basicItems.map(item => (
            <th key={item.key}>
              <ItemImage item={item} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {itemGrid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td>
              <ItemImage item={basicItems[rowIndex]} />
            </td>
            {row.map(combinedItem => (
              <td key={combinedItem.key}>
                <ItemImage item={combinedItem} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ItemsListing = ({ data }) => {
  const isMounted = useIsMounted();
  const isDesktop = useMatchMedia("(min-width: 700px)");

  const items = data.items.edges.map(edge => edge.node);

  const basicItems = items.filter(item => item.kind === "basic");
  const [selectedItemKey, setSelectedItemKey] = useState(basicItems[0].key);

  const selectedItem = basicItems.find(item => item.key === selectedItemKey);
  const buildsInto = selectedItem.buildsInto;

  const zippedItems = basicItems.map(item => [item, buildsInto[item.key]]);

  const itemGrid = [];
  for (const firstItem of basicItems) {
    itemGrid.push([]);
    for (const secondItem of basicItems) {
      const currentRow = itemGrid[itemGrid.length - 1];
      currentRow.push(firstItem.buildsInto[secondItem.key]);
    }
  }

  if (!isMounted) {
    return null;
  }

  return isDesktop ? (
    <DesktopLayout basicItems={basicItems} itemGrid={itemGrid} />
  ) : (
    <MobileLayout
      zippedItems={zippedItems}
      selectedItem={selectedItem}
      setSelectedItemKey={setSelectedItemKey}
    />
  );
};

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
