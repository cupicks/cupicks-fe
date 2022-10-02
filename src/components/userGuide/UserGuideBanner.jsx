import styled from "styled-components";
import styledElementComponents from "../../styles/customElementStyle";
const { CustomTitle } = styledElementComponents;

const UserGuideBanner = (props) => {
  return (
    <StUserGuideBanner>
      <StTitle>
        <h1>나만의 카페 레시피를 만들고 공유해보세요!</h1>
        <p>집에서 즐기는 카페 음료 한 잔</p>
      </StTitle>
    </StUserGuideBanner>
  );
};

export default UserGuideBanner;

const StUserGuideBanner = styled.div`
  width: 100%;
  height: 60vw;
  padding-top: 5rem;
  padding-bottom: 10vw;
  position: relative;

  display: flex;
  align-items: center;
`;

const StTitle = styled(CustomTitle)`
  max-width: 23rem;

  color: #fff;

  h1 {
    line-height: 1.5;
    font-size: 2.1rem;
  }

  p {
    margin-top: 2rem;
    font-size: 1.3rem;
    font-weight: 400;
  }
`;
