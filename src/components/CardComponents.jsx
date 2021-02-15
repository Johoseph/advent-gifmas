import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const Wrapper = styled.div`
  font-family: Roboto;
  color: white;
  font-size: 1.3em;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  padding: 20px;
  min-height: 60px;
`;

const TitleBlock = styled.div`
  width: 100%;
  display: flex;
  height: 35px;
  flex-direction: row;
  padding: 20px 0px;
  background: ${(props) => {
    switch (props.cardcolour) {
      case "primary":
        return "var(--primary)";
      case "secondary":
        return "var(--secondary)";
      case "tertiary":
        return "var(--tertiary)";
    }
  }};
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  font-family: Roboto;
  color: white;
  padding-left: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 400px) {
    padding-left: 0px;
    font-size: 1.5em;
  }
`;

const CloseButton = styled.button`
  position: relative;
  background: none;
  outline: none;
  border-style: hidden;
  width: 40px;
  height: 35px;
  justify-content: center;
  align-items: center;
  right: 15px;
  display: flex;
  cursor: pointer;
  border-radius: 100%;

  &:hover,
  &:focus {
    background: ${(props) => {
      switch (props.cardcolour) {
        case "primary":
          return "var(--primary-off)";
        case "secondary":
          return "var(--secondary-off)";
        case "tertiary":
          return "var(--tertiary-off)";
      }
    }};
  }

  & svg {
    width: 1.75em;
    height: 1.75em;
    color: white;
  }
`;

const ImageWrapper = styled.div`
  display: flex
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Img = styled.img`
  height: 250px;
  border: 3px solid
    ${(props) => {
      switch (props.cardcolour) {
        case "primary":
          return "var(--primary)";
        case "secondary":
          return "var(--secondary)";
        case "tertiary":
          return "var(--tertiary)";
      }
    }};
  border-radius: 8px;

  @media (max-width: 400px) {
    height: ${(props) => (props.day === 21 ? "90" : "115")}px;
  }
`;

export const CardGif = ({ cardDetails, cardcolour }) => {
  return (
    <ImageWrapper>
      <Img
        src={cardDetails.gif}
        alt={`Day ${cardDetails.day} gif`}
        cardcolour={cardcolour}
        day={cardDetails.day}
      />
    </ImageWrapper>
  );
};

export const CardDetail = ({ cardDetails }) => {
  return <Wrapper>{cardDetails.content}</Wrapper>;
};

export const CardTitle = ({
  cardcolour,
  cardDetails,
  setFakeOpen,
  setOpen,
}) => {
  return (
    <>
      <TitleBlock cardcolour={cardcolour}>
        <Title>{cardDetails.title}</Title>
        <CloseButton
          cardcolour={cardcolour}
          onClick={() => {
            setOpen(false);
            setFakeOpen(false);
          }}
        >
          <MdClose />
        </CloseButton>
      </TitleBlock>
    </>
  );
};
