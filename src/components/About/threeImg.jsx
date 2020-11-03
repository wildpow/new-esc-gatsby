import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import {
  fonts,
  fontSize,
  spacing,
  breakpoints,
  colors,
  boxShadow,
} from "../../utils/styles";

const ThreeImageRoot = styled.article`
  align-items: center;
  margin-bottom: 60px;
  p {
    color: white;
    font-family: ${fonts.serif};
    font-size: ${fontSize.sm};
    padding-top: 30px;
    padding-bottom: 30px;
    max-width: 768px;
    line-height: ${spacing[6]};
    width: 90%;
    background-color: ${colors.blue[900]};
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
  background: ${colors.blue[900]};
  .threeImageContainer {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    .image {
      height: 100%;
      width: 413px;
      max-width: 400px;
      max-height: 370px;
      box-shadow: ${boxShadow.md};
    }
  }
  @media (min-width: ${breakpoints.md}) {
    p {
      padding-top: 40px;
      padding-bottom: 40px;
      font-size: ${fontSize.base};
    }
  }
  @media (min-width: ${breakpoints.lg}) {
    background: linear-gradient(to bottom, ${colors.blue[900]} 65%, white 0%);
    flex-direction: column;
    .threeImageContainer {
      background-color: transparent;
      .image {
        /* height: 376px; */
        width: 413px;
        max-width: 400px;
        max-height: 370px;
      }
      .n {
        margin-top: 30px;
      }
    }
    p {
      padding-left: 0px;
      padding-right: 0px;
      padding-top: 40px;
      font-size: ${fontSize.lg};
      padding-bottom: 40px;
      max-width: 768px;
      line-height: ${spacing[8]};
    }
  }
`;

const ThreeImage = ({ threeImageText, threeImage }) => {
  return (
    <ThreeImageRoot>
      <p>{threeImageText}</p>
      <div className="threeImageContainer" style={{ maxWidth: "1320px" }}>
        {threeImage.map((img, index) => (
          <div className={`image ${index === 1 && "n"}`} key={img.filename}>
            <Img fluid={img.fluid} alt={img.alt} />
          </div>
        ))}
      </div>
    </ThreeImageRoot>
  );
};
ThreeImage.propTypes = {
  threeImageText: PropTypes.string.isRequired,
  threeImage: PropTypes.instanceOf(Array).isRequired,
};
export default ThreeImage;