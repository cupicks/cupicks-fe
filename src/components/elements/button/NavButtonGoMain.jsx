import { useNavigate } from "react-router-dom";

/** 0레벨일 때 */
const NavButtonGoMain = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
<<<<<<< HEAD
        navigate("/", { replace: true, state: undefined });
=======
        navigate("/", { replace: true });
>>>>>>> 3d114092207572dfafbd61601dff65b31d9de5b0
      }}
    >
      취소
    </button>
  );
};

export default NavButtonGoMain;
