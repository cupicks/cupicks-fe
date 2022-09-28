import styled from "styled-components"

const RecipeIngredientConform = (props) => {
  const {formProps} = props
  const {getValues} = formProps
  const {cupSize, ingredientList, isIced} = getValues()

  return (
    <StTextInputContainer>
      <div className="info_box">
        선택정보
      </div>

      <StTable>
        <tbody>

          <tr>
            <td className='title' colSpan={2}>
              전체량 - {cupSize}
            </td>
          </tr>

          <tr>
            <td className='title' colSpan={2}>
              온도 타입 - {isIced}
            </td>
          </tr>

          <tr>
            <td className='title'>
              선택재료 -  
            </td>
            <td>
              {ingredientList?.map((ingredient, idx) => {
                return (
                  <span key={idx}>
                    {`${ingredient.ingredientName} : 
                    ${ingredient.ingredientAmount}ml`}
                  </span>
                )
              })}
            </td>
          </tr>
        </tbody>
      </StTable>
    
    </StTextInputContainer>
  )
}

export default RecipeIngredientConform

const StTextInputContainer = styled.div`
  display: flex;
  flex-flow: column;

  padding: 1rem 1.2rem;
  margin-top: 10px;

  text-align: left;

  background-color: #F8F8F8;

  .info_box {
    color: #aaa;
    margin-bottom: 10px;

    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
  }

  .error_box {
    color: #aaa;

    min-height: 20px;
  }
`

const StTable = styled.table`
  color: #B6B6B6;
;
  tr {
    display: flex;
  }
  .title {
    padding-right: 4px;
  }
  span {
    display: block;
  }
`