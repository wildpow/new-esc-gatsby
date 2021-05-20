import styled from "styled-components";
import { Link } from "gatsby";
import { P, Headline } from "../home.styled";
import ProductThumbnail from "../../ProductListing/ProductThumbnail";
import useTop3 from "./getTopMattresses.query";
import {
  boxShadow,
  colors,
  FadeInAnimation,
} from "../../../styles/theme.styled";

const FooterLink = styled(Link)`
  text-decoration-color: white;
  transition: all 0.25s ease-in;
  color: white;
  :hover {
    transform: scale(1.04);
    text-decoration-color: ${colors.gray["500"]};
  }
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(265px, 1fr));
  grid-auto-rows: minmax(300px, auto);
  grid-gap: 1rem;
  margin-left: 7px;
  margin-right: 7px;
  @media screen and (min-width: 768px) {
    margin: 0;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${FadeInAnimation}
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 5px;
`;

const NewWrapper = styled(MainWrapper)`
  background-color: ${colors.gray["500"]};

  margin-top: 15px;
  @media (min-width: 1024px) {
    box-shadow: ${boxShadow.md};
  }
`;

const ThreeMattWrapper = styled(Wrapper)`
  margin-bottom: 10px;
  @media (min-width: 375px) {
    margin-top: 5px;
    margin-bottom: 10px;
  }
  @media (min-width: 411px) {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  @media (min-width: 568px) {
    margin-bottom: 5px;
  }
  @media (min-width: 731px) {
    margin-bottom: 5px;
    margin-top: 5px;
  }
  @media (min-width: 1024px) {
    margin-bottom: 10px;
  }
  @media (min-width: 1300px) {
    margin-top: 10px;
  }
`;

const TopThreeMatts = () => {
  const { header, newmattress, footerUrl, footer } = useTop3();

  console.log(newmattress);

  // const sortedMatt = newmattress.sort(
  //   (a, b) =>
  //     Number(a.shopifyInfo[0].priceRangeV2.minVariantPrice.amount) -
  //     Number(b.shopifyInfo[0].priceRangeV2.minVariantPrice.amount)
  // );
  return (
    <NewWrapper>
      <Headline>{header}</Headline>
      <ThreeMattWrapper>
        {newmattress.map((mattress) => (
          <ProductThumbnail
            key={mattress.id}
            product={mattress}
            mattress
            url={`/brands/${mattress.brand.urlName}/${mattress.slug}`}
          />
        ))}
      </ThreeMattWrapper>
      <P>
        We believe that no mattress is a one-size-fits-all solution, which is
        why we have over 50 mattresses to choose from at our Everett location.
        If you’d like to browse our current sale mattresses you can click below,
        or visit our showroom on Everett Mall Way. With a combined 25 years of
        experience helping people find the right mattress for their sleep needs
        we’re here to help you start sleeping better.
      </P>
      <Headline red>
        <FooterLink to={footerUrl}>{footer}</FooterLink>
      </Headline>
    </NewWrapper>
  );
};

export default TopThreeMatts;
