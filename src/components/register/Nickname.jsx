import React from "react";

import styled from "styled-components";

import cancelBtn from "../../assets/svg/cancel_modal.svg";
import ToastMessage from "../elements/modal/ToastMessage";

const Nickname = (props) => {
  const { register, errors, watch, resetField, toast, nicknameFailure } = props;
  return (
    <StDiv>
      {toast && <ToastMessage text={errors?.nickname?.message} timer={1000} />}
      {nicknameFailure && (
        <ToastMessage text={errors?.nicknameError?.message} timer={1000} />
      )}
      <label>닉네임</label>
      <div className="register_input_box">
        {watch("nickname")?.length >= 1 && (
          <img
            className="input_label_icon"
            src={cancelBtn}
            alt="리셋 버튼"
            onClick={() => resetField("nickname")}
          />
        )}
        <input
          placeholder="닉네임을 입력해 주세요"
          minLength={2}
          maxLength={10}
          // disabled={checkNickname}
          {...register("nickname", {
            required: true,
            pattern: {
              value: /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{2,10}$/,
              message: "닉네임은 2~10자이며, 영어, 숫자포함합니다.",
            },
          })}
        />
      </div>
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
