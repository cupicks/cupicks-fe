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
      navigate("/signIn");
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default RegisterComplete;

const StBtn = styled.button`
  position: absolute;
  width: 90%;
  height: 59px;
  top: 689px;
  color: #eee;
  background: #101010;
  border: 1px solid #101010;
  border-radius: 10px;
  left: 5%;
`;
const StCounts = styled.div`
  display: flex;
  position: absolute;
  top: 600px;
  left: 240px;
  gap: 30px;
`;
const StCount = styled.div`
  background: ${(props) => props.color};
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
