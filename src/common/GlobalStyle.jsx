import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle` 
  :root {
    --button-color: #393939;
    --button-borderColor: #393939;
    --button-backgroundColor: #ffffff;
    --button-activeColor: #ddd;
    --button-activeBorderColor: #393939;
    --button-activeBackgroundColor: #393939;
    
    --input-border-bottom: 2px solid #cdcdcd;
    --input-activeBorder-bottom: 2px solid#9e9e9e;
    --input-font-color: #cdcdcd;
    --input-font-size: 17px;
    --input-padding: 14px 0 11px;

    --font-color-dark: #393939;
    --font-color-middle: #9e9e9e;
    --font-color-light: #cdcdcd;
    --font-color-alert: #E64A3A;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
    line-height: 150%;
    font-family: 'Noto Sans KR', sans-serif;
    word-break: keep-all;
  }

  /* 스크롤바 지우는 코드입니다. */
  * {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  *::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  

  @media (max-width: 560px) {
    body {
      font-size: 14px
    }
  }
  
  @keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
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
