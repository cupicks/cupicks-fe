const RecipeIngredientNumber = (props) => {
  const { idx, cupState, formProps } = props;
  const { register } = formProps;
  const { maxAmount } = cupState;

  const maxRange = maxAmount;
  const minRange = maxAmount < 25 ? maxAmount - 1 : 25;
  const minimumMinRange = maxRange < 25 ? true : false;
  const defaultValue = minimumMinRange ? maxRange : 20;
  const isDisabled = minimumMinRange ? "disabled" : null;

  return (
    <input
      type="range"
      id={idx}
      {...register(`ingredientList.${idx}.ingredientAmount`)}
      min={minRange}
      max={maxRange}
      defaultValue={defaultValue}
      step={1}
      disabled={isDisabled}
    />
  );
};

export default RecipeIngredientNumber;
