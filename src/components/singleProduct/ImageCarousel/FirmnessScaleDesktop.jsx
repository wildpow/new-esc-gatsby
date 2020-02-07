import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import { useModalContext } from "../../layout/modalContext";

const Firmness = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25px;
  left: 0;
  display: ${props => (props.isMobile ? "none" : "flex")};
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  background: white;
  border-top: 2px solid transparent;

  border-bottom: 2px solid transparent;
  transition: all 0.2s ease-in-out;
  :hover {
    cursor: help;
    border-bottom: 2px solid #1565c0;
    border-top: 2px solid #eb1c24;
    transform: translateY(-2px);
  }
  @media screen and (min-width: 768px) {
    height: 40px;
  }
  .firm,
  .soft {
    font-family: ${props => props.theme.MainFont1};
    color: black;
    width: 22%;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    @media screen and (min-width: 768px) {
      font-size: 1.2rem;
      font-weight: 700;
      width: 20%;
    }
  }

  .scale {
    position: relative;
    background: #eaeaed;
    display: flex;
    width: 70%;
    height: 12px;
    :after {
      content: "";
      width: 40%;
      height: 12px;
      background-image: ${props => props.gradient};
      position: absolute;
      top: 0;
      left: ${props => props.firmNum};
      @media screen and (min-width: 768px) {
        height: 15px;
      }
    }
    @media screen and (min-width: 768px) {
      height: 15px;
      width: 80%;
    }
  }
`;
const Article = styled.article`
  color: black;
  .header {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 10px;
    font-family: ${props => props.theme.MainFont3};
    border-bottom: 4px solid #eb1c24;
    padding-bottom: 2px;
    font-size: 1.4rem;
    padding-left: 15px;
    font-weight: 400;
  }
  .content {
    font-family: ${props => props.theme.MainFont1};
    font-size: 1rem;
    line-height: 1.3rem;
    font-weight: 300;
    width: 100%;
    padding: 10px 15px 10px 15px;
    margin-bottom: 0;
    margin-top: 0;
  }
  .button {
    font-family: ${props => props.theme.MainFont1};
    color: #000000;
    cursor: pointer;
    padding: 0px 30px;
    display: inline-block;
    margin: 10px 15px;
    text-transform: uppercase;
    line-height: 2em;
    letter-spacing: 1.5px;
    font-size: 1em;
    outline: none;
    position: relative;
    font-size: 14px;
    font-weight: 700;
    border: 3px solid ${props => props.theme.mainColor1};
    background-color: #ffffff;
    border-radius: 15px 15px 15px 15px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }
`;
const contentStyle = {
  maxWidth: "600px",
  width: "90%",
  padding: "0px",
};
const FirmnessScale = ({ firmNum, isMobile }) => {
  const { modal, setModal } = useModalContext();
  let gradient =
    "linear-gradient(to left, #EAEAED 0%, #3F81CB 35%, #1565C0 50%, #3F81CB 65%, #EAEAED 100%)";
  const firmnessPosition = num => {
    switch (num) {
      case 1:
        gradient = "linear-gradient(to left, #EAEAED 0%, #1565C0 100%)";
        return `0%`;
      case 2:
        return `9%`;
      case 3:
        return `30%`;
      case 4:
        return `52%`;
      case 5:
        gradient = "linear-gradient(to right, #EAEAED 0%, #1565C0 100%)";
        return `60%`;
      default:
        return undefined;
    }
  };
  return (
    <Popup
      trigger={
        <Firmness
          onClick={() => setModal(!modal)}
          firmNum={firmnessPosition(firmNum)}
          gradient={gradient}
          isMobile={isMobile}
        >
          <div className="firm">Firm</div>
          <div className="scale" />
          <div className="soft">Soft</div>
        </Firmness>
      }
      position="top center"
      closeOnDocumentClick
      contentStyle={contentStyle}
      closeOnEscape
      repositionOnResize
    >
      <Article className="modal">
        <h3 className="header">Firmness Scale </h3>
        <p className="content">
          Firmness ratings are based on customer feedback and manufacturer
          information. Feel is subjective and we recommend experiencing the bed
          for yourself in our showroom.
        </p>
      </Article>
    </Popup>
  );
};

FirmnessScale.propTypes = {
  firmNum: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default FirmnessScale;