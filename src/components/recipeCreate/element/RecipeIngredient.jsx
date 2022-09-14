import RecipeIngredientNumber from "./RecipeIngredientNumber";
import RecipeIngredientColorLists from "./RecipeIngredientColorLists";

import styled from "styled-components";

const RecipeIngredient = (props) => {
  const { idx, calcAmount, cupState, setCupState, stepState, formProps } = props;
  const {subStep} = stepState;
  const {register, watch} = formProps;

  return (
    <StRecipeIngredient>
      {subStep === 1 &&
        <>
          <div className="info_box_center">
            재료의 이름은 무엇인가요?
          </div>
          <input 
            type="text" 
            required={true}
            placeholder={`재료`}
            {...register(`ingredientList.${idx}.ingredientName`)}
          />
        </>
      }

      {subStep === 2 &&
        <>
          <div className="info_box_center">
            재료량을 입력해주세요.(최소 10ml)
          </div>
          <div className="flex_box">
            <RecipeIngredientNumber
              idx={idx}
              formProps={formProps}    
              calcAmount={calcAmount}
              />
            ml
          </div>
        </>
      }

      {subStep === 3 &&
        <>
          <div className="info_box_center">
            재료색을 선택해주세요.
          </div>
          
          <RecipeIngredientColorLists 
            idx={idx}
            formProps={formProps}
          />
        </>
      }
    </StRecipeIngredient>
	)
}

export default RecipeIngredient;

const StRecipeIngredient = styled.div`
  input, select {
    all: unset;
    width: 100%;

    border-bottom: 2px solid #aaa;
    color: #222;

    font-size: 1.1em;
    line-height: 40px;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .flex_box {
    display: flex;
    gap: 20px;
  }
`

const StColorCircleBox = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-flow: wrap;

  input {
    position: absolute;
    /* opacity: 0;
    z-index: -9; */
  }

  label {
    transition: all .2s;
  }
  
  input:checked + .colorLabel {
    box-shadow: 0 2px 7px 3px rgba(45, 35, 53, 0.1);
    transform: translateY(-2px) scale(1.1);
  }
`