import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const RegisterEdit = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  console.log(watch("name"));
  return (
    <Wrap onSubmit={handleSubmit(onSubmit)}>
      <ProfileEditTitle>개인정보편집</ProfileEditTitle>
      <ProfileEdit>
        <ProfilePic></ProfilePic>
      </ProfileEdit>
      <ProfileEditBody>
        <RegisterLabel>이름</RegisterLabel>
        <RegisterInput
          {...register("name", {
            required: true,
            minLength: {
              value: 2,
              message: "2자 이상 입력해주세요",
            },
            maxLength: {
              value: 10,
              message: "10자 이하로 입력해주세요",
            },
          })}
          type="text"
          placeholder="이름"
        />
        {errors.name && errors.name.type == "required" && (
          <p className={"warning"}>'이름을입력해주세요'</p>
        )}
        {errors.name && errors.name.type == "minLength" && (
          <p className={"warning"}>{errors.name.message}</p>
        )}
        {errors.name && errors.name.type == "maxLength" && (
          <p className={"warning"}>{errors.name.message}</p>
        )}
        <RegisterLabel>닉네임</RegisterLabel>
        <RegisterInput
          {...register("nickname", {
            required: true,
            minLength: {
              value: 8,
              message: "8자 이상 써주세요",
            },
            maxLength: {
              value: 15,
              message: "15자 이하로 써주세요",
            },
          })}
          placeholder="닉네임"
          type="text"
        />
        {errors.nickname && errors.nickname.type == "required" && (
          <p className={"warning"}>'닉네임을입력해주세요'</p>
        )}
        {errors.nickname && errors.nickname.type == "minLength" && (
          <p className={"warning"}>{errors.nickname.message}</p>
        )}
        {errors.nickname && errors.nickname.type == "maxLength" && (
          <p className={"warning"}>{errors.nickname.message}</p>
        )}
        <RegisterLabel>패스워드</RegisterLabel>
        <RegisterInput
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "8자 이상 써주세요",
            },
            maxLength: {
              value: 15,
              message: "15자 이하로 써주세요",
            },
            pattern: {
              value:
                /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
              message:
                "패스워드는 영어, 숫자, 그리고 특수문자중(!@#)를 포함해주세요",
            },
          })}
          placeholder="패스워드"
          type="password"
        />
        {errors.password && errors.password.type == "required" && (
          <p className={"warning"}>'패스워드를 입력해주세요'</p>
        )}
        {errors.password && errors.password.type == "pattern" && (
          <p className={"warning"}>{errors.password.message}</p>
        )}
        {errors.password && errors.password.type == "minLength" && (
          <p className={"warning"}>{errors.password.message}</p>
        )}
        {errors.password && errors.password.type == "maxLength" && (
          <p className={"warning"}>{errors.password.message}</p>
        )}
        {/* <RegisterLabel>이메일</RegisterLabel>
        <RegisterInput
          {...register("email", {
            required: true,
            maxLength: {
              value: 20,
              message: "20자 이내로 써주세요.",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
          placeholder="이메일"
        />
        {errors.email && errors.email.type == "required" && (
          <p className={"warning"}>'이메일을입력해주세요'</p>
        )}
        {errors.email && errors.email.type == "pattern" && (
          <p className={"warning"}>'이메일을 다시 양식에 맞게 입력해주세요'</p>
        )}
        {errors.email && errors.email.type == "maxLength" && (
          <p className={"warning"}>'20자 이내로 써주세요'</p>
        )} */}
      </ProfileEditBody>
      <button type="submit">저장</button>
    </Wrap>
  );
};

export default RegisterEdit;

const Wrap = styled.form`
  width: 600px;
  height: 100vh;
`;

const ProfileEditTitle = styled.div`
  width: 600px;
  height: 10vh;
  border: 2px solid yellow;
`;

const ProfileEdit = styled.div`
  width: 600px;
  height: 20vh;
  border: 2px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfilePic = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid black;
`;
const ProfileEditBody = styled.div`
  width: 600px;
  height: 60vh;
  border: 2px solid skyblue;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & .warning {
    color: #ff7c7c;
    font-weight: bold;
  }
`;

const RegisterInput = styled.input`
  width: 500px;
  height: 90px;
  margin-top: 30px;
  margin: 0 auto;
`;

const RegisterLabel = styled.label`
  align-items: flex-start;
  display: flex;
  margin-left: 50px;
`;
