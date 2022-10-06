import styled from "styled-components";

const RecipeIngredientConform = (props) => {
  const { formProps } = props;
  const { getValues } = formProps;
  const { cupSize, ingredientList, isIced } = getValues();

  return (
    <StTextInputContainer>
      <div className="info_box">선택정보</div>

      <StTable>
        <tbody>
          <tr>
            <td className="title" colSpan={2}>
              전체량 - {cupSize}
            </td>
          </tr>

          <tr>
            <td className="title" colSpan={2}>
              온도 타입 - {isIced}
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

export default RecipeIngredientConform;

const StTextInputContainer = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;

  padding: 2.5rem 2.3rem;
  margin-top: 1rem;

  text-align: left;

  background-color: #f8f8f8;
  font-size: 1.4rem;

  .info_box {
    color: #aaa;
    margin-bottom: 1rem;

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
