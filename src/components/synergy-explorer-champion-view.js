import React from "react";
import { css } from "@emotion/core";
import classNames from "classnames";

import { Image } from "../utils/index";
import { IconTrash } from "../components/icons";

const containerStyles = css`
  position: relative;
  width: 10rem;
`;

const optionsContainerStyles = css`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  color: red;

  position: absolute;
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
  transition: opacity 0.3s;
  cursor: pointer;
`;

const imageContainerStyles = css`
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;

  border-radius: 50%;
  overflow: hidden;

  position: relative;

  > svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  > .champion-image {
    opacity: 0.1;
  }

  > * {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s;

    &.visible {
      opacity: 1;
      pointer-events: initial;
    }
  }
`;

const SynergyExplorerChampionView = ({
  champion,
  modifyingChampion,
  onClick,
  deleteMe
}) => {
  return (
    <>
      <div css={containerStyles} onClick={onClick}>
        <div css={contentStyles}>
          <div css={imageContainerStyles}>
            <IconTrash
              onClick={deleteMe}
              size={30}
              className={classNames({ visible: modifyingChampion })}
            />
            <Image
              src={`champion-icons/${champion.slug}.jpg`}
              className={classNames("champion-image", {
                visible: !modifyingChampion
              })}
            />
          </div>
          {champion.name}
        </div>
      </div>
    </>
  );
};

export default SynergyExplorerChampionView;
