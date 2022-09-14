const RecipeIngredientNumber = (props) => {
  const {idx, calcAmount, formProps} = props
  const {register} = formProps

  return (
    <>
      <input 
        type="text"
        autoComplete="off"
        id={idx}
        maxLength={3}

        {...register(`ingredientList.${idx}.ingredientAmount`)}

        onKeyUp={(e)=>{
          e.target.value = e.target.value.replace(/[^0-9]/g,'')
        }}
        onBlur={(e)=>{
          calcAmount(e);
        }}
      />
    </>
  )
}

export default RecipeIngredientNumber;