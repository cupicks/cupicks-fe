import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import serverAxios from "../server/server.axios";
import axios from "axios";

import api from "../server/api";

import styled from "styled-components";

import kakaoIcon from "../assets/svg/talk.svg";
import kakao from "../assets/image/logo/kakao.png";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();
  const onSubmit = async () => {
    const data = { email: watch("email"), password: watch("password") };
    const queryStringData = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
    console.log(queryStringData);
    const contentType = "application/x-www-form-urlencoded";
    try {
      const res = await api(contentType).post(
        "/auth/signin",
        queryStringData
        // {
        //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
        // }
      );
      console.log(res);
      console.log(res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
    <StDiv>
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
        {errors.email && <p>{errors.email.message}</p>}
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
        {errors.password && <p>{errors.password.message}</p>}
        <StButton type="submit" disabled={isSubmitting}>
          계속하기
        </StButton>
      </StForm>

      <StFlexBox>
        <StPass onClick={() => navigate("/resetPassword")}>
          비밀번호를 잊으셨나요?
        </StPass>
      </StFlexBox>

      <StLineBox>
        <span>간편 로그인</span>
      </StLineBox>

      <StKakaoBox>
        <img src={kakao} />
        카카오로 시작하기
      </StKakaoBox>

      <StCtn>
        회원가입 시 서비스 이용 약관과 개인정보 보호정책에 동의하게 됩니다.
      </StCtn>

      <StLink onClick={() => navigate("/signUp")}>
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

  margin-top: 60px;

  h1 {
    font-weight: 700;
    font-size: 28px;
    line-height: 150%;
  }
`;

const StForm = styled.form`
  margin-top: 47px;

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
  margin-bottom: 25px;
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

  border: 1px solid #cdcdcd;
  color: #cdcdcd;

  font-weight: 700;
  font-size: 18px;
  text-align: center;

  transition: all 0.2s;
  box-sizing: border-box;

  :hover {
    background-color: #393939;
    color: #fff;
  }
`;

const StFlexBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StPass = styled.p`
  margin-top: 10px;

  align-self: flex-end;

  color: #9e9e9e;

  text-align: right;
  font-weight: 700;

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

const StCtn = styled.div`
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
