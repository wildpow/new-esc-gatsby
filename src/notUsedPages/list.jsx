/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useReducer } from "react";
import { graphql, Link } from "gatsby";
// import styled from "styled-components";
// import AccList from "../../components/accessoriessList";
import Layout from "../../components/layout";
import BreadCrumbs from "../../components/breadCrumbs";
import Header from "../../components/mattressList/Header";
import { NewBread, MattListWrapper } from "../../components/mattressList";
import accData from "../../components/accessoriessList/data";
import filterSortAcc from "../../components/accessoriessList/filterSortAcc";
import FilterSortPanel from "../../components/accessoriessList/filterSortPanelAcc";
import AccThumb from "../../components/accessoriessList/accThumb";

const AccessoriessList = ({
  data: { pillows, sheets, protector },
  location,
}) => {
  const sheetTags = sheets.nodes.map(sheet => [...sheet.tags]);
  const initalState = {
    acc: [],
    accBeforeFilter: [],
    accInfo: {},
    // vendor: [],
    // selectedVendor: [],
    types: [],
    selectedTypes: [],
    // tags: [],
    selectedTags: [],
    sheets: sheets.nodes,
    pillows: pillows.nodes,
    protector: protector.nodes,
    all: [...sheets.nodes, ...protector.nodes, ...pillows.nodes],
  };

  const params = new URLSearchParams(location.search);
  const type = params.get("type");
  if (type === null) {
    initalState.accInfo = accData[3];
    initalState.types = [
      { value: "Sheets", checked: false },
      { value: "Pillow", checked: false },
      { value: "Protector", checked: false },
    ];
    window.history.replaceState({}, "", `${location.pathname}`);
    initalState.acc = initalState.all;
    // initalState.tags = [
    //   ...initalState.all.map(item => {
    //     return {
    //       checked: false,
    //       value: item.tags,
    //     };
    //   }),
    // ];
    initalState.vendor = [
      ...initalState.all.map(item => {
        return {
          checked: false,
          value: item.vendor,
        };
      }),
    ];
  } else if (type.toLowerCase() === "sheets") {
    initalState.accInfo = accData[0];
    initalState.types = [
      { value: "sheets", checked: true },
      { value: "pillows", checked: false },
      { value: "protector", checked: false },
    ];
    initalState.acc = initalState.sheets;
    // initalState.tags = [
    //   ...initalState.sheets.map(item => {
    //     return {
    //       checked: false,
    //       value: item.tags,
    //     };
    //   }),
    // ];
    initalState.vendor = [
      ...initalState.sheets.map(item => {
        return {
          checked: false,
          value: item.vendor,
        };
      }),
    ];
  } else if (type.toLowerCase() === "pillows") {
    initalState.accInfo = accData[1];
    initalState.types = [
      { value: "sheets", checked: false },
      { value: "pillows", checked: true },
      { value: "protector", checked: false },
    ];
    initalState.acc = initalState.pillows;
    // initalState.tags = [
    //   ...initalState.pillows.map(item => {
    //     return {
    //       checked: false,
    //       value: item.tags,
    //     };
    //   }),
    // ];
    initalState.vendor = [
      ...initalState.pillows.map(item => {
        return {
          checked: false,
          value: item.vendor,
        };
      }),
    ];
  } else if (type.toLowerCase() === "protector") {
    initalState.accInfo = accData[2];
    initalState.types = [
      { value: "sheets", checked: false },
      { value: "pillows", checked: false },
      { value: "protector", checked: true },
    ];
    initalState.acc = initalState.protector;
    // initalState.tags = [
    //   ...initalState.protector.map(item => {
    //     return {
    //       checked: false,
    //       value: item.tags,
    //     };
    //   }),
    // ];
    initalState.vendor = [
      ...initalState.protector.map(item => {
        return {
          checked: false,
          value: item.vendor,
        };
      }),
    ];
  } else {
    initalState.accInfo = accData[3];
    initalState.types = [
      { value: "sheets", checked: false },
      { value: "pillows", checked: false },
      { value: "protector", checked: false },
    ];
    window.history.replaceState({}, "", `${location.pathname}`);
    initalState.acc = initalState.all;
    // initalState.tags = [
    //   ...initalState.all.map(item => {
    //     return {
    //       checked: false,
    //       value: item.tags,
    //     };
    //   }),
    // ];
    initalState.vendor = [
      ...initalState.all.map(item => {
        return {
          checked: false,
          value: item.vendor,
        };
      }),
    ];
  }
  // eslint--disablenext-line react-hooks/exhaustive-deps

  const [state, dispatch] = useReducer(filterSortAcc, initalState);
  return (
    <Layout>
      <MattListWrapper>
        <NewBread Brands>
          <BreadCrumbs next="Accessories" here={state.accInfo.title} />
        </NewBread>
        <Header
          title={
            state.accInfo.title === "All"
              ? "Perfect Sleep System"
              : state.accInfo.title
          }
          description={state.accInfo.description}
          headerBG={state.accInfo.bg}
        />
        <div className="mattList__flex">
          <FilterSortPanel dispatch={dispatch} types={state.types} />
          <div className="mattList__grid">
            {state.acc.map(stuff => (
              <AccThumb stuff={stuff} />
            ))}
          </div>
        </div>
        {console.log(state)}
        <NewBread Brands Bottom>
          <BreadCrumbs next="Accessories" here={state.accInfo.title} />
        </NewBread>
      </MattListWrapper>
    </Layout>
  );
};

// export const accessoryList = graphql`
//   query accList {
//     protector: allShopifyProduct(
//       filter: { productType: { eq: "Protector" } }
//       sort: { fields: priceRange___minVariantPrice___amount, order: DESC }
//     ) {
//       nodes {
//         title
//         shopifyId
//         productType
//         tags
//         vendor
//         availableForSale
//         priceRange {
//           minVariantPrice {
//             amount
//           }
//           maxVariantPrice {
//             amount
//           }
//         }
//         variants {
//           shopifyId
//           price
//           title
//           compareAtPrice
//         }
//         description
//         title
//         images {
//           originalSrc
//         }
//         priceRange {
//           minVariantPrice {
//             currencyCode
//             amount
//           }
//           maxVariantPrice {
//             currencyCode
//             amount
//           }
//         }
//       }
//     }
//     sheets: allShopifyProduct(
//       filter: { productType: { eq: "Sheets" } }
//       sort: { fields: priceRange___minVariantPrice___amount, order: DESC }
//     ) {
//       nodes {
//         title
//         shopifyId
//         productType
//         tags
//         vendor
//         availableForSale
//         priceRange {
//           minVariantPrice {
//             amount
//           }
//           maxVariantPrice {
//             amount
//           }
//         }
//         variants {
//           shopifyId
//           price
//           title
//           compareAtPrice
//         }
//         description
//         title
//         images {
//           originalSrc
//         }
//         priceRange {
//           minVariantPrice {
//             currencyCode
//             amount
//           }
//           maxVariantPrice {
//             currencyCode
//             amount
//           }
//         }
//       }
//     }
//     pillows: allShopifyProduct(
//       filter: { productType: { eq: "Pillow" } }
//       sort: { fields: priceRange___minVariantPrice___amount, order: DESC }
//     ) {
//       nodes {
//         title
//         shopifyId
//         productType
//         tags
//         vendor
//         availableForSale
//         priceRange {
//           minVariantPrice {
//             amount
//           }
//           maxVariantPrice {
//             amount
//           }
//         }
//         variants {
//           shopifyId
//           price
//           title
//           compareAtPrice
//         }
//         description
//         title
//         images {
//           originalSrc
//         }
//         priceRange {
//           minVariantPrice {
//             currencyCode
//             amount
//           }
//           maxVariantPrice {
//             currencyCode
//             amount
//           }
//         }
//       }
//     }
//   }
// `;

// export default AccessoriessList;
