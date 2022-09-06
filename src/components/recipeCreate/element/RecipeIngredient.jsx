import RecipeIngredientNumber from "./RecipeIngredientNumber";
import RecipeIngredientColor from "./RecipeIngredientColor";

import styled from "styled-components";

const RecipeIngredient = (props) => {
  const {
    idx, register, calcAmount,
    cutNumberByLength, setValue, cupState } = props;
  const {sublevel, setSublevel, finalSublevel} = cupState;


  // temp
  const colorLists = [
    [
      '#ffffff','#000000','#3897ef','#7acffe','#c1e9ff','#b5f2bb','#92e172','#e8d0a3','#ae7948'
    ],
    [
      '#fee484','#fecda8','#f29d50','#ee714a','#f33d3d','#ffb1c8','#e1a6db','#d076de','#a63bd9'
    ],
    [
      '#262626','#353535','#555555','#737373','#999999','#b2b2b2','#c6c6c6','#d5d5d5','#ededed'
    ]
  ]
  
  return (
    <StRecipeIngredient>
      {sublevel === 1 &&
        <>
          <div className="info_box_center">
            재료의 이름은 무엇인가요?
          </div>
          <input 
            type="text" 
            required={true}
            placeholder={`재료`}
            {...register(`ingredientList.${idx}.ingredientName`)}
          />
        </>
      }

      {sublevel === 2 &&
        <>
          <div className="info_box_center">
            재료량을 입력해주세요.
          </div>
          <div className="flex_box">
            <RecipeIngredientNumber
              idx={idx}
              register={register}
              setValue={setValue}
              required={true}
              
              calcAmount={calcAmount}
              // cutNumberByLength={cutNumberByLength}
            />
            ml
          </div>
        </>
      }

      {sublevel === 3 &&
        <>
          <div className="info_box_center">
            재료색을 선택해주세요.
          </div>

          <StColorCircleBox>
            {colorLists[0].map((color, i)=>{
              return (
                <RecipeIngredientColor
                  key={i}
                  color={color}
                  name={`ingredientList.${idx}.ingredientColor`}
                  register={register} 
                />
              )
            })}
            
          </StColorCircleBox>
        </>
      }
    </StRecipeIngredient>
	)
}

export default RecipeIngredient;

const StRecipeIngredient = styled.div`
  input, select {
    all: unset;
    width: 100%;

    border-bottom: 2px solid #aaa;
    color: #222;

    font-size: 1.1em;
    line-height: 40px;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .flex_box {
    display: flex;
    gap: 20px;
  }
`

const StColorCircleBox = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-flow: wrap;

  input {
    position: absolute;
    /* opacity: 0;
    z-index: -9; */
  }

  label {
    transition: all .2s;
  }
  
  input:checked + .colorLabel {
    box-shadow: 0 2px 7px 3px rgba(45, 35, 53, 0.1);
    transform: translateY(-2px) scale(1.1);
  }
`