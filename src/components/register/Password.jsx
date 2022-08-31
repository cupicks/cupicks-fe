import React from "react";

import styled from "styled-components";

const Password = (props) => {
  const { register, errors, watch } = props;
  const password = React.useRef();
  password.current = watch("password");
  return (
    <StDiv>
      <label>비밀번호</label>
      <input
        type="password"
        placeholder="***********"
        minLength={8}
        maxLength={15}
        {...register("password", {
          required: "비밀번호는 필수 입력입니다.",
          pattern: {
            value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#]).*$/,
            message:
              "비밀번호는 문자, 숫자, 특수문자(!@#) 각 1개씩 포함하며 8글자 이상, 15글자 이하입니다",
          },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <label>비밀번호 확인</label>
      <input
        type="password"
        {...register("password_confirm", {
          required: "비밀번호 재입력은 필수입니다.",
          validate: (value) => value === password.current,
        })}
      />
      {errors.password_confirm && <p>{errors.password_confirm.message}</p>}
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
`;
