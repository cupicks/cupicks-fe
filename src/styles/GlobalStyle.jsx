import { createGlobalStyle, css } from "styled-components";
import reset from "./customReset.css";
import animations from "./animations.css";

const GlobalStyle = createGlobalStyle`
  ${reset};
  ${animations};

  ${({ theme }) => {
    return css`
      body {
        font-size: ${theme.fonts.size.lg};
        background-color: ${theme.colors.light};
      }

      ${theme.devices.tablet} {
        body {
          font-size: ${theme.fonts.size.base};
          background-color: ${theme.colors.middle};
        }
      }

      ${theme.devices.mobile} {
        body {
          font-size: ${theme.fonts.size.md};
          background-color: ${theme.colors.background};
        }
      }
    `;
  }}
`;

export default GlobalStyle;
