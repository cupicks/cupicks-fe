import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

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
    <StDiv>
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
    </StDiv>
  );
};

export default RegisterComplete;

const StDiv = styled.div`
  padding: 0 25px;
`;

const StCounts = styled.div`
  margin-top: 40px;

  display: flex;
  justify-content: center;
  gap: 15px;
`;

const StCount = styled.div`
  background: ${(props) => props.color};
  width: 12px;
  height: 12px;
  border-radius: 50%;
`;

const StBtn = styled.button`
  width: 100%;
  height: 59px;

  margin-top: 10vh;

  color: #eee;
  background: #101010;
  border: 1px solid #101010;
  border-radius: 10px;

  font-weight: 700;
  font-size: 18px;
`;
