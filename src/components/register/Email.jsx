import React from "react";

const Email = (props) => {
  const { register, errors } = props;
  return (
    <div>
      <label>이메일</label>
      <input
        type="text"
        placeholder="이메일 주소를 입력해 주세요"
        autoComplete="off"
        maxLength={20}
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
    </div>
  );
};

export default Email;
