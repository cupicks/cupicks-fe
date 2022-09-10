import styled from "styled-components";

import RecipeList from "./RecipeSilder";

import dropDownIcon from '../../../assets/svg/arrow_down.svg'

const RecipeListToggle = (props) => {
  const {on=false} = props
  const toggleClickHandler = (e) => {
    e.target.classList.toggle('on')
  }

  return (
    <StRecipeListToggle
      onClick={toggleClickHandler}
      className={on&&"on"}
    >
      <div className="toggleButton"
      >
        {props.children}
        <img 
          className="drop_down_icon"
          src={dropDownIcon} 
          alt="프로필 수정"
        />
      </div>
    </StRecipeListToggle>
  )
};

export default RecipeListToggle;

const StRecipeListToggle = styled.div`
  
  .toggleButton {
    width: 100%;
    
    padding: 18px 20px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    background-color: #fff;
    
    pointer-events: none;
  }

  .drop_down_icon {
    transform: translateY(-5px);
    transition: all .2s;

  }

  &.on .drop_down_icon {
    transform: rotate(-180deg) translateY(-5px);
  }
`