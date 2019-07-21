module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "original_data/champion-list.json"
      }
    },
    "gatsby-transformer-json",
  ]
}
