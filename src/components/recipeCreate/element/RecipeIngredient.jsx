import RecipeIngredientNumber from "./RecipeIngredientNumber";

import styled from "styled-components";

const RecipeIngredient = ({
  idx, register, calcAmount, cutNumberByLength, setValue, sublevel, setSublevel, finalSublevel, watch
}) => {

  const sublevelButtonNextClickHandler = () => {
    switch (sublevel) {
      case 0:
        if(watch(`ingrediantList.${idx}.ingredientName`) === '') return;
        break;
      case 1:
        if(isNaN(watch(`ingrediantList.${idx}.ingredientAmount`))) return;
        break;
      case 2:
        if(watch(`ingrediantList.${idx}.ingredientColor`).length === 0) return;
        break;
      default: '';
    }
    sublevel < finalSublevel && setSublevel(prev => prev + 1);
  }

  const sublevelButtonPrevClickHandler = () => {
    sublevel > 0 && setSublevel(prev => prev - 1);
  }

  return (
    <StRecipeIngredient>
      
      {sublevel === 0 &&
        <input 
          type="text" 
          placeholder={`재료 ${idx}`}
          {...register(`ingrediantList.${idx}.ingredientName`)}
        />
      }

      {sublevel === 1 &&
        <RecipeIngredientNumber
          idx={idx}
          register={register}
          setValue={setValue}
          
          calcAmount={calcAmount}
          cutNumberByLength={cutNumberByLength}
        />
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

      <StButtonBox>
        <button onClick={()=>{
          sublevelButtonNextClickHandler();
        }}>
          {sublevel === finalSublevel ? '재료 고르기 완료' : '다음'}
        </button>

        <button
          onClick={()=>{
            sublevelButtonPrevClickHandler();
        }}> 
          뒤로 가기
        </button>
      </StButtonBox>

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

const StButtonBox = styled.div`
  
`