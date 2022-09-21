import { useState } from "react";

import styled from "styled-components"
import RecipeCreateModal from "../element/RecipeCreateModal";

import cancel from '../../../assets/svg/cancel_ingredient.svg'
import ToastMessage from "../../elements/modal/ToastMessage";

const RecipeIngredientButtonContainer = (props) => {
  const {cupState, setCupState, formArrayProps, stepState, setStepState} = props;
  
  const {ingredientDeleteMode, cupFull} = cupState
  const {remove, append} = formArrayProps
  const {subStep, finalSubStep} = stepState

  const [ingredientDeletedMessage, setIngredientDeletedMessage] = useState();

  /**********************/
  /** 재료 삭제 버튼 클릭 */
  const ingredientDeleteButtonClickHandler = (e) => {
    e.stopPropagation();
    const idx = document.querySelector('.ingredientSelected')?.id.split('.')[1]
    
    if(idx >= 0){
      remove(idx)
    }
    
    setCupState(prev => ({ ...prev, 
      ingredientDeleteMode: false,
      cupFull: false,
      currentIngredientDeleted: true
    }))

    setIngredientDeletedMessage(true)
    setTimeout(()=>{
      setIngredientDeletedMessage(false)
    }, 2000)

  }
  
  /**********************/
  /** 재료 추가 버튼 클릭 */
  const ingredientAddButtonClickHandler = () => {
    append()
    setStepState(prev => ({...prev, subStep: 1}))
    setCupState(prev => ({ ...prev,
      currentIngredientDeleted: false
    }))
  }

  console.log(cupFull);
  

  // 재료 추가 버튼 상태
  const buttonClickable = subStep === 0 || subStep === finalSubStep;
  const addIngredientMode = ingredientDeleteMode === false
  const cupIsFull = cupFull

  return (
    <StRecipeIngredientButtonContainer>

      { (addIngredientMode && !cupIsFull) &&
        <>
          <img 
            src={cancel}  
            alt="새 재료 추가 버튼" 
            className={ buttonClickable ? "ingredient_button" : "ingredient_button disable" }
            onClick={ingredientAddButtonClickHandler}
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

      {ingredientDeletedMessage && 
        <ToastMessage
          text={'선택한 재료가\n삭제 되었습니다.'}
        />  
      }   

    </StRecipeIngredientButtonContainer>
  )
}

export default RecipeIngredientButtonContainer

const StRecipeIngredientButtonContainer = styled.div`
  & > .ingredient_button {
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