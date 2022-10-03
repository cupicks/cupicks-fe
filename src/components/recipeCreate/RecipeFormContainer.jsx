import RecipeCupSize from "./subpages/RecipeCupSize";
import RecipeIsIced from "./subpages/RecipeIsIced";
import RecipeTextValue from "./subpages/RecipeTextValue";
import RecipeIngredientForm from "./subpages/RecipeIngredientForm";

import styled from "styled-components";

const RecipeFormContainer = (props) => {
  const { cupState, setCupState, stepState, formProps, formArrayProps } = props;
  const { step } = stepState;

  return (
    <StRecipeFormContainer>
      {step !== 3 && (
        <StRecipeOptContainer>
          {step === 0 && (
            <RecipeCupSize
              step={step}
              cupState={cupState}
              setCupState={setCupState}
              formProps={formProps}
              formArrayProps={formArrayProps}
            />
          )}

          {step === 1 && (
            <RecipeIsIced
              step={step}
              cupState={cupState}
              setCupState={setCupState}
              formProps={formProps}
              formArrayProps={formArrayProps}
            />
          )}

          {step === 2 && (
            <RecipeIngredientForm
              cupState={cupState}
              setCupState={setCupState}
              stepState={stepState}
              formProps={formProps}
              formArrayProps={formArrayProps}
            />
          )}
        </StRecipeOptContainer>
      )}

      {step === 3 && (
        <RecipeTextValue
          cupState={cupState}
          setCupState={setCupState}
          formProps={formProps}
        />
      )}
    </StRecipeFormContainer>
  );
};

export default RecipeFormContainer;

const StRecipeFormContainer = styled.div`
  height: 15rem;
  animation: slideUp 0.3s forwards;

  @keyframes slideUp {
    100% {
      height: 18.5rem;
    }
  }

  background-color: #eee;

  h4 {
    font-weight: 500;
  }
`;

const StRecipeOptContainer = styled.div`
  flex: 1 1 auto;
  padding: 2.8rem 2.2rem 0;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.4rem;

  font-size: 1.6rem;

  .info_box {
    flex: 0 0 100%;
    display: flex;
    gap: 15px;

    text-align: left;
    font-weight: 700;
    color: #393939;
  }

  .error_box {
    flex: 0 0 100%;
    line-height: 1.6;

    color: #888;
  }

  .button_box {
    width: 100%;
    display: flex;
    gap: 1.4rem;
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
    height: 6rem;
    border-radius: 1rem;

    font-size: 1.5rem;
    font-weight: 600;

    transition: all 0.2s;
    border: 1px solid #cdcdcd;
    color: #cdcdcd;
  }
`;
