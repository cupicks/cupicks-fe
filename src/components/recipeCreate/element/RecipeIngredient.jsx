import RecipeIngredientNumber from "./RecipeIngredientNumber";

import styled from "styled-components";

const RecipeIngredient = (props) => {
  const {
    idx, register, calcAmount,
    cutNumberByLength, setValue, sublevel } = props;

  return (
    <StRecipeIngredient>
      
      {sublevel === 0 &&
        <input 
          type="text" 
          required={true}
          placeholder={`재료`}
          {...register(`ingrediantList.${idx}.ingredientName`)}
        />
      }

      {sublevel === 1 &&
        <div className="flex_box">
          <RecipeIngredientNumber
            idx={idx}
            register={register}
            setValue={setValue}
            required={true}
            
            calcAmount={calcAmount}
            cutNumberByLength={cutNumberByLength}
          />
          ml
        </div>
      }

      {sublevel === 2 &&
        
        <select 
          {...register(`ingrediantList.${idx}.ingredientColor`)}
        >
          <option value="#000000">옵션1</option>
          <option value="#111111">옵션2</option>
          <option value="#222222">옵션3</option>
        </select>
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