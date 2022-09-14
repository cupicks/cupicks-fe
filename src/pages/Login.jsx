import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import serverAxios from "../server/server.axios";
import axios from "axios";

import api from "../server/api";

import styled from "styled-components";

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
      <StPass onClick={() => navigate("/resetPassword")}>
        비밀번호를 잊으셨나요?
      </StPass>
      <StLink>
        <StP onClick={() => navigate("/signUp")}>
          Cupick이 처음이세요? 회원가입
        </StP>
      </StLink>
      <StLineBox>
        <StLineLeft></StLineLeft>
        <span>간편 로그인</span>
        <StLineRight></StLineRight>
      </StLineBox>
      <StKakaoBox>
        <StImg src="https://t1.daumcdn.net/cfile/tistory/992DA6415B743DB62B" />
        카카오로 시작하기
      </StKakaoBox>
      <StCtn>
        회원가입 시 서비스 이용 약관과 개인정보 보호정책에 동의하게 됩니다.
      </StCtn>
    </StDiv>
  );
};

export default Login;

const StDiv = styled.div``;
const StTitle = styled.div`
  width: 200px;

  margin-top: 70px;
`;
const StForm = styled.form`
  margin-top: 70px;

  display: flex;
  flex-direction: column;
  & p {
    color: #bf1650;
  }
  & label {
    color: #686666;
  }
`;
const StInput = styled.input`
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
`;
const StButton = styled.button`
  border-radius: 10px;

  padding: 15px;

  background-color: #fff;
  border: 3px solid #eee;
  color: #a3a2a2;

  font-size: 18px;
  text-align: center;
  :hover,
  :focus {
    background-color: #000;
    border: none;
    color: #fff;
  }
`;
const StLink = styled.div`
  margin: 50px;

  text-align: center;
`;
const StP = styled.p`
  color: #636262;

  font-size: 20px;

  cursor: pointer;
`;
const StLineBox = styled.div`
  width: 100%;

  position: relative;

  text-align: center;
  & span {
    color: #ddd;
  }
`;
const StLineLeft = styled.div`
  width: 34%;
  left: 0;
  top: 11px;

  position: absolute;

  border-top: 3px solid #ddd;
`;
const StLineRight = styled.div`
  width: 34%;
  right: 0;
  bottom: 11px;

  position: absolute;

  border-top: 3px solid #bbbaba;
`;
const StKakaoBox = styled.div`
  height: 70px;
  border-radius: 10px;

  margin: 30px auto;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #fff115;
  color: #4a4a4a;

  font-size: 20px;
  font-weight: bold;

  cursor: pointer;
`;
const StImg = styled.img`
  background-size: cover;
`;
const StCtn = styled.div`
  color: #cac8c8;

  text-align: center;
`;
const StPass = styled.p`
  color: #9e9e9e;
  float: right;
  cursor: pointer;
`;
