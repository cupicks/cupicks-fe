import React from "react";
import styled from "styled-components";
import serverAxios from "../../server/server.axios";
import axios from "axios";
import { useWatch } from "react-hook-form";

const Email = (props) => {
  const { register, errors, setValue, watch, getValues } = props;
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [checkNumber, setCheckNumber] = React.useState(false);

  const confirmEmailVerifyCode = async () => {
    try {
      const res = await axios.get(
        `http://3.38.250.115/api/auth/confirm-email?email=${getValues(
          "email"
        )}&email-verify-code=${getValues("Number")}`,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const token = res.data.emailVerifyToken;
      console.log(token);
      setValue("emailVerifyToken", token);
      console.log(getValues("emailVerifyToken"));
      setCheckNumber(true);
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      // await new Promise((r) => setTimeout(r, 3000));
      alert(err.response.data.message);
    }
  };
  const sendEmailVerifyCode = async () => {
    try {
      const res = await axios.get(
        `http://3.38.250.115/api/auth/send-email?email=${getValues("email")}`,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      console.log(res.data.message);
      setCheckEmail(true);
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };
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
      <button onClick={sendEmailVerifyCode}>이메일 인증번호 발송</button>
      <label>인증번호</label>
      <input
        type="text"
        disabled={checkNumber === true}
        maxLength={6}
        placeholder="인증번호"
        {...register("Number")}
      />
      <button
        onClick={confirmEmailVerifyCode}
        disabled={watch("Number")?.length <= 5}
      >
        인증번호 확인
      </button>
    </StDiv>
  );
};

export default Email;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
