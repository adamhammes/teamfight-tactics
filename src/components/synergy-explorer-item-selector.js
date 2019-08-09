import React, { useState } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import { IconXCircle } from "./icons";
import { Image } from "../utils";

const items = [
  "frozenmallet",
  "yuumi",
  "youmuusghostblade",
  "knightsvow",
  "darkin"
];

const Container = styled.div(
  ({ isOpen }) => css`
    position: relative;
    transition: transform 0.3s;
    transform: rotate(${isOpen ? 0 : "-45deg"});

    > svg {
      cursor: pointer;
      transition: color 0.3s;
      fill: ${isOpen ? "red" : "green"};
    }
  `
);

const TranslatedContainer = styled.div(
  ({ x, y, open }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    overflow: hidden;
    pointer-events: ${open ? "initial" : "none"};
    cursor: pointer;
    transition: opacity 0.3s, transform 0.3s;
    opacity: ${open ? 1 : 0};
    transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px));
  `
);

const itemPosition = (angle, radius, angleOffset = -90) => {
  const rads = (Math.PI * (angle + angleOffset)) / 180;
  return {
    x: Math.cos(rads) * radius,
    y: Math.sin(rads) * radius
  };
};

const Item = ({ itemKey, angle, radius, open }) => {
  console.log(angle);
  const position = open ? itemPosition(angle, radius) : { x: 0, y: 0 };

  return (
    <TranslatedContainer {...position} open={open}>
      <Image src={`item-icons/${itemKey}.jpg`} />
    </TranslatedContainer>
  );
};

const SynergyExplorerItemSelector = () => {
  const [open, setOpen] = useState(false);
  const radius = 40;
  const angles = [0, 72, 144, 216, 288];

  return (
    <Container isOpen={open}>
      {items.map((item, index) => (
        <Item
          key={item}
          itemKey={item}
          angle={angles[index]}
          radius={radius}
          open={open}
        />
      ))}
      <IconXCircle size={30} onClick={() => setOpen(!open)} />
    </Container>
  );
};

export default SynergyExplorerItemSelector;
