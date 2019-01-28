import React from "react";
import PropTypes from "prop-types";
import { StyledLink, InfoWrapper, Img, H3 } from "./blogListStyles";

const BlogList = ({ items, count }) => {
  if (count) items = items.slice(0, count);
  return (
    <React.Fragment>
      {items.map(({ node }) => (
        <StyledLink to={`/blog/${node.slug}`} key={node.id}>
          <InfoWrapper>
            <Img
              src={`https://media.graphcms.com/resize=w:150,h:150,fit:clip/${
                node.coverImage.handle
              }`}
              alt={`Small image for the blog post called ${node.title}`}
            />
          </InfoWrapper>
          <H3>{node.title}</H3>
        </StyledLink>
      ))}
    </React.Fragment>
  );
};
BlogList.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
  count: PropTypes.number.isRequired,
};
export default BlogList;
