import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import api from "../server/api";

import CheckEmail from "../components/resetPassword/CheckEmail";
import Navigation from "../partial/Navigation";

import styled from "styled-components";
import styledFormComponents from "../styles/customFormStyle";
const { CustomForm, CustomButton } = styledFormComponents;
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapFullVH } = styledLayoutComponents;

import arrowBack from "../assets/svg/arrow_back.svg";
import ToastMessage from "../components/elements/modal/ToastMessage";

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    setError,
    resetField,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  const [check, setCheck] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailFailure, setEmailFailure] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
  };

  const resetButtonClickHandler = async () => {
    const contentType = "application/x-www-form-urlencoded";
    const currentEmail = getValues("email");

    if (errors.email) {
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
      }, 2000);
      return;
    }

    const data = { email: currentEmail };

    const queryStringData = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");

    try {
      const res = await api(contentType).patch(
        "/auth/send-password",
        queryStringData,
      );
      console.log(res);
      setResetSuccess(true);
    } catch (err) {
      console.log(err.response.data.message);
      const passwordResetLimit =
        err.response.data.message.includes("이메일 제한 횟수");
      let message = "";

      if (passwordResetLimit) {
        // 5번 초과
        message = "하루 비밀번호 초기화\n 제한 횟수 5번을\n 초과하였습니다.";
      } else {
        // 존재하지 않는 이메일
        message = `${currentEmail}은(는)\n 존재하지 않는 이메일입니다.`;
      }

      setError("emailFailure", {
        message: message,
      });

      setEmailFailure(true);
      setTimeout(() => {
        setEmailFailure(false);
      }, 2000);
    }
  };

  const resetPasswordToken = location.search.split("?resetPasswordToken=")[1];

  const resetPasswordTokenHandler = async () => {
    const data = { resetPasswordToken: resetPasswordToken };

    console.log(data);

    const queryStringData = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");

    if (resetPasswordToken) {
      const contentType = "application/x-www-form-urlencoded";
      try {
        const res = await api(contentType).patch(
          "/auth/reset-password",
          queryStringData,
        );
        console.log(res);
        if (res.data.isSuccess) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          navigate("/profile/edit?state=resetPassword");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (resetPasswordToken) {
    resetPasswordTokenHandler();
  }

  return (
    <CustomWrapFullVH>
      <StForm onSubmit={handleSubmit(onSubmit)}>
        {/* 모달 */}
        {emailFailure && (
          <ToastMessage text={errors?.emailFailure?.message} timer={2000} />
        )}
        {resetSuccess && (
          <ToastMessage
            text={"임시 비밀번호를 이메일로 발송했어요!"}
            timer={2000}
          />
        )}

        {/* 네비게이션 */}
        <Navigation empty={true}>
          <StArrowBack>
            <img
              src={arrowBack}
              onClick={() => {
                navigate("/sign-in");
              }}
              alt="뒤로 가기"
            />
          </StArrowBack>
          <label className="title">비밀번호 찾기</label>
        </Navigation>

        {/* 비밀번호 찾기 시작 */}
        <CheckEmail
          register={register}
          errors={errors}
          watch={watch}
          emailError={emailError}
          resetField={resetField}
          resetSuccess={resetSuccess}
        />

        <StButton
          onClick={resetButtonClickHandler}
          disabled={
            watch("email") === undefined || watch("email") === "" || check
          }
        >
          계속하기
        </StButton>
      </StForm>
    </CustomWrapFullVH>
  );
};

export default ResetPassword;

const StArrowBack = styled.div`
  padding: 0.5rem 1rem;
  margin-left: -1rem;

  cursor: pointer;
`;

const StForm = styled(CustomForm)`
  & p {
    position: relative;
  }
`;

const StButton = styled(CustomButton)`
  margin-top: 12rem;
`;
