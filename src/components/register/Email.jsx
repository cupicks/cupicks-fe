import Timer from "./Timer";
import ToastMessage from "../../components/elements/modal/ToastMessage";

import styled from "styled-components";
import styledFormComponents from "../../styles/customFormStyle";
const { CustomTitle } = styledComponents;
import styledComponents from "../../styles/customElementStyle";
const { CustomInput, CustomErrorBox } = styledFormComponents;

import cancelBtn from "../../assets/svg/cancel_modal.svg";

const Email = (props) => {
  const {
    register,
    errors,
    watch,
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
    resetField,
  } = props;

  return (
    <StDiv>
      {/* 모달 팝업 */}
      {toast && <ToastMessage text={errors?.email?.message} timer={1500} />}
      {failure && (
        <ToastMessage text={errors?.emailError?.message} timer={1500} />
      )}
      {emailSuccess && (
        <ToastMessage
          text={"사용자 이메일로\n6자리 숫자가 발송되었어요!"}
          timer={1000}
        />
      )}
      {numberFailure && (
        <ToastMessage text={errors?.numberError?.message} timer={1500} />
      )}
      {checkNumberCode && (
        <ToastMessage
          text={"사용자 이메일 인증이\n완료되었습니다."}
          timer={1000}
        />
      )}

      <CustomTitle>
        <h1>이메일 입력</h1>
      </CustomTitle>

      <div className="register_input_box">
        {watch("email")?.length >= 1 && checkEmail === false && (
          <img
            className="input_label_icon"
            src={cancelBtn}
            alt="리셋 버튼"
            onClick={() => resetField("email")}
          />
        )}
        <CustomInput
          type="email"
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
      </div>

      <CustomErrorBox>
        <p className="info">
          입력하신 메일로 6자리 숫자 인증번호가 전송됩니다.
        </p>
        {errors?.email?.types?.required && <p>{errors.email.message}</p>}
        {errors?.email?.types?.pattern && <p>{errors.email.message}</p>}
      </CustomErrorBox>

      {checkNumber && (
        <>
          <label>이메일 인증번호 입력</label>
          <div className="register_input_box">
            {watch("Number")?.length >= 1 && checkNumberCode === false && (
              <img
                className="input_label_icon"
                src={cancelBtn}
                alt="리셋 버튼"
                onClick={() => resetField("Number")}
              />
            )}
            <CustomInput
              type="text"
              disabled={checkNumberCode === true || minutes + seconds === 0}
              maxLength={6}
              placeholder="인증번호"
              {...register("Number")}
            />
          </div>
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

  input:disabled,
  .unactive {
    color: #9e9e9e;
  }
`;

const StTimer = styled.div`
  display: flex;
  justify-content: space-between;

  transform: translateY(-1.6rem);
  font-size: 1.3rem;
`;

const StReNumber = styled.button`
  border: none;
  background: none;
  color: #3897f0;

  transform: translateY(-1rem);
  font-size: 1.3rem;

  :disabled {
    pointer-events: none;
    color: #cdcdcd;
  }
  cursor: pointer;
`;
