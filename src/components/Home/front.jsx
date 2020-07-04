import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql, Link } from "gatsby";
import { Headline, Wrapper, P } from "../../styles/homeStyles";
import SocialIcons from "../SocialIcons";

export const BottomLinks = styled(Link)`
  color: ${(props) => props.theme.mainColor1};
  transition: color 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.mainColor2};
  }
`;

const Container = styled.div`
  border-top: 2px solid ${(props) => props.theme.newColor3};
  background-color: white;
`;

const Front = () => (
  <>
    <Wrapper>
      <StaticQuery
        query={graphql`
          query front {
            datoCmsFrontPage {
              frontPageTitle
              frontPageTextBlock
            }
          }
        `}
        render={(data) => (
          <>
            <Headline>{data.datoCmsFrontPage.frontPageTitle}</Headline>
            <P>{data.datoCmsFrontPage.frontPageTextBlock}</P>
          </>
        )}
      />
    </Wrapper>
    <Wrapper>
      <Headline red>ESC = Expert Sleep Center</Headline>
      <P>
        At ESC Mattress Center we have over twenty years industry experience --
        we are the sleep experts and we want to help educate you so you can get
        the great sleep you deserve. With our customer-friendly 90 day comfort
        guarantee we&apos;ve got your back in case you&apos;re not 100%
        satisfied with your purchase.
        <BottomLinks to="/about">Learn more</BottomLinks>
      </P>
      <Container>
        <SocialIcons />
      </Container>
    </Wrapper>
  </>
);

export default Front;