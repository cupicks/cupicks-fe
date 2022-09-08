import React from "react";
import axios from "axios";

import styled from "styled-components";

const Nickname = (props) => {
  const { register, errors, watch, setValue, getValues } = props;

  const confirmNicknameVerifyCode = async () => {
    try {
      const res = await axios.get(
        `http://3.38.250.115/api/auth/confirm-nickname?email=${getValues(
          "email"
        )}
        &nickname=${watch("nickname")}`,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const token = res.data.nicknameVerifyToken;
      setValue("nicknameVerifyToken", token);
      console.log(getValues("nicknameVerifyToken"));
      alert(res.data.message);
    } catch (err) {
      console.log(err);
      alert("이미 존재하는 닉네임입니다");
    }
  };

  return (
    <StDiv>
      <label>닉네임</label>
      <input
        placeholder="닉네임을 입력해 주세요"
        minLength={2}
        maxLength={10}
        {...register("nickname", {
          required: true,
          pattern: {
            value: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/,
            message: "닉네임은 2~10자이며, 한글, 영어, 숫자포함합니다.",
          },
        })}
      />
      {errors.nickname && <p>{errors.nickname.message}</p>}
      <button onClick={confirmNicknameVerifyCode}>닉네임 중복확인</button>
    </StDiv>
  );
};

export default Nickname;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  & input {
    margin-top: 70px;
  }
`;
