import React from "react";
import Timer from "./Timer";
import ToastMessage from "../../components/elements/modal/ToastMessage";
import styled from "styled-components";
/*eslint max-lines-per-function: ["error", {"max": 300, "skipBlankLines": true}]*/
const Email = (props) => {
  const {
    register,
    errors,
    checkNumber,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    checkEmail,
    checkTimer,
    toast,
    checkNumberCode,
    sendEmailVerifyCode,
    failure,
    emailSuccess,
    numberFailure,
  } = props;
  return (
    <StDiv>
      {toast && <ToastMessage text={errors?.email?.message} timer={1000} />}
      {failure && (
        <ToastMessage text={errors?.emailError?.message} timer={2000} />
      )}
      {emailSuccess && (
        <ToastMessage
          text={"사용자 이메일로 6자리 숫자가 발송되었어요!"}
          timer={1000}
        />
      )}
      {numberFailure && (
        <ToastMessage text={errors?.numberError?.message} timer={1000} />
      )}
      {checkNumberCode && (
        <ToastMessage
          text={"사용자 이메일 인증이 완료되었습니다."}
          timer={1000}
        />
      )}
      <label>이메일 입력</label>
      <input
        type="text"
        disabled={checkEmail === true}
        placeholder="이메일 주소를 입력해 주세요"
        autoComplete="off"
        maxLength={100}
        {...register("email", {
          required: true,
          pattern: {
            value:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
            message: "이메일 형식에 맞지 않습니다.",
          },
        })}
      />
      {errors?.email?.types?.required && <p>{errors.email.message}</p>}
      {errors?.email?.types?.pattern && <p>{errors.email.message}</p>}
      {checkNumber && (
        <>
          <label>이메일 인증번호 입력</label>
          <input
            type="text"
            disabled={checkNumberCode === true || minutes + seconds === 0}
            maxLength={6}
            placeholder="인증번호"
            {...register("Number")}
          />
          <StTimer>
            <StReNumber
              disabled={checkNumberCode === true}
              onClick={sendEmailVerifyCode}
            >
              인증번호 재전송
            </StReNumber>
            <Timer
              minutes={minutes}
              setMinutes={setMinutes}
              seconds={seconds}
              setSeconds={setSeconds}
              checkTimer={checkTimer}
            />
          </StTimer>
        </>
      )}
    </StDiv>
  );
};

export default Email;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;

  .unactive {
    color: var(--font-color-light);
  }
`;

const StTimer = styled.div`
  display: flex;
  justify-content: space-between;

  transform: translateY(-10px);
`;

const StReNumber = styled.button`
  border: none;
  background: none;
  color: #3897f0;

  transform: translateY(-10px);

  :disabled {
    pointer-events: none;
    color: #cdcdcd;
  }
  cursor: pointer;
`;
