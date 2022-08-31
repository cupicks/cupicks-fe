import { setState } from 'react'

import RecipeIngredientNumber from "./RecipeIngredientNumber";

import styled from "styled-components";

const RecipeIngredient = ({
  idx, register, calcAmount, cutNumberByLength, setValue
}) => {
  const [sublevel, setSublevel] = setState(0);

  return (
    <StRecipeIngredient>
      <input 
        type="text" 
        placeholder={`재료 ${idx}`}
        {...register(`ingrediantList.${idx}.ingredientName`)}
      />

      <select 
        {...register(`ingrediantList.${idx}.ingredientColor`)}
      >
        <option value="#000000">옵션1</option>
        <option value="#111111">옵션2</option>
        <option value="#222222">옵션2</option>
      </select>

      <RecipeIngredientNumber
        idx={idx}
        register={register}
        setValue={setValue}
        
        calcAmount={calcAmount}
        cutNumberByLength={cutNumberByLength}
      />
      
    </StRecipeIngredient>
	)
}

export default RecipeIngredient;

const StRecipeIngredient = styled.div`

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

`