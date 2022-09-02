import RecipeRadio from "../element/RecipeRadio";

const RecipeCupSize = (props) => {
  const {register, setValue, errors, trigger, onClickCupSize, watch} = props;
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
          onClick={onClickCupSize}
          config={{required: true}}
        />
      ))}

      <div className="error_box">
      </div>
    </>
  )
}

export default RecipeCupSize;