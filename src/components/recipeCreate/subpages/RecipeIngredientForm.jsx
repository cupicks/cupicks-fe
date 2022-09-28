import styled from "styled-components";

import RecipeIngredient from "../element/RecipeIngredient";

const RecipeIngredientForm = (props) => {
  const { cupState, setCupState, stepState, formProps } = props;

  const { currCupSize, isIceTag } = cupState;
  const { subStep, finalSubStep } = stepState;
  const { watch, setValue, getValues } = formProps;

  let newFields = watch("ingredientList");

  const cupIsFull = cupState.cupFull;
  const addNewIngredientMode = subStep === 0 || subStep === finalSubStep;

  /** cupSize보다 넘치는 값 자르는 함수! */
  const calcAmount = (e) => {
    // 값 가져오기
    const currValue = e.target.value;
    const currTargetName = e.target.name;
    const newList = getValues("ingredientList");

    // 아이스음료
    const newCupSize = +("" + currCupSize).split("ml")[0];
    isIceTag ? newCupSize - 200 : "";

    // sumArray: 배열의 ingredientAmount 합
    let prevSum = 0;
    let totalSum = 0;
    if (newList.length > 1) {
      newList.map((list) => (totalSum += +list.ingredientAmount));
      prevSum = totalSum - currValue;
    } else {
      totalSum = newList[0].ingredientAmount;
    }

    // newCupSize에서 prevSum을 뺀 만큼이 max입니다.
    // 컵 용량보다 currValue가 크다면(용량이 넘치면) 현재 용량으로 고정
    const maxValue = newCupSize - prevSum;

    // 남은 재료량
    setCupState((prev) => ({ ...prev, cupLeft: newCupSize - totalSum }));

    // cup full
    if (maxValue <= currValue) {
      e.target.value = maxValue;
      setValue(currTargetName, maxValue);
      setCupState((prev) => ({ ...prev, cupFull: true }));
    } else {
      setCupState((prev) => ({ ...prev, cupFull: false }));
    }

    // 값이 0
    if (+currValue === 0) {
      e.target.value = null;
      setCupState((prev) => ({ ...prev, cupZero: true }));
      return;
    } else {
      setCupState((prev) => ({ ...prev, cupZero: false }));
    }
  };

  return (
    <StWrap>
      <div className="info_box_center">
        {addNewIngredientMode &&
          !cupIsFull &&
          "+ 버튼을 눌러 재료를 추가해주세요."}

        {addNewIngredientMode && cupIsFull && "재료가 모두 찼습니다."}
      </div>

      {/* 마지막 input만 출력합니다 */}
      {newFields?.map((field, idx) => {
        const lastInput = idx === newFields.length - 1;

        return (
          lastInput && (
            <RecipeIngredient
              key={idx}
              idx={idx}
              cupState={cupState}
              setCupState={setCupState}
              stepState={stepState}
              formProps={formProps}
              calcAmount={calcAmount}
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
