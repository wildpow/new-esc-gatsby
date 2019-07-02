import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Layout from "../components/layout";
import {
  Main,
  SiteLinks,
  MainLinks,
  MattLinksWrapper,
  BrandLinks,
  UnList,
  Lilist,
  BottomLinks,
} from "../styles/siteMapStyles";
import { H2 } from "../styles/mainStyles";
import SEO from "../components/seo";

const SiteMap = ({ data }) => {
  const {
    allDatoCmsMattress,
    datoCmsSeo,
    allDatoCmsAdjustableBase,
    allDatoCmsBlog,
  } = data;
  return (
    <Layout>
      <SEO
        title="ESC: Site Map"
        description="Sitemap for E.S.C Mattress Center website"
        ogTitle="E.S.C. Mattress Center | Site Map"
      />
      <HelmetDatoCms seo={datoCmsSeo.seoMetaTags} />
      <MainLinks>
        <H2>Main Site Links</H2>
        <UnList>
          <Lilist>
            <SiteLinks to="/">Home</SiteLinks>
          </Lilist>
          <Lilist>
            <SiteLinks to="/current-sale">Sale</SiteLinks>
          </Lilist>
          <Lilist>
            <SiteLinks to="/about">About</SiteLinks>
          </Lilist>
          <Lilist>
            <SiteLinks to="/accessories">Accessories</SiteLinks>
          </Lilist>
          <Lilist>
            <SiteLinks to="/financing">Financing</SiteLinks>
          </Lilist>
          <Lilist>
            <SiteLinks to="/adjustable">Adjustable</SiteLinks>
          </Lilist>
          <Lilist>
            <SiteLinks to="/brands">Brands</SiteLinks>
          </Lilist>
        </UnList>
      </MainLinks>
      <MattLinksWrapper>
        <Main>
          <h3>
            <BrandLinks to="/brands/sealy">Sealy</BrandLinks>
          </h3>
          <ul>
            {allDatoCmsMattress.nodes.map(mattress => {
              if (mattress.brand.urlName === "sealy") {
                return (
                  <li key={mattress.id}>
                    <SiteLinks to={`/brands/sealy/${mattress.uri}`}>
                      {mattress.name}
                    </SiteLinks>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </Main>
        <Main>
          <h3>
            <BrandLinks to="/brands/tempurpedic">Tempurpedic</BrandLinks>
          </h3>
          <ul>
            {allDatoCmsMattress.nodes.map(mattress => {
              if (mattress.brand.urlName === "tempurpedic") {
                return (
                  <li key={mattress.id}>
                    <SiteLinks to={`/brands/tempurpedic/${mattress.uri}`}>
                      {mattress.name}
                    </SiteLinks>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </Main>
        <Main>
          <h3>
            <BrandLinks to="/brands/stearns">Stearns & Foster</BrandLinks>
          </h3>
          <ul>
            {allDatoCmsMattress.nodes.map(mattress => {
              if (mattress.brand.urlName === "stearns") {
                return (
                  <li key={mattress.id}>
                    <SiteLinks to={`/brands/stearns/${mattress.uri}`}>
                      {mattress.name}
                    </SiteLinks>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </Main>
      </MattLinksWrapper>
      <BottomLinks>
        <Main>
          <h3>
            <BrandLinks to="/adjustable">Adjustable Bases</BrandLinks>
          </h3>
          <ul>
            {allDatoCmsAdjustableBase.nodes.map(base => (
              <li key={base.id}>
                <SiteLinks to={`/adjustable/${base.uri}`}>
                  {base.fullName}
                </SiteLinks>
              </li>
            ))}
          </ul>
        </Main>
        <Main>
          <h3>
            <BrandLinks to="/blog">Blog</BrandLinks>
          </h3>
          <ul>
            {allDatoCmsBlog.nodes.map(base => (
              <li key={base.id}>
                <SiteLinks to={`/blog/${base.slug}`}>{base.title}</SiteLinks>
              </li>
            ))}
          </ul>
        </Main>
      </BottomLinks>
    </Layout>
  );
};

SiteMap.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};
export default SiteMap;

export const allMattressesSiteMap = graphql`
  query sitmap {
    allDatoCmsMattress(sort: { fields: priceHigh }) {
      nodes {
        uri
        name
        id
        priceLow
        brand {
          urlName
          displayName
        }
      }
    }
    datoCmsSeo(seo: { title: { eq: "ESC: Site Map" } }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    allDatoCmsAdjustableBase {
      nodes {
        uri
        fullName
        id
      }
    }
    allDatoCmsBlog {
      nodes {
        slug
        title
        id
      }
    }
  }
`;
