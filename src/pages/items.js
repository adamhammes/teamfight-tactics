import React, { useState } from "react";
import { graphql } from "gatsby";
import { Image, useMatchMedia, useIsMounted } from "../utils/index";
import { css } from "@emotion/core";
import Tippy from "@tippy.js/react";
import "./tippy.css";

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

const ItemTooltip = ({ item, children }) => (
  <Tippy
    key={item.key}
    arrow={true}
    maxWidth="10rem"
    content={
      <>
        <div>
          <strong>{item.name}</strong>
        </div>
        <div>{item.bonus}</div>
      </>
    }
  >
    {children}
  </Tippy>
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

  table {
    border-spacing: 0;
  }

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
            <ItemTooltip key={item.key} item={item}>
              <td>
                <ItemImage item={item} />
              </td>
            </ItemTooltip>
          ))}
        </tr>
      </thead>
      <tbody>
        {itemGrid.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <ItemTooltip key={rowIndex} item={basicItems[rowIndex]}>
              <td>
                <ItemImage item={basicItems[rowIndex]} />
              </td>
            </ItemTooltip>
            {row.map(combinedItem => (
              <ItemTooltip key={combinedItem.key} item={combinedItem}>
                <td>
                  <ItemImage item={combinedItem} />
                </td>
              </ItemTooltip>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ItemsListing = ({ data }) => {
  const isMounted = useIsMounted();
  const isDesktop = useMatchMedia("(min-width: 500px)");

  const items = data.items.edges.map(edge => edge.node);
  console.log(items[0]);

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
