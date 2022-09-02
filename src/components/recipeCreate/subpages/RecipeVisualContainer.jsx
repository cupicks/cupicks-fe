import styled from "styled-components"

const RecipeVisualContainer = (props) => {
  const {fields, cupStyleHeight, level, append, setSublevel, remove, ingredientDeleteMode} = props;

  console.log(cupStyleHeight);

  return (
    <StRecipeVisualContainer>
      <StRecipeVisual ingredient_height={cupStyleHeight}>
        <div 
          className=
          {cupStyleHeight === 0? "ingredient_outline fcc empty":
          "ingredient_outline fcc"
          }
        >
          {(level === 2 && !ingredientDeleteMode) &&
            <>
              <button
                type="button" 
                onClick={()=>{
                  append()
                  setSublevel(0)
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
      { level === 1 &&
        <div className="info_box">
          ice 선택 시 전체량 중 200ml가 채워집니다.
        </div>
      }
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

  background-color: #fff;

  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    
    background: var(--button-activeBackgroundColor);
    border: none;
    box-shadow: 0 5px 10px 5px #ccc;
    color: var(--button-activeColor);
    outline: none;

    font-size: 30px;
    line-height: 30px;
  }

  .info_box {
    margin-top: 10px;
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