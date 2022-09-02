import React from "react";

import styled from "styled-components";

const Nickname = (props) => {
  const { register, errors } = props;
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
