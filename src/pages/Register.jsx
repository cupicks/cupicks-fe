import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import api from "../server/api";

import Email from "../components/register/Email";
import Nickname from "../components/register/Nickname";
import Password from "../components/register/Password";
import Image from "../components/register/Image";
import ConfirmBox from "../components/elements/modal/ConfirmBox";

import styled from "styled-components";

import arrowBack from "../assets/svg/arrow_back.svg";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  const [level, setLevel] = useState(0);
  const [modal, setModal] = useState(false);

  const onSubmit = async () => {
    const contentType = "multi-part/form-data";
    //request(body)-> image 보내기
    const form = new FormData();
    form.append(
      "imageValue",
      getValues("image") === undefined ? null : getValues("image")[0]
    );
    //마지막 페이지, 이메일, 닉네임 토큰이 있을 때에만 onSubmit사용
    if (level === 3) {
      try {
        const res = await api(contentType).post(
          `/auth/signup?password=${getValues(
            "password"
          )}&nicknameVerifyToken=${getValues(
            "nicknameVerifyToken"
          )}&emailVerifyToken=${getValues("emailVerifyToken")}`,
          form
          // { headers: { "Content-Type": "multi-part/form-data" } }
        );
        console.log(res);
        alert(res.data.message);
        navigate("/signUp/complete");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const next = () => {
    //에러가 날 경우 알림띄우기
    if (errors.email && level === 0) {
      alert("이메일을 제대로 입력해주세요!");
      return;
    }
    if (errors.password && level === 1) {
      alert("비밀번호를 제대로 입력해주세요");
      return;
    }
    if (errors.password_confirm && level === 1) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }
    if (errors.nickname && level === 2) {
      alert("닉네임을 제대로 입력해주세요");
      return;
    }
    setLevel((prev) => prev + 1);
  };
  const before = () => {
    if (level === 0) {
      navigate("/signIn");
    } else {
      // const emailToken = getValues("emailVerifyToken");
      // reset("emailVerifyToken");
      // reset("Number");
      // reset(getValues("email"));
      // reset({ emailVerifyToken: undefined });
      // reset({ nicknameVerifyToken: undefined });
      // setValue("emailVerifyToken", undefined);
      // resetField("emailVerifyToken");
      // console.log(getValues("emailVerifyToken"));
      // setLevel(0);
      setModal(true);
      // alert("뒤로가기 버튼을 누를 시 이메일 인증부터 새로 하셔야 합니다.");

      // resetField(getValues("emailVerifyToken"));
      // console.log(getValues("emailVerifyToken"));
    }
  };
  const resetRegister = () => {
    setTimeout(() => {
      reset({ emailVerifyToken: undefined });
      reset({ nicknameVerifyToken: undefined });
      setLevel(0);
      setModal(false);
    }, 1000);
  };
  const cancleModal = () => {
    setTimeout(() => {
      setModal(false);
    }, 1000);
  };
  // React.useEffect(() => {
  //   if (level !== 0) {
  //     before();
  //   }
  // }, []);
  // React.useEffect(() => {
  //   resetRegister();
  // }, []);

  return (
    <StDiv>
      {modal && (
        <ConfirmBox
          text={"뒤로가기 버튼을 누를시\n이메일 인증부터 새로 하셔야 합니다."}
          confirmButtonText={"새로하기"}
          backgroundShadow={true}
          onComfirmed={resetRegister}
          onDenied={cancleModal}
        />
      )}
      <StForm onSubmit={handleSubmit(onSubmit)}>
        <StSpanBox>
          <StArrowBack src={arrowBack} alt="뒤로가기" onClick={before} />
          <StSpanCenter>회원가입</StSpanCenter>
        </StSpanBox>
        {level === 0 && (
          <Email
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
          />
        )}
        {level === 1 && (
          <Password
            register={register}
            errors={errors}
            watch={watch}
            getValues={getValues}
          />
        )}
        {level === 2 && (
          <Nickname
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
          />
        )}
        {level === 3 && (
          <Image
            register={register}
            errors={errors}
            watch={watch}
            getValues={getValues}
          />
        )}
        {level === 3 ? (
          <StButton
            disabled={
              (level === 3 && watch("image") === undefined) ||
              (level === 3 && watch("image")?.length === 0) ||
              isSubmitting
            }
          >
            계속하기
          </StButton>
        ) : (
          <StButton
            onClick={next}
            disabled={
              (level === 0 && watch("email") === undefined) ||
              (level === 0 && watch("email") === "") ||
              (level === 0 && watch("emailVerifyToken") === undefined) ||
              (level === 1 && watch("password") === "") ||
              (level === 1 && watch("password_confirm") === "") ||
              (level === 2 && watch("nickname") === "") ||
              (level === 2 && watch("nicknameVerifyToken") === undefined)
            }
          >
            계속하기
          </StButton>
        )}
      </StForm>
    </StDiv>
  );
};

export default Register;

const StDiv = styled.div``;
const StSpanBox = styled.div`
  display: flex;
  padding-top: 30px;
`;
const StArrowBack = styled.img`
  width: 30px;
  height: 30px;

  cursor: pointer;
`;
const StSpanCenter = styled.span`
  margin: auto;
  font-size: 20px;
`;
const StForm = styled.form`
  display: flex;
  flex-direction: column;
  & > div > label {
    margin-top: 20px;

    font-size: 30px;
    font-weight: bold;
  }
  & p {
    color: #bf1650;
  }
  & input {
    margin-top: 20px;
    margin-bottom: 20px;

    border: none;
    border-bottom: 3px solid #b4b3b3;

    font-size: 20px;
    :hover,
    :focus {
      outline: none;
      border-bottom-color: #000;
    }
    ::placeholder {
      color: #ddd;
    }
  }
`;
const StButton = styled.button`
  border-radius: 10px;

  margin-top: 250px;
  padding: 15px;

  background-color: #fff;
  border: 3px solid #eee;
  color: #a3a2a2;

  font-size: 18px;
  text-align: center;

  :disabled {
    pointer-events: none;
  }
  :hover {
    background-color: #000;
    border: none;
    color: #fff;
  }
`;
