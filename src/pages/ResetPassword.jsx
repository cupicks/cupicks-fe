import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import api from "../server/api";

import CheckEmail from "../components/resetPassword/CheckEmail";

import styled from "styled-components";

import arrowBack from "../assets/svg/arrow_back.svg";

const ResetPassword = () => {
  const contentType = "application/x-www-form-urlencoded";
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  const onSubmit = async () => {
    try {
      const res = await api(contentType).get(
        `/auth/send-password?email=${getValues("email")}`
      );
      console.log(res);
      alert(res.data.message);
      navigate("/signIn");
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };
  const before = () => {
    navigate("/signIn");
  };

  return (
    <div>
      <StForm onSubmit={handleSubmit(onSubmit)}>
        <StSpanBox>
          <StArrowBack src={arrowBack} alt="뒤로가기" onClick={before} />
          <StSpanCenter>비밀번호 찾기</StSpanCenter>
        </StSpanBox>
        <CheckEmail register={register} errors={errors} />
        <StButton
          disabled={
            watch("email") === undefined ||
            watch("email") === "" ||
            isSubmitting
          }
        >
          계속하기
        </StButton>
      </StForm>
    </div>
  );
};

export default ResetPassword;

const StSpanBox = styled.div`
  display: flex;
  padding-top: 20px;
`;
const StArrowBack = styled.img`
  width: 25px;
  height: 25px;

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
    :focus {
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
