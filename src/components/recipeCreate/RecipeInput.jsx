const RecipeInput = ({ label, type="text", register, config={} }) => (
	<>
		<label>{ label }</label>
		<input type={ type } {...register( label, config )} />
	</>
)

export default RecipeInput;