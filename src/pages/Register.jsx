import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = React.useRef();
  password.current = watch("password");

  const onSubmit = (data) => console.log(data);

  return (
    <StDiv>
      <StForm onSubmit={handleSubmit(onSubmit)}>
        <label>이메일</label>
        <input
          type="text"
          placeholder="test@email.com"
          autoComplete="off"
          maxLength={20}
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <label>닉네임</label>
        <input
          placeholder="닉네임"
          minLength={2}
          maxLength={10}
          {...register("nickname", {
            required: "닉네임은 필수 입력입니다.",
            pattern: {
              value: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/,
              message: "닉네임은 2~10자이며, 한글, 영어, 숫자포함합니다.",
            },
          })}
        />
        {errors.nickname && <p>{errors.nickname.message}</p>}
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
        <label>비밀번호 재확인</label>
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
        <button type="submit" disabled={isSubmitting}>
          완료
        </button>
        <button type="button" onClick={() => navigate("/signIn")}>
          취소
        </button>
      </StForm>
    </StDiv>
  );
};

export default Register;

const StDiv = styled.div`
  width: 350px;
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  & p {
    color: #bf1650;
  }
`;
