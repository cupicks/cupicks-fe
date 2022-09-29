import { useNavigate } from "react-router-dom";

/** 0레벨일 때 */
const NavButtonGoMain = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        navigate("/", { replace: true, state: undefined });
      }}
    >
      취소
    </button>
  );
};

export default NavButtonGoMain;
