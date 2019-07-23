import React from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';

function renderImage(file) {
  return <Img fluid={file.node.childImageSharp.fluid} />
}

const Image = function (props) {
  return <StaticQuery
    query={graphql`
      query {
        images: allFile(filter:{ extension: { regex: "/jpeg|jpg|png|gif/"}}) {
        edges {
          node {
            extension
            relativePath
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    `}
    render={({ images }) => {
      const imageData = images.edges.find(image => image.node.relativePath === props.src);
      if (imageData) {
        return renderImage(imageData)
      }

      console.error(`Could not find image with path ${props.src}`);
      console.log('Available images:');
      console.log(images.edges.map(edge => edge.node.relativePath));
      return null;
    }}
  />
}

export { Image };
