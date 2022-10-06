import RecipeRadio from "../element/RecipeRadio";

const RecipeCupSize = (props) => {
  const { cupState, setCupState, formProps, formArrayProps } = props;

  const { isIcedTag } = cupState;
  const { setValue, register, errors, clearErrors } = formProps;
  const { remove, append } = formArrayProps;

  const cupSizes = ["355ml", "473ml", "591ml"];

  /** 'cupSize' radio에 props drilling로 넘겨준 onClick함수 */
  const cupSizeClickHandler = (e) => {
    const currCupSize = +("" + e.target.textContent).split("ml")[0];
    setCupState({
      ...cupState,
      currCupSize: currCupSize,
      cupStyleHeight: +((+currCupSize / 591) * 100).toFixed(1),
    });

    setValue("cupSize", currCupSize);
    clearErrors();
  };

  return (
    <>
      <div className="info_box">레시피 전체량을 선택해주세요.</div>

      <div className="button_box">
        {cupSizes.map((value, idx) => (
          <RecipeRadio
            key={idx}
            label={"cupSize"}
            value={value}
            register={register}
            onClick={cupSizeClickHandler}
            config={{
              required: {
                value: "required",
                message: "사이즈를 선택해주세요.",
              },
            }}
          />
        ))}
      </div>

      <div className="error_box">
        {errors.cupSize ? errors.cupSize.message : ""}
      </div>
    </>
  );
};

export default RecipeCupSize;
