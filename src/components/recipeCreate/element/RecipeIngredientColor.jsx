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
    
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    
    margin: 0 5px;
    box-sizing: initial;
    
    display: inline-block;
    
    background-color: ${props => props.color};
    border: 4px solid #fff;
    
    cursor: pointer;
  }
`