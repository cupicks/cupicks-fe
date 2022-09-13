import styled from "styled-components";

const RecipeTextarea = ({ name, placeholder="", rows=8, register, config={}, onChange=null }) => {
	return (
    <StTextarea 
      type="textarea"
      rows={rows}
      maxLength={255}
      placeholder={placeholder}
      {...register( name, config )} 
      onChange={onChange} 
    />
	)
}

export default RecipeTextarea;

const StTextarea = styled.textarea`
  all: unset;

  flex: 1 1 auto;
  min-height: 40px;

  color: #666;

  text-align: left;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6;
`