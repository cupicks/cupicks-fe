import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Router from "../shared/Router";
import { useParams, useLocation } from "react-router-dom";
import Header from "../partial/Header";
import Footer from "../partial/Footer";

const Layout = () => {
  const [footer, setFooter] = useState(false);
  const [header, setHeader] = useState(false);
  const [loaded, setLoaded] = useState(false);
  //|| "/mypage" || "/profile/:userId/edit"
  useEffect(() => {
    const pathname = window.location.pathname;
    // console.log(pathname !== "/recipe");
    if (
      pathname === "/recipe" ||
      pathname === "/mypage" ||
      pathname.indexOf("/profile") > -1
    ) {
      setFooter(true);
    } else {
      setFooter(false);
    }
    if (pathname === "/recipe" || pathname === "/mypage") {
      setHeader(true);
    } else {
      setHeader(false);
    }
    setLoaded(true);
  }, [loaded]);

  return (
    <StLayout>

      {header && <Header />}

      <div className="contents_area">
        <Router />
      </div>
      
      {footer && <Footer setLoaded={setLoaded} />}

    </StLayout>
  );
};

export default Layout;

const StLayout = styled.div`
  max-width: 600px;
  height: 100vh;

  position: relative;

  display: flex;
  flex-flow: column;

  overflow: hidden;

  .contents_area {
    height: calc(100vh - 50px - 90px);
    overflow-y: scroll;
  }
`;
