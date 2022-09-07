import React from "react";
import { useForm } from "react-hook-form";

import Navigation from "../partial/Navigation";
import ProfileEditHeader from "../components/profileEdit/profileEditHeader";

import styled from "styled-components";
import ProfileEditBody from "../components/profileEdit/profileEditBody";

const ProfileEdit = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <StProfileEdit onSubmit={handleSubmit(onSubmit)}>
      <Navigation>
        <span className="title">
          개인 정보 편집
        </span>
        <button>저장</button>
      </Navigation>

      <ProfileEditHeader 
        watch={watch}
        register={register}
      />
      
      <ProfileEditBody
        register={register}
        errors={errors}
      />

      <div></div>
    </StProfileEdit>
  );
};

export default ProfileEdit;

const StProfileEdit = styled.form`
  height: 100%;
  
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

    border-bottom: 3px solid #ddd;

    font-size: 20px;
  }

  & > div {
    background-color: #fff;
  }

  & > div:last-child {
    flex: 1 1 auto;
  }
`;

