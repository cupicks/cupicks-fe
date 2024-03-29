import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../server/api";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapFullVH } = styledLayoutComponents;
import styledFormComponents from "../styles/customFormStyle";
const {
  CustomInput,
  CustomForm,
  CustomButton,
  CustomErrorBox,
  CustomInputBox,
} = styledFormComponents;
import styledElementComponents from "../styles/customElementStyle";
const {
  CustomTitle,
  CustomSmallBoldTextLink,
  CustomLineBox,
  CustomSmallLightText,
} = styledElementComponents;

import cancelBtn from "../assets/svg/cancel_modal.svg";
import kakao from "../assets/image/logo/kakao.png";
import ToastMessage from "../components/elements/modal/ToastMessage";
import Navigation from "../partial/Navigation";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    mode: "onChange",
  });
  const [emailFailure, setEmailFailure] = useState(false);
  const [pwFailure, setPwFailure] = useState(false);
  const [check, setCheck] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [messageModal, setMessageModal] = useState(false);
  const messageText = location.state?.message;

  // resetPassword
  const resetEmail = location.state?.resetEmail;

  useEffect(() => {
    if (messageText !== undefined) {
      setMessageModal(true);
      setTimeout(() => {
        setMessageModal(false);
      }, 2000);
    }
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
  };

  const clickLogin = async () => {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 2000);
    if (errors.email) {
      setEmailFailure(true);
      setTimeout(() => {
        setEmailFailure(false);
      }, 2000);
      return;
    }
    if (errors.password) {
      setPwFailure(true);
      setTimeout(() => {
        setPwFailure(false);
      }, 2000);
      return;
    }

    const data = { email: watch("email"), password: watch("password") };
    const queryStringData = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
    const contentType = "application/x-www-form-urlencoded";

    try {
      const res = await api(contentType).post("/auth/signin", queryStringData);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      navigate("/recipe", {
        state: { message: `${data.email}\n로그인 되었습니다.` },
      });
    } catch (err) {
      console.log(err);
      // setError("loginError", { message: err.response.data.message });
      setError("loginError", {
        message: `일치하지 않는\n 회원정보 입니다.`,
      });
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 2000);
    }
  };
  return (
    <CustomWrapFullVH>
      {/* 모달창 */}
      {emailFailure && (
        <ToastMessage text={errors?.email?.message} timer={2000} />
      )}
      {pwFailure && (
        <ToastMessage
          text={errors?.password?.message}
          timer={2000}
          smallFont={true}
        />
      )}
      {loginError && (
        <ToastMessage
          text={errors?.loginError?.message}
          timer={2000}
          smallFont={true}
        />
      )}
      {messageModal && <ToastMessage text={messageText} timer={1500} />}

      {/* 로그인 시작 */}
      <Navigation empty={true} transparent={true} />
      <StLoginTitle>
        <h1>홈 바리스타가 되어볼까요?</h1>
      </StLoginTitle>

      <StLoginForm onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>

        <CustomInputBox>
          {watch("email")?.length >= 1 && (
            <img
              className="input_label_icon"
              src={cancelBtn}
              alt="리셋 버튼"
              onClick={() => resetField("email")}
            />
          )}
          <CustomInput
            type="email"
            placeholder="이메일 주소를 입력해 주세요"
            autoComplete="off"
            maxLength={100}
            defaultValue={resetEmail ? resetEmail : ""}
            {...register("email", {
              required: true,
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
        </CustomInputBox>

        <StErrorBox>{errors.email && <p>{errors.email.message}</p>}</StErrorBox>

        <label>비밀번호</label>
        <CustomInputBox>
          {watch("password")?.length >= 1 && (
            <img
              className="input_label_icon"
              src={cancelBtn}
              alt="리셋 버튼"
              onClick={() => resetField("password")}
            />
          )}
          <CustomInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            maxLength={15}
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!])[A-Za-z\d@!]{8,15}$/,
                message:
                  "비밀번호는 문자, 숫자, 특수문자(!@) 각 1개씩 포함하며 8글자 이상, 15글자 이하입니다",
              },
            })}
          />
        </CustomInputBox>

        <StErrorBox>
          {errors.password && <p>{errors.password.message}</p>}
        </StErrorBox>

        <CustomButton
          onClick={clickLogin}
          disabled={
            check ||
            watch("email") === "" ||
            watch("email") === undefined ||
            watch("password") === ""
          }
        >
          계속하기
        </CustomButton>
      </StLoginForm>

      <StFlexBox>
        <StResetPassword onClick={() => navigate("/reset-password")}>
          비밀번호를 잊으셨나요?
        </StResetPassword>
      </StFlexBox>

      <StLineBox>
        <span>비로그인</span>
      </StLineBox>

      {/* <StKakaoBox>
        <img src={kakao} />
        카카오로 시작하기
      </StKakaoBox> */}

      <CustomButton onClick={() => navigate("/recipe")}>둘러보기</CustomButton>

      <StCtn>
        회원가입 시 서비스 이용 약관과 개인정보 보호정책에 동의하게 됩니다.
      </StCtn>

      <StLink onClick={() => navigate("/sign-up")}>
        Cupick이 처음이세요? 회원가입
      </StLink>
    </CustomWrapFullVH>
  );
};

export default Login;

const StLoginTitle = styled(CustomTitle)`
  width: 30rem;
`;

const StLoginForm = styled(CustomForm)`
  .register_input_box {
    position: relative;
  }
`;

const StFlexBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StErrorBox = styled(CustomErrorBox)`
  min-height: 3rem;
  p {
    position: absolute;
  }
`;

const StResetPassword = styled(CustomSmallBoldTextLink)`
  margin-top: 1rem;

  align-self: flex-end;
  text-align: right;
`;

const StLineBox = styled(CustomLineBox)`
  margin-top: 10vh;
  margin-bottom: 3.5rem;
`;

const StKakaoBox = styled.div`
  padding: 1.6em 0;
  border-radius: 1rem;

  margin-bottom: 1.7rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #fff115;
  color: #000000;

  font-weight: 500;
  font-size: 1.9rem;

  cursor: pointer;

  img {
    width: 2rem;
    height: 2rem;

    margin-right: 0.9rem;
  }
`;

const StCtn = styled(CustomSmallLightText)`
  margin-top: 1.8rem;
  padding: 0 1rem;

  word-break: keep-all;

  text-align: center;
  font-size: 1.2rem;
`;

const StLink = styled(CustomSmallBoldTextLink)`
  margin-top: 3.5rem;
  margin-bottom: 4rem;

  text-align: center;
`;
