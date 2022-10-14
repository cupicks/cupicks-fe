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
  const contentType = "application/x-www-form-urlencoded";

  const onSubmit = async (data) => {
    console.log(data);
  };

  const clickResetPw = async () => {
    const currentEmail = getValues("email");
    if (errors.email) {
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
      }, 1000);
      return;
    }

    try {
      const res = await api(contentType).patch(
        "/auth/send-password",
        queryStringData,
      );
      console.log(res);
      setResetSuccess(true);

      if (res.data.isSuccess) {
        setTimeout(() => {
          navigate("/sign-in", {
            state: {
              resetEmail: currentEmail,
              message: "이메일로 발송된\n임시비밀번호를 입력해주세요.",
            },
          });
        }, 1000);
      }
    } catch (err) {
      setError("emailFailure", {
        message: `${currentEmail}은(는)\n 존재하지 않는 이메일입니다.`,
      });

      setEmailFailure(true);
      setTimeout(() => {
        setEmailFailure(false);
      }, 1000);
    }
  };

  return (
    <CustomWrapFullVH>
      <button
        onClick={() => {
          navigate("/sign-in", {
            state: {
              resetEmail: "test@test.com",
              message: "이메일로 발송된\n임시비밀번호를 입력해주세요.",
            },
          });
        }}
      >
        테스트버튼
      </button>

      <StForm onSubmit={handleSubmit(onSubmit)}>
        {/* 모달 */}
        {emailFailure && (
          <ToastMessage text={errors?.emailFailure?.message} timer={1000} />
        )}
        {resetSuccess && (
          <ToastMessage
            text={"임시 비밀번호를 이메일로 발송했어요!"}
            timer={1000}
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
          onClick={clickResetPw}
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
