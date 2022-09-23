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
    defaultValues: {
      cupSize: 0,
    },
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

  const onSubmit = (data) => {
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
      getValues("image") === undefined ? null : getValues("image")[0],
    );
    try {
      const res = await api(contentType).post(
        `/auth/signup?password=${getValues(
          "password",
        )}&nicknameVerifyToken=${getValues(
          "nicknameVerifyToken",
        )}&emailVerifyToken=${getValues("emailVerifyToken")}`,
        form,
        // { headers: { "Content-Type": "multi-part/form-data" } }
      );
      console.log(res);
      // alert(res.data.message);
      setCompletion(true);
      setTimeout(() => {
        navigate("/sign-up/complete");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  const next = async () => {
    //에러가 날 경우 알림띄우기
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
    if (
      getValues("password") !== getValues("password_confirm") &&
      level === 1
    ) {
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
            "emailVerifyToken",
          )}&nickname=${getValues("nickname")}`,
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
      setModal(true);
      // setCheckEmail(false);
      // setCheckEmailCode(false);
      // setCheckNumber(false);
      // setCheckNumberCode(false);
    }
  };
  const resetRegister = () => {
    setTimeout(() => {
      reset({ emailVerifyToken: undefined });
      reset({ nicknameVerifyToken: undefined });
      setLevel(0);
      setModal(false);
      setCheckEmail(false);
      setCheckEmailCode(false);
      setCheckNumber(false);
      setCheckNumberCode(false);
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
        `/auth/send-email?email=${getValues("email")}`,
      );
      console.log(res.data.message);
      setCheckEmail(true); // input(이메일) 비활성화
      // alert(res.data.message);
      setCheckNumber(true); // 버튼 바꾸기 (필요없을듯?)
      setMinutes(3); // default 3분
      setSeconds(0); // default 0초
      setCheckTimer(true); // 타이머 실행
      setEmailSuccess(true); // 이메일 성공 모달
      setTimeout(() => {
        setEmailSuccess(false); // 인증번호 재전송 때문에 다시 false값줘야함
      }, 1000);
      return;
    } catch (err) {
      console.log(err);
      // alert(err.response.data.message);
      // 이것들은 왜있지?
      // setCheckEmail(false);
      // setCheckTimer(false);
      // setCheckNumber(false);

      setError("emailError", { message: err.response.data.message });
      //실패시 모달
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 1500);
      return;
    }
  };
  //입력번호 확인
  const confirmEmailVerifyCode = async () => {
    let contentType = "application/x-www-form-urlencoded";
    try {
      const res = await api(contentType).get(
        `/auth/confirm-email?email=${getValues(
          "email",
        )}&email-verify-code=${getValues("Number")}`,
      );
      const token = res.data.emailVerifyToken;
      console.log(token);
      setValue("emailVerifyToken", token);
      console.log(getValues("emailVerifyToken"));
      setCheckEmailCode(true);
      setCheckNumberCode(true);
      setTimeout(() => {
        setLevel(1);
      }, 1000);
      // alert(res.data.message);
    } catch (err) {
      console.log(err);
      // alert(err.response.data.message);
      // setCheckNumberCode(false);
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
            resetField={resetField}
          />
        )}

        {level === 1 && (
          <Password
            register={register}
            errors={errors}
            watch={watch}
            getValues={getValues}
            resetField={resetField}
            passwordError={passwordError}
            passwordCfError={passwordCfError}
          />
        )}

        {level === 2 && (
          <Nickname
            register={register}
            errors={errors}
            watch={watch}
            resetField={resetField}
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
            margin="194px 0 0"
            onClick={sendEmailVerifyCode}
            disabled={
              watch("email") === undefined ||
              watch("email") === "" ||
              checkEmail ||
              failure
            }
          >
            인증번호 발송
          </StButton>
        ) : !checkEmailCode ? (
          <StButton
            margin="41px 0 0"
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
        ) : level === 1 ? (
          <StButton
            margin="61px 0 0"
            onClick={next}
            disabled={
              (level === 1 && watch("password") === "") ||
              (level === 1 && watch("password_confirm") === "")
            }
          >
            계속하기
          </StButton>
        ) : level === 2 ? (
          <StButton
            margin="194px 0 0"
            onClick={next}
            disabled={level === 2 && watch("nickname") === ""}
          >
            계속하기
          </StButton>
        ) : (
          <StButton margin="41px 0 0">계속하기</StButton>
        )}
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
  & > img {
    width: 20px;
    height: 20px;
  }
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
    width: 100%;

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
  & > div > .register_input_box {
    position: relative;
  }
  & > div > div > .input_label_icon {
    width: 30px;
    height: 30px;

    position: absolute;
    right: 0;
    bottom: 0;

    transform: translateY(-120%);

    cursor: pointer;
  }
`;

const StButton = styled.button`
  all: unset;
  width: 100%;
  border-radius: 10px;

  padding: 15px;
  margin: ${(props) => props.margin || "20px 0 0"};

  border: var(--input-border-bottom);
  color: var(--input-font-color);

  font-weight: 700;
  font-size: 18px;
  text-align: center;

  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
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
