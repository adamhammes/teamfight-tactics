module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "data/cleaned-data/champion-list.json"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "items",
        path: "data/cleaned-data/items.json"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "synergies",
        path: "data/cleaned-data/synergies.json"
      }
    },
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "src/images/"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-emotion",
    "gatsby-plugin-netlify"
  ]
};
