import IsIcedIcon from "../components/recipeDetail/element/IsIcedIcon";
import IngredientsContainer from "../components/recipeDetail/IngredientsContainer";
import RecipeDesc from "../components/recipeDetail/RecipeDesc";

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
    <div>
      <IsIcedIcon isIced={recipe.isIced} />
      <IngredientsContainer recipe={recipe} />
      <RecipeDesc recipe={recipe} />
    </div>
  );
};

export default RecipeDetail;