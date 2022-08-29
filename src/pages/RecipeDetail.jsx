import IngredientsContainer from "../components/recipeDetail/IngredientsContainer";
import RecipeTitle from "../components/recipeDetail/RecipeTitle";

const RecipeDetail = () => {
  const recipe = {
    title: '레시피 이름',
    content: '레시피 사진',
    ingredientList: [
      {
        ingredientName: '음식 재료 이름1',
        ingredientColor: '#884712',
        ingredientAmount: 60
      },
      {
        ingredientName: '음식 재료 이름2',
        ingredientColor: '#fff7ea',
        ingredientAmount: 20
      },
      {
        ingredientName: '음식 재료 이름3',
        ingredientColor: '#ffb641',
        ingredientAmount: 20
      }
    ]
  }
  
  return (
    <div>
      <IngredientsContainer recipe={recipe} />
      <RecipeTitle title={recipe.title} />
    </div>
  );
};

export default RecipeDetail;