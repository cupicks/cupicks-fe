import styled from "styled-components";

const RecipeInput = ({ label, type="text", placeholder="", register, config={}, onChange=null }) => {
	return (
			<StInput 
        type={ type } 
        placeholder={placeholder}
				{...register( label, config )} 
				onChange={onChange} 
			/>
	)
}

export default RecipeInput;

const StInput = styled.input`
  all: unset;

  flex: 1 1 auto;
  min-height: 40px;

  color: #666;

  text-align: left;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6;
`