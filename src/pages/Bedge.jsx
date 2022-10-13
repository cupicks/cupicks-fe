import styled from "styled-components";
import styledElementComponents from "../styles/customElementStyle";
const {
  CustomTitle,
  CustomSmallBoldTextLink,
  CustomLineBox,
  CustomSmallLightText,
} = styledElementComponents;
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomFlexListWrap, CustomFlexList } = styledLayoutComponents;

const Bedge = () => {
  const bedges = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <StTitle>
        <p>활동 배지</p>
        <h1>
          <strong>Cupick</strong> Badge
        </h1>
      </StTitle>
      <StFlexListWrap scale={2}>
        {bedges.map((bedge) => (
          <StFlexList scale={2}>
            <StBegdeImage src="" alt="이미지" />
            <p>배지!</p>
          </StFlexList>
        ))}
      </StFlexListWrap>
    </>
  );
};

export default Bedge;

const StTitle = styled(CustomTitle)`
  text-align: center;
  font-size: 1.7rem;
  color: #393939;

  h1 {
    margin-top: 4rem;
    font-weight: 400;
  }
`;

const StFlexListWrap = styled(CustomFlexListWrap)`
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
`;

const StFlexList = styled(CustomFlexList)`
  height: 16vh;
  min-height: 13rem;

  display: flex;
  flex-flow: column;
  gap: 1.2rem;

  align-items: center;
  justify-content: center;

  font-size: 1.2rem;
  color: #393939;
`;

const StBegdeImage = styled.img`
  width: 7.6rem;
  height: 7.6rem;
  border-radius: 50%;
  background-color: #eee;
`;
