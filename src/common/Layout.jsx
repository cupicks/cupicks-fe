import React from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapFullVH } = styledLayoutComponents;

import Router from "../shared/Router";
import Header from "../partial/Header";
import Footer from "../partial/Footer";

const Layout = () => {
  const pathname = useLocation().pathname;
  let layoutType = { headerFooter: false, footer: false, header: false };
  let { header, footer, headerFooter } = layoutType;

  const caseHeaderFooter = [
    "/recipe/create/guest",
    "/mypage",
    "/profile",
    "/badge",
  ];
  const caseFooter = ["/recipe"];

  function handlePathname() {
    caseHeaderFooter.map((path) => {
      if (pathname.indexOf(path) > -1) {
        headerFooter = true;
        return;
      }
    });

    caseFooter.map((path) => {
      if (pathname === path) {
        footer = true;
      }
    });
  }
  handlePathname();

  return (
    <StLayout>
      {headerFooter && <Header />}

      <Router />

      {(headerFooter || footer) && <Footer pathname={pathname} />}
    </StLayout>
  );
};

export default Layout;

const StLayout = styled(CustomWrapFullVH)`
  max-width: 60rem;
  padding: 0;
  overflow: hidden;
  margin: 0 auto;
`;
