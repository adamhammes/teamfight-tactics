import React from "react";
import { css } from "@emotion/core";
import classNames from "classnames";

import { Image } from "../utils/index";
import { IconTrash, IconPlusCircle } from "../components/icons";

const items = [
  "knightsvow",
  "frozenmallet",
  "bladeoftheruinedking",
  "youmuusghostblade",
  "yuumi"
];

const containerStyles = css`
  position: relative;
  width: 15rem;

  display: flex;
  align-items: center;
`;

const addItemsContainerStyles = css`
  margin-left: auto;
`;

const imageContainerStyles = css`
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
  cursor: pointer;

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

const championNameStyles = css`
  cursor: pointer;
`;

const SynergyExplorerChampionView = ({
  champion,
  modifyingChampion,
  onClick,
  deleteMe
}) => {
  return (
    <>
      <div css={containerStyles}>
        <div css={imageContainerStyles} onClick={onClick}>
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
        <span css={championNameStyles} onClick={onClick}>
          {champion.name}
        </span>
        <div css={addItemsContainerStyles}>
          <IconPlusCircle size={30} />
        </div>
      </div>
    </>
  );
};

export default SynergyExplorerChampionView;
