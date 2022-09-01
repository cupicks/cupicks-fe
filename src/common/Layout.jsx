import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Router from "../shared/Router";
import { useParams, useLocation } from "react-router-dom";
import Header from "../partial/Header";
import Footer from "../partial/Footer";

const Layout = () => {
  console.log(window.location.pathname);
  const [footer, setFooter] = useState(false);
  const [header, setHeader] = useState(false);
  //|| "/mypage" || "/profile/:userId/edit"
  useEffect(() => {
    const pathname = window.location.pathname;
    console.log(pathname !== "/recipe");
    if (
      pathname === "/recipe" ||
      pathname === "/mypage" ||
      pathname.indexOf("/profile") > -1
    ) {
      setFooter(true);
      console.log("hi");
    } else {
      setFooter(false);
    }
    if (pathname === "/recipe" || pathname === "/mypage") {
      setHeader(true);
    } else {
      setHeader(false);
    }
  }, []);

  return (
    <StLayout>
      {header && <Header />}
      <Router />
      {footer && <Footer />}
    </StLayout>
  );
};

export default Layout;

const StLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
`;
