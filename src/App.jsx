import React, { useState } from "react";
import "./styles/styles.css";
import { AdventBody, Welcome } from "./components";
import styled from "styled-components";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

const CustomModal = styled(Modal)`
  transition: opacity 5s ease-in;
  position: absolute;
  top: 25%;
  left: 25%;
  right: auto;
  bottom: auto;

  width: 50vw;
  height: 50vh;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: column;

  border-radius: 10px;
  outline: none;

  @media (max-width: 400px) {
    width: 100vw;
    height: 70vh;

    top: 20%;
    left: 0%;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 20px;
  top: 20px;
  background: none;
  width: 60px;
  height: 60px;
  border-style: hidden;
  border-radius: 100%;
  cursor: pointer;

  &:focus,
  :hover {
    outline: none;
    background: #909090;
  }

  & svg {
    color: white;
    width: 3em;
    height: 3em;
  }

  @media (max-width: 400px) {
    width: 40px;
    height: 40px;

    & svg {
      color: white;
      width: 3em;
      height: 3em;
    }
  }
`;

const App = () => {
  const [welcome, setWelcome] = useState(
    sessionStorage.getItem("ADVENT_WELCOME") === "false" ? false : true
  );

  const closeWelcome = () => {
    setWelcome(false);
    sessionStorage.setItem("ADVENT_WELCOME", false);
  };

  return (
    <main id="main">
      <AdventBody />
      <CustomModal
        isOpen={welcome}
        onRequestClose={() => {
          closeWelcome();
        }}
        contentLabel={`Flick's Advent GIFmas`}
        style={{
          overlay: {
            background: "rgb(0, 0, 0, 0.65)",
            zIndex: 990,
          },
        }}
        parentSelector={() => document.querySelector("#main")}
        appElement={document.querySelector("#root")}
        closeTimeoutMS={500}
      >
        <Welcome />
        <CloseButton
          onClick={() => {
            closeWelcome();
          }}
        >
          <MdClose />
        </CloseButton>
      </CustomModal>
    </main>
  );
};

export default App;
