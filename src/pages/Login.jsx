import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../server/api";

import styled from "styled-components";

import kakao from "../assets/image/logo/kakao.png";
import ToastMessage from "../components/elements/modal/ToastMessage";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    criteriaMode: "all",
    mode: "onChange",
  });
  const [emailFailure, setEmailFailure] = useState(false);
  const [pwFailure, setPwFailure] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);
    // const data = { email: watch("email"), password: watch("password") };
    // const queryStringData = Object.keys(data)
    //   .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    //   .join("&");
    // console.log(queryStringData);
    // const contentType = "application/x-www-form-urlencoded";
    // try {
    //   const res = await api(contentType).post(
    //     "/auth/signin",
    //     queryStringData,
    //     // {
    //     //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //     // }
    //   );
    //   console.log(res);
    //   localStorage.setItem("accessToken", res.data.accessToken);
    //   localStorage.setItem("refreshToken", res.data.refreshToken);
    //   setLoginSuccess(true);
    //   // alert(res.data.message);
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 1000);
    // } catch (err) {
    //   console.log(err);
    //   // alert(err.response.data.message);
    //   setError("loginError", { message: err.response.data.message });
    //   setLoginError(true);
    //   setTimeout(() => {
    //     setLoginError(false);
    //   }, 1000);
    // }
  };
  const clickLogin = async () => {
    if (errors.email) {
      setEmailFailure(true);
      setTimeout(() => {
        setEmailFailure(false);
      }, 1000);
      return;
    }
    if (errors.password) {
      setPwFailure(true);
      setTimeout(() => {
        setPwFailure(false);
      }, 1000);
      return;
    }
    const data = { email: watch("email"), password: watch("password") };
    const queryStringData = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
    console.log(queryStringData);
    const contentType = "application/x-www-form-urlencoded";
    try {
      const res = await api(contentType).post(
        "/auth/signin",
        queryStringData,
        // {
        //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
        // }
      );
      console.log(res);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      setLoginSuccess(true);
      navigate("/recipe", {state: {message: `${data.email}\n로그인 되었습니다.`}});
    } catch (err) {
      console.log(err);
      // alert(err.response.data.message);
      setError("loginError", { message: err.response.data.message });
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 1000);
    }
  };
  return (
    <StDiv>
      {/* 모달창 */}
      {emailFailure && (
        <ToastMessage text={errors?.email?.message} timer={1000} />
      )}
      {pwFailure && (
        <ToastMessage text={errors?.password?.message} timer={1000} />
      )}
      {loginError && (
        <ToastMessage text={errors?.loginError?.message} timer={1000} />
      )}

      {/* 로그인 시작 */}
      <StTitle>
        <h1>홈 바리스타가 되어볼까요?</h1>
      </StTitle>

      <StForm onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <StInput
          type="text"
          placeholder="이메일 주소를 입력해 주세요"
          autoComplete="off"
          maxLength={100}
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />

        <StErrorBox>
          {errors.email && <p>{errors.email.message}</p>}
        </StErrorBox>
        
        <label>비밀번호</label>
        <StInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          maxLength={15}
          {...register("password", {
            required: true,
            pattern: {
              value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#]).*$/,
              message:
                "비밀번호는 문자, 숫자, 특수문자(!@#) 각 1개씩 포함하며 8글자 이상, 15글자 이하입니다",
            },
          })}
        />
        
        <StErrorBox>
          {errors.password && <p>{errors.password.message}</p>}
        </StErrorBox>

        <StButton
          onClick={clickLogin}
          disabled={
            loginSuccess ||
            loginError ||
            watch("email") === "" ||
            watch("email") === undefined ||
            watch("password") === ""
          }
        >
          계속하기
        </StButton>
      </StForm>

      <StFlexBox>
        <StPass onClick={() => navigate("/resetPassword")}>
          비밀번호를 잊으셨나요?
        </StPass>
      </StFlexBox>

      <StLineBox>
        <span>비로그인</span>
      </StLineBox>

      {/* <StKakaoBox>
        <img src={kakao} />
        카카오로 시작하기
      </StKakaoBox> */}
      <StNonLogin onClick={() => navigate("/recipe")}>둘러보기</StNonLogin>

      <StCtn>
        회원가입 시 서비스 이용 약관과 개인정보 보호정책에 동의하게 됩니다.
      </StCtn>

      <StLink onClick={() => navigate("/sign-up")}>
        Cupick이 처음이세요? 회원가입
      </StLink>
    </StDiv>
  );
};

export default Login;

const StDiv = styled.div`
  height: 100vh;
  padding: 0 25px;

  display: flex;
  flex-flow: column;

  overflow-y: scroll;

  color: #393939;

  line-height: 150%;
`;

const StTitle = styled.div`
  width: 200px;

  margin-top: 55px;

  h1 {
    font-weight: 700;
    font-size: 28px;
    line-height: 150%;
  }
`;

const StForm = styled.form`
  margin-top: 38px;

  display: flex;
  flex-direction: column;

  & p {
    color: #e64a3a;
  }
  & label {
    font-weight: 700;
    font-size: 13px;
    color: #9e9e9e;
  }
`;

const StInput = styled.input`
  all: unset;
  /* margin-bottom: 25px; */
  padding: 10px 0;

  border-bottom: 2px solid #cdcdcd;

  font-weight: 400;
  font-size: 17px;
  line-height: 150%;

  transition: all 0.3s;

  :hover,
  :focus,
  :active {
    border-bottom-color: #9e9e9e;
  }
  ::placeholder {
    color: #cdcdcd;
  }
`;

const StButton = styled.button`
  all: unset;
  padding: 15px;
  border-radius: 10px;

  border: var(--input-border-bottom);
  color: var(--input-font-color);

  font-weight: 700;
  font-size: 18px;
  text-align: center;

  transition: all 0.3s;
  box-sizing: border-box;

  cursor: pointer;

  :hover {
    background-color: var(--button-activeBackgroundColor);
    border-color: var(--button-activeBorderColor);
    color: #fff;
  }
  :disabled {
    background: #ddd;
    color: #9e9e9e;
    opacity: 0.5;
    pointer-events: none;
  }
`;

const StFlexBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StErrorBox = styled.div`
  min-height: 30px;
  margin-bottom: 5px;

  line-height: 30px;
  font-size: 13px;
`

const StPass = styled.p`
  margin-top: 10px;

  align-self: flex-end;

  color: #9e9e9e;

  text-align: right;
  font-weight: 700;
  font-size: 13px;

  cursor: pointer;
  transition: all 0.2s;

  :hover {
    color: #393939;
  }
`;

const StLineBox = styled.div`
  width: 100%;
  height: 1px;
  position: relative;

  margin-top: 30%;
  margin-bottom: 35px;

  ::before {
    content: "";
    width: 100%;
    height: 1px;

    position: absolute;

    background-color: #eee;
  }

  span {
    font-weight: 400;
    font-size: 14px;
    padding: 0 10px;

    background-color: #fff;
    color: #ddd;

    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StKakaoBox = styled.div`
  padding: 16px 0;
  border-radius: 10px;

  margin-bottom: 17px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #fff115;
  color: #000000;

  font-weight: 500;
  font-size: 19px;
  line-height: 150%;

  cursor: pointer;

  img {
    width: 20px;
    height: 20px;

    margin-right: 9px;
  }
`;

const StNonLogin = styled.button`
  all: unset;
  padding: 15px;
  border-radius: 10px;

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

const StCtn = styled.div`
  margin-top: 5px;

  color: #cac8c8;

  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

const StLink = styled.div`
  margin-top: 35px;
  margin-bottom: 40px;

  font-weight: 700;
  font-size: 14px;

  color: #9e9e9e;

  text-align: center;

  cursor: pointer;
`;
