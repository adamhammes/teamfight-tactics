const path = require("path");

const championDetailComponent = path.resolve('./src/components/champion-detail.js');
const itemDetailComponent = path.resolve('./src/components/item-detail.js');

const championDetails = `
  query Pages {
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
        }
      }
    }
  }
`;

exports.createPages = ({ graphql, actions }) => {
  return graphql(championDetails)
    .then(result => {
      result.data.champions.edges.forEach(({ node }) => actions.createPage({
        path: `champions/${node.slug}`,
        component: championDetailComponent,
        context: node,
      }))

      result.data.items.edges.forEach(({ node }) => actions.createPage({
        path: `items/${node.key}`,
        component: itemDetailComponent,
        context: node,
      }))
    });
}
