import Ingredient from "./Ingredient";

const IngredientsContainer = (props) => {
  const lists = props.recipe.ingredientList; 

  return (
    <div className="IngredientsContainer"
      style={{height: 'calc(100vh - 60px)'}}
    >
      { lists.map( list => 
        <Ingredient list={list} />
      ) }
    </div>
  );
};

export default IngredientsContainer;
