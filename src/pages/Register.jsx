import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import api from "../server/api";

import Email from "../components/register/Email";
import Nickname from "../components/register/Nickname";
import Password from "../components/register/Password";
import Image from "../components/register/Image";
import ConfirmBox from "../components/elements/modal/ConfirmBox";
import ToastMessage from "../components/elements/modal/ToastMessage";

import styled from "styled-components";
import styledFormComponents from "../styles/customFormStyle";
const { CustomForm, CustomButton } = styledFormComponents;
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapFullVH } = styledLayoutComponents;

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
    defaultValues: {},
  });

  const [check, setCheck] = useState(false);
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
  const [numberFailure, setNumberFailure] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCfError, setPasswordCfError] = useState(false);
  const [completion, setCompletion] = useState(false);
  const [nicknameFailure, setNicknameFailure] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  const completionRegister = async () => {
    //?????? ?????? ??????
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1000);
    let contentType = "multi-part/form-data";
    //request(body)-> image ?????????
    const form = new FormData();
    form.append(
      "imageValue",
      getValues("image") === undefined ? null : getValues("image")[0],
    );
    form.append("nickname", getValues("nickname"));
    form.append("email", getValues("email"));
    form.append("password", getValues("password"));
    form.append("nicknameVerifyToken", getValues("nicknameVerifyToken"));
    form.append("emailVerifyToken", getValues("emailVerifyToken"));

    // const newPassword = getValues("password");
    // const newnicknameVerifyToken = getValues("nicknameVerifyToken");
    // const newemailVerifyToken = getValues("emailVerifyToken");

    // let urlTypeTwo = `/auth/signup?password=${newPassword}&nicknameVerifyToken=${newnicknameVerifyToken}&emailVerifyToken=${newemailVerifyToken}`;

    try {
      const res = await api(contentType).post("/auth/signup", form);
      console.log(res);
      setCompletion(true);
      setTimeout(() => {
        navigate("/sign-up/complete");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const next = async () => {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1000);
    //????????? ??? ?????? ???????????????
    if (errors.password && level === 1) {
      // alert("??????????????? ????????? ??????????????????");
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 1000);
      return;
    }
    if (errors.password_confirm && level === 1) {
      //   alert("??????????????? ???????????? ????????????");
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
      // alert("???????????? ????????? ??????????????????");
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1000);
      return;
    }

    //????????? ????????????
    if (level === 2) {
      const contentType = "application/x-www-form-urlencoded";
      const data = {
        emailVerifyToken: getValues("emailVerifyToken"),
        nickname: getValues("nickname"),
      };

      const queryStringData = Object.keys(data)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
        .join("&");
      try {
        // const emailVerifyToken = getValues("emailVerifyToken");
        // const nickname = getValues("nickname");
        // const nicknameVerifyUrl = `/auth/confirm-nickname?emailVerifyToken=${emailVerifyToken}&nickname=${nickname}`;

        const res = await api(contentType).patch(
          "/auth/confirm-nickname",
          queryStringData,
        );
        const token = res.data.nicknameVerifyToken;
        setValue("nicknameVerifyToken", token);
        console.log(getValues("nicknameVerifyToken"));
      } catch (err) {
        console.log(err);
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
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1000);
    if (level === 0) {
      navigate("/sign-in");
    } else {
      setModal(true);
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

  //???????????? ??????
  const sendEmailVerifyCode = async () => {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1000);
    let contentType = "application/x-www-form-urlencoded";
    if (errors.email) {
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1000);
      return;
    }
    const data = {
      email: getValues("email"),
    };

    const queryStringData = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
    try {
      const res = await api(contentType).patch(
        "/auth/send-email",
        queryStringData,
      );
      console.log(res.data.message);
      setCheckEmail(true); // input(?????????) ????????????
      setCheckNumber(true); // ?????? ????????? (????????????????)
      setMinutes(3); // default 3???
      setSeconds(0); // default 0???
      setCheckTimer(true); // ????????? ??????
      setEmailSuccess(true); // ????????? ?????? ??????
      setTimeout(() => {
        setEmailSuccess(false); // ???????????? ????????? ????????? ?????? false????????????
      }, 1000);
      return;
    } catch (err) {
      console.log(err);
      setError("emailError", { message: err.response.data.message });
      //????????? ??????
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 1500);
      return;
    }
  };

  //???????????? ??????
  const confirmEmailVerifyCode = async () => {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1000);
    let contentType = "application/x-www-form-urlencoded";
    const data = {
      email: getValues("email"),
      emailVerifyCode: getValues("Number"),
    };

    const queryStringData = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
    try {
      const res = await api(contentType).patch(
        "/auth/confirm-email",
        queryStringData,
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
    } catch (err) {
      console.log(err);
      resetField("Number");
      setError("numberError", { message: err.response.data.message });
      setNumberFailure(true);
      setTimeout(() => {
        setNumberFailure(false);
      }, 1000);
    }
  };

  return (
    <StDiv>
      {modal && (
        <ConfirmBox
          text={"???????????? ????????? ?????????\n????????? ???????????? ?????? ????????? ?????????."}
          confirmButtonText={"????????????"}
          backgroundShadow={true}
          onComfirmed={resetRegister}
          onDenied={cancelModal}
        />
      )}
      {completion && (
        <ToastMessage text={"??????????????? ?????????????????????."} timer={1800} />
      )}
      <StForm onSubmit={handleSubmit(onSubmit)}>
        <Navigation empty={true}>
          <StArrowBack onClick={before}>
            <img className="button_go_back" src={arrowBack} alt="?????? ??????" />
          </StArrowBack>
          <span className="title">????????????</span>
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
            margin="17rem 0 0"
            onClick={sendEmailVerifyCode}
            disabled={
              watch("email") === undefined || watch("email") === "" || check
            }
          >
            ???????????? ??????
          </StButton>
        ) : !checkEmailCode ? (
          <StButton
            margin="5rem 0 0"
            onClick={confirmEmailVerifyCode}
            disabled={
              check ||
              watch("Number")?.length <= 5 ||
              getValues("Number") === undefined
            }
          >
            ???????????? ??????
          </StButton>
        ) : level === 3 ? (
          <StButton
            onClick={completionRegister}
            disabled={
              check ||
              (level === 3 && watch("image") === undefined) ||
              (level === 3 && watch("image")?.length === 0) ||
              isSubmitting ||
              completion
            }
          >
            ????????????
          </StButton>
        ) : level === 1 ? (
          <StButton
            margin="6.1rem 0 0"
            onClick={next}
            disabled={
              check ||
              (level === 1 && watch("password") === "") ||
              (level === 1 && watch("password") === undefined) ||
              (level === 1 && watch("password_confirm") === "")
            }
          >
            ????????????
          </StButton>
        ) : level === 2 ? (
          <StButton
            margin="19.4rem 0 0"
            onClick={next}
            disabled={check || (level === 2 && watch("nickname") === "")}
          >
            ????????????
          </StButton>
        ) : (
          <StButton margin="4.1rem 0 0">????????????</StButton>
        )}
      </StForm>
    </StDiv>
  );
};

export default Register;

const StDiv = styled(CustomWrapFullVH)`
  & nav {
    padding: 0;
  }

  .register_input_box {
    position: relative;
  }
`;

const StArrowBack = styled.button`
  padding: 0.5rem 1rem;
  margin-left: -1rem;

  cursor: pointer;

  & > img {
    width: 2rem;
    height: 2rem;
  }
`;

const StForm = styled(CustomForm)`
  margin-top: 0;

  & p {
    transform: translateY(-2.8rem);
  }

  & p.margin {
    transform: translateY(-1rem);
  }

  & input {
    margin-bottom: 3rem;
  }

  & > div > div > .input_label_icon {
    transform: translateY(-175%);
  }
`;

const StButton = styled(CustomButton)`
  margin: ${(props) => props.margin || "2rem 0 0"};
`;
