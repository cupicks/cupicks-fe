import React from "react";
import styled from "styled-components";
import ToastMessage from "../elements/modal/ToastMessage";

const CheckEmail = (props) => {
  const { register, errors, emailError } = props;

  return (
    <StDiv>
      {emailError && (
        <ToastMessage text={errors?.email?.message} timer={1000} />
      )}
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
    </StDiv>
  );
};

export default CheckEmail;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
