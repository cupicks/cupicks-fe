import styled from 'styled-components';

import RecipeInput from "../element/RecipeInput";
import RecipeTextarea from '../element/RecipeTextarea';
import RecipeIngredientConform from './RecipeIngredientConform';

const RecipeTextValue = (props) => {
  const { formProps } = props;
  const { register, errors, watch } = formProps

  return ( 
    <>
      <StTextInputContainer>
        <div className="info_box">
          레시피 이름
        </div>

        <RecipeInput 
          label={"title"} 
          placeholder={"레시피 이름을 적어주세요."}
          register={register}
          config={{
            required: true
          }}
        />
      </StTextInputContainer>
      
      <RecipeIngredientConform 
        formProps={formProps}
      />

      <StTextInputContainer>
        <div className="info_box">
          상세설명
        </div>

        <RecipeTextarea 
          name={"content"}
          placeholder={'상세설명 내용을 적어주세요.'}
          register={register}
          config={{
            required: true
          }}
        />

        <div className="error_box">
          {errors.content?.type === 'required' && "레시피 내용을 입력해주세요."}
        </div>
      </StTextInputContainer>

      <StTextInputContainer>
        <StIsPulicBox>
          <div className="info_box">
            커뮤니티에 공유하기
          </div>
          
          <StRangeBar isPublic={watch('isPublic')}>
            <input 
              type="checkbox" 
              id='publicCheckbox'
              {...register('isPublic')}
              checked
            />
            <div className='range_circle'></div>
            <label 
              htmlFor='publicCheckbox'
              aria-details='커뮤니티에 공유하기'
            />
          </StRangeBar>
        </StIsPulicBox>
      </StTextInputContainer>

      <StTextInputContainer />
    </>
  )
}

export default RecipeTextValue;

const StWrap = styled.div`
  height: 100%;
`

const StTextInputContainer = styled.div`
  display: flex;
  flex-flow: column;

  padding: 1rem 1.2rem;
  margin-top: 10px;

  text-align: left;

  background-color: #fff;
  
  input, textarea {
    color: #393939;
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
  }

  .info_box {
    color: #aaa;
    margin-bottom: 10px;

    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
  }

  .error_box {
    color: #aaa;

    min-height: 20px;
  }

  &:last-child {
    flex: 1 1 auto;
  }
  
  *::placeholder {
    color: #393939 !important;
  }
`

const StIsPulicBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .info_box {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }
`

const StRangeBar = styled.div`
  width: 46px;
  height: 23px;
  border-radius: 50px;
  
  position: relative;

  background: '#393939';
  background: ${props => props.isPublic?'#393939':'#cdcdcd'};
  
  .info_box {
    width: auto;
  }

  label {
    height: 100%;
    width: 100%;

    display: block;
    position: relative;

    z-index: 9;
  }
  
  .range_circle {
    width: 23px;
    height: 100%;
    border-radius: 15px;

    position: absolute;
    left: ${props => props.isPublic?'50%':'0'};
    right: 0;

    background-color: #fff;
    border: 1px solid ${props => props.isPublic?'#393939':'#cdcdcd'};;
    color: #fff;

    transition: all .4s;
  }

  input[type="checkbox"] {
    position: absolute;
    z-index: -9;
    opacity: 0;
  }
`