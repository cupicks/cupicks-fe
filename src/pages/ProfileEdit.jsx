import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import api from "../server/api";

import Navigation from "../partial/Navigation";
import ProfileEditHeader from "../components/profileEdit/ProfileEditHeader";
import ProfileEditBody from "../components/profileEdit/ProfileEditBody";

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

    const newNickname =
      data.nickname === "" ? profiles?.nickname : data.nickname;
    const newPassword = data?.password;
    // let params = `profile?nickname=${newNickname}`;

    // if (newPassword !== undefined && newPassword !== "") {
    //   params += `&password=${newPassword}`;
    // }

    const form = new FormData();
    form.append(
      "imageValue",
      data.imageValue === undefined ? null : data.imageValue[0],
    );

    newNickname ? form.append("nickname", newNickname) : "";
    newPassword ? form.append("password", newPassword) : "";

    try {
      const res = await api(contentType).patch("/profile", form);
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

  return (
    <>
      {failure && (
        <ToastMessage text={"이미 존재하는 닉네임입니다."} timer={1000} />
      )}
      <StProfileEdit onSubmit={handleSubmit(onSubmit)}>
        <Navigation goto="/mypage">
          <span className="title">개인 정보 편집</span>
          <button type="submit">저장</button>
        </Navigation>

        {profiles !== null && (
          <>
            <ProfileEditHeader
              watch={watch}
              register={register}
              profiles={profiles}
            />

            <ProfileEditBody
              watch={watch}
              register={register}
              getValues={getValues}
              setFocus={setFocus}
              errors={errors}
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
  height: calc((var(--vh, 1vh) * 100) - 5rem - 9rem);

  display: flex;
  flex-flow: column;
  gap: 1rem;

  background-color: #eee;

  overflow-y: auto;

  & > div {
    background-color: #fff;
  }

  & > div:last-child {
    flex: 1 1 auto;
  }
`;
