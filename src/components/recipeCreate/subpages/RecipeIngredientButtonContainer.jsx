import { useState } from "react";

import styled from "styled-components";
import RecipeCreateModal from "../element/RecipeCreateModal";

import cancel from "../../../assets/svg/cancel_ingredient.svg";
import ToastMessage from "../../elements/modal/ToastMessage";

const RecipeIngredientButtonContainer = (props) => {
  const { cupState, setCupState, formArrayProps, stepState, setStepState } =
    props;

  const { ingredientDeleteMode, cupFull } = cupState;
  const { remove, append } = formArrayProps;
  const { subStep, finalSubStep } = stepState;

  const [ingredientDeletedMessage, setIngredientDeletedMessage] = useState();

  /**********************/
  /** 재료 삭제 버튼 클릭 */
  const ingredientDeleteButtonClickHandler = (e) => {
    e.stopPropagation();
    const idx = document.querySelector(".ingredientSelected")?.id.split(".")[1];

    if (idx >= 0) {
      remove(idx);
    }

    setCupState((prev) => ({
      ...prev,
      ingredientDeleteMode: false,
      cupFull: false,
      currentIngredientDeleted: true,
    }));

    setIngredientDeletedMessage(true);
    setTimeout(() => {
      setIngredientDeletedMessage(false);
    }, 2000);
  };

  /**********************/
  /** 재료 추가 버튼 클릭 */
  const ingredientAddButtonClickHandler = () => {
    append();
    setStepState((prev) => ({ ...prev, subStep: 1 }));
    setCupState((prev) => ({ ...prev, currentIngredientDeleted: false }));
  };

  // 재료 추가 버튼 상태
  const buttonClickable = subStep === 0 || subStep === finalSubStep;
  const addIngredientMode = ingredientDeleteMode === false;
  const cupIsFull = cupFull;

  return (
    <>
      {ingredientDeleteMode && (
        <RecipeCreateModal
          onClick={ingredientDeleteButtonClickHandler}
          setCupState={setCupState}
          formArrayProps={formArrayProps}
        />
      )}

      {ingredientDeletedMessage && (
        <ToastMessage text={"선택한 재료가\n삭제 되었습니다."} />
      )}

      <StRecipeIngredientButtonContainer>
        {addIngredientMode && !cupIsFull && (
          <>
            <img
              src={cancel}
              alt="새 재료 추가 버튼"
              className={
                buttonClickable
                  ? "ingredient_button"
                  : "ingredient_button disable"
              }
              onClick={ingredientAddButtonClickHandler}
            />
          </>
        )}
      </StRecipeIngredientButtonContainer>
    </>
  );
};

export default RecipeIngredientButtonContainer;

const StRecipeIngredientButtonContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  z-index: 99;
  transform-origin: 48% 48%;

  & > .ingredient_button {
    animation: blink 0.6s alternate infinite;
  }

  .disable {
    pointer-events: none;
    animation: fadeOut 0.3s forwards;
  }

  @keyframes blink {
    0% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 0.8;
      transform: rotate(45deg);
    }
    100% {
      opacity: 0.4;
      transform: rotate(45deg) scale(0.95);
    }
  }
`;
