const RecipeInput = ({ label, type="text", register, config={}, onChange=null }) => {
	return (
		<>
			<label>{ label }</label>
			<input 
				type={ type } 
				{...register( label, config )} 
				onChange={onChange} 
			/>
		</>
	)
}

export default RecipeInput;