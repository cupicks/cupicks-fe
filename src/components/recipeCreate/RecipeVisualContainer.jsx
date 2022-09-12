import styled from "styled-components"

import IsIcedIcon from "./element/IsIcedIcon"
import RecipeCreateIngredientsContainer from "./subpages/RecipeCreateIngredientsContainer";
import RecipeIngredientButtonContainer from "./subpages/RecipeIngredientButtonContainer";

const RecipeVisualContainer = (props) => {
  const {cupState, setCupState, formProps, formArrayProps} = props;
  const {sublevel, cupStyleHeight, isIcedTag} = cupState;
  const {fields} = formArrayProps
  const {getValues} = formProps

  const IngredientList = getValues('ingredientList');

  const ingredientClickHandler = (e) => {
    setCupState(prev => ({...prev, ingredientDeleteMode: 1}))
    e.target.classList.add('ingredientSelected')
  }

  return (
    <StRecipeVisualContainer>
    
      <RecipeIngredientButtonContainer
        cupState={cupState}
        setCupState={setCupState}
        formArrayProps={formArrayProps}
      />

      <StRecipeVisual ingredient_height={cupStyleHeight}>
        <div 
          className={
            cupStyleHeight === 0 ? "ingredient_outline fcc empty":
          "ingredient_outline fcc"
          }
        >
          {IngredientList !== undefined ?
            <RecipeCreateIngredientsContainer 
              cupSize = {cupState.currCupSize}
              sublevel = {cupState.sublevel}
              ingredientLists = {IngredientList}
              onClick = {ingredientClickHandler}
            />
            :""
          }
        </div>
        
      </StRecipeVisual>

      { isIcedTag && sublevel !== 4 && 
        <div className="info_box">
          ice 선택 시 전체량 중 200ml가 채워집니다.
        </div>
      }
      
      { sublevel === 4 && fields.length > 0 &&
        <div className="info_box">
          채워진 재료를 누르면 제거 버튼이 나옵니다.
        </div>
      }
      
      {isIcedTag !== null && (isIcedTag ?
        <StIsIcedIconBox>
          <IsIcedIcon isIced={true} />
        </StIsIcedIconBox>
        :
        <StIsIcedIconBox>
          <IsIcedIcon isIced={false} />
        </StIsIcedIconBox>
      )}
    </StRecipeVisualContainer>
  )
}

export default RecipeVisualContainer;

const StRecipeVisualContainer = styled.div`
  /* 전체 높이에서 헤더와 하단 영역 제외 */
  height: calc(100vh - 60px - 150px);
  
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
`

const StRecipeVisual = styled.div`
  width: 70%;
  height: 80%;

  margin: 0 auto;
  
  display: flex;
  flex-flow: column;
  justify-content: flex-end;

  position: relative;

  border: 0.5em solid #ddd;
  border-top: 0;

  .ingredient_outline {
    height: ${props => props.ingredient_height+ '%'};

    position: relative;

    border: 3px dashed #555;

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