import RecipeIngredientNumber from "./RecipeIngredientNumber";
import RecipeIngredientColorLists from "./RecipeIngredientColorLists";

import styled from "styled-components";

const RecipeIngredient = (props) => {
  const { idx, cupState, setCupState, stepState, formProps, currAmount } =
    props;
  const { currCupSize, maxAmount } = cupState;
  const { subStep } = stepState;
  const { register } = formProps;

  const minimumMinRange = maxAmount < 25 ? true : false;

  return (
    <StRecipeIngredient>
      {subStep === 1 && (
        <>
          <div className="info_box_center">재료의 이름은 무엇인가요?</div>
          <input
            type="text"
            required={true}
            placeholder={`재료`}
            {...register(`ingredientList.${idx}.ingredientName`)}
            maxLength={20}
            autoComplete="off"
          />
        </>
      )}

      {subStep === 2 && (
        <>
          <div className="info_box_center">재료량을 입력해주세요.</div>
          <div className="flex_box">
            <span>최소 25ml</span>
            <span className={maxAmount < 25 ? "alert" : "dark"}>
              {/* 현재 {minimumMinRange ? maxAmount : "--"} ml */}
            </span>
            <span>최대 {maxAmount}ml</span>
          </div>

          <div className="flex_box">
            <RecipeIngredientNumber
              idx={idx}
              formProps={formProps}
              cupState={cupState}
            />
          </div>
        </>
      )}

      {subStep === 3 && (
        <>
          <div className="info_box_center">재료색을 선택해주세요.</div>

          <RecipeIngredientColorLists idx={idx} formProps={formProps} />
        </>
      )}
    </StRecipeIngredient>
  );
};

export default RecipeIngredient;

const StRecipeIngredient = styled.div`
  height: 100%;

  input,
  select {
    all: unset;
    width: 100%;

    border-bottom: 2px solid #aaa;
    color: #222;

    font-size: 1.1rem;
    line-height: 4rem;
  }

  input[type="range"] {
    height: 0.5rem;
    border-radius: 1rem;

    margin-top: 1rem;

    background-color: #ccc;
    border: none;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 2rem;
    width: 1.5rem;
    height: 1.5rem;
    background: #333;
    cursor: pointer;
  }

  input[type="range"]::-moz-range-thumb {
    border-radius: 2rem;
    width: 1.5rem;
    height: 1.5rem;
    background: #333;
    cursor: pointer;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .flex_box {
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    span {
      color: #aaa;
    }
    span.dark {
      color: #555;
    }
    span.alert {
      color: #fe5454ed;
    }
  }
`;

const StColorCircleBox = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-flow: wrap;

  input {
    position: absolute;
    /* opacity: 0;
    z-index: -9; */
  }

  label {
    transition: all 0.2s;
  }

  input:checked + .colorLabel {
    box-shadow: 0 2px 7px 3px rgba(45, 35, 53, 0.1);
    transform: translateY(-2px) scale(1.1);
  }
`;
