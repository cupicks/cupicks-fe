import RecipeRadio from "../element/RecipeRadio";
import IsIcedIcon from "../element/IsIcedIcon"
import styled from 'styled-components';

const RecipeIsIced = (props) => {
  const {register, trigger, cupState, setCupState} = props;
  const {isIcedTag} = cupState
  
  const recipeTypes = ['hot', 'ice']

  /** watch('isIced')해서 'isIcedResult' state변경
   * ice음료는 true, hot음료는 false */ 
  const isIcedSelectHandler = (e) => {
    const currValue = e.target.value; 
    const isIced = currValue === "ice";

    setCupState({...cupState, isIcedTag: isIced})
    trigger('isIced')
  }
  
  return ( 
    <>
      <div className="info_box">
        음료 타입을 선택해주세요.
      </div>

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
        {isIcedTag !== null && (isIcedTag ?
        <StIsIcedIconBox>
          <IsIcedIcon isIced={true} />
        </StIsIcedIconBox>
        :
        <StIsIcedIconBox>
          <IsIcedIcon isIced={false} />
        </StIsIcedIconBox>
        )}
    </>
  )
}

export default RecipeIsIced;

const StIsIcedIconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 70px;
  right: 1.5rem;

  background-color: #444;
  color: #fff;
`