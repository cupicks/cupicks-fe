const RecipeRadio = ({ label, value, register, config={}, onChange=null, onClick=null }) => {
	return (
    <>
      <input 
        id={label+value}
        type="radio" 
        value={ value }
        {...register( label, config )}
        onChange={ onChange } 
      />
      <label 
        htmlFor={ label+value }
        onClick={ onClick } 
      >
        { value }
      </label>
    </>
  )
}

export default RecipeRadio;