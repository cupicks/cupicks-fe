import styled from "styled-components";
import styledFormComponents from "../../styles/customFormStyle";
const { CustomInput, CustomInputBox, CustomLabel, CustomErrorBox } =
  styledFormComponents;

import editIcon from "../../assets/svg/edit.svg";
import lockIcon from "../../assets/svg/lock.svg";

const ProfileEditBody = (props) => {
  const { register, errors, watch, getValues, setFocus, profiles } = props;

  const changeNickname = () => {
    setFocus("nickname");
  };
  const changePassword = () => {
    setFocus("password");
  };
  return (
    <StProfileEditBody>
      {/* RegisterInputName */}
      <StInputBox>
        <StLabel>
          닉네임
          <img
            className="input_label_icon"
            src={editIcon}
            alt="닉네임 수정 아이콘"
            onClick={changeNickname}
          />
        </StLabel>
        <StInput
          autoComplete="off"
          defaultValue={profiles?.nickname}
          {...register("nickname", {
            pattern: {
              value: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/,
              message: "닉네임은 2~10자이며, 한글, 영어, 숫자포함합니다.",
            },
          })}
          type="text"
        />
      </StInputBox>
      <StErrorBox>
        {errors.nickname && (
          <p className={"warning"}>{errors.nickname.message}</p>
        )}
      </StErrorBox>

      {/* RegisterInputEmail */}
      <CustomInputBox>
        <StLabel>
          이메일
          <img
            className="input_label_icon disabled"
            src={lockIcon}
            alt="이메일은 수정할 수 없습니다."
          />
        </StLabel>
        <StInput defaultValue={profiles?.email} disabled />
      </CustomInputBox>

      {/* RegisterInputPassword */}
      <StInputBox>
        <StLabel>
          패스워드
          <img
            className="input_label_icon"
            src={editIcon}
            alt="패스워드 수정 아이콘"
            onClick={changePassword}
          />
        </StLabel>
        <StInput
          {...register("password", {
            // minLength: {
            //   value: 8,
            //   message: "8자 이상 써주세요",
            // },
            // maxLength: {
            //   value: 15,
            //   message: "15자 이하로 써주세요",
            // },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!])[A-Za-z\d@!]{8,15}$/,
              message:
                "비밀번호는 영문자, 숫자, 특수문자(!@) 각 1개씩 포함하며 8글자 이상, 15글자 이하입니다",
            },
          })}
          type="password"
        />
      </StInputBox>

      <StErrorBox>
        {errors.password && (
          <p className={"warning"}>{errors.password.message}</p>
        )}
      </StErrorBox>
    </StProfileEditBody>
  );
};

export default ProfileEditBody;

const StProfileEditBody = styled.div`
  padding: 1.5rem 2rem 4rem;

  input:disabled {
    margin-bottom: 2rem;
    opacity: 0.3;
  }

  .input_label_icon.disabled {
    transform: translate(0, -3.3rem);
  }
`;

const StLabel = styled(CustomLabel)`
  font-size: 1.3rem;
`;

const StInput = styled(CustomInput)``;

const StInputBox = styled(CustomInputBox)``;

const StErrorBox = styled(CustomErrorBox)`
  height: 2rem;
`;
