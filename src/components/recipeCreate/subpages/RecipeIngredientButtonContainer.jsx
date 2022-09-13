import styled from "styled-components"

const RecipeIngredientButtonContainer = (props) => {
  const {cupState, setCupState, formArrayProps, stepState, setStepState} = props;

  const {ingredientDeleteMode, cupFull} = cupState
  const {fields, remove, append} = formArrayProps
  const {subStep, finalSubStep} = stepState

  /** 마지막 재료를 지움 */
  const ingredientDeleteButtonClickHandler = (e) => {
    e.stopPropagation();
    remove(fields.length-1)

    setCupState(prev => ({ ...prev, 
      ingredientDeleteMode: 0
    }))
    setStepState(prev => ({ ...prev,
      subStep: 0
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
        <>
          <StModal
            onClick={()=>{
              setCupState(prev => ({...prev, ingredientDeleteMode: 0}))
              document.querySelector('.ingredientSelected').classList.remove('ingredientSelected')
            }}
          >
            <span 
              className="button_close"
            >
              취소
            </span>
            <button
              type="button" 
              onClick={
                ingredientDeleteButtonClickHandler
              }
            >
              x
            </button>
          </StModal>
        </>
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

const StModal = styled.div`
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  
  background: rgba(0, 0, 0, 0.3);
  
  .button_close {
    position: absolute;
    top: 1.2rem;
    left: 1.5rem;
  
    color: #fff;
    
    font-size: 1.4rem;
    font-weight: 700;
  }
  
`