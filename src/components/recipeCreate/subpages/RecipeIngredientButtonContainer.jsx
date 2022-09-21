import styled from "styled-components"
import RecipeCreateModal from "../element/RecipeCreateModal";

import cancel from '../../../assets/svg/cancel_ingredient.svg'

const RecipeIngredientButtonContainer = (props) => {
  const {cupState, setCupState, formArrayProps, stepState, setStepState} = props;
  
  const {ingredientDeleteMode} = cupState
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
          <img 
            src={cancel}  
            alt="새 재료 추가 버튼" 
            className={ buttonClickable ? "ingredient_button" : "ingredient_button disable" }
            onClick={()=>{
              append()
              setStepState(prev => ({...prev, subStep: 1}))
            }}
          />
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
  .ingredient_button {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    
    transform-origin: 48% 48%;
    z-index: 99;
    animation: blink .6s alternate infinite;
  }
  
  @keyframes blink {
    0% {opacity: 0.8}
    100% {opacity: 1}
  }
  
  @keyframes fadeOut {
    0% {opacity: 0.8}
    100% {opacity: 0.4}
  }

  .disable {
    transform: translate(-50%, -50%) rotate(45deg);
    pointer-events: none;
    animation: fadeOut .3s forwards;
  }
`