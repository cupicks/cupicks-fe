import styled from "styled-components"

import IsIcedIcon from "../element/IsIcedIcon"
import RecipeCreateIngredientsContainer from "./RecipeCreateIngredientsContainer";

const RecipeVisualContainer = (props) => {
  const {fields, append, remove, getValues, cupState, setCupState} = props;
  const {level, sublevel, finalSublevel, cupStyleHeight, ingredientDeleteMode, isIcedTag} = cupState;
  
  const initList = {
    ingredientAmount: 0,
    ingredientColor: '#fff',
    ingredientName: ''
  }

  const thisVal = getValues('ingredientList');
  if(thisVal && thisVal.length > 0){ 
    // console.log(...thisVal); 
    console.log(cupState.currCupSize, thisVal);
  }

  return (
    <StRecipeVisualContainer>

    <StRecipeVisual ingredient_height={cupStyleHeight}>
      <div 
        className={
          cupStyleHeight === 0 ? "ingredient_outline fcc empty":
        "ingredient_outline fcc"
        }
      >

      {thisVal !== undefined ?
        <RecipeCreateIngredientsContainer 
          cupSize = {cupState.currCupSize}
          ingredientLists = {thisVal} 
        />
        :""
      }

        {(level === 2 && !ingredientDeleteMode) &&
          <>
            <button
              type="button"
              className={ 
                sublevel === 0 || sublevel === finalSublevel ? "" : "disable"
              }
              onClick={()=>{
                append()
                setCupState({...cupState, sublevel: 1})
            }}>
              +
            </button>
          </>
        }
        {(level === 2 && ingredientDeleteMode) &&
          <button
            type="button" 
            onClick={()=>{
              remove(fields.length-1)
          }}>
            x
          </button>
        }
      </div>
        
      </StRecipeVisual>

      { isIcedTag &&
        <div className="info_box">
          ice 선택 시 전체량 중 200ml가 채워집니다.
        </div>
      }
      
      { sublevel === 0 && fields > 0 &&
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

  button {
    width: 60px;
    height: 60px;
    border-radius: 50%;

    position: absolute;
    
    background: var(--button-activeBackgroundColor);
    border: none;
    box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.3);
    color: var(--button-activeColor);
    outline: none;

    font-size: 50px;
    line-height: 50px;
    
    transition: all .2s;
  }

  .info_box {
    position: absolute;
    bottom: 3%;

    color: #888;

    font-size: 14px;
  }

  .disable {
    pointer-events: none;
    opacity: 0.3;
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

    transition: all .5s;

    border: 3px dashed #555;
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