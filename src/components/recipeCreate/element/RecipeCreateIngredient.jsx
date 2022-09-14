import styled from "styled-components";

const RecipeCreateIngredient = (props) => {
  const {idx, cupState, subStep, formProps, onClick, 
    ingredient={
      ingredientName: "", 
      ingredientColor: "#e4e4e4", 
      ingredientAmount: 20
    }
  } = props
  let { isIcedTag, currCupSize:cupSize } = cupState
  const {ingredientName, ingredientColor, ingredientAmount} = ingredient

  if(isIcedTag){
    cupSize = cupSize - 200
  } 
  
  let amountMl = ingredientAmount ? +ingredientAmount : 20
  let amountPercent = +(amountMl / cupSize * 100).toFixed(1);
  if(amountPercent >= 100) amountPercent = 100

  const ingredientFixMode = subStep === 4;

  return (
    <StIngredient 
      id={'ingredient.'+idx}
      ingredientColor={ingredientColor?ingredientColor:"#e4e4e4"}
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