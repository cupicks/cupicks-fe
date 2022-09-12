import styled from "styled-components";

const RecipeCreateIngredient = (props) => {
  const {cupState, subStep, formProps, onClick, 
    ingredient={
      ingredientName: "", 
      ingredientColor: "#eee", 
      ingredientAmount: 20
    }
  } = props
  const {currCupSize:cupSize} = cupState
  const {ingredientName, ingredientColor, ingredientAmount} = ingredient

  const amountPercent = +(ingredientAmount / cupSize * 100).toFixed(1)
  const ingredientFixMode = subStep === 4;

  return (
    <StIngredient 
      ingredientColor={ingredientColor?ingredientColor:"#eeeeee"}
      ingredientAmount={amountPercent?amountPercent : 10}
      onClick={ingredientFixMode ? onClick : null}
    >
      <span>
        {ingredientName?ingredientName:"재료이름"}
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

  transition: height .5s .1s;
  animation: fadein .3s forwards;
  
  span {
    transform: translateY(-4px);
  }
  
  &.ingredientSelected {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    
    z-index: 999;
    animation: ingredientSelected 0.6s infinite alternate;
  }

  @keyframes fadein {
    0% {opacity: 0}
    100% {opacity: 1}
  }

  @keyframes ingredientSelected {
    0% {opacity: 0.5}
    100% {opacity: 1}
  }
`