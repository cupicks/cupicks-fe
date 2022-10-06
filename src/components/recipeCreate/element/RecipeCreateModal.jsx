import styled from "styled-components";

import cancel from "../../../assets/svg/cancel_ingredient.svg";

const RecipeCreateModal = (props) => {
  const { setCupState, onClick } = props;

  return (
    <StModal
      onClick={() => {
        setCupState((prev) => ({ ...prev, ingredientDeleteMode: false }));
        document
          .querySelector(".ingredientSelected")
          .classList.remove("ingredientSelected");
      }}
    >
      <div className="contents_area">
        <span className="button_close">삭제취소</span>
      </div>
      <img
        src={cancel}
        onClick={onClick}
        className={"ingredient_button"}
        alt="재료 삭제 버튼"
      />
    </StModal>
  );
};

export default RecipeCreateModal;

const StModal = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;

  background: rgba(0, 0, 0, 0.3);

  .contents_area {
    flex: 0 1 600px;
    height: 100%;
    position: relative;
  }

  .ingredient_button {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);

    transform-origin: 48% 48%;
    z-index: 999;

    animation: buttonShow 0.5s forwards;
  }

  @keyframes buttonShow {
    0% {
      transform: translate(-50%, -60%) rotate(45deg);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -60%) rotate(0deg);
      opacity: 1;
    }
  }

  .button_close {
    padding: 2rem;
    position: absolute;
    top: 1.2rem;
    left: 1.5rem;

    color: #fff;

    font-size: 1.7rem;
    font-weight: 700;
  }
`;
