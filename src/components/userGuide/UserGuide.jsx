import { useEffect, useState } from "react";
import api from "../../server/api";

import UserGuideBanner from "./UserGuideBanner";
import UserGuideContents from "./UserGuideContents";

import bannerImage from "../../assets/image/illustration/banner01.png";

import styled from "styled-components";

const UserGuide = (props) => {
  const { loggedIn, scrollTopLookAround, scrollElement } = props;
  const [username, setUsername] = useState("");

  const getProfile = async () => {
    const contentType = "application/json";
    try {
      const res = await api(contentType).get("/profile/my-profile");
      setUsername(res.data.user.nickname);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getProfile();
    }
  }, []);

  return (
    <StUserGuide bannerImage={bannerImage}>
      <UserGuideBanner />
      <UserGuideContents
        scrollTopLookAround={scrollTopLookAround}
        scrollElement={scrollElement}
        loggedIn={loggedIn}
        username={username}
      />
    </StUserGuide>
  );
};

export default UserGuide;

const StUserGuide = styled.div`
  width: 100%;
  padding: 0 2.4rem;

  background: url(${(props) => props.bannerImage}) no-repeat center -5px / 100%;
`;
