import RecipeCupSize from "./subpages/RecipeCupSize";
import RecipeIsIced from "./subpages/RecipeIsIced";
import RecipeTextValue from "./subpages/RecipeTextValue";
import RecipeIngredientList from "./subpages/RecipeIngredientList";

import styled from "styled-components";

const RecipeFormContainer = (props) => {
  const {cupState, setCupState, stepState, setStepState, formProps, formArrayProps} = props;
  const {step} = stepState
  
  return (
    <StRecipeFormContainer>

      {step !== 3 &&
        <StRecipeOptContainer>
          {step === 0 && 
            <RecipeCupSize
              cupState={cupState}   
              setCupState={setCupState}
              formProps={formProps}
              formArrayProps={formArrayProps}
            />
          }

          {step === 1 &&
            <RecipeIsIced 
              cupState={cupState}
              setCupState={setCupState}
              formProps={formProps}
              formArrayProps={formArrayProps}
            />
          }

          {step === 2 && 
            <RecipeIngredientList
              cupState={cupState}
              setCupState={setCupState}
              stepState={stepState}
              formProps={formProps}
              formArrayProps={formArrayProps}
            />
          }
        </StRecipeOptContainer>
      }

      {step === 3 && 
        <RecipeTextValue
          cupState={cupState}
          setCupState={setCupState}
          formProps={formProps}
        />
      }
      
    </StRecipeFormContainer>
  )
};

export default RecipeFormContainer;

const StRecipeFormContainer = styled.div`
  height: 100%;

  display: flex;
  flex-flow: column;
  text-align: center;

  background-color: #eee;

  h4 {
    font-weight: 500;
  }
`

const StRecipeOptContainer = styled.div`
  flex: 1 1 auto;
  padding: 1rem 1.5rem;
  
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  
  .info_box {
    flex: 0 0 100%;
    display: flex;
    gap: 15px;
    
    color: #222;

    text-align: left;
  }

  .error_box {
    flex: 0 0 100%;
    line-height: 1.6;

    color: #888;
  }

  input[type="radio"] {
    /* display: none; */
    position: absolute;
    z-index: -9;
    opacity: 0;
  }

  input {
    flex: 1 1 auto;
  }
  
  label {
    flex: 1 1 auto;
    height: 40px;
    border-radius: .5rem;

    border: 1px solid var(--button-borderColor);

    transition: all .2s;
  }
  
  input:not(.colorLabel):checked + label {
    background-color: var(--button-activeBackgroundColor);
    color: var(--button-activeColor);
  }
`