import styled, { css } from "styled-components";

const CustomWrapFullVH = styled.div`
  ${({ theme }) => {
    return css`
      height: 100vh;
      padding: ${theme.paddings.lg};

      display: flex;
      flex-flow: column;

      overflow-y: scroll;
      position: relative;

      ${theme.devices.tablet} {
        padding: ${theme.paddings.md};
      }

      ${theme.devices.mobile} {
        padding: ${theme.paddings.base};
      }
    `;
  }}
`;

const CustomWrapBody = styled.div`
  ${({ theme }) => {
    return css`
      height: calc(100vh - 5rem - 9rem);

      overflow: hidden;
    `;
  }}
`;

const CustomWrapNoHeader = styled.div`
  ${({ theme }) => {
    return css`
      height: calc(100vh - 9rem);

      overflow: hidden;
    `;
  }}
`;

const CustomFlexListWrap = styled.div`
  ${({ theme }) => {
    return css`
      padding: 0 2rem;

      display: flex;
      flex-flow: wrap;

      gap: ${theme.gaps.md};

      ${theme.devices.tablet} {
        gap: ${theme.gaps.base};
      }

      ${theme.devices.mobile} {
        gap: ${theme.gaps.sm};
      }

      ${theme.devices.xs} {
        gap: ${theme.gaps.xs};
      }
    `;
  }}
`;

const CustomFlexList = styled.div`
  ${({ theme }) => {
    return css`
      flex: ${theme.flexItems.md};
      height: 27vh;
      min-height: 20rem;
      max-height: 50rem;
      border-radius: 1rem;

      background-color: #fff;
      box-shadow: ${theme.boxShadows.base};

      transition: all 0.3s;
      overflow: hidden;

      cursor: pointer;

      ${theme.devices.tablet} {
        flex: ${theme.flexItems.base};
      }

      ${theme.devices.mobile} {
        flex: ${theme.flexItems.sm};
      }

      ${theme.devices.xs} {
        flex: ${theme.flexItems.xs};
      }

      :hover {
        transform: translateY(-0.4rem);
        box-shadow: ${theme.boxShadows.hover};
      }

      & > .flex_box {
        height: 100%;

        display: flex;
        flex-flow: column;
      }
    `;
  }}
`;

const CustomHeader = styled.header`
  ${({ theme }) => {
    return css`
      height: 5rem;
      padding: 0 2.2rem;

      display: flex;
      background-color: ${theme.colors.background};

      .cupick_logo {
        width: 12rem;
        height: 100%;

        background: url(${(props) => props.src}) no-repeat center / contain;
        transition: all 0.4s;

        cursor: pointer;

        &:hover {
          transform: scale(1.05);
        }
      }
    `;
  }}
`;

const CustomFooter = styled.footer`
  ${({ theme }) => {
    return css`
      height: 9rem;

      display: flex;
      position: relative;

      .svg_box {
        transition: all 0.2s;
        fill: ${theme.colors.middle};
      }

      .svg_box.on {
        fill: ${theme.colors.dark};
      }
    `;
  }}
`;

const CustomNavigation = styled.nav`
  ${({ theme }) => {
    return css`
      padding: 0 3rem;

      display: flex;
      align-items: center;
      justify-content: space-between;

      position: sticky;
      top: 0;

      background-color: ${(props) =>
        props.transparent ? "transparent" : "#fff"};
      color: ${theme.colors.dark};

      height: 6rem;
      line-height: 6rem;
      z-index: 999;

      button {
        all: unset;
        padding: 0 1.6rem;

        font-size: 1.7rem;
      }

      .isIced {
        line-height: normal;
      }

      button,
      span,
      .button_goBack {
        cursor: pointer;
      }

      img {
        line-height: 0;
      }

      .button_goBack {
        padding: 1rem;
      }

      .title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        font-size: ${theme.fonts.size.lg};
      }

      & > *:first-child {
        transform: translateX(-1rem);
      }
      & > *:last-child {
        transform: translateX(1rem);
      }
    `;
  }}
`;

const CustomFooterButton = styled.button`
  ${({ theme }) => {
    return css`
      flex: 1 1 auto;

      padding-top: 1.2rem;

      display: flex;
      justify-content: center;

      background-color: ${theme.colors.wg};

      cursor: pointer;

      &:hover svg {
        opacity: 0.7;
      }
    `;
  }}
`;

const CustomGoToCreateButton = styled.button`
  ${({ theme }) => {
    return css`
      width: 6.5rem;
      height: 6.5rem;
      border-radius: 50%;

      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);

      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);

      cursor: pointer;
      overflow: hidden;

      img {
        height: 100%;

        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        transition: all 0.5s;
        opacity: 0.9;
      }

      img:hover {
        opacity: 1;
      }
    `;
  }}
`;

const CustomContainer = styled.div`
  ${({ theme }) => {
    return css`
      width: 100%;
      border-radius: 1rem;

      background-color: ${theme.colors.background};
      box-shadow: ${theme.boxShadows.container};

      overflow: hidden;
    `;
  }}
`;

const Custom = styled.div`
  ${({ theme }) => {
    return css``;
  }}
`;

const styledComponents = {
  CustomHeader,
  CustomFooter,
  CustomGoToCreateButton,
  CustomFooterButton,
  CustomWrapFullVH,
  CustomWrapBody,
  CustomFlexListWrap,
  CustomFlexList,
  CustomContainer,
  CustomWrapNoHeader,
  CustomNavigation,
};

export default styledComponents;
