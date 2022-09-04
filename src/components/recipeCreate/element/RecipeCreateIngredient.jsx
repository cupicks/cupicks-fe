import styled from "styled-components";

const RecipeCreateIngredient = (props) => {
  let ingredientValues = {
    ingredientName: "", 
    ingredientColor: "#eee", 
    ingredientAmount: 0
  }
  if(props.ingredientList !== undefined){
    ingredientValues = {...ingredientValues, ...props.ingredientList}
  }
  const {ingredientName, ingredientColor, ingredientAmount} = ingredientValues

  const {cupSize} = props
  const amountPercent = +(ingredientAmount / cupSize * 100).toFixed(1)
  
  return (
    <StIngredient 
      ingredientColor={ingredientColor?ingredientColor:""}
      ingredientAmount={amountPercent}
    >
      <span>
        {ingredientName?ingredientName:""}
      </span>
    </StIngredient>
  )
};

export default RecipeCreateIngredient;

const StIngredient = styled.div`
  width: 100%;
  
  height: 0;
  background-color: ${props => props.ingredientColor};
  height: ${props => props.ingredientAmount + "%"};
    
  padding: 0 1rem;
  display: flex;
  justify-content: right;
  align-items: flex-end;

  transition: height .5s .2s;

  span {
    transform: translateY(-1rem);
  }
`