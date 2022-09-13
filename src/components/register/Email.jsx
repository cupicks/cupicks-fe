import React from "react";
import styled from "styled-components";
import serverAxios from "../../server/server.axios";
import axios from "axios";

const Email = (props) => {
  const { register, errors, setValue, getValues } = props;

  const confirmEmailVerifyCode = async () => {
    try {
      const res = await axios.get(
        `http://13.125.231.146/api/auth/confirm-email?email=${getValues(
          "email"
        )}&email-verify-code=${getValues("Number")}`,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const token = res.data.emailVerifyToken;
      console.log(token);
      setValue("emailVerifyToken", token);
      console.log(getValues("emailVerifyToken"));
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("이미 인증이 완료되었습니다");
    }
  };
  const sendEmailVerifyCode = async () => {
    try {
      const res = await axios.get(
        `http://13.125.231.146/api/auth/send-email?email=${getValues("email")}`,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      console.log(res.data.message);
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };
  return (
    <StDiv>
      <label>이메일 입력</label>
      <input
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
      {errors?.email?.types?.required && <p>{errors.email.message}</p>}
      {errors?.email?.types?.pattern && <p>{errors.email.message}</p>}
      <button onClick={sendEmailVerifyCode}>이메일 인증번호 발송</button>
      <label>인증번호</label>
      <input type="text" placeholder="인증번호" {...register("Number")} />
      <button onClick={confirmEmailVerifyCode}>인증번호 확인</button>
    </StDiv>
  );
};

export default Email;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
