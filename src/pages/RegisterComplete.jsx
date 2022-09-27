import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import styledFormComponents from "../styles/customFormStyle";
const { CustomButton } = styledFormComponents;
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomWrapFullVH } = styledLayoutComponents;

import CompleteOne from "../components/RegisterComplete/CompleteOne";
import CompleteTwo from "../components/RegisterComplete/CompleteTwo";
import CompleteThree from "../components/RegisterComplete/CompleteThree";

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
      {level === 0 && <CompleteOne />}
      {level === 1 && <CompleteTwo />}
      {level === 2 && <CompleteThree />}
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
  margin-top: 4rem;

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
  margin-top: 7vh;

  color: #eee;
  background: #101010;
`;
