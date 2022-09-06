import IsIcedIcon from "../components/recipeDetail/element/IsIcedIcon";
import IngredientsContainer from "../components/recipeDetail/IngredientsContainer";
import RecipeDesc from "../components/recipeDetail/RecipeDesc";
import Navigation from "../partial/Navigation";

import styled from "styled-components";

const RecipeDetail = () => {
  const recipe = {
    recipeId: 123456,
    title: '레시피 이름',
    content: '레시피 본문',
    isIced: true,
    cupSize: 473,
    ingredientList: [
      {
        ingredientName: '커피',
        ingredientColor: '#884712',
        ingredientAmount: 50
      },
      {
        ingredientName: '우유',
        ingredientColor: '#fff7ea',
        ingredientAmount: 200
      },
      {
        ingredientName: '시럽',
        ingredientColor: '#ffb641',
        ingredientAmount: 100
      }
    ]
  }
  
  return (
    <StRecipeDetail>

      <Navigation>
        <div className="icon_box fcc">
          <IsIcedIcon isIced={recipe.isIced} />
        </div>
      </Navigation>

      <IngredientsContainer recipe={recipe} />
      <RecipeDesc recipe={recipe} />
    
    </StRecipeDetail>
  );
};

export default RecipeDetail;

const StRecipeDetail = styled.div`
  height: 100%;
  overflow-y: scroll;

  .icon_box {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    background-color: #444;
    color: #fff;
  }
`