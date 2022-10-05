import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import styledFormComponents from "../styles/customFormStyle";
const { CustomButton } = styledFormComponents;
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapFullVH } = styledLayoutComponents;

import CompleteStep from "../components/RegisterComplete/CompleteStep";

import illustrationOne from "../assets/image/illustration/illustration01.png";
import illustrationTwo from "../assets/image/illustration/illustration02.png";
import illustrationThree from "../assets/image/illustration/illustration03.png";

const RegisterComplete = () => {
  const [level, setLevel] = useState(0);
  const navigate = useNavigate();
  const clickLevel = () => {
    setLevel((prev) => prev + 1);
    if (level === 2) {
      navigate("/sign-in");
    }
  };

  return (
    <CustomWrapFullVH>
      {level === 0 && (
        <CompleteStep
          text={"회원가입을\n축하합니다!"}
          imageSrc={illustrationOne}
          alt={"회원가입을 축하합니다!"}
        />
      )}
      {level === 1 && (
        <CompleteStep
          text={"계량없이 이미지만\n따라 만들어보세요!"}
          imageSrc={illustrationTwo}
          alt={"계량없이 이미지만 따라 만들어보세요!"}
        />
      )}
      {level === 2 && (
        <CompleteStep
          text={"나만의 레시피를 만들고\n모두와 공유해보아요!"}
          imageSrc={illustrationThree}
          alt={"나만의 레시피를 만들고 모두와 공유해보아요!"}
        />
      )}
      <StCounts>
        {level === 0 ? (
          <StCount color="#393939"></StCount>
        ) : (
          <StCount color="#CDCDCD"></StCount>
        )}
        {level === 1 ? (
          <StCount color="#393939"></StCount>
        ) : (
          <StCount color="#CDCDCD"></StCount>
        )}
        {level === 2 ? (
          <StCount color="#393939"></StCount>
        ) : (
          <StCount color="#CDCDCD"></StCount>
        )}
      </StCounts>
      {level !== 2 ? (
        <StBtn onClick={clickLevel}>계속하기</StBtn>
      ) : (
        <StBtn onClick={clickLevel}>시작하기</StBtn>
      )}
    </CustomWrapFullVH>
  );
};

export default RegisterComplete;

const StCounts = styled.div`
  margin-top: 1.5rem;

  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const StCount = styled.div`
  background: ${(props) => props.color};
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
`;

const StBtn = styled(CustomButton)`
  margin-top: 30%;

  color: #eee;
  background: #101010;
`;
