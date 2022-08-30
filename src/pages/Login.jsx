import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Stdiv>
      <Stform onSubmit={handleSubmit(onSubmit)}>
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
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="**********"
          maxLength={15}
          {...register("password", {
            required: "비밀번호는 필수 입력입니다",
            pattern: {
              value: /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#]).*$/,
              message:
                "비밀번호는 문자, 숫자, 특수문자(!@#) 각 1개씩 포함하며 8글자 이상, 15글자 이하입니다",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button type="submit" disabled={isSubmitting}>
          로그인
        </button>
      </Stform>
      <Link to="/signUp">회원가입</Link>
    </Stdiv>
  );
};

export default Login;

const Stdiv = styled.div`
  width: 350px;
`;
const Stform = styled.form`
  display: flex;
  flex-direction: column;
  & p {
    color: #bf1650;
  }
`;
