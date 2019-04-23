import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styledNormalize from "styled-normalize";
import styled, { createGlobalStyle } from "styled-components";
import Logo from "./logo";
import Navigation from "./nav";
import Footer from "./footer";
import Topper from "./Topper";
import MenuButton from "./mobileMenu/menuButton";
import MenuItem from "./mobileMenu/menuItems";
import Menu from "./mobileMenu/menu";
import NewMenuItems from "./mobileMenu/newMenuItems";

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler],
  );
}

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  html {
  box-sizing: border-box;
  
}
*, *:before, *:after {
  box-sizing: inherit;
}
.carousel.carousel-slider .control-arrow,.carousel .control-arrow{-webkit-transition:all .25s ease-in;-o-transition:all .25s ease-in;transition:all .25s ease-in;opacity:.4;position:absolute;z-index:2;top:20px;background:0 0;border:0;font-size:32px;cursor:pointer}.carousel .control-arrow:hover{opacity:1}.carousel.carousel-slider .control-arrow:before,.carousel .control-arrow:before{margin:0 5px;display:inline-block;border-top:8px solid transparent;border-bottom:8px solid transparent;content:""}.carousel .control-disabled.control-arrow{opacity:0;cursor:inherit;display:none}.carousel .control-prev.control-arrow{left:0}.carousel .control-prev.control-arrow:before{border-right:8px solid #fff}.carousel .control-next.control-arrow{right:0}.carousel .control-next.control-arrow:before{border-left:8px solid #fff}.carousel{position:relative;width:100%}.carousel *{-webkit-box-sizing:border-box;box-sizing:border-box}.carousel button{outline:0;border:0;background:0 0}.carousel img{width:100%;display:inline-block;pointer-events:none}.carousel .carousel{position:relative}.carousel .control-arrow{top:50%;margin-top:-13px;font-size:18px}.carousel .thumbs-wrapper{margin:20px;overflow:hidden}.carousel .thumbs{-webkit-transition:all .15s ease-in;-o-transition:all .15s ease-in;transition:all .15s ease-in;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);position:relative;list-style:none;white-space:nowrap}.carousel .thumb{-webkit-transition:border .15s ease-in;-o-transition:border .15s ease-in;transition:border .15s ease-in;display:inline-block;width:80px;margin-right:6px;white-space:nowrap;overflow:hidden;border:3px solid #fff;padding:2px}.carousel .thumb.selected,.carousel .thumb:hover{border:3px solid #333;padding:2px}.carousel .thumb img{vertical-align:top}.carousel.carousel-slider{position:relative;margin:0;overflow:hidden}.carousel.carousel-slider .control-arrow{top:0;color:#fff;font-size:26px;bottom:0;margin-top:0;padding:5px}.carousel.carousel-slider .control-arrow:hover{background:rgba(0,0,0,.2)}.carousel .slider-wrapper{overflow:hidden;margin:auto;width:100%;-webkit-transition:height .15s ease-in;-o-transition:height .15s ease-in;transition:height .15s ease-in}.carousel .slider-wrapper.axis-horizontal .slider{-ms-box-orient:horizontal;display:-ms-flexbox;display:-moz-flex;display:flex}.carousel .slider-wrapper.axis-horizontal .slider .slide{-ms-flex-direction:column;flex-direction:column;-ms-flex-flow:column;flex-flow:column}.carousel .slider-wrapper.axis-vertical{-ms-box-orient:horizontal;display:-ms-flexbox;display:-moz-flex;display:flex}.carousel .slider-wrapper.axis-vertical .slider{-ms-flex-direction:column;flex-direction:column}.carousel .slider{margin:0;padding:0;position:relative;list-style:none;width:100%}.carousel .slider.animated{-webkit-transition:all .35s ease-in-out;-o-transition:all .35s ease-in-out;transition:all .35s ease-in-out}.carousel .slide{min-width:100%;margin:0;position:relative;text-align:center;background:#000}.carousel .slide img{width:100%;vertical-align:top;border:0}.carousel .slide iframe{display:inline-block;width:calc(100% - 80px);margin:0 40px 40px;border:0}.carousel .slide .legend{-webkit-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out;position:absolute;bottom:40px;left:50%;margin-left:-45%;width:90%;border-radius:10px;background:#000;color:#fff;padding:10px;font-size:12px;text-align:center;opacity:.25;-webkit-transition:opacity .35s ease-in-out;-o-transition:opacity .35s ease-in-out;transition:opacity .35s ease-in-out}.carousel .control-dots{position:absolute;bottom:0;margin:10px 0;text-align:center;width:100%}@media (min-width:960px){.carousel .control-dots{bottom:0}}.carousel .control-dots .dot{-webkit-transition:opacity .25s ease-in;-o-transition:opacity .25s ease-in;transition:opacity .25s ease-in;opacity:.3;-webkit-box-shadow:1px 1px 2px rgba(0,0,0,.9);box-shadow:1px 1px 2px rgba(0,0,0,.9);background:#fff;border-radius:50%;width:8px;height:8px;cursor:pointer;display:inline-block;margin:0 8px}.carousel .control-dots .dot.selected,.carousel .control-dots .dot:hover{opacity:1}.carousel .carousel-status{position:absolute;top:0;right:0;padding:5px;font-size:10px;text-shadow:1px 1px 1px rgba(0,0,0,.9);color:#fff}.carousel:hover .slide .legend{opacity:1}.slide{margin-bottom:0!important;margin-top:0!important;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:distribute;justify-content:space-around}.carousel .slide{background:#fff;margin:auto}.control-prev{width:50px!important;font-size:2rem}.control-next{width:50px}@media(min-width:1100px){.control-next{width:70px}.control-prev{width:70px!important;font-size:2rem}}.carousel.carousel-slider .control-arrow:before,.carousel .control-arrow:before{border-top:20px solid transparent;border-bottom:20px solid transparent}.carousel .control-next.control-arrow:before{border-left:20px solid #fff}.carousel .control-prev.control-arrow:before{border-right:20px solid #fff}
`;
// @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto:300,400,500,700');

const Body = styled.div`
  background-color: ${props => props.theme.newColor1};
  filter: ${props => (props.menuOpen ? "blur(10px)" : null)};
  transition: filter 0.5s ease;
  pointer-events: ${props => (props.menuOpen ? "none" : "auto")};
  user-select: ${props => (props.menuOpen ? "none" : "auto")};
`;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 5px;
  padding-right: 5px;
  @media (min-width: 768px) {
    width: 750px;
    padding-left: 10px;
    padding-right: 10px;
  }
  @media (min-width: 992px) {
    width: 970px;
    padding-left: 5px;
    padding-right: 5px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
  @media (min-width: 1300px) {
    width: 1270px;
  }
  @media (min-width: 1400px) {
    width: 1370px;
  }
`;

const ButtonContainer = styled.div`
  /* position: fixed; sticky option */
  position: absolute;
  top: 70px;
  right: 20px;
  z-index: 999;
  opacity: 0.9;
`;

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = [
    "Home",
    "Sale",
    "Brands",
    "Adjustable",
    "Financing",
    "Our Blog",
    "About Us",
    "Warranty",
    "Policies",
    "Site Map",
  ];
  let indexCount = 0;
  const menuItems = menu.map((val, index) => {
    indexCount += 1;
    return (
      <MenuItem
        key={indexCount * 255}
        delay={`${index * 0.05}s`}
        onClick={() => {
          this.handleLinkClick();
        }}
      >
        {val}
      </MenuItem>
    );
  });
  const menuButtonToggle = () => {
    if (!menuOpen) {
      document.body.style.overflow = "hidden";

      setMenuOpen(!menuOpen);
    } else {
      document.body.style.overflow = "visible";
      setMenuOpen(!menuOpen);
    }
  };
  // const closeMenuOutside = () => {
  //   if (menuOpen) {
  //     document.body.style.overflow = "visible";
  //     setMenuOpen(false);
  //   }
  // };
  const ref = useRef();
  useOnClickOutside(ref, () => menuButtonToggle());
  return (
    <>
      <GlobalStyle />
      <div ref={ref}>
        <ButtonContainer>
          <MenuButton open={menuOpen} onClick={() => menuButtonToggle()} />
        </ButtonContainer>
        <Menu open={menuOpen} closeMenuOutside={menuButtonToggle}>
          <NewMenuItems />
        </Menu>
      </div>
      <Body menuOpen={menuOpen}>
        <Topper />
        <Navigation />
        <Logo />
        <Container menuOpen={menuOpen}>
          {children}
          <Footer />
        </Container>
      </Body>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;