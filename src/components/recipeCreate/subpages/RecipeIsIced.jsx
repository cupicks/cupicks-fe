import { useState } from 'react'

import RecipeRadio from "../element/RecipeRadio";
import IsIcedIcon from "../element/IsIcedIcon"
import styled from 'styled-components';

const RecipeIsIced = (props) => {
  const {register, errors, setValue, trigger} = props;
  const [isIcedResult, setIsIcedResult] = useState('');
  
  const recipeTypes = ['hot', 'ice']

  /** watch('isIced')해서 'isIcedResult' state변경
   * ice음료는 true, hot음료는 false */ 
  const isIcedSelectHandler = (e) => {
    const currValue = e.target.value; 
    const isIced = currValue === "ice";
    let isIcedTrue = Boolean(isIced) && isIced === true

    setIsIcedResult(isIcedTrue)
    trigger('isIced')
  }
  
  return ( 
    <>
      {recipeTypes.map((value, idx) => (  
        <RecipeRadio
          key={idx}
          label={'isIced'}
          value={value}
          register={register}
          config={{
            required: true
          }}
          onChange={isIcedSelectHandler}
        />
      ))}

      <div className="error_box">
        { errors.isIced?.type === 'required' && "음료 타입을 선택해주세요." }
      </div>
      
      <StIsIcedIconBox>
        <IsIcedIcon isIced={isIcedResult} />
      </StIsIcedIconBox>
    </>
  )
}

export default RecipeIsIced;

const StIsIcedIconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  margin-top: -80px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 1.5rem;

  background-color: #444;
  color: #fff;
  
`