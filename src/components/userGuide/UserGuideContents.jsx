import styled from "styled-components";
import styledLayoutComponents from "../../styles/customLayoutStyle";
const { CustomContainer } = styledLayoutComponents;
import styledElementComponents from "../../styles/customElementStyle";
const { CustomRecipeListTitle, CustomPlainText, CustomIconBox } =
  styledElementComponents;

import icon01 from "../../assets/svg/shortcut01.svg";
import icon02 from "../../assets/svg/shortcut02.svg";
import icon03 from "../../assets/svg/shortcut03.svg";

const UserGuideContents = (props) => {
  const { username } = props;
  return (
    <StUserGuideContents>
      <StContainer>
        <StRecipeListTitle>
          안녕하세요. <strong>{username}</strong> 님
        </StRecipeListTitle>

        <StPlainText>오늘 픽할 음료를 찾으러 어디로 가볼까요?</StPlainText>

        <StIconLists>
          <StIconList>
            <img className="icon" src={icon01} alt="둘러보기" />
          </StIconList>
          <StIconList>
            <img className="icon" src={icon02} alt="레시피 만들기" />
          </StIconList>
          <StIconList>
            <img className="icon" src={icon03} alt="저장한 것 보기" />
          </StIconList>
        </StIconLists>
      </StContainer>
    </StUserGuideContents>
  );
};

export default UserGuideContents;

const StUserGuideContents = styled.div`
  position: relative;
`;

const StContainer = styled(CustomContainer)`
  padding: 2rem 2.2rem;
`;

const StRecipeListTitle = styled(CustomRecipeListTitle)`
  margin: 0;
  padding: 0;
`;

const StPlainText = styled(CustomPlainText)`
  margin-top: 1rem;
  color: #848484;
`;

const StIconLists = styled(CustomIconBox)`
  margin-top: 1.8rem;
  justify-content: space-between;
  height: 7rem;

  @media (min-width: 500px) {
    height: 9rem;
  }

  .icon:hover {
    transform: translateY(-2px);
  }
  .icon {
    height: 100%;
  }
`;

const StIconList = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
`;
