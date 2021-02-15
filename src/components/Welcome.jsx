import React, { useState } from "react";
import styled from "styled-components";
import { Home1, Home2, Home3, Home4, Home5, Home6 } from "../assets";
import { useSpring, animated } from "react-spring";

const Wrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  color: white;
  font-size: 7em;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  bottom: ${(props) => (props.position ? props.position : "0")}px;
`;

const SmallerContent = styled.div`
  width: 100%;
  text-align: center;
  font-size: 0.25em;
  font-family: "Roboto", sans-serif;
  font-style: italic;
  position: relative;
  bottom: ${(props) => (props.position ? props.position : "0")}px;
`;

const HomeImage = styled(animated.div)`
  position: fixed;
  top: 20%;
  height: 20vh;
  width: 20vw;
  ${(props) => (props.side === "left" ? "left: 5%;" : "right: 5%;")}
`;

const KiaImg = styled.img`
  width: 100%;
`;

export const Welcome = () => {
  const [resetRotate, setResetRotate] = useState(false);

  const rotate1 = useSpring({
    from: { transform: "rotate(-10deg)" },
    to: { transform: "rotate(10deg)" },
    onRest: () => {
      setResetRotate(!resetRotate);
    },
    reverse: resetRotate,
    reset: resetRotate,
    config: { duration: 4000 },
  });

  const rotate2 = useSpring({
    from: { transform: "rotate(10deg)" },
    to: { transform: "rotate(-10deg)" },
    reverse: resetRotate,
    reset: resetRotate,
    config: { duration: 4000 },
  });

  if (!sessionStorage.getItem("KIA_IMG")) {
    const imgArr = [Home1, Home2, Home3, Home4, Home5, Home6];

    let img1 = Math.floor(Math.random() * imgArr.length);
    let img2 = Math.floor(Math.random() * imgArr.length);

    while (img1 === img2) {
      img2 = Math.floor(Math.random() * imgArr.length);
    }

    sessionStorage.setItem(
      "KIA_IMG",
      JSON.stringify([imgArr[img1], imgArr[img2]])
    );
  }

  const image1 = JSON.parse(sessionStorage.getItem("KIA_IMG"))[0];
  const image2 = JSON.parse(sessionStorage.getItem("KIA_IMG"))[1];

  return (
    <Wrapper>
      {window.innerWidth < 400 ? (
        <>
          <Content>Flick's</Content>
          <Content position="20">Advent</Content>
          <Content position="40">Calendar</Content>
          <SmallerContent position="40">2020</SmallerContent>
        </>
      ) : (
        <>
          <Content>Flick's Advent</Content>
          <Content position="20">Calendar</Content>
          <SmallerContent position="20">2020</SmallerContent>
          <HomeImage side="left" style={rotate1}>
            <KiaImg src={image1} alt="IT'S KIA" />
          </HomeImage>
          <HomeImage side="right" style={rotate2}>
            <KiaImg src={image2} alt="KIA AGAIN" />
          </HomeImage>
        </>
      )}
    </Wrapper>
  );
};
