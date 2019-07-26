import React, { useState, useEffect } from "react";
import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";

// Usage:
//
// const isDesktop = useMatchMedia('(min-width: 1000px)');
// if (isDesktop) { ... }
const useMatchMedia = rawMediaQuery => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia(rawMediaQuery);
    setMatch(matchMedia.matches);

    const listener = matchMedia.addListener(e => setMatch(e.matches));

    return () => matchMedia.removeListener(listener);
  }, [rawMediaQuery]);

  return match;
};

const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  return isMounted;
};

function renderImage(file) {
  return <Img fluid={file.node.childImageSharp.fluid} />;
}

const Image = function(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          images: allFile(
            filter: { extension: { regex: "/jpeg|jpg|png|gif/" } }
          ) {
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
        const imageData = images.edges.find(
          image => image.node.relativePath === props.src
        );
        if (imageData) {
          return renderImage(imageData);
        }

        console.error(`Could not find image with path ${props.src}`);
        console.log("Available images:");
        console.log(images.edges.map(edge => edge.node.relativePath));
        return null;
      }}
    />
  );
};

export { Image, useMatchMedia, useIsMounted };
