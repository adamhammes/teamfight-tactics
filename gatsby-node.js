const path = require("path");

const championDetailComponent = path.resolve('./src/components/champion-detail.js');

const championDetails = `
  query ChampionDetails {
    allChampionListJson {
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
  }
`;

exports.createPages = ({ graphql, actions }) => {
  return graphql(championDetails)
    .then(result => {
      result.data.allChampionListJson.edges.forEach(({ node }) => actions.createPage({
        path: `champions/${node.slug}`,
        component: championDetailComponent,
        context: node,
      }))
    });
}
