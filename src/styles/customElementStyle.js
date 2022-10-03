import styled, { css } from "styled-components";
import emptyProfilePic from "../assets/svg/profile.svg";

const CustomTitle = styled.div`
  ${({ theme }) => {
    return css`
      margin-top: 1.5rem;
      margin-bottom: 2rem;
      word-break: keep-all;

      h1 {
        font-weight: ${theme.fonts.weight.bold};
        font-size: ${theme.fonts.size.title};
      }
    `;
  }}
`;

const CustomPlainText = styled.div`
  ${({ theme }) => {
    return css`
      word-break: keep-all;

      font-weight: ${theme.fonts.weight.normal};
      font-size: ${theme.fonts.size.label};
    `;
  }}
`;

const CustomRecipeListTitle = styled.div`
  ${({ theme }) => {
    return css`
      padding: 1rem 2.5rem 0;

      font-size: 17px;
      line-height: 150%;

      margin-top: 1.5rem;
      margin-bottom: 2rem;
      word-break: keep-all;

      h1 {
        font-weight: ${theme.fonts.weight.bold};
        font-size: ${theme.fonts.size.input};
      }
    `;
  }}
`;

const CustomSmallBoldTextLink = styled.p`
  ${({ theme }) => {
    return css`
      font-weight: ${theme.fonts.weight.bold};
      font-size: ${theme.fonts.size.label};
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
        font-size: ${theme.fonts.size.label};

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

const CustomIconBox = styled.div`
  display: flex;

  gap: 0.5rem;

  .icon {
    transition: all 0.3s;
  }

  .icon:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

const CustomProfilePic = styled.div`
  ${({ theme }) => {
    return css`
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;

      border: 1px solid #b6b6b6;
      background: #eee
        url(${(props) =>
          props.profileImage ? props.profileImage : emptyProfilePic})
        no-repeat center / cover;
    `;
  }}
`;

const Custom = styled.div`
  ${({ theme }) => {
    return css``;
  }}
`;

const styledComponents = {
  CustomTitle,
  CustomSmallBoldTextLink,
  CustomLineBox,
  CustomSmallLightText,
  CustomRecipeListTitle,
  CustomProfilePic,
  CustomIconBox,
  CustomPlainText,
};

export default styledComponents;
