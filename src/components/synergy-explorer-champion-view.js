import React from "react";
import { css } from "@emotion/core";

import { Image } from "../utils/index";

const containerStyles = css`
  display: flex;
  align-items: center;
`;

const imageContainerStyles = css`
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;

  border-radius: 50%;
  overflow: hidden;
`;

const SynergyExplorerChampionView = ({ champion }) => {
  return (
    <>
      <div css={containerStyles}>
        <div css={imageContainerStyles}>
          <Image
            src={`champion-icons/${champion.slug}.jpg`}
            height="100"
            width="100"
          />
        </div>
        {champion.name}
      </div>
    </>
  );
};

export default SynergyExplorerChampionView;
