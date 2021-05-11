import { graphql, StaticQuery } from "gatsby";
import styled from "styled-components";
import Image from "gatsby-image";

import { colors, radius } from "../../../utils/styles";

const CartThumbnailRoot = styled(Image)`
  border: 1px solid ${colors.gray["100"]};
  border-radius: ${radius.default}px;
  height: 36px;
  width: 36px;
  height: 46px;
  width: 46px;
`;

const CartThumbnail = ({
  shopifyImages,
  id: imageId,
  fallback,
  ...imageProps
}) => {
  const image = shopifyImages.find(({ id }) => id === imageId);

  if (image) {
    imageProps.fluid = image.localFile.childImageSharp.fluid;
  } else {
    imageProps.src = fallback;
  }

  return <CartThumbnailRoot {...imageProps} />;
};

export default (props) => (
  <StaticQuery
    query={graphql`
      {
        allShopifyProduct {
          edges {
            node {
              images {
                id
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({ allShopifyProduct: { edges } }) => {
      const images = edges
        .map(({ node }) => node.images)
        .reduce((acc, val) => acc.concat(val), []);

      return <CartThumbnail shopifyImages={images} {...props} />;
    }}
  />
);