import { useState, useEffect } from "react";

import styled from "styled-components";

import IngredientAmount from "./ingredientAmount";
import RecipeIngredientColorLists from "./RecipeIngredientColorLists";

const RecipeIngredient = (props) => {
  const { idx, cupState, setCupState, stepState, formProps } = props;
  const { maxAmount, cupFull } = cupState;
  const { subStep } = stepState;
  const { register, watch, setValue, getValues } = formProps;

  const [ml, setMl] = useState(25);
  const lastIgd = watch(`ingredientList`).length - 1;
  const currentAmount = watch(`ingredientList.${lastIgd}.ingredientAmount`);

  let amountOption = setAmountOption(maxAmount, setDefaultValue);

  /** amount에 사용하는 변수들을 obj형태로 반환 합니다. */
  function setAmountOption(maxAmount, setDefaultValue) {
    const limit = 25;
    const defaultSet = 50;
    const isLimit = maxAmount < limit ? true : false;
    const defaultValue = setDefaultValue(isLimit, maxAmount);

    return {
      limit: limit,
      defaultSet: defaultSet,
      max: maxAmount,
      min: maxAmount < limit ? maxAmount : limit,
      defaultValue: defaultValue,
      isLimit: isLimit,
    };
  }

  /** UI에 사용할 defaultValue를 구합니다. */
  function setDefaultValue(isLimit, maxAmount) {
    if (isLimit) {
      return maxAmount;
    } else if (50 >= maxAmount) {
      return 25;
    }
    return 50;
  }

  const amountInputProps = { amountOption, currentAmount };

  useEffect(() => {
    amountOption = setAmountOption(maxAmount, setDefaultValue);

    if (amountOption.isLimit || currentAmount === undefined) {
      setValue(
        `ingredientList.${lastIgd}.ingredientAmount`,
        amountOption.defaultValue,
      );
    } else {
      if (amountOption.isLimit && ml !== amountOption.max) {
        setMl(amountOption.max);

        if (!cupFull) setCupState((prev) => ({ ...prev, cupFull: true }));
      } else {
        setMl(currentAmount);

        if (cupFull) setCupState((prev) => ({ ...prev, cupFull: false }));
      }
    }
  }, [currentAmount]);

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
            {!amountOption.isLimit && (
              <>
                <span>최소 25ml</span>
                <span className="dark">{ml} ml</span>
                <span>최대 {maxAmount}ml</span>
              </>
            )}
            {amountOption.isLimit && (
              <span className="alert">{maxAmount} ml</span>
            )}
          </div>

          <div className="flex_box">
            <IngredientAmount
              idx={idx}
              formProps={formProps}
              amountInputProps={amountInputProps}
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
      font-weight: 500;
    }
    span.alert {
      width: 100%;
      text-align: center;
      color: #ff8282;
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
