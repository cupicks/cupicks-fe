const RecipeRadio = ({ label, value, register, config={} }) => (
	<>
		<label>{ value }</label>
    <input 
      type="radio" 
      value={ value }
      {...register( label, config )}
    />
	</>
)

export default RecipeRadio;