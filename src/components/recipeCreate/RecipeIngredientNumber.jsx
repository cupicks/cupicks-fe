const RecipeIngredientNumber = ({ 
  idx, register, calcAmount, cutNumberByLength, setValue
}) => {
  return (
    <>
      <input 
        type="number"
        autoComplete="off"
        placeholder={ `재료 ${idx}` }
        id={idx}
        max={1000}
        min={0}

        {...register(`ingrediantList.${idx}.ingredientAmount`, {
          max: {
            value: 1000,
            message: "1000이하로 입력"
          }
        })}

        onBlur={(e)=>{
          calcAmount(e);
        }}
        onChange={(e)=>{
          const currValue = cutNumberByLength(e);
          setValue(`ingrediantList.${idx}.ingredientAmount`, currValue)
        }}
      />
    </>
  )
}

export default RecipeIngredientNumber;