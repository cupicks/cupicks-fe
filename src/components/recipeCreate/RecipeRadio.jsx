const RecipeRadio = ({ label, value, register, config={}, onChange=null }) => {
	return (
    <>
      <label>{ value }</label>
      <input 
        type="radio" 
        value={ value }
        {...register( label, config )}
        onChange={ onChange } 
      />
    </>
  )
}

export default RecipeRadio;