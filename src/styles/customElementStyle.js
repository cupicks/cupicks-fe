import styled, { css } from "styled-components";

const CustomWrapFullVH = styled.div`
  ${({ theme }) => {
    return css`
      height: 100vh;
      padding: 0 2.4rem;

      display: flex;
      flex-flow: column;

      overflow-y: scroll;
    `;
  }}
`;

const CustomTitle = styled.div`
  ${({ theme }) => {
    return css`
      margin-top: 5.5rem;

      h1 {
        font-weight: ${theme.fonts.weight.bold};
        font-size: ${theme.fonts.weight.title};
      }
    `;
  }}
`;

const CustomSmallBoldTextLink = styled.p`
  ${({ theme }) => {
    return css`
      font-weight: ${theme.fonts.weight.bold};
      font-size: ${theme.fonts.weight.label};
      color: ${theme.colors.middle};

      cursor: pointer;
      transition: all 0.2s;

      :hover {
        color: ${theme.colors.dark};
      }
    `;
  }}
`;

const CustomSmallLightText = styled.p`
  ${({ theme }) => {
    return css`
      font-size: 1.2rem;
      color: ${theme.colors.light};
    `;
  }}
`;

const CustomLineBox = styled.div`
  ${({ theme }) => {
    return css`
      width: 100%;
      position: relative;

      ::before {
        content: "";
        width: 100%;
        height: 0.1rem;

        position: absolute;
        background-color: ${theme.colors.wg};
      }

      span {
        font-size: ${theme.fonts.weight.label};

        padding: 0 1rem;

        background-color: #fff;
        color: ${theme.colors.light};

        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
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
  CustomWrapFullVH,
  CustomTitle,
  CustomSmallBoldTextLink,
  CustomLineBox,
  CustomSmallLightText,
};

export default styledComponents;
