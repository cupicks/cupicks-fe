import { useWatch } from "react-hook-form";
import styled from "styled-components"
import RecipeCreateModal from "../element/RecipeCreateModal";

const RecipeIngredientButtonContainer = (props) => {
  const {cupState, setCupState, formProps, formArrayProps, stepState, setStepState} = props;
  
  const {ingredientDeleteMode} = cupState
  const {getValues} = formProps
  const {remove, append} = formArrayProps
  const {subStep, finalSubStep} = stepState

  /** idx 재료를 지움 */
  const ingredientDeleteButtonClickHandler = (e) => {
    e.stopPropagation();
    const idx = document.querySelector('.ingredientSelected')?.id.split('.')[1]

    if(idx >= 0){
      remove(idx)
    }

    setCupState(prev => ({ ...prev, 
      ingredientDeleteMode: false,
      cupFull: false
    }))
  }

  // 재료 추가 버튼 상태
  const buttonClickable = subStep === 0 || subStep === finalSubStep;
  const addIngredientMode = ingredientDeleteMode === false
  const cupIsFull = cupState.cupFull

  return (
    <StRecipeIngredientButtonContainer>

      { (addIngredientMode && !cupIsFull) &&
        <>
          <button
            type="button"
            className={ buttonClickable ? "" : "disable" }
            onClick={()=>{
              append()
              setStepState(prev => ({...prev, subStep: 1}))
          }}>
            +
          </button>
        </>
      }

      { ingredientDeleteMode &&
        <RecipeCreateModal 
          onClick={ingredientDeleteButtonClickHandler}
          setCupState={setCupState}
          formArrayProps={formArrayProps}
        />
      }
    </StRecipeIngredientButtonContainer>
  )
}

export default RecipeIngredientButtonContainer

const StRecipeIngredientButtonContainer = styled.div`
  button {
    width: 60px;
    height: 60px;
    border-radius: 50%;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    background: var(--button-activeBackgroundColor);
    border: none;
    box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.3);
    color: var(--button-activeColor);
    outline: none;
    
    font-size: 50px;
    line-height: 50px;
    
    transition: all .2s;
    z-index: 99999999999;
  }

  .disable {
    pointer-events: none;
    opacity: 0.3;
  }
`