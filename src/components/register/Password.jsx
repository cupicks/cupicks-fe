import React from "react";

import styled from "styled-components";

import cancelBtn from "../../assets/svg/cancel_modal.svg";
import ToastMessage from "../../components/elements/modal/ToastMessage";

const Password = (props) => {
  const {
    register,
    errors,
    watch,
    getValues,
    resetField,
    passwordError,
    passwordCfError,
  } = props;
  const password = React.useRef();
  password.current = watch("password");
  return (
    <StDiv>
      {passwordError && (
        <ToastMessage text={errors?.password?.message} timer={1000} />
      )}
      {passwordCfError && (
        <ToastMessage text={"비밀번호가 일치하지 않습니다."} timer={1000} />
      )}
      <label>비밀번호</label>
      <div className="register_input_box">
        {watch("password")?.length >= 1 && (
          <img
            className="input_label_icon"
            src={cancelBtn}
            alt="리셋 버튼"
            onClick={() => resetField("password")}
          />
        )}
        <input
          type="password"
          placeholder="8자리 이상 입력해 주세요"
          minLength={8}
          maxLength={15}
          {...register("password", {
            required: true,
            pattern: {
              value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#]).*$/,
              message:
                "비밀번호는 문자, 숫자, 특수문자(!@#) 각 1개씩 포함하며 8글자 이상, 15글자 이하입니다",
            },
          })}
        />
      </div>
      {errors.password && <p>{errors.password.message}</p>}
      <label>비밀번호 확인</label>
      <div className="register_input_box">
        {watch("password_confirm")?.length >= 1 && (
          <img
            className="input_label_icon"
            src={cancelBtn}
            alt="리셋 버튼"
            onClick={() => resetField("password_confirm")}
          />
        )}
        <input
          type="password"
          placeholder="다시 한번 입력해 주세요"
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
      </div>
      {errors.password_confirm &&
        errors.password_confirm.type === "validate" && (
          <p>비밀번호가 일치하지 않습니다.</p>
        )}
    </StDiv>
  );
};

export default Password;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;

  & p {
    transform: translateY(-28px) !important;
  }
`;
