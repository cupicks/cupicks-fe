import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Email from "../components/register/Email";
import Nickname from "../components/register/Nickname";
import Password from "../components/register/Password";
import Image from "../components/register/Image";

import styled from "styled-components";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  const [level, setLevel] = React.useState(0);

  const onSubmit = async () => {
    const form = new FormData();
    form.append(
      "imageValue",
      getValues("image") === undefined ? null : getValues("image")[0]
    );
    if (
      level === 3 &&
      getValues("emailVerifyToken") &&
      getValues("nicknameVerifyToken")
    ) {
      try {
        const res = await axios.post(
          `http://3.38.250.115/api/auth/signup?nickname=${getValues(
            "nickname"
          )}&email=${getValues("email")}&password=${getValues(
            "password"
          )}&nicknameVerifyToken=${getValues(
            "nicknameVerifyToken"
          )}&emailVerifyToken=${getValues("emailVerifyToken")}`,
          form,
          { headers: { "Content-Type": "multi-part/form-data" } }
        );
        console.log(res);
        alert(res.data.message);
        navigate("/signIn");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const next = () => {
    //에러가 날 경우 알림띄우기
    if (errors.email && level === 0) {
      alert("이메일을 제대로 입력해주세요!");
      return;
    }
    if (errors.password && level === 1) {
      alert("비밀번호를 제대로 입력해주세요");
      return;
    }
    if (errors.password_confirm && level === 1) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    if (errors.nickname && level === 3) {
      alert("닉네임을 제대로 입력해주세요");
      return;
    }
    setLevel((prev) => prev + 1);
  };
  const before = () => {
    if (level === 0) {
      navigate("/signIn");
    } else {
      setLevel((prev) => prev - 1);
    }
  };

  return (
    <StDiv>
      <StForm onSubmit={handleSubmit(onSubmit)}>
        <StSpanBox>
          <StSpanLeft onClick={before}>&lt;</StSpanLeft>
          <StSpanCenter>회원가입</StSpanCenter>
        </StSpanBox>
        {level === 0 && (
          <Email
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
          />
        )}
        {level === 1 && (
          <Password
            register={register}
            errors={errors}
            watch={watch}
            getValues={getValues}
          />
        )}
        {level === 2 && (
          <Image
            register={register}
            errors={errors}
            watch={watch}
            getValues={getValues}
          />
        )}
        {level === 3 && (
          <Nickname
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
          />
        )}
        {level === 3 ? (
          <StButton
            disabled={
              (level === 3 && watch("nickname") === "") ||
              (level === 3 && watch("nicknameVerifyToken") === undefined) ||
              isSubmitting
            }
          >
            완료
          </StButton>
        ) : (
          <StButton
            onClick={next}
            disabled={
              (level === 0 && watch("email") === undefined) ||
              (level === 0 && watch("email") === "") ||
              (level === 0 && watch("emailVerifyToken") === undefined) ||
              (level === 1 && watch("password") === "") ||
              (level === 1 && watch("password_confirm") === "") ||
              (level === 2 && watch("image") === undefined) ||
              (level === 2 && watch("image")?.length === 0)
            }
          >
            계속하기
          </StButton>
        )}
      </StForm>
      {/* <button onClick={() => navigate("/signIn")}>취소</button> */}
    </StDiv>
  );
};

export default Register;

const StDiv = styled.div``;
const StSpanBox = styled.div`
  display: flex;
`;
const StSpanLeft = styled.span`
  font-size: 50px;

  cursor: pointer;
`;
const StSpanCenter = styled.span`
  margin: auto;
  font-size: 20px;
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  & > div > label {
    margin-top: 20px;

    font-size: 30px;
    font-weight: bold;
  }
  & p {
    color: #bf1650;
  }
  & input {
    margin-top: 20px;
    margin-bottom: 20px;

    border: none;
    border-bottom: 3px solid #b4b3b3;

    font-size: 20px;
    :hover,
    :focus,
    :active {
      outline: none;
      border-bottom-color: #000;
    }
    ::placeholder {
      color: #ddd;
    }
  }
`;
const StButton = styled.button`
  border-radius: 10px;

  margin-top: 250px;
  padding: 15px;

  background-color: #fff;
  border: 3px solid #eee;
  color: #a3a2a2;

  font-size: 18px;
  text-align: center;

  :disabled {
    pointer-events: none;
  }
  :hover {
    background-color: #000;
    border: none;
    color: #fff;
  }
`;
