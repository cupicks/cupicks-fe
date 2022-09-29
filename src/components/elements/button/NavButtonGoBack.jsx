import { useNavigate } from "react-router-dom";

/** 0레벨일 때 */
const NavButtonGoBack = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        navigate(-1, { replace: true, state: undefined });
      }}
    >
      취소
    </button>
  );
};

export default NavButtonGoBack;
