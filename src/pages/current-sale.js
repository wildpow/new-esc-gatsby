import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import MattList from "../components/mattressList";

const Sale = ({ data }) => {
  const { allDatoCmsMattress, datoCmsFrontPage } = data;
  return (
    <Layout>
      <HelmetDatoCms seo={datoCmsFrontPage.currentSaleSeoLink.seoMetaTags} />
      <MattList
        headerBG={datoCmsFrontPage.currentSaleHeaderLink.bgImg.url}
        mattresses={allDatoCmsMattress.nodes}
        title={datoCmsFrontPage.currentSaleHeaderLink.title}
        description={datoCmsFrontPage.currentSaleHeaderLink.tagLine}
      />
    </Layout>
  );
};

Sale.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export const currentSaleQuery = graphql`
  query currentSaleQuery {
    allDatoCmsMattress(
      filter: {
        meta: { status: { eq: "published" } }
        saleInfo: {
          elemMatch: { saleBanner: { ne: "NEW MODEL", regex: "/[a-z]/gi" } }
        }
      }
      sort: { fields: priceLow, order: ASC }
    ) {
      nodes {
        ...mattressParts
      }
    }

    datoCmsFrontPage {
      currentSaleSeoLink {
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
      }
      currentSaleHeaderLink {
        title
        tagLine
        bgImg {
          url
          alt
          title
        }
      }
    }
  }
`;

export default Sale;

// datoCmsCurrentSale {
//   title
//   description
//   seoMetaTags {
//     ...GatsbyDatoCmsSeoMetaTags
//   }
// }
