import React from "react";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import styled from "styled-components";
import { HelmetDatoCms } from "gatsby-source-datocms";
import WindowDimensionsProvider from "../context/WindowDimensions";
import TabBox from "./TabBox";
import { P } from "./global.styles";
import HeaderButtons from "./HeaderButtons";

const Header = styled(Img)`
  margin-top: 3em;
  margin-bottom: 2em;
  max-width: 662px;
  max-height: 116px;
  margin-right: auto;
  margin-left: auto;
  @media screen and (max-width: 768px) {
    margin-right: 30px;
    margin-left: 30px;
  }
`;

const Container = styled.section`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
`;

const Hero = styled(Img)`
  width: 100%;
  height: auto;

  @media only screen and (max-width: 768px) {
    height: 210px;
    overflow: hidden;
    width: 100vw;
    margin-left: -15px;
  }
`;

const Hr = styled.hr`
  border-top: 1px solid #eee;
  border-bottom: 2px solid #7ea9c8;
  margin-bottom: 3em;
  display: block;
`;
const Landing = ({ data, buttonName, buttonURL }) => {
  const { headingImg, heroImg, description, tabBox, seoMetaTags } = data;
  return (
    <WindowDimensionsProvider>
      <HelmetDatoCms seo={seoMetaTags} />
      <div style={{ maxWidth: "1440px", backgroundColor: "white" }}>
        <Header fluid={headingImg.fluid} alt={headingImg.alt} />
        <Container>
          <Hero fluid={heroImg.fluid} alt={heroImg.alt} />
        </Container>
        <Container style={{ marginTop: "3em" }}>
          <P style={{ marginBottom: "10px" }}>{description}</P>
          <HeaderButtons buttonName={buttonName} buttonURL={buttonURL} />
          {tabBox.map(item => (
            <div key={item.id}>
              <Hr />
              <TabBox
                tabs={item.box}
                hero={item.topImage}
                heroText={item.topText}
              />
            </div>
          ))}
          <Hr />
        </Container>
      </div>
    </WindowDimensionsProvider>
  );
};

Landing.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  buttonName: PropTypes.string,
  buttonURL: PropTypes.string,
};

Landing.defaultProps = {
  buttonName: undefined,
  buttonURL: undefined,
};

export default Landing;