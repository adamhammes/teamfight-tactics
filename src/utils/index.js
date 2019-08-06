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

function renderImage(file, props) {
  return <Img fluid={file.node.childImageSharp.fluid} {...props} />;
}

const Image = function({ src, ...props }) {
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
                  fluid(maxWidth: 96) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
            }
          }
        }
      `}
      render={({ images }) => {
        const imageData = images.edges.find(
          image => image.node.relativePath === src
        );
        if (imageData) {
          return renderImage(imageData, props);
        }

        console.error(`Could not find image with path ${src}`);
        console.log("Available images:");
        console.log(images.edges.map(edge => edge.node.relativePath));
        return null;
      }}
    />
  );
};

export { Image, useMatchMedia, useIsMounted };
