import styled, { css } from "styled-components";

// 인풋 Input
const CustomInput = styled.input`
  ${({ theme }) => {
    return css`
      width: 100%;
      padding: ${theme.inputs.padding.base};
      /* margin-bottom: 25px; */

      border-bottom: ${theme.inputs.borderBottom.base};

      font-size: ${theme.fonts.size.base};
      line-height: 1.5;

      transition: all 0.3s;

      :hover,
      :focus,
      :active {
        border-bottom: ${theme.inputs.borderBottom.active};
      }
      ::placeholder {
        color: ${theme.colors.light};
      }
    `;
  }}
`;

// 버튼 button
const CustomButton = styled.button`
  ${({ theme }) => {
    return css`
      padding: 1.5rem;
      border-radius: 1rem;

      border: ${theme.buttons.border.base};
      background: ${theme.buttons.backgroundColor.base};
      color: ${theme.buttons.color.base};

      font-weight: ${theme.fonts.weight.bold};
      font-size: ${theme.fonts.size.lg};
      text-align: center;

      transition: all 0.3s;
      cursor: pointer;

      :hover {
        border: ${theme.buttons.border.active};
        background: ${theme.buttons.backgroundColor.active};
        color: ${theme.buttons.color.active};
      }
      :disabled {
        border: ${theme.buttons.border.disable};
        background: ${theme.buttons.backgroundColor.disable};
        color: ${theme.buttons.color.disable};

        pointer-events: none;
      }
    `;
  }}
`;

const Custom = styled.div`
  ${({ theme }) => {
    return css``;
  }}
`;

const styledComponents = { CustomInput, CustomButton };

export default styledComponents;
