import React from "react";
import styled from "styled-components";
import cancelBtn from "../../assets/svg/cancel_modal.svg";
import ToastMessage from "../elements/modal/ToastMessage";

const CheckEmail = (props) => {
  const { register, errors, watch, resetField, emailError, resetSuccess } =
    props;

  return (
    <StDiv>
      {emailError && (
        <ToastMessage text={errors?.email?.message} timer={1000} />
      )}
      <label>이메일 입력</label>
      <div className="register_input_box">
        {watch("email")?.length >= 1 && resetSuccess === false && (
          <img
            className="input_label_icon"
            src={cancelBtn}
            alt="리셋 버튼"
            onClick={() => resetField("email")}
          />
        )}
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
      </div>
      {errors?.email?.types?.required && <p>{errors.email.message}</p>}
      {errors?.email?.types?.pattern && <p>{errors.email.message}</p>}
    </StDiv>
  );
};

export default CheckEmail;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  .register_input_box {
    position: relative;
  }
  .input_label_icon {
    width: 30px;
    height: 30px;

    position: absolute;
    right: 0;
    bottom: 0;

    transform: translateY(-120%);

    cursor: pointer;
  }
`;
