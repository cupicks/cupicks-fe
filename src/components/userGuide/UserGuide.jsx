import { useEffect, useState } from "react";
import axios from "../../server/api";

import UserGuideBanner from "./UserGuideBanner";
import UserGuideContents from "./UserGuideContents";

import bannerImage from "../../assets/image/illustration/banner01.png";

import styled from "styled-components";

const UserGuide = (props) => {
  const [username, setUsername] = useState("");

  const getProfile = async () => {
    const contentType = "application/json";
    try {
      const res = await api(contentType).get("/profile/my-profile");
      console.log(res.data.user);
      // setProfiles([...profiles, res.data.user]);
      // setUsername(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("hi");

  useEffect(() => {
    getProfile();
    setUsername("이름름");
  }, []);

  return (
    <StUserGuide bannerImage={bannerImage}>
      <UserGuideBanner />
      <UserGuideContents username={username} />
    </StUserGuide>
  );
};

export default UserGuide;

const StUserGuide = styled.div`
  width: 100%;
  padding: 0 2.4rem;

  background: url(${(props) => props.bannerImage}) no-repeat center -5px / 100%;
`;
