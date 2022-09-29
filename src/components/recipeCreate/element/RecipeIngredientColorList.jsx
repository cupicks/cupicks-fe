import styled from "styled-components";

const RecipeIngredientColorList = (props) => {
  const { colorList, name, register, config = {}, onClick = null } = props;
  return (
    <StRecipeIngredientColorList>
      {colorList.map((color, i) => {
        return (
          <span key={i}>
            <input
              className="colorLabel"
              id={name + color}
              type="radio"
              value={color}
              {...register(name, config)}
            />

            <StColorCircle
              className="colorLabel"
              htmlFor={name + color}
              name={name + color}
              color={color}
              onClick={onClick}
            />
          </span>
        );
      })}
    </StRecipeIngredientColorList>
  );
};

export default RecipeIngredientColorList;

const StRecipeIngredientColorList = styled.div`
  width: 100%;
  padding-top: 3px;

  input {
    position: absolute;
    /* opacity: 0;
    z-index: -9; */
  }

  label {
    transition: all 0.2s;
  }

  input:checked + .colorLabel {
    box-shadow: 0 2px 7px 3px rgba(45, 35, 53, 0.1);
    transform: translateY(-2px) scale(1.1);
  }
`;

const StColorCircle = styled.label`
  &.colorLabel {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    margin: 0 5px;
    box-sizing: initial;

    display: inline-block;

    background-color: ${(props) => props.color};
    border: 4px solid #fff;

    cursor: pointer;

    :hover {
      background-color: ${(props) => props.color} !important;
      border: 4px solid #fff;
      transform: scale(1.1) !important;
    }
  }

  @media (max-width: 500px) {
    &.colorLabel {
      width: 22px;
      height: 22px;
      border: 3px solid #fff;
    }
  }
`;
