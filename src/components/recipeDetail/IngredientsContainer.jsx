import styled from "styled-components";
import Ingredient from "./element/Ingredient";

const IngredientsContainer = (props) => {
  const { cupSize, ingredientList: lists } = props.recipe

  return (
    <StIngredientsContainer>
      { lists.map( list => 
        <Ingredient 
          list={list} 
          cupSize={cupSize} 
        />
      ).reverse() }
    </StIngredientsContainer>
  );
};

export default IngredientsContainer;

const StIngredientsContainer = styled.div`
  /* 전체 높이에서 헤더와 하단 영역 제외 */
  height: calc(100vh - 60px - 50px);

  display: flex;
  flex-flow: column;
  justify-content: flex-end;
`