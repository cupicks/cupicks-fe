import styled from "styled-components";

const RecipeEditIngredientConform = (props) => {
  const { fetchRecipe } = props;
  const { recipeId, title, content, ingredientList, isIced, cupSize } =
    fetchRecipe;

  const isIcedText = isIced ? "ice" : "hot";

  return (
    <StTextInputContainer>
      <div className="info_box">음료정보</div>

      <StTable>
        <tbody>
          <tr>
            <td className="title" colSpan={2}>
              전체량 - {cupSize}ml
            </td>
          </tr>

          <tr>
            <td className="title" colSpan={2}>
              온도 타입 - {isIcedText}
            </td>
          </tr>

          <tr>
            <td className="title">선택재료 -</td>
            <td>
              {ingredientList?.map((ingredient, idx) => {
                return (
                  <span key={idx}>
                    {`${ingredient.ingredientName} : 
                    ${ingredient.ingredientAmount}ml`}
                  </span>
                );
              })}
            </td>
          </tr>
        </tbody>
      </StTable>
    </StTextInputContainer>
  );
};

export default RecipeEditIngredientConform;

const StTextInputContainer = styled.div`
  display: flex;
  flex-flow: column;

  padding: 1rem 1.2rem;
  margin-top: 1rem;

  text-align: left;

  background-color: #f8f8f8;

  .info_box {
    color: #aaa;
    margin-bottom: 1rem;

    font-size: 1.4rem;
    font-weight: 700;
    line-height: 2.1rem;
  }

  .error_box {
    color: #aaa;

    min-height: 2rem;
  }
`;

const StTable = styled.table`
  color: #b6b6b6;
  tr {
    display: flex;
  }
  .title {
    padding-right: 0.4rem;
  }
  span {
    display: block;
  }
`;
