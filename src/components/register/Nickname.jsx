import React from "react";

import styled from "styled-components";
import styledFormComponents from "../../styles/customFormStyle";
const { CustomTitle } = styledComponents;
import styledComponents from "../../styles/customElementStyle";
const { CustomInput, CustomErrorBox, CustomInputBox } = styledFormComponents;

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

      <CustomTitle>
        <h1>닉네임</h1>
      </CustomTitle>

      <CustomInputBox>
        {watch("nickname")?.length >= 1 && (
          <img
            className="input_label_icon"
            src={cancelBtn}
            alt="리셋 버튼"
            onClick={() => resetField("nickname")}
          />
        )}
        <CustomInput
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
      </CustomInputBox>

      <StErrorBox>
        {errors.nickname && <p>{errors.nickname.message}</p>}
      </StErrorBox>
    </StDiv>
  );
};

export default Nickname;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StErrorBox = styled(CustomErrorBox)`
  min-height: 0;
  height: 0.5rem;
`;
