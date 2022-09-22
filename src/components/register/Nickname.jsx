import React from "react";
import axios from "axios";

import api from "../../server/api";

import styled from "styled-components";

import ToastMessage from "../elements/modal/ToastMessage";

const Nickname = (props) => {
  const { register, errors, setValue, getValues, toast, nicknameFailure } =
    props;
  const [checkNickname, setCheckNickname] = React.useState(false);

  // const confirmNicknameVerifyCode = async () => {
  //   const contentType = "application/x-www-form-urlencoded";
  //   try {
  //     const res = await api(contentType).get(
  //       `/auth/confirm-nickname?emailVerifyToken=${getValues(
  //         "emailVerifyToken"
  //       )}&nickname=${getValues("nickname")}`
  //       // { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  //     );
  //     const token = res.data.nicknameVerifyToken;
  //     // console.log(res);
  //     setValue("nicknameVerifyToken", token);
  //     console.log(getValues("nicknameVerifyToken"));
  //     // setCheckNickname(true);
  //     alert(res.data.message);
  //   } catch (err) {
  //     console.log(err);
  //     alert(err.response.data.message);
  //   }
  // };

  return (
    <StDiv>
      {toast && <ToastMessage text={errors?.nickname?.message} timer={1000} />}
      {nicknameFailure && (
        <ToastMessage text={errors?.nicknameError?.message} timer={1000} />
      )}
      <label>닉네임</label>
      <input
        placeholder="닉네임을 입력해 주세요"
        minLength={2}
        maxLength={10}
        // disabled={checkNickname}
        {...register("nickname", {
          required: true,
          pattern: {
            value: /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{2,10}$/,
            message: "닉네임은 2~10자이며, 영어, 숫자포함합니다.",
          },
        })}
      />
      {errors.nickname && <p>{errors.nickname.message}</p>}
      {/* <button onClick={confirmNicknameVerifyCode}>닉네임 중복확인</button> */}
    </StDiv>
  );
};

export default Nickname;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  & input {
    margin-top: 70px;
  }
`;
