import styled from "styled-components";

import editIcon from "../../assets/svg/edit.svg";
import lockIcon from "../../assets/svg/lock.svg";

const ProfileEditBody = (props) => {
  const { register, errors, watch, getValues, setFocus, userData, profiles } =
    props;

  const changeNickname = () => {
    setFocus("nickname");
  };
  const changePassword = () => {
    setFocus("password");
  };
  return (
    <StProfileEditBody>
      {/* RegisterInputName */}
      <div className="register_input_box">
        <label>
          닉네임
          <img
            className="input_label_icon"
            src={editIcon}
            alt="닉네임 수정 아이콘"
            onClick={changeNickname}
          />
        </label>
        <input
          defaultValue={profiles?.nickname}
          {...register("nickname", {
            required: true,
            pattern: {
              value: /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{2,10}$/,
              message: "닉네임은 2~10자이며, 영어, 숫자포함합니다.",
            },
          })}
          type="text"
        />
      </div>
      {errors.nickname && (
        <p className={"warning"}>{errors.nickname.message}</p>
      )}

      {/* RegisterInputEmail */}
      <div className="register_input_box">
        <label>
          이메일
          <img
            className="input_label_icon"
            src={lockIcon}
            alt="이메일은 수정할 수 없습니다."
          />
        </label>
        <input defaultValue={profiles?.email} disabled />
      </div>

      {/* RegisterInputPassword */}
      <div className="register_input_box">
        <label>
          패스워드
          <img
            className="input_label_icon"
            src={editIcon}
            alt="패스워드 수정 아이콘"
            onClick={changePassword}
          />
        </label>
        <input
          {...register("password", {
            minLength: {
              value: 8,
              message: "8자 이상 써주세요",
            },
            maxLength: {
              value: 15,
              message: "15자 이하로 써주세요",
            },
            pattern: {
              value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#]).*$/,
              message:
                "패스워드는 영어, 숫자, 그리고 특수문자중(!@#)를 포함해주세요",
            },
          })}
          type="password"
        />
      </div>
      {errors.password && (
        <p className={"warning"}>{errors.password.message}</p>
      )}
    </StProfileEditBody>
  );
};

export default ProfileEditBody;

const StProfileEditBody = styled.div`
  padding: 15px 20px;

  label {
    font-weight: 700;
    font-size: 13px;
    line-height: 150%;

    color: #9e9e9e;
  }

  .register_input_box {
    position: relative;
  }

  input:disabled {
    color: #888;
  }

  .input_label_icon {
    width: 30px;
    height: 30px;

    position: absolute;
    right: 0;
    bottom: 0;

    transform: translateY(-50%);
  }
`;
