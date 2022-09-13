const RecipeIngredientNumber = (props) => {
  const {idx, calcAmount, formProps} = props
  const {register} = formProps

  return (
    <>
      <input 
        type="number"
        autoComplete="off"
        id={idx}
        max={1000}
        min={10}
        step={1}

        {...register(`ingredientList.${idx}.ingredientAmount`, {
          max: {
            value: 1000,
            message: "1000이하로 입력"
          }
        })}

        onBlur={(e)=>{
          calcAmount(e);
        }}
      />
    </>
  )
}

export default RecipeIngredientNumber;