import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Email from "../components/register/Email";
import Nickname from "../components/register/Nickname";
import Password from "../components/register/Password";
import Image from "../components/register/Image";

import styled from "styled-components";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ criteriaMode: "all", mode: "onChange" });
  const [level, setLevel] = React.useState(0);

  const onSubmit = (data) => {
    // await new Promise((r) => setTimeout(r, 1000));
    // alert(JSON.stringify(data));
    console.log(data);
  };
  const next = () => {
    // if (level === 0 && watch("email") === "") {
    //   return;
    // }
    if (errors.email) {
      alert("이메일을 제대로 입력해주세요!");
      return;
    }
    if (errors.password) {
      alert("비밀번호를 제대로 입력해주세요");
      return;
    }
    if (errors.password_confirm) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    if (errors.nickname) {
      alert("닉네임을 제대로 입력해주세요");
      return;
    }
    setLevel((prev) => prev + 1);
  };
  const before = () => {
    setLevel((prev) => prev - 1);
  };

  return (
    <StDiv>
      <StForm onSubmit={handleSubmit(onSubmit)}>
        <button onClick={before} disabled={level === 0}>
          &lt;
        </button>
        {level === 0 && <Email register={register} errors={errors} />}
        {level === 1 && (
          <Password register={register} errors={errors} watch={watch} />
        )}
        {level === 2 && <Image />}
        {level === 3 && <Nickname register={register} errors={errors} />}

        <button
          type="submit"
          onClick={next}
          disabled={
            (level === 0 && watch("email") === undefined) ||
            (level === 0 && watch("email") === "") ||
            (level === 1 && watch("password") === "") ||
            (level === 2 && watch("img") === "") ||
            (level === 3 && watch("nickname") === "")
          }
        >
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
