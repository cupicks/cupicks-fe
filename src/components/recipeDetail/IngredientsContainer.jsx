import styled from "styled-components";

import Ingredient from "./element/Ingredient";

import ice355 from '../../assets/image/ice_background/355_ice.png'
import ice473 from '../../assets/image/ice_background/473_ice.png'
import ice591 from '../../assets/image/ice_background/591_ice.png'

const IngredientsContainer = (props) => {
  const { recipe } = props
  const { isIced, cupSize, ingredientList: lists } = recipe
  const amountPercent = ( cupSize / 591 * 100).toFixed();
  
  let iceImage; 
  if(cupSize === 355){
    iceImage = ice355
  } else if (cupSize === 473) {
    iceImage = ice473
  } else {
    iceImage = ice591
  }
  console.log(isIced, iceImage);

  return (
    <StIngredientsContainer>

      <StCupHeight 
        amountPercent={amountPercent}
        iceImage={isIced?iceImage:null}
        iceOpacity={isIced?1:0}
      >
        { lists.map((list, i) => {
            if(isIced && i === 0) return null
            
            return (
              <Ingredient 
                key={'ComunityPageIngredient'+i}
                list={list} 
                cupSize={cupSize} 
                isIced={isIced}
              />
            )
          }
        ).reverse() }
      </StCupHeight>
      
    </StIngredientsContainer>
  );
};

export default IngredientsContainer;

const StIngredientsContainer = styled.div`
  /* 전체 높이에서 헤더와 하단 영역 제외 */
  height: calc(100vh - 60px - 50px);

  display: flex;
  flex-flow: column;
  justify-content: flex-end;
`

const StCupHeight = styled.div`
  height: ${props => props.amountPercent + "%"};
  position: relative;
  
  &::before {
    content: '';
    width: 90%;
    height: 90%;
    
    box-sizing: border-box;

    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: -9;

    background: url(${props => props.iceImage}) no-repeat center / contain;
    animation: float 0.5s forwards;

    @keyframes float {
      0% {
        transform: translate(-50%, 10px);
        opacity: 0.2;
      }
      100% {
        transform: translate(-50%, 0);
        opacity: 0.5;
      }
    }
  }
  
  &::before {
    mix-blend-mode: screen;
    opacity: 0.5;

    z-index: 9;
    pointer-events: none;
  }
`