import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { CardTitle, CardDetail, CardGif } from "./CardComponents";

const CustomModal = styled(Modal)`
  transition: opacity 5s ease-in;
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%)
    rotate(${Math.random() > 0.5 && "-"}${Math.ceil(Math.random() * 3)}deg);

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

  width: 50vw;
  height: 30vw;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: column;

  border-radius: 10px;
  border: 3px solid
    ${(props) => {
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
  outline: none;

  @media (max-width: 400px) {
    width: 70vw;
    height: 55vh;
  }
`;

export const CardContent = ({
  cardDetails,
  open,
  setOpen,
  fakeOpen,
  setFakeOpen,
  cardcolour,
}) => {
  return (
    <CustomModal
      isOpen={fakeOpen}
      onRequestClose={() => {
        setOpen(!open);
        setFakeOpen(!fakeOpen);
      }}
      contentLabel={`Day ${cardDetails.day} GIF`}
      style={{
        overlay: {
          background: "rgb(0, 0, 0, 0.65)",
          zIndex: 998,
        },
      }}
      cardcolour={cardcolour}
      parentSelector={() => document.querySelector("#main")}
      appElement={document.querySelector("#root")}
      closeTimeoutMS={500}
    >
      <CardTitle
        cardcolour={cardcolour}
        cardDetails={cardDetails}
        setOpen={setOpen}
        setFakeOpen={setFakeOpen}
      />
      <CardDetail cardDetails={cardDetails} />
      <CardGif cardDetails={cardDetails} cardcolour={cardcolour} />
    </CustomModal>
  );
};
