import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Days, AdventCard, SnowJS } from "./";
import { animated, useTransition } from "react-spring";

const Wrapper = styled.div`
  width: 100hh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;

  @media (max-width: 400px) {
    padding: 20px 20px;
  }
`;

const Tree = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (min-width: 400px) {
    ${(props) =>
      props.align === "left" ? "padding-right: 100px;" : "padding-left: 100px;"}
  }
`;

const arrayShuffle = (array) => {
  return array
    .map((el) => ({ sort: Math.random(), value: el }))
    .sort((a, b) => a.sort - b.sort)
    .map((el) => el.value);
};

const mobileSort = (array) => {
  const reverseArr = array
    .filter((el, i) => {
      return el.day <= parseInt(dayjs().format("DD"));
    })
    .sort((a, b) => {
      return b.day - a.day;
    });

  const regArr = array.filter((el, i) => {
    return el.day > parseInt(dayjs().format("DD"));
  });

  return [...reverseArr, ...regArr];
};

const cardColour = (card) => {
  if (window.innerWidth < 400) {
    switch ((card + 1) % 3) {
      case 0:
        return "primary";
      case 1:
        return "secondary";
      case 2:
        return "tertiary";
      default:
    }
  } else {
    if (card < 6 || (card >= 12 && card < 18)) {
      switch ((card + 1) % 3) {
        case 0:
          return "primary";
        case 1:
          return "secondary";
        case 2:
          return "tertiary";
        default:
      }
    } else {
      switch ((card + 1) % 3) {
        case 1:
          return "primary";
        case 2:
          return "secondary";
        case 0:
          return "tertiary";
        default:
      }
    }
  }
};

const Snowflake = styled(animated.div)`
  position: fixed;
  left: ${(props) => props.left && props.left}px;
  top: 0px;
`;

const randomInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColour = () => {
  switch (Math.ceil(Math.random() * 3)) {
    case 3:
      return "var(--primary-off)";
    case 2:
      return "var(--secondary-off)";
    case 1:
      return "var(--tertiary-off)";
    default:
  }
};

export const AdventBody = () => {
  const [snowCount, setSnowCount] = useState(0);

  const fallY = window.innerHeight;
  const snowflakeColour = randomColour();
  const xAdjust = `${Math.random() > 0.5 ? "-" : ""}${Math.ceil(
    Math.random() * 10
  )}`;
  const fontSize = randomInterval(3, 8);

  const transitions = useTransition(snowCount, (snow) => snow, {
    from: {
      transform: `translateY(-40px) translateX(${xAdjust}px) rotate(0deg)`,
      color: snowflakeColour,
      fontSize: `${fontSize}em`,
    },
    enter: {
      transform: `translateY(${fallY + 40}px) translateX(${xAdjust}px) rotate(${
        Math.random() > 0.5 ? "-" : ""
      }${randomInterval(50, 350)}deg)`,
      color: snowflakeColour,
      fontSize: `${fontSize}em`,
    },
    config: { duration: randomInterval(8000, 15000) },
  });

  useEffect(() => {
    let snowTimer = setTimeout(() => {
      let newSnow = Math.floor(Math.random() * SnowJS.length);

      while (snowCount === newSnow) {
        newSnow = Math.floor(Math.random() * SnowJS.length);
      }
      setSnowCount(newSnow);
    }, 500);

    return () => {
      clearTimeout(snowTimer);
    };
  }, [snowCount]);

  let levels = [...Array(4)];
  let newDays;

  if (window.innerWidth > 400) {
    if (!localStorage.getItem("SHUFFLED_ARRAY")) {
      localStorage.setItem(
        "SHUFFLED_ARRAY",
        JSON.stringify(arrayShuffle(Days))
      );
    }

    newDays = JSON.parse(localStorage.getItem("SHUFFLED_ARRAY"));
  } else {
    newDays = mobileSort(Days);
  }

  return (
    <Wrapper>
      {transitions.map(({ item, props, key }) => (
        <Snowflake key={key} style={props} left={SnowJS[item].left}>
          {SnowJS[item].text}
        </Snowflake>
      ))}
      {levels.map((el, i) => {
        const cards = [];

        for (let j = 0; j < 6; j++) {
          cards.push(
            <AdventCard
              key={i * 6 + j}
              cardDetails={Days[newDays[i * 6 + j].day - 1]}
              zindex={26 - (i * 6 + j)}
              cardcolour={cardColour(i * 6 + j)}
            />
          );
        }

        return (
          <Tree key={i} align={i % 2 === 0 ? "left" : "right"}>
            {cards}
          </Tree>
        );
      })}
    </Wrapper>
  );
};
