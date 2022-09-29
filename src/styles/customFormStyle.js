import styled, { css } from "styled-components";

// 폼
const CustomForm = styled.form`
  ${({ theme }) => {
    return css`
      display: flex;
      flex-direction: column;

      nav {
        padding: 0;
      }

      & p {
        color: ${theme.colors.alert};
      }

      & label {
        font-weight: ${theme.fonts.weight.bold};
        font-size: ${theme.fonts.size.label};
        color: ${theme.colors.middle};
      }
    `;
  }}
`;

// 인풋 Input
const CustomInput = styled.input`
  ${({ theme }) => {
    return css`
      width: 100%;
      padding: ${theme.inputs.padding.base};

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
        font-size: ${theme.fonts.size.input};
        color: ${theme.colors.light};
      }

      ${theme.devices.tablet} {
        padding: ${theme.inputs.padding.sm};

        ::placeholder {
          font-size: ${theme.fonts.size.md};
        }
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

      ${theme.devices.tablet} {
        padding: 1.2rem;
      }
      ${theme.devices.mobile} {
        padding: 0.9rem;
      }

      border: ${theme.buttons.border.base};
      background: ${theme.buttons.backgroundColor.base};
      color: ${theme.buttons.color.base};

      font-weight: ${theme.fonts.weight.bold};
      font-size: ${theme.fonts.size.lg};
      text-align: center;

      transition: border 0.3s, background-color 0.3s, color 0.3s;
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

// 라벨: 라벨용 작은 회색 글씨
const CustomLabel = styled.label`
  ${({ theme }) => {
    return css`
      font-weight: ${theme.fonts.weight.bold};
      font-size: ${theme.fonts.weight.label};
      color: ${theme.colors.middle};

      word-break: keep-all;
    `;
  }}
`;

// 영역, 박스
const CustomErrorBox = styled.div`
  ${({ theme }) => {
    return css`
      width: 90%;
      min-height: 1.5rem;

      line-height: 2rem;
      padding-bottom: 1rem;

      font-size: ${theme.fonts.size.sm};
      color: ${theme.colors.alert};

      word-break: keep-all;

      .info {
        color: #aaa;
        word-break: keep-all;
      }
    `;
  }}
`;

const CustomInputBox = styled.div`
  ${({ theme }) => {
    return css`
      position: relative;

      .register_input_box {
        position: relative;
      }

      .input_label_icon {
        width: 2.4rem;
        height: 2.4rem;

        position: absolute;
        right: 0;
        bottom: 0;

        transform: translateY(-30%);

        cursor: pointer;
      }
    `;
  }}
`;

const Custom = styled.div`
  ${({ theme }) => {
    return css``;
  }}
`;

const styledComponents = {
  CustomInput,
  CustomButton,
  CustomForm,
  CustomErrorBox,
  CustomLabel,
  CustomInputBox,
};

export default styledComponents;
