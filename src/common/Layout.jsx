import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Router from "../shared/Router";
import Header from "../partial/Header";
import Footer from "../partial/Footer";

import styled from "styled-components";

const Layout = () => {
  const pathname = useLocation().pathname;
  let headerFooter = false;

  if (
    pathname === "/recipe" ||
    pathname === "/mypage" ||
    pathname.indexOf("/profile") > -1
  ) {
    headerFooter = true;
  }

  return (
    <StLayout>
      {headerFooter && <Header />}

      <Router />

      {headerFooter && <Footer pathname={pathname} />}
    </StLayout>
  );
};

export default Layout;

const StLayout = styled.div`
  max-width: 600px;
  height: calc(var(--vh, 1vh) * 100);

  background-color: #fff;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);

  margin: 0 auto;

  position: relative;

  display: flex;
  flex-flow: column;

  overflow: hidden;

  .contents_area {
    height: calc(100vh - 50px - 90px);
    overflow-y: scroll;
  }
`;
