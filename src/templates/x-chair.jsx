/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { graphql } from "gatsby";
import { useReducer } from "react";
import styled from "@emotion/styled";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import GenerateInitialState from "../components/X-Chair/generateInitialState";
import xChairReducer from "../components/X-Chair/xChair.reducer";
import Headrest from "../components/X-Chair/prototype/Headrest";
import Wheels from "../components/X-Chair/prototype/Wheels";
import Model from "../components/X-Chair/prototype/Model";
import Width from "../components/X-Chair/prototype/Width";
import Colors from "../components/X-Chair/prototype/Colors";
import MemoryFoam from "../components/X-Chair/prototype/MemoryFoam";
import getX1images from "../components/X-Chair/query/getX1Images.query";
import getX2images from "../components/X-Chair/query/getX2images.query";
import getX3images from "../components/X-Chair/query/getX3images.query";
import getX4images from "../components/X-Chair/query/getX4Images.query";
// import { colors, spacing } from "../styles/theme.styled";
import { useStore } from "../contexts/Store.ctx";
import ChairCart from "../components/X-Chair/prototype/ChairCart";
import getModels from "../components/X-Chair/query/getModel.query";
import getLogos from "../components/X-Chair/query/getLogos.query";
import { fonts } from "../styles/theme.styled";
import Details from "../components/X-Chair/prototype/Details";
import ImageCarousel from "../components/X-Chair/prototype/NewImageCaroucel";

