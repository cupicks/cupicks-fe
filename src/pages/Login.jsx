import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../server/api";

import styled from "styled-components";
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapFullVH } = styledLayoutComponents;
import styledFormComponents from "../styles/customFormStyle";
const {
  CustomInput,
  CustomForm,
  CustomButton,
  CustomErrorBox,
  CustomInputBox,
} = styledFormComponents;
import styledElementComponents from "../styles/customElementStyle";
const {
  CustomTitle,
  CustomSmallBoldTextLink,
  CustomLineBox,
  CustomSmallLightText,
} = styledElementComponents;

import cancelBtn from "../assets/svg/cancel_modal.svg";
import kakao from "../assets/image/logo/kakao.png";
import ToastMessage from "../components/elements/modal/ToastMessage";
import Navigation from "../partial/Navigation";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    setError,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    mode: "onChange",
  });
  const [emailFailure, setEmailFailure] = useState(false);
  const [pwFailure, setPwFailure] = useState(false);
  const [check, setCheck] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [messageModal, setMessageModal] = useState(false);
  const messageText = location.state?.message;

  // resetPassword
  const resetEmail = location.state?.resetEmail;

  useEffect(() => {
    if (messageText !== undefined) {
      setMessageModal(true);
      setTimeout(() => {
        setMessageModal(false);
      }, 2000);
    }
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
  };

  const clickLogin = async () => {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 2000);
    if (errors.email) {
      setEmailFailure(true);
      setTimeout(() => {
        setEmailFailure(false);
      }, 2000);
      return;
    }
    if (errors.password) {
      setPwFailure(true);
      setTimeout(() => {
        setPwFailure(false);
      }, 2000);
      return;
    }

    const data = { email: watch("email"), password: watch("password") };
    const queryStringData = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
    const contentType = "application/x-www-form-urlencoded";

    try {
      const res = await api(contentType).post("/auth/signin", queryStringData);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      navigate("/recipe", {
        state: { message: `${data.email}\n????????? ???????????????.` },
      });
    } catch (err) {
      console.log(err);
      // setError("loginError", { message: err.response.data.message });
      setError("loginError", {
        message: `???????????? ??????\n ???????????? ?????????.`,
      });
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 2000);
    }
  };
  return (
    <CustomWrapFullVH>
      {/* ????????? */}
      {emailFailure && (
        <ToastMessage text={errors?.email?.message} timer={2000} />
      )}
      {pwFailure && (
        <ToastMessage
          text={errors?.password?.message}
          timer={2000}
          smallFont={true}
        />
      )}
      {loginError && (
        <ToastMessage
          text={errors?.loginError?.message}
          timer={2000}
          smallFont={true}
        />
      )}
      {messageModal && <ToastMessage text={messageText} timer={1500} />}

      {/* ????????? ?????? */}
      <Navigation empty={true} transparent={true} />
      <StLoginTitle>
        <h1>??? ??????????????? ????????????????</h1>
      </StLoginTitle>

      <StLoginForm onSubmit={handleSubmit(onSubmit)}>
        <label>?????????</label>

        <CustomInputBox>
          {watch("email")?.length >= 1 && (
            <img
              className="input_label_icon"
              src={cancelBtn}
              alt="?????? ??????"
              onClick={() => resetField("email")}
            />
          )}
          <CustomInput
            type="email"
            placeholder="????????? ????????? ????????? ?????????"
            autoComplete="off"
            maxLength={100}
            defaultValue={resetEmail ? resetEmail : ""}
            {...register("email", {
              required: true,
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
                message: "????????? ????????? ?????? ????????????.",
              },
            })}
          />
        </CustomInputBox>

        <StErrorBox>{errors.email && <p>{errors.email.message}</p>}</StErrorBox>

        <label>????????????</label>
        <CustomInputBox>
          {watch("password")?.length >= 1 && (
            <img
              className="input_label_icon"
              src={cancelBtn}
              alt="?????? ??????"
              onClick={() => resetField("password")}
            />
          )}
          <CustomInput
            type="password"
            placeholder="??????????????? ??????????????????"
            maxLength={15}
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!])[A-Za-z\d@!]{8,15}$/,
                message:
                  "??????????????? ??????, ??????, ????????????(!@) ??? 1?????? ???????????? 8?????? ??????, 15?????? ???????????????",
              },
            })}
          />
        </CustomInputBox>

        <StErrorBox>
          {errors.password && <p>{errors.password.message}</p>}
        </StErrorBox>

        <CustomButton
          onClick={clickLogin}
          disabled={
            check ||
            watch("email") === "" ||
            watch("email") === undefined ||
            watch("password") === ""
          }
        >
          ????????????
        </CustomButton>
      </StLoginForm>

      <StFlexBox>
        <StResetPassword onClick={() => navigate("/reset-password")}>
          ??????????????? ????????????????
        </StResetPassword>
      </StFlexBox>

      <StLineBox>
        <span>????????????</span>
      </StLineBox>

      {/* <StKakaoBox>
        <img src={kakao} />
        ???????????? ????????????
      </StKakaoBox> */}

      <CustomButton onClick={() => navigate("/recipe")}>????????????</CustomButton>

      <StCtn>
        ???????????? ??? ????????? ?????? ????????? ???????????? ??????????????? ???????????? ?????????.
      </StCtn>

      <StLink onClick={() => navigate("/sign-up")}>
        Cupick??? ???????????????? ????????????
      </StLink>
    </CustomWrapFullVH>
  );
};

export default Login;

const StLoginTitle = styled(CustomTitle)`
  width: 30rem;
`;

const StLoginForm = styled(CustomForm)`
  .register_input_box {
    position: relative;
  }
`;

const StFlexBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StErrorBox = styled(CustomErrorBox)`
  min-height: 3rem;
  p {
    position: absolute;
  }
`;

const StResetPassword = styled(CustomSmallBoldTextLink)`
  margin-top: 1rem;

  align-self: flex-end;
  text-align: right;
`;

const StLineBox = styled(CustomLineBox)`
  margin-top: 10vh;
  margin-bottom: 3.5rem;
`;

const StKakaoBox = styled.div`
  padding: 1.6em 0;
  border-radius: 1rem;

  margin-bottom: 1.7rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #fff115;
  color: #000000;

  font-weight: 500;
  font-size: 1.9rem;

  cursor: pointer;

  img {
    width: 2rem;
    height: 2rem;

    margin-right: 0.9rem;
  }
`;

const StCtn = styled(CustomSmallLightText)`
  margin-top: 1.8rem;
  padding: 0 1rem;

  word-break: keep-all;

  text-align: center;
  font-size: 1.2rem;
`;

const StLink = styled(CustomSmallBoldTextLink)`
  margin-top: 3.5rem;
  margin-bottom: 4rem;

  text-align: center;
`;
