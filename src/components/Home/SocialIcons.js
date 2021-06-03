/* eslint-disable react/prop-types */
import { OutboundLink } from "gatsby-plugin-google-analytics";
import styled from "@emotion/styled";
import { StaticImage } from "gatsby-plugin-image";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  @media print {
    display: none;
  }
`;

const DIVY = styled.div`
  width: 100%;
  justify-content: space-around;
  display: flex;
  margin-top: 17px;
  margin-bottom: 17px;
  @media (min-width: 550px) {
    width: 60%;
  }
  @media (min-width: 900px) {
    width: ${({ bottom }) => (bottom ? "400px" : "60%")};
  }
`;

const SocImg = styled(StaticImage)`
  color: white;
  transition: transform 0.25s ease-in;
  max-width: 3rem;
  @media (min-width: 360px) {
    max-width: 3.5rem;
  }
  &:hover {
    transform: scale3d(1.1, 1.1, 1);
  }
`;

const YelpHolder = styled.div`
  background-color: #d32323;
  width: 3rem;
  max-height: 3rem;
  border-radius: 0.2rem;
  transition: transform 0.25s ease-in;
  &:hover {
    transform: scale3d(1.1, 1.1, 1);
  }
  @media (min-width: 360px) {
    width: 3.54rem;
    max-height: 3.45rem;
  }
`;
const YelpImg = styled.img`
  color: white;
  width: 3rem;
  /* max-height: 2.9rem; */
  @media (min-width: 360px) {
    width: 3.54rem;
    max-height: 3.15rem;
  }
`;
const SocialIcons = ({ bottom }) => (
  <Wrapper>
    <DIVY bottom={bottom}>
      <OutboundLink
        href="https://www.facebook.com/ESCMattressCenter/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <StaticImage
          src="../../images/facebook.png"
          alt="FaceBook logo"
          formats={["auto", "avif", "webp"]}
          width={56}
        />
      </OutboundLink>
      <OutboundLink
        href="https://twitter.com/CenterEsc?ref_src=twsrc%5Etfw"
        data-size="large"
        target="_blank"
        rel="noopener noreferrer"
      >
        <StaticImage
          src="../../images/twitter.png"
          alt="twitter logo"
          formats={["auto", "avif", "webp"]}
          width={56}
        />
      </OutboundLink>
      <OutboundLink
        href="https://www.instagram.com/escmattresscenter/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <StaticImage
          src="../../images/instagram.png"
          alt="Instagram logo"
          formats={["auto", "avif", "webp"]}
          width={56}
        />
      </OutboundLink>
      <OutboundLink
        href="https://www.yelp.com/biz/esc-mattress-center-everett-3"
        target="_blank"
        rel="noopener noreferrer"
      >
        <YelpHolder>
          <StaticImage
            src="../../images/yelp.png"
            alt="yelp logo"
            formats={["auto", "avif", "webp"]}
          />
        </YelpHolder>
      </OutboundLink>
      <OutboundLink
        href="https://goo.gl/maps/nqXkkkAGRdu"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SocImg src="/gmaps.png" alt="google maps logo" />
      </OutboundLink>
    </DIVY>
  </Wrapper>
);

export default SocialIcons;