const XchairRoot = styled.section`
  background-color: white;
  /* display: flex;
  flex-direction: column;
  align-items: flex-end; */
  width: 100%;
  .content {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 20px;
  }
  .gallery {
    width: 50%;
  }
  .features {
    width: 50%;
    /* height: 700px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 1em;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 1);
    }

    ::-webkit-scrollbar-thumb {
      background-color: #ec1221;
      outline: 1px solid black;
    } */
  }
`;
const Heading = styled.header`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  .xchair {
    width: 100%;
    height: auto;
  }
  h2 {
    width: 100%;
    font-family: ${fonts.sans};
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      max-width: 50px;
      padding-top: -3px;
    }
    span {
      position: relative;
      ::after {
        content: "";
        position: absolute;
        width: 110%;
        height: 4px;
        bottom: 0;
        left: 0;
        background-color: #dadada;
      }
    }
  }
`;
export default function XChair({ data }) {
  const { datoCmsXChair, headrest, wheels, memoryFoam, width } = data;
  const models = getModels();
  const logos = getLogos();
  let colorSwatchs;
  let colorCB;
  let colorData;
  let extraColors;
  if (datoCmsXChair.title === "K-Sport") {
    const data2 = getX2images();
    colorSwatchs = data2.colors;
    colorCB = data2.colorCB;
    colorData = data2.data;
  } else if (datoCmsXChair.title === "ATR Fabric") {
    const data3 = getX3images();
    colorSwatchs = data3.colors;
    colorCB = data3.colorCB;
    colorData = data3.data;
  } else if (datoCmsXChair.title === "Leather Exec") {
    const data4 = getX4images();
    colorSwatchs = data4.colors;
    colorCB = data4.colorCB;
    colorData = data4.data;
    extraColors = data4.extraColors;
  } else {
    const data1 = getX1images();
    colorSwatchs = data1.colors;
    colorCB = data1.colorCB;
    colorData = data1.data;
  }
  const { addVariantToCart } = useStore();
  const initialState = GenerateInitialState(
    colorCB,
    colorSwatchs[0].title,
    datoCmsXChair.shopifyInfo[0].variants
  );
  const [state, dispatch] = useReducer(xChairReducer, initialState);
  const chairIndex = state.colorCB.indexOf(true);
  const handleSubmit = (e) => {
    const extra = [];
    e.preventDefault();
    if (state.headrest) {
      extra.push({ variantId: headrest.variants[0].storefrontId, quantity: 1 });
    }
    if (state.foam) {
      extra.push({
        variantId: memoryFoam.variants[0].storefrontId,
        quantity: 1,
      });
    }
    if (state.width) {
      extra.push({
        variantId: width.variants[0].storefrontId,
        quantity: 1,
      });
    }
    const wheelIndex = state.wheelsCB.indexOf(true);
    if (wheelIndex !== 3) {
      extra.push({
        variantId: wheels.variants[wheelIndex].storefrontId,
        quantity: 1,
      });
    }
    const modelIndex = state.modelCB.indexOf(true);
    if (modelIndex !== 0) {
      extra.push({
        variantId: models[modelIndex].variants[0].storefrontId,
        quantity: 1,
      });
    }
    if (extra.length === 0) {
      addVariantToCart(state.chairVariants[chairIndex].storefrontId, 1);
    } else {
      addVariantToCart(state.chairVariants[chairIndex].storefrontId, 1, extra);
    }
  };

  return (
    <Layout>
      <XchairRoot>
        <Heading>
          <div className="xchair">
            <StaticImage
              src="../images/xChair/logo.png"
              formats={["avif", "png"]}
              layout="constrained"
              width={250}
            />
          </div>
          <h2>
            <div className="title">
              <GatsbyImage
                image={getImage(logos[datoCmsXChair.title].image)}
                alt={logos[datoCmsXChair.title].alt}
              />
            </div>
            <span>{`${datoCmsXChair.title} Chair`}</span>
          </h2>
        </Heading>
        <div className="content">
          <div className="gallery">
            <ImageCarousel
              imagesArray={colorData[state.activeColor][state.activeHeadrest]}
            />
          </div>
          <form className="features" onSubmit={handleSubmit}>
            <Model modelCB={state.modelCB} dispatch={dispatch} />
            <Colors
              colors={colorSwatchs}
              colorCB={state.colorCB}
              dispatch={dispatch}
              extraColors={extraColors}
              seatWidth={state.width}
              memoryFoam={state.foam}
            />
            <Headrest
              title={datoCmsXChair.title}
              headrestImg={headrest.images[0]}
              dispatch={dispatch}
              headrestBool={state.headrest}
              price={headrest.priceRangeV2.maxVariantPrice.amount}
            />
            {width ? (
              <Width
                activeColor={state.activeColor}
                title={datoCmsXChair.title}
                dispatch={dispatch}
                widthBool={state.width}
                price={width.variants[0].price}
              />
            ) : null}
            {memoryFoam ? (
              <MemoryFoam
                activeColor={state.activeColor}
                title={datoCmsXChair.title}
                dispatch={dispatch}
                foamBool={state.foam}
                price={memoryFoam.variants[0].price}
              />
            ) : null}
            <Wheels
              wheels={wheels.variants}
              wheelsCB={state.wheelsCB}
              dispatch={dispatch}
            />
            <ChairCart
              price={state.price}
              comparePrice={state.compareAtPrice}
            />
          </form>
        </div>
        <Details logoImg={logos[datoCmsXChair.title]} />
      </XchairRoot>
    </Layout>
  );
}
// storefrontId
// productType
// totalVariants
// priceRangeV2 {
//   maxVariantPrice {
//     amount
//   }
//   minVariantPrice {
//     amount
//   }
// }
// hasOnlyDefaultVariant
// image {
//   gatsbyImageData(layout: FIXED, width: 150)
// }
// images {
//   gatsbyImageData(layout: FIXED, width: 50)
//   altText
// }
// featuredImage {
//   gatsbyImageData(width: 50, layout: FIXED)
// }
export const chairQuery = graphql`
  query chair(
    $slug: String!
    $headrest: String!
    $memoryFoam: String
    $width: String
  ) {
    datoCmsXChair(slug: { eq: $slug }) {
      title
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      shopifyInfo {
        variants {
          compareAtPrice
          price
          storefrontId
          title
        }
        title
        description
      }
    }
    memoryFoam: shopifyProduct(storefrontId: { eq: $memoryFoam }) {
      title
      variants {
        price
        storefrontId
      }
    }
    width: shopifyProduct(storefrontId: { eq: $width }) {
      title
      variants {
        price
        storefrontId
      }
    }
    headrest: shopifyProduct(storefrontId: { eq: $headrest }) {
      description
      title
      storefrontId

      variants {
        storefrontId
        price
        title
      }
      priceRangeV2 {
        maxVariantPrice {
          amount
        }
        minVariantPrice {
          amount
        }
      }
      images {
        gatsbyImageData(layout: CONSTRAINED, width: 290)
      }
    }
    wheels: shopifyProduct(title: { eq: "X-Chair Wheels" }) {
      title
      storefrontId
      description
      variants {
        storefrontId
        price
        title
        image {
          gatsbyImageData(layout: CONSTRAINED, width: 350)
        }
      }
      priceRangeV2 {
        maxVariantPrice {
          amount
        }
        minVariantPrice {
          amount
        }
      }
      images {
        gatsbyImageData(layout: CONSTRAINED, width: 150)
      }
    }
  }
`;
