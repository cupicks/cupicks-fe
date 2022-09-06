import styled from "styled-components";

const RecipeCreateIngredient = (props) => {
  const {cupSize, sublevel, onClick} = props

  // 재료 입력할 때 undefined 예외처리
  let ingredientValues = {
    ingredientName: "", 
    ingredientColor: "#eee", 
    ingredientAmount: 0
  }
  if(props.ingredientList !== undefined){
    ingredientValues = {...ingredientValues, ...props.ingredientList}
  }
  const {ingredientName, ingredientColor, ingredientAmount} = ingredientValues

  const amountPercent = +(ingredientAmount / cupSize * 100).toFixed(1)
  
  return (
    <StIngredient 
      ingredientColor={ingredientColor?ingredientColor:""}
      ingredientAmount={amountPercent}
      onClick={sublevel === 4 ? onClick : null}
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

  transition: height .5s .1s;
  animation: fadein .3s forwards;
  
  span {
    transform: translateY(-1rem);
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