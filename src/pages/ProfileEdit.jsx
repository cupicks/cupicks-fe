import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useJwt } from "react-jwt";

import api from "../server/api";

import Navigation from "../partial/Navigation";
import ProfileEditHeader from "../components/profileEdit/profileEditHeader";
import ProfileEditBody from "../components/profileEdit/profileEditBody";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../components/elements/modal/ToastMessage";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setFocus,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });
  const [failure, setFailure] = useState(false);
  const [profiles, setProfiles] = useState();

  /** 프로필 수정 request */
  const onSubmit = async (data) => {
    const contentType = "application/json";

    const newNickname = data.nickname;
    const newPassword = data.password;
    let params = `profile?nickname=${newNickname}`;

    if (newPassword !== undefined && newPassword !== "") {
      params += `&password=${newPassword}`;
    }

    const form = new FormData();
    form.append(
      "imageValue",
      data.imageValue === undefined ? null : data.imageValue[0],
    );

    try {
      const res = await api(contentType).patch(params, form);
      navigate("/mypage", {
        state: { message: "프로필 수정에 성공하셨습니다." },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        setFailure(true);
        setTimeout(() => {
          setFailure(false);
        }, 1000);
      }
    }
  };
  const getProfile = async () => {
    const contentType = "application/json";
    try {
      const res = await api(contentType).get("/profile/my-profile");
      console.log(res.data.user);
      // setProfiles([...profiles, res.data.user]);
      setProfiles(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  // 유저 정보 토큰
  const token = localStorage.getItem("refreshToken");
  const { decodedToken } = useJwt(token);
  let userData = decodedToken;

  return (
    <>
      {failure && (
        <ToastMessage text={"이미 존재하는 닉네임입니다."} timer={1000} />
      )}
      <StProfileEdit onSubmit={handleSubmit(onSubmit)}>
        <Navigation>
          <span className="title">개인 정보 편집</span>
          <button type="submit">저장</button>
        </Navigation>

        {profiles !== null && (
          <>
            <ProfileEditHeader
              watch={watch}
              register={register}
              userData={userData}
              profiles={profiles}
            />

            <ProfileEditBody
              watch={watch}
              register={register}
              getValues={getValues}
              setFocus={setFocus}
              errors={errors}
              userData={userData}
              profiles={profiles}
            />
          </>
        )}

        <div></div>
      </StProfileEdit>
    </>
  );
};

export default ProfileEdit;

const StProfileEdit = styled.form`
  height: calc(100vh - 50px - 90px);

  display: flex;
  flex-flow: column;
  gap: 10px;

  background-color: #eee;

  overflow-y: auto;

  .warning {
    min-height: 20px;
    color: #ffb593;
    font-size: 14px;
  }

  label {
    width: 100%;

    padding: 5px 0;

    display: block;
    color: #888;

    font-size: 14px;
  }

  input {
    all: unset;
    width: 100%;
    padding: 2px 0 5px;

    margin-bottom: 5px;

    border-bottom: var(--input-border-bottom);

    font-size: 20px;
  }

  & > div {
    background-color: #fff;
  }

  & > div:last-child {
    flex: 1 1 auto;
  }
`;
