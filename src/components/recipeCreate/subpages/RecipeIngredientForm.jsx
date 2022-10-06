import styled from "styled-components";

import RecipeIngredient from "../element/RecipeIngredient";
import {
  getIngredientArray,
  exceptIceAmount,
  calcMaxAmount,
  setMaxAmountAndCupFullState,
  setMaxAmountState,
} from "../../../util/recipeCreate/recipeIngredientAmount";
import { useEffect, useState } from "react";

const RecipeIngredientForm = (props) => {
  const { cupState, setCupState, stepState, formProps } = props;

  const { currCupSize, cupFull, isIcedTag } = cupState;
  const { subStep, finalSubStep } = stepState;
  const { watch, setValue, getValues } = formProps;

  const addNewIngredientMode = subStep === 0 || subStep === finalSubStep;
  let newFields = watch("ingredientList");
  let currAmount = newFields[newFields.length - 1]?.ingredientAmount;

  /**
   * 재료량 change handler
   */
  const ingredientAmountChangeHandler = () => {
    const getIngredientValues = getValues("ingredientList");
    const ingredientValuesArray = getIngredientArray(getIngredientValues);

    let maxAmount = 0;
    if (!cupFull) maxAmount = calcMaxAmount(ingredientValuesArray, currCupSize);

    const stateChanges = setMaxAmountState(maxAmount, setCupState, cupFull);
  };

  useEffect(() => {
    ingredientAmountChangeHandler();
  }, [watch("ingredientList")]);

  return (
    <StWrap>
      {addNewIngredientMode && !cupFull && (
        <div className="info_box_center">
          + 버튼을 눌러 재료를 추가해주세요.
        </div>
      )}

      {addNewIngredientMode && cupFull && (
        <div className="info_box_center cup_full">재료가 모두 찼습니다.</div>
      )}

      {/* 마지막 input만 출력합니다 */}
      {newFields?.map((field, idx) => {
        const lastInput = idx === newFields.length - 1;

        return (
          lastInput && (
            <RecipeIngredient
              key={idx}
              idx={idx}
              currAmount={currAmount}
              cupState={cupState}
              setCupState={setCupState}
              stepState={stepState}
              formProps={formProps}
            />
          )
        );
      })}
    </StWrap>
  );
};

export default RecipeIngredientForm;

const StWrap = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-flow: column;

  .info_box_center {
    margin-bottom: 10px;
  }
`;
