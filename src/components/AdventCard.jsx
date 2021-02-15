import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated, interpolate } from "react-spring";
import { dateChecker } from "../util/helpers";
import { CardContent } from "./CardContent";

const Wrapper = styled(animated.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => {
    switch (props.cardcolour) {
      case "primary":
        return "var(--primary)";
      case "secondary":
        return "var(--secondary)";
      case "tertiary":
        return "var(--tertiary)";
      default:
    }
  }};
  width: 100%;
  height: 100%;
  cursor: ${(props) => (props.dayready === 1 ? "pointer" : "not-allowed")};
  z-index: ${(props) => (props.zindex ? props.zindex : "")};

  ${(props) =>
    props.dayready &&
    `&:hover {
      font-size: 1.25em;
    }`}

  @media (max-width: 400px) {
    width: 250px;
    height: 250px;
  }
`;

const BackgroundWrapper = styled.div`
  background: ${(props) => {
    switch (props.cardcolour) {
      case "primary":
        return "var(--primary-off)";
      case "secondary":
        return "var(--secondary-off)";
      case "tertiary":
        return "var(--tertiary-off)";
      default:
    }
  }};
  width: 150px;
  height: 150px;
  margin: 10px 35px;
  z-index: ${(props) => (props.zindex ? props.zindex : "")};

  @media (max-width: 400px) {
    width: 250px;
    height: 250px;
  }
`;

const Number = styled.p`
  font-weight: bold;
  font-size: 4.5em;
  color: ${(props) => (props.colour ? "white" : "#d6d6d6")};

  @media (max-width: 400px) {
    font-size: 8em;
  }
`;

export const AdventCard = ({ cardDetails, zindex, cardcolour }) => {
  const [open, setOpen] = useState(false);
  const [fakeOpen, setFakeOpen] = useState(false);

  const door = useSpring({
    time: open ? 1 : 0,
    config: { duration: 1000 },
  });

  const openDoor = (day) => {
    if (day) {
      setOpen(!open);

      setTimeout(() => {
        setFakeOpen(!fakeOpen);
      }, 1000);
    }
  };

  const yTransform =
    window.innerWidth < 400
      ? [0, 10, 22, 32, 45, 57, 71, 88, 104, 124, 148]
      : [0, 7, 14, 21, 28, 35, 43, 52, 62, 73, 88];

  const xTransform =
    window.innerWidth < 400
      ? [0, -8, -17, -27, -39, -53, -69, -91, -114, -144, -185]
      : [0, -5, -10, -16, -23, -31, -41, -52, -66, -84, -110];

  const dayReady = dateChecker(cardDetails.day);

  return (
    <>
      <BackgroundWrapper zindex={zindex} cardcolour={cardcolour}>
        <Wrapper
          style={{
            transform: interpolate(
              [
                door.time.interpolate({
                  range: [0, 1],
                  output: [0, 50],
                }),
                door.time.interpolate({
                  range: [0, 1],
                  output: [1, 0.4],
                }),
                door.time.interpolate({
                  range: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                  output: yTransform,
                }),
                door.time.interpolate({
                  range: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                  output: xTransform,
                }),
              ],
              (skew, scale, y, x) => {
                return `skewY(${skew}deg) scaleX(${scale}) translate(${x}px, ${y}px)`; //
              }
            ),
          }}
          role="button"
          onClick={() => {
            openDoor(dayReady);
          }}
          zindex={zindex}
          cardcolour={cardcolour}
          dayready={dayReady ? 1 : 0}
        >
          <Number colour={dayReady}>{cardDetails.day}</Number>
        </Wrapper>
      </BackgroundWrapper>
      {dayReady && open && (
        <CardContent
          cardDetails={cardDetails}
          open={open}
          setOpen={setOpen}
          fakeOpen={fakeOpen}
          setFakeOpen={setFakeOpen}
          cardcolour={cardcolour}
        />
      )}
    </>
  );
};
