import { createGlobalStyle } from "styled-components";

const GlobalStyle=createGlobalStyle` 
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  .fcc {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    cursor: pointer;
  }

  /* .SignInWrapper {
    position: relative;
    left: 0;
    height: 100%;
    padding: 0 2rem;
    transition: 0.5s ease-in-out;
    opacity: 1;
    overflow: auto;

    &.active {
      left: -100%;
      opacity: 0;
    }
  }

  .SignUpWrapper {
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    transition: 0.5s ease-in-out;
    opacity: 0;
    overflow: auto;

    &.active {
      left: 0;
      opacity: 1;
    }
  } */
`;

export default GlobalStyle;
