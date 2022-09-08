import RecipeTitle from "./element/RecipeTitle";

import styled from "styled-components";
import RecipeDescBody from "./element/RecipeDescBody";

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