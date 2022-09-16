import React, { useState, useEffect } from "react";
import styled from "styled-components";
import serverAxios from "../../server/server.axios";
import axios from "axios";
import { useWatch } from "react-hook-form";

import api from "../../server/api";
import Timer from "./Timer";

import ToastMessage from "../../components/elements/modal/ToastMessage";

const Email = (props) => {
  const {
    register,
    errors,
    setValue,
    watch,
    getValues,
    checkNumber,
    setCheckNumber,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    checkEmail,
    setCheckEmail,
    checkTimer,
    setCheckTimer,
    toast,
    setToast,
    checkNumberCode,
    sendEmailVerifyCode,
  } = props;
  // const [checkEmail, setCheckEmail] = useState(false);
  // const [checkNumber, setCheckNumber] = useState(false);
  // const [minutes, setMinutes] = useState(3);
  // const [seconds, setSeconds] = useState(0);
  // const [checkTimer, setCheckTimer] = useState(false);
  // const [toast, setToast] = useState(false);

  // const contentType = "application/x-www-form-urlencoded";

  // const confirmEmailVerifyCode = async () => {
  //   try {
  //     const res = await api(contentType).get(
  //       `/auth/confirm-email?email=${getValues(
  //         "email"
  //       )}&email-verify-code=${getValues("Number")}`
  //       // { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  //     );
  //     const token = res.data.emailVerifyToken;
  //     console.log(token);
  //     setValue("emailVerifyToken", token);
  //     console.log(getValues("emailVerifyToken"));
  //     setCheckNumber(true);
  //     alert(res.data.message);
  //   } catch (err) {
  //     console.log(err);
  //     // await new Promise((r) => setTimeout(r, 3000));
  //     alert(err.response.data.message);
  //   }
  // };
  // const sendEmailVerifyCode = async () => {
  //   if (errors.email) {
  //     setToast(true);
  //     setTimeout(() => {
  //       setToast(false);
  //     }, 1000);
  //     return;
  //   }
  //   try {
  //     const res = await api(contentType).get(
  //       `/auth/send-email?email=${getValues("email")}`
  //       // {
  //       //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       // }
  //     );
  //     console.log(res.data.message);
  //     setCheckEmail(true);
  //     alert(res.data.message);
  //     setMinutes(3);
  //     setSeconds(0);
  //     setCheckTimer(true);
  //   } catch (err) {
  //     console.log(err);
  //     alert(err.response.data.message);
  //     setCheckEmail(false);
  //     setCheckTimer(false);
  //   }
  // };
  // React.useEffect(() => {
  //   if (watch("email") !== getValues("email")) {
  //     setCheckEmail(false);
  //   }
  //   if (watch("Number") !== getValues("Number")) {
  //     setCheckNumber(false);
  //   }
  // });
  return (
    <StDiv>
      {toast && <ToastMessage text={errors.email.message} timer={1000} />}
      <label>이메일 입력</label>
      <input
        type="text"
        disabled={checkEmail === true}
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
      {errors?.email?.types?.required && <p>{errors.email.message}</p>}
      {errors?.email?.types?.pattern && <p>{errors.email.message}</p>}
      {/* <button
        onClick={sendEmailVerifyCode}
        disabled={watch("email") === undefined || watch("email") === ""}
      >
        이메일 인증번호 발송
      </button> */}
      {checkNumber && (
        <>
          <label>이메일 인증번호 입력</label>
          <input
            type="text"
            disabled={checkNumberCode === true}
            maxLength={6}
            placeholder="인증번호"
            {...register("Number")}
          />

          {/* <button
        onClick={confirmEmailVerifyCode}
        disabled={
          watch("Number")?.length <= 5 || getValues("Number") === undefined
        }
      >
        인증번호 확인
      </button> */}
          <StTimer>
            <StReNumber
              disabled={checkNumberCode === true}
              onClick={sendEmailVerifyCode}
            >
              인증번호 재전송
            </StReNumber>
            <Timer
              minutes={minutes}
              setMinutes={setMinutes}
              seconds={seconds}
              setSeconds={setSeconds}
              checkTimer={checkTimer}
            />
          </StTimer>
        </>
      )}
    </StDiv>
  );
};

export default Email;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  
  .unactive {
    color: var(--font-color-light);
  }
`;

const StTimer = styled.div`
  display: flex;
  justify-content: space-between;

  transform: translateY(-10px);
`;

const StReNumber = styled.button`
  border: none;
  background: none;
  color: #3897f0;
  
  transform: translateY(-10px);

  :disabled {
    pointer-events: none;
    color: #cdcdcd;
  }
  cursor: pointer;
`;
