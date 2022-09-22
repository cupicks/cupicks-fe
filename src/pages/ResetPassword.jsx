import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import api from "../server/api";

import CheckEmail from "../components/resetPassword/CheckEmail";
import Navigation from "../partial/Navigation";

import styled from "styled-components";

import arrowBack from "../assets/svg/arrow_back.svg";
import ToastMessage from "../components/elements/modal/ToastMessage";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [emailFailure, setEmailFailure] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const contentType = "application/x-www-form-urlencoded";

  const {
    register,
    watch,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  const onSubmit = async (data) => {
    console.log(data);
    // try {
    //   const res = await api(contentType).get(
    //     `/auth/send-password?email=${getValues("email")}`,
    //   );
    //   console.log(res);
    //   // alert(res.data.message);
    //   navigate("/sign-in");
    // } catch (err) {
    //   // console.log(err);
    //   // alert(err.response.data.message);
    //   setError("emailError", { message: err.response.data.message });
    //   setEmailError(true);
    //   setTimeout(() => {
    //     setEmailError(false);
    //   }, 1000);
    // }
  };

  const clickResetPw = async () => {
    if (errors.email) {
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
      }, 1000);
      return;
    }
    try {
      const res = await api(contentType).get(
        `/auth/send-password?email=${getValues("email")}`,
      );
      console.log(res);
      setResetSuccess(true);
      setTimeout(() => {
        navigate("/sign-in");
      }, 1000);
      // alert(res.data.message);
    } catch (err) {
      // console.log(err);
      // alert(err.response.data.message);
      setError("emailFailure", { message: err.response.data.message });
      setEmailFailure(true);
      setTimeout(() => {
        setEmailFailure(false);
      }, 1000);
    }
  };
  const before = () => {
    navigate("/sign-in");
  };
  return (
    <StForm onSubmit={handleSubmit(onSubmit)}>
      {emailFailure && (
        <ToastMessage text={errors?.emailFailure?.message} timer={1000} />
      )}
      {resetSuccess && (
        <ToastMessage
          text={"임시 비밀번호를 이메일로 발송했어요!"}
          timer={1000}
        />
      )}
      <Navigation empty={true}>
        <StArrowBack>
          <img src={arrowBack} onClick={before} alt="뒤로 가기" />
        </StArrowBack>
        <label className="title">비밀번호 찾기</label>
      </Navigation>

      <div className="padding_box">
        <CheckEmail
          register={register}
          errors={errors}
          emailError={emailError}
        />

        <StButton
          onClick={clickResetPw}
          disabled={
            watch("email") === undefined ||
            watch("email") === "" ||
            resetSuccess ||
            emailFailure
          }
        >
          계속하기
        </StButton>
      </div>
    </StForm>
  );
};

export default ResetPassword;

const StArrowBack = styled.div`
  padding: 5px 10px;
  margin-left: -10px;

  cursor: pointer;
`;

const StForm = styled.form`
  .padding_box {
    padding: 0 25px;
  }

  & div label {
    margin-top: 10px;

    font-size: 28px;
    font-weight: 700;

    color: var(--font-color-dark);
  }

  & p {
    height: 0;

    position: relative;
    transform: translateY(-28px);

    font-size: 13px;
    color: var(--font-color-alert);
  }

  & p.margin {
    transform: translateY(-10px);
  }

  & input {
    all: unset;

    margin-bottom: 30px;

    border-bottom: var(--input-border-bottom);
    font-size: var(--input-font-size);
    padding: var(--input-padding);

    transition: all 0.2s;

    :focus {
      border-bottom: var(--input-activeBorder-bottom);
    }
    ::placeholder {
      color: #ddd;
    }
  }
`;

const StButton = styled.button`
  all: unset;
  width: 100%;
  border-radius: 10px;

  padding: 15px;
  margin: 200px 0;

  border: var(--input-border-bottom);
  color: var(--input-font-color);

  font-weight: 700;
  font-size: 18px;
  text-align: center;

  transition: all 0.2s;
  box-sizing: border-box;

  cursor: pointer;

  :hover {
    background-color: var(--button-activeBackgroundColor);
    border-color: var(--button-activeBorderColor);
    color: #fff;
  }
  :disabled {
    pointer-events: none;
  }
`;
