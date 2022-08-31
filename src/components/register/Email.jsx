import React from "react";

const Email = (props) => {
  const { register, errors } = props;
  return (
    <div>
      <label>이메일</label>
      <input
        type="text"
        placeholder="test@email.com"
        autoComplete="off"
        maxLength={20}
        {...register("email", {
          required: "이메일은 필수 입력입니다",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "이메일 형식에 맞지 않습니다.",
          },
        })}
      />
      {errors?.email?.types?.required && <p>{errors.email.message}</p>}
      {errors?.email?.types?.pattern && <p>{errors.email.message}</p>}
    </div>
  );
};

export default Email;
