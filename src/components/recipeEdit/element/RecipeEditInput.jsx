import styled from "styled-components";

const RecipeEditInput = ({
  label,
  type = "text",
  placeholder = "",
  defaultValue,
  register,
  config = {},
}) => {
  return (
    <StInput
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      {...register(label, config)}
      autoComplete="off"
    />
  );
};

export default RecipeEditInput;

const StInput = styled.input`
  all: unset;

  flex: 1 1 auto;
  min-height: 40px;

  color: #666;

  text-align: left;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6;
`;
