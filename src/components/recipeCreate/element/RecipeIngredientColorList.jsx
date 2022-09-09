import styled from "styled-components";

const RecipeIngredientColorList = (
  { colorList, name, register, config={}, onChange=null, onClick=null }
) => {
	return (
    <StRecipeIngredientColorList>
    {colorList.map((color, i)=>{
      return(
        <>
          <input 
            className="colorLabel"
            id={ name+color }
            type="radio" 
            value={ color }
            {...register( name, config )}
            onChange={ onChange } 
          />
          
          <StColorCircle 
            className="colorLabel"
            htmlFor={ name+color }
            color={ color }
            onClick={ onClick } 
          />
        </>
      )
    })}
    </StRecipeIngredientColorList>
  )
}

export default RecipeIngredientColorList;

const StRecipeIngredientColorList = styled.div`
  width: 100%;
  padding-top: 3px;
  
  input {
    position: absolute;
    /* opacity: 0;
    z-index: -9; */
  }

  label {
    transition: all .2s;
  }
  
  input:checked + .colorLabel {
    box-shadow: 0 2px 7px 3px rgba(45, 35, 53, 0.1);
    transform: translateY(-2px) scale(1.1);
  }
`

const StColorCircle = styled.label`
  &.colorLabel {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    
    margin: 0 5px;
    box-sizing: initial;
    
    display: inline-block;
    
    background-color: ${props => props.color};
    border: 4px solid #fff;
    
    cursor: pointer;
  }
  
  @media (max-width: 500px) {
    &.colorLabel {
      width: 22px;
      height: 22px;
      border: 3px solid #fff;
    }
  }
`