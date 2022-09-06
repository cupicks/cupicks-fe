import styled from "styled-components";

const RecipeIngredientColor = (
  { color, name, register, config={}, onChange=null, onClick=null }
) => {
	return (
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
}

export default RecipeIngredientColor;

const StColorCircle = styled.label`
  &.colorLabel {
    display: block;
  
    flex: 0 0 2rem;
    height: 2rem;
    border-radius: 50%;
  
    box-sizing: initial;
    
    background-color: ${props => props.color};
    border: 4px solid #fff;
    
    cursor: pointer;
  }
`