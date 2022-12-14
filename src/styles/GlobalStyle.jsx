import { createGlobalStyle, css } from "styled-components";
import reset from "./customReset.css";
import animations from "./animations.css";

const GlobalStyle = createGlobalStyle`
  ${reset};
  ${animations};

  ${({ theme }) => {
    return css`
      html {
        font-size: 70%;
        background-color: ${theme.colors.light};
      }

      ${theme.devices.tablet} {
        html {
          font-size: 62.5%;
        }
      }

      ${theme.devices.mobile} {
        html {
          font-size: 60%;
        }
        background-color: ${theme.colors.background};
      }

      ${theme.devices.xs} {
        html {
          font-size: 55%;
        }
      }
    `;
  }}
`;

export default GlobalStyle;
