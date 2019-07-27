module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "original_data/champion-list.json"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "items",
        path: "original_data/items.json"
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
