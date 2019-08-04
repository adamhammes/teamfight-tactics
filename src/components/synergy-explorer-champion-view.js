import React, { useState } from "react";
import { css } from "@emotion/core";
import classNames from "classnames";

import { Image } from "../utils/index";
import { CloseIcon } from "../components/icons";

const containerStyles = css`
  position: relative;
`;

const optionsContainerStyles = css`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  color: red;

  position: absolute;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;

  > svg {
    cursor: pointer;
    margin-left: 0.5rem;
  }

  &.visible {
    pointer-events: initial;
    opacity: 1;
  }
`;

const contentStyles = css`
  display: flex;
  align-items: center;
  opacity: 0.1;
  transition: opacity 0.3s;
  cursor: pointer;

  &.visible {
    opacity: 1;
  }
`;

const imageContainerStyles = css`
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;

  border-radius: 50%;
  overflow: hidden;
`;

const SynergyExplorerChampionView = ({ champion, deleteMe }) => {
  const [showingOptions, setShowingOptions] = useState(false);

  return (
    <>
      <div
        css={containerStyles}
        onClick={() => setShowingOptions(!showingOptions)}
      >
        <div
          className={classNames({ visible: showingOptions })}
          css={optionsContainerStyles}
        >
          <CloseIcon onClick={deleteMe} size={30} />
        </div>
        <div
          className={classNames({ visible: !showingOptions })}
          css={contentStyles}
        >
          <div css={imageContainerStyles}>
            <Image
              src={`champion-icons/${champion.slug}.jpg`}
              height="100"
              width="100"
            />
          </div>
          {champion.name}
        </div>
      </div>
    </>
  );
};

export default SynergyExplorerChampionView;
