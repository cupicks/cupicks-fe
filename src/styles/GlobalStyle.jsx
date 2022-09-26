import { createGlobalStyle, css } from "styled-components";
import reset from "./customReset.css";
import animations from "./animations.css";

const GlobalStyle = createGlobalStyle`
  ${reset};
  ${animations};

  ${({ theme }) => {
    return css`
      body {
        font-size: ${theme.fonts.size.base};
      }
    `;
  }}
`;

export default GlobalStyle;
