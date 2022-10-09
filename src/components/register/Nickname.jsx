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
      {toast && (
        <ToastMessage
          text={"닉네임은 한글 또는 영문 또는 숫자로\n 2자 이상 입력해주세요."}
          timer={1800}
          smallFont={true}
        />
      )}

      {nicknameFailure && (
        <ToastMessage
          text={errors?.nicknameError?.message}
          timer={1800}
          smallFont={true}
        />
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
          autoComplete="off"
          {...register("nickname", {
            required: true,
            pattern: {
              value: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/,
              message:
                "닉네임은 한글 또는 영문 또는 숫자로 2자 이상 입력해주세요.",
            },
          })}
        />
      </CustomInputBox>

      <StErrorBox>
        <p className="info">
          닉네임은 한글 또는 영문 또는 숫자 2~10자로 입력해주세요.
        </p>
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
