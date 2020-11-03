import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { NodeGroup } from "react-move";
import star from "../../images/stars.svg";
import { FadeIn } from "../../styles/mainStyles";
import {
  breakpoints,
  fontSize,
  spacing,
  colors,
  radius,
  boxShadow,
} from "../../utils/styles";

const ReviewWrapper = styled.div`
  height: 400px;
  padding: 4em 30px;
  width: 85%;
  margin: 0 auto;
  border-top: 20px solid ${colors.blue[900]};
  border-bottom: 20px solid ${colors.blue[900]};
  /* border-radius: ${radius.large}px; */
  /* box-shadow: ${boxShadow.sm}; */
  border: 20px solid ${colors.blue[900]};
  .relativeWrapper {
    height: 100%;
  }

  animation-name: ${FadeIn};
  ${(props) => props.theme.Animation};

  .stars-image {
    height: 22px;
    align-self: center;
    justify-self: center;
  }
  @media (min-width: ${breakpoints.sm}) {
  }
  @media (min-width: 768px) {
    .stars-image {
      height: 30px;
    }
  }
  @media (min-width: 1024px) {
    .stars-image {
      height: 35px;
    }
  }
  @media (min-width: 1366px) {
    .stars-image {
      height: 45px;
    }
  }
`;

const InsideWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  /* margin: 0 auto; */
  /* max-width: 680px; */
  text-align: center;
  /* padding-right: 5px;
  padding-left: 5px; */
  @media (min-width: 568px) {
    /* padding-right: 20px;
    padding-left: 20px; */
  }
  @media (min-width: ${breakpoints.md}) {
    /* height: calc(300px - 27px); */
  }
  @media (min-width: ${breakpoints.lg}) {
    /* max-width: 900px; */
    /* height: calc(300px - 27px); */
  }
  @media (min-width: ${breakpoints.xl}) {
    /* max-width: 1100px; */
  }
`;

const Review = styled.p`
  font-family: ${(props) => props.theme.MainFont3};
  line-height: 1.3em;
  font-size: 14px;
  font-weight: 300;
  color: #2d3e50;
  /* text-align: center; */
  justify-self: center;
  align-content: center;
  justify-self: center;
  justify-items: center;
  align-items: center;
  margin: 14px auto;
  @media (min-width: ${breakpoints.sm}) {
    font-size: ${fontSize.lg};
    line-height: ${spacing[8]};
  }
  @media (min-width: ${breakpoints.md}) {
    margin: 22px auto;
    font-size: ${fontSize["2xl"]};
    line-height: ${spacing[8]};
  }
  @media (min-width: ${breakpoints.lg}) {
    /* line-height: 1.4em;
    font-size: 28px; */
  }
`;
const Name = styled.span`
  font-family: ${(props) => props.theme.MainFont1};
  font-weight: 700;
  line-height: 21px;
  font-size: 12px;
  color: ${(props) => props.theme.newColor2};
  text-align: center;
  justify-self: center;
  @media (min-width: ${breakpoints.sm}) {
    font-size: ${fontSize.base};
    line-height: ${spacing[8]};
  }
  @media (min-width: ${breakpoints.md}) {
    letter-spacing: 0.05rem;
  }
  @media (min-width: ${breakpoints.lg}) {
    font-size: ${fontSize.lg};
    letter-spacing: 0.05rem;
  }
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Reviews = ({ maxIndex, content }) => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * maxIndex - 1) + 1,
  );
  const [isRunning, setIsRunning] = useState(true);
  useInterval(
    () => {
      setCurrentIndex(maxIndex === currentIndex ? 0 : currentIndex + 1);
    },
    isRunning ? 6000 : null,
  );
  return (
    <ReviewWrapper
      onMouseEnter={() => setIsRunning(false)}
      onMouseLeave={() => setIsRunning(true)}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img
          className="stars-image"
          src={star}
          alt="E.S.C mattress centers average review is 5 stars"
        />
        <NodeGroup
          style={{ position: "relative" }}
          data={[currentIndex]}
          keyAccessor={(d) => d}
          start={() => ({
            opacity: 0,
          })}
          enter={() => ({
            opacity: [1],
            timing: { duration: 1000 },
          })}
          update={() => ({
            opacity: [1],
            timing: { duration: 1000 },
          })}
          leave={() => ({
            opacity: [0],
            timing: { duration: 200 },
          })}
        >
          {(nodes) => (
            <div style={{ position: "relative" }} className="relativeWrapper">
              {nodes.map(({ key, data, state: { opacity } }) => (
                <div
                  key={key}
                  style={{ opacity, position: "relative" }}
                  className="relativeWrapper"
                >
                  <InsideWrapper>
                    <Review>{content[data].comment}</Review>
                    <Name>{`- ${content[data].nameOfReviewer} `}</Name>
                  </InsideWrapper>
                </div>
              ))}
            </div>
          )}
        </NodeGroup>
      </div>
    </ReviewWrapper>
  );
};
Reviews.propTypes = {
  maxIndex: PropTypes.number.isRequired,
  content: PropTypes.instanceOf(Object).isRequired,
};

export default Reviews;
