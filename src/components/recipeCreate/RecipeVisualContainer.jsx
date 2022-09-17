import styled from "styled-components"

import IsIcedIcon from "./element/IsIcedIcon"
import RecipeCreateIngredientsContainer from "./subpages/RecipeCreateIngredientsContainer";
import RecipeIngredientButtonContainer from "./subpages/RecipeIngredientButtonContainer";

import ice355 from '../../assets/image/ice_background/355_ice.png'
import ice473 from '../../assets/image/ice_background/473_ice.png'
import ice591 from '../../assets/image/ice_background/591_ice.png'
import ProgressIconBar from "./element/ProgressIconBar";

const RecipeVisualContainer = (props) => {
  const {cupState, setCupState, formProps, formArrayProps, stepState, setStepState} = props;
  
  const {cupStyleHeight, isIcedTag, cupFull, cupLeft} = cupState;
  const {fields} = formArrayProps
  const {step, subStep} = stepState

  const ingredientClickHandler = (e) => {
    setCupState(prev => ({...prev, ingredientDeleteMode: 1}))
    e.target.classList.add('ingredientSelected')
  }

  // UI 관련 코드
  let iceImage; 
  if(cupState.currCupSize === 355){
    iceImage = ice355
  } else if (cupState.currCupSize === 473) {
    iceImage = ice473
  } else {
    iceImage = ice591
  }
  const borderColor = cupFull ? '#E64A3A' : '#000000'

  return (
    <StRecipeVisualContainer>

      <ProgressIconBar stepState={stepState} />
      
      { (step === 2) &&
        <RecipeIngredientButtonContainer
          cupState={cupState}
          setCupState={setCupState}
          stepState={stepState}
          setStepState={setStepState}
          formProps = {formProps}
          formArrayProps={formArrayProps}
        />
      }

      {/* 영역 대비 cupSize 높이 */}
      <StRecipeVisual 
        ingredient_height={cupStyleHeight}
        iceImage={isIcedTag?iceImage:null}
        iceOpacity={isIcedTag?1:0}
        borderColor={borderColor}
      >
        <div 
          className={
            cupStyleHeight === 0 ? "ingredient_outline fcc empty":
          "ingredient_outline fcc"
          }
        >
          {/* 재료 리스트 */}
          <RecipeCreateIngredientsContainer 
            cupState = {cupState}
            setCupState = {setCupState}
            subStep = {stepState.subStep}
            formProps = {formProps}
            onClick = {ingredientClickHandler}
          />
        </div>
        
      </StRecipeVisual>

      <div className="info_box">

        { isIcedTag && subStep !== 4 && 
          `ice 선택 시 전체량 중 200ml가 채워집니다.`
        }

        { subStep === 4 && fields.length > 0 &&
          `채워진 재료를 누르면 제거 버튼이 나옵니다.`
        }
        { cupLeft > 0 && cupLeft !== null &&
          <>
            <br /> 
            {cupLeft}ml 남았습니다.
          </>
        }

      </div>
      
      
      {isIcedTag !== null && 
        <IsIcedIcon isIced={isIcedTag} />
      }
    </StRecipeVisualContainer>
  )
}

export default RecipeVisualContainer;

const StRecipeVisualContainer = styled.div`
  /* 전체 높이에서 헤더와 하단 영역 제외 */
  flex: 0 0 calc(100vh - 60px - 150px);
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  
  position: relative;

  background-color: #fff;

  .info_box {
    position: absolute;
    bottom: 3%;

    color: #888;

    font-size: 14px;
  }

  .is_iced_icon_box {
    position: absolute;
    right: 10px;
    top: 0;
    z-index: 999;
  }
`

const StRecipeVisual = styled.div`
  width: 70%;
  height: 80%;

  margin: 0 auto;
  padding-top: 20px;
  
  display: flex;
  flex-flow: column;
  justify-content: flex-end;

  position: relative;
  z-index: 9;

  border: 0.5em solid #ddd;
  border-top: 0;

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: ${props => 'calc('+(props.ingredient_height)+'% + 20px)'};

    position: absolute;
    bottom: 0;
    z-index: -9;

    background: url(${props => props.iceImage}) no-repeat center / contain;
    opacity: ${props => props.iceOpacity};
    transition: opacity .3s;
  }
  
  &::before {
    z-index: 9;
    opacity: 0.2;
    pointer-events: none;
  }

  // cupSize Height
  .ingredient_outline {
    height: ${props => props.ingredient_height+ '%'};
    
    position: relative;

    border: 3px dashed ${props => props.borderColor};

    transition: all .5s;
  }
  .empty {
    height: 50%;
    opacity: 0;
  }
`

const StIsIcedIconBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 5px;
  right: 1.5rem;

  background-color: #444;
  color: #fff;
`