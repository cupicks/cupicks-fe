import RecipeRadio from "../element/RecipeRadio";

const RecipeCupSize = (props) => {
  const {register, errors, onClick} = props;
  const cupSizes = ['355ml', '473ml', '591ml']

  return ( 
    <>
      <div className="info_box">
        사이즈를 선택해주세요.
      </div>

      {cupSizes.map((value, idx) => (  
        <RecipeRadio
          key={idx}
          label={'cupSize'}
          value={value}
          register={register}
          onClick={onClick}
          config={{
            required: {
              value: 'required',
              message: "사이즈를 선택해주세요."
            }
          }}
        />
      ))}

      <div className="error_box">
        {errors.cupSize?.type === 'required' ? errors.cupSize.message : "" }
      </div>
    </>
  )
}

export default RecipeCupSize;