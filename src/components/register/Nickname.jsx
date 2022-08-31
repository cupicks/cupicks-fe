import React from "react";

const Nickname = (props) => {
  const { register, errors } = props;
  return (
    <div>
      <label>닉네임</label>
      <input
        placeholder="닉네임"
        minLength={2}
        maxLength={10}
        {...register("nickname", {
          required: "닉네임은 필수 입력입니다.",
          pattern: {
            value: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/,
            message: "닉네임은 2~10자이며, 한글, 영어, 숫자포함합니다.",
          },
        })}
      />
      {errors.nickname && <p>{errors.nickname.message}</p>}
    </div>
  );
};

export default Nickname;
