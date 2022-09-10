import RecipeTitle from "./element/RecipeTitle";
import RecipeDescBody from "./element/RecipeDescBody";

import styled from "styled-components";

const RecipeDesc = (props) => {
  const { title, content, ingredientList } = props.recipe

  return (
    <StRecipeDesc>
      <RecipeTitle title={title} />
      <RecipeDescBody content={content} ingredientList={ingredientList}/>
    </StRecipeDesc>
  )
};

export default RecipeDesc;

const StRecipeDesc=styled.div`
  
`