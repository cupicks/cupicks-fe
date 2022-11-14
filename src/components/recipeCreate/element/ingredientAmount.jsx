const RecipeIngredientNumber = (props) => {
  const { idx, formProps, amountInputProps } = props;
  const { register } = formProps;

  const { amountOption } = amountInputProps;
  const { max, min, defaultValue, isLimit } = amountOption;

  return (
    <input
      type="range"
      id={idx}
      {...register(`ingredientList.${idx}.ingredientAmount`)}
      min={min}
      max={max}
      defaultValue={defaultValue}
      step={1}
      disabled={isLimit ? "disabled" : ""}
    />
  );
};

export default RecipeIngredientNumber;
