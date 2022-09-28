import styled from "styled-components";

const RecipeEditTextarea = ({
  name,
  placeholder = "",
  defaultValue = "",
  rows = 8,
  register,
  config = {},
}) => {
  return (
    <StTextarea
      type="textarea"
      rows={rows}
      maxLength={255}
      minLength={3}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...register(name, config)}
    />
  );
};

export default RecipeEditTextarea;

const StTextarea = styled.textarea`
  all: unset;

  flex: 1 1 auto;
  min-height: 40px;

  color: #666;

  text-align: left;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6;
`;
