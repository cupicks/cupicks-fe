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
import ToastMessage from "../components/elements/modal/ToastMessage";

import styled from "styled-components";

import arrowBack from "../assets/svg/arrow_back.svg";
import Navigation from "../partial/Navigation";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    getValues,
    setError,
    reset,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    criteriaMode: "all",
    mode: "onChange",
  });

  const [level, setLevel] = useState(0);
  const [modal, setModal] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);
  const [checkNumberCode, setCheckNumberCode] = useState(false);
  const [checkEmailCode, setCheckEmailCode] = useState(false);
  const [toast, setToast] = useState(false);
  const [checkTimer, setCheckTimer] = useState(false);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [checkEmail, setCheckEmail] = useState(false);
  const [failure, setFailure] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [numberSuccess, setNumberSuccess] = useState(false);
  const [numberFailure, setNumberFailure] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCfError, setPasswordCfError] = useState(false);
  const [completion, setCompletion] = useState(false);
  const [nicknameFailure, setNicknameFailure] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    // let contentType = "multi-part/form-data";
    // //request(body)-> image 보내기
    // const form = new FormData();
    // form.append(
    //   "imageValue",
    //   getValues("image") === undefined ? null : getValues("image")[0]
    // );
    // //마지막 페이지, 이메일, 닉네임 토큰이 있을 때에만 onSubmit사용
    // if (level === 3) {
    //   try {
    //     const res = await api(contentType).post(
    //       `/auth/signup?password=${getValues(
    //         "password"
    //       )}&nicknameVerifyToken=${getValues(
    //         "nicknameVerifyToken"
    //       )}&emailVerifyToken=${getValues("emailVerifyToken")}`,
    //       form
    //       // { headers: { "Content-Type": "multi-part/form-data" } }
    //     );
    //     console.log(res);
    //     alert(res.data.message);
    //     // setCompletion(true);
    //     navigate("/signUp/complete");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };
  const completionRegister = async () => {
    let contentType = "multi-part/form-data";
    //request(body)-> image 보내기
    const form = new FormData();
    form.append(
      "imageValue",
      getValues("image") === undefined ? null : getValues("image")[0]
    );
    //마지막 페이지, 이메일, 닉네임 토큰이 있을 때에만 onSubmit사용

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
      // alert(res.data.message);
      setCompletion(true);
      setTimeout(() => {
        navigate("/signUp/complete");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  const next = async () => {
    //에러가 날 경우 알림띄우기
    if (errors.email && level === 0) {
      alert("이메일을 제대로 입력해주세요!");
      return;
    }
    if (errors.password && level === 1) {
      // alert("비밀번호를 제대로 입력해주세요");
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 1000);
      return;
    }
    if (errors.password_confirm && level === 1) {
      //   alert("비밀번호가 일치하지 않습니다");
      setPasswordCfError(true);
      setTimeout(() => {
        setPasswordCfError(false);
      }, 1000);
      return;
    }
    if (errors.nickname && level === 2) {
      // alert("닉네임을 제대로 입력해주세요");
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1000);
      return;
    }
    //닉네임 중복확인
    if (level === 2) {
      const contentType = "application/x-www-form-urlencoded";
      try {
        const res = await api(contentType).get(
          `/auth/confirm-nickname?emailVerifyToken=${getValues(
            "emailVerifyToken"
          )}&nickname=${getValues("nickname")}`
          // { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        const token = res.data.nicknameVerifyToken;
        // console.log(res);
        setValue("nicknameVerifyToken", token);
        console.log(getValues("nicknameVerifyToken"));
        // setCheckNickname(true);
        // alert(res.data.message);
      } catch (err) {
        console.log(err);
        // alert(err.response.data.message);
        setError("nicknameError", { message: err.response.data.message });
        setNicknameFailure(true);
        setTimeout(() => {
          setNicknameFailure(false);
        }, 1000);
        return;
      }
    }
    setLevel((prev) => prev + 1);
  };
  const before = () => {
    if (level === 0) {
      navigate("/sign-in");
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
      setCheckEmail(false);
      setCheckEmailCode(false);
      setCheckNumber(false);
      setCheckNumberCode(false);
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
  const cancelModal = () => {
    setTimeout(() => {
      setModal(false);
    }, 1000);
  };
  //인증번호 발송
  const sendEmailVerifyCode = async () => {
    let contentType = "application/x-www-form-urlencoded";
    if (errors.email) {
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1000);
      return;
    }
    try {
      const res = await api(contentType).get(
        `/auth/send-email?email=${getValues("email")}`
        // {
        //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
        // }
      );
      console.log(res.data.message);
      setCheckEmail(true);
      // alert(res.data.message);
      setCheckNumber(true);
      setMinutes(3);
      setSeconds(0);
      setCheckTimer(true);
      setEmailSuccess(true);
      setTimeout(() => {
        setEmailSuccess(false);
      }, 1000);
      return;
    } catch (err) {
      console.log(err);
      // alert(err.response.data.message);
      setCheckEmail(false);
      setCheckTimer(false);
      setCheckNumber(false);

      setError("emailError", { message: err.response.data.message });

      // setValue("emailError", err.response.data.message);
      // console.log(setError);
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 2000);
      return;
    }
  };
  // console.log(getValues("emailError"));

  //입력번호 확인
  const confirmEmailVerifyCode = async () => {
    let contentType = "application/x-www-form-urlencoded";
    try {
      const res = await api(contentType).get(
        `/auth/confirm-email?email=${getValues(
          "email"
        )}&email-verify-code=${getValues("Number")}`
        // { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const token = res.data.emailVerifyToken;
      console.log(token);
      setValue("emailVerifyToken", token);
      console.log(getValues("emailVerifyToken"));
      setCheckEmailCode(true);
      setCheckNumberCode(true);
      // alert(res.data.message);
    } catch (err) {
      console.log(err);
      // await new Promise((r) => setTimeout(r, 3000));
      // alert(err.response.data.message);
      setCheckNumberCode(false);
      resetField("Number");
      setError("numberError", { message: err.response.data.message });
      setNumberFailure(true);
      setTimeout(() => {
        setNumberFailure(false);
      }, 1000);
    }
  };
  // React.useEffect(() => {
  //   if (level !== 0) {
  //     before();
  //   }
  // }, []);
  // React.useEffect(() => {
  //   resetRegister();
  // }, []);
  // React.useEffect(() => {
  //   next();
  // }, {});
  return (
    <StDiv>
      {modal && (
        <ConfirmBox
          text={"뒤로가기 버튼을 누를시\n이메일 인증부터 새로 하셔야 합니다."}
          confirmButtonText={"새로하기"}
          backgroundShadow={true}
          onComfirmed={resetRegister}
          onDenied={cancelModal}
        />
      )}
      {completion && (
        <ToastMessage text={"회원가입에 성공하셨습니다."} timer={1000} />
      )}
      <StForm onSubmit={handleSubmit(onSubmit)}>
        <Navigation empty={true}>
          <StArrowBack>
            <img src={arrowBack} onClick={before} alt="뒤로 가기" />
          </StArrowBack>
          <div className="title">회원가입</div>
        </Navigation>

        {level === 0 && (
          <Email
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
            setError={setError}
            checkNumber={checkNumber}
            setCheckNumber={setCheckNumber}
            minutes={minutes}
            setMinutes={setMinutes}
            seconds={seconds}
            setSeconds={setSeconds}
            checkEmail={checkEmail}
            setCheckEmail={setCheckEmail}
            checkTimer={checkTimer}
            setCheckTimer={setCheckTimer}
            toast={toast}
            setToast={setToast}
            checkNumberCode={checkNumberCode}
            sendEmailVerifyCode={sendEmailVerifyCode}
            failure={failure}
            emailSuccess={emailSuccess}
            numberFailure={numberFailure}
          />
        )}

        {level === 1 && (
          <Password
            register={register}
            errors={errors}
            watch={watch}
            getValues={getValues}
            passwordError={passwordError}
            passwordCfError={passwordCfError}
          />
        )}

        {level === 2 && (
          <Nickname
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            getValues={getValues}
            toast={toast}
            nicknameFailure={nicknameFailure}
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
        {!checkNumber ? (
          <StButton
            onClick={sendEmailVerifyCode}
            disabled={watch("email") === undefined || watch("email") === ""}
          >
            인증번호 발송
          </StButton>
        ) : !checkEmailCode ? (
          <StButton
            onClick={confirmEmailVerifyCode}
            disabled={
              watch("Number")?.length <= 5 || getValues("Number") === undefined
            }
          >
            인증번호 확인
          </StButton>
        ) : level === 3 ? (
          <StButton
            onClick={completionRegister}
            disabled={
              (level === 3 && watch("image") === undefined) ||
              (level === 3 && watch("image")?.length === 0) ||
              isSubmitting ||
              completion
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
              (level === 1 && watch("password_confirm") === "")
              // (level === 2 && watch("nickname") === "") ||
              // (level === 2 && watch("nicknameVerifyToken") === undefined)
            }
          >
            계속하기
          </StButton>
        )}
        {/* {level === 3 ? (
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
         )} */}
      </StForm>
    </StDiv>
  );
};

export default Register;

const StDiv = styled.div`
  padding: 0 25px;

  & nav {
    padding: 0;
  }
`;

const StArrowBack = styled.div`
  padding: 5px 10px;
  margin-left: -10px;

  cursor: pointer;
`;

const StForm = styled.form`
  & > div > label {
    margin-top: 10px;

    font-size: 28px;
    font-weight: 700;

    color: var(--font-color-dark);
  }

  & p {
    height: 0;

    position: relative;
    transform: translateY(-28px);

    font-size: 13px;
    color: var(--font-color-alert);
  }

  & p.margin {
    transform: translateY(-10px);
  }

  & input {
    all: unset;

    margin-bottom: 30px;

    border-bottom: var(--input-border-bottom);
    font-size: var(--input-font-size);
    padding: var(--input-padding);

    transition: all 0.2s;

    :focus {
      border-bottom: var(--input-activeBorder-bottom);
    }
    ::placeholder {
      color: #ddd;
    }
  }
`;

const StButton = styled.button`
  all: unset;
  width: 100%;
  border-radius: 10px;

  padding: 15px;
  margin: 10px 0;

  border: var(--input-border-bottom);
  color: var(--input-font-color);

  font-weight: 700;
  font-size: 18px;
  text-align: center;

  transition: all 0.2s;
  box-sizing: border-box;

  cursor: pointer;

  :hover {
    background-color: var(--button-activeBackgroundColor);
    border-color: var(--button-activeBorderColor);
    color: #fff;
  }
  :disabled {
    pointer-events: none;
  }
`;
