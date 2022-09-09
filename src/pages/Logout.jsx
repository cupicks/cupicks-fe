import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const onRemoveToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/signIn");
  };

  return (
    <div>
      <button onClick={onRemoveToken}>로그아웃</button>
    </div>
  );
};

export default Logout;
