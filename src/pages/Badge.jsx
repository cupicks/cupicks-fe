import styled from "styled-components";
import styledElementComponents from "../styles/customElementStyle";
const { CustomTitle } = styledElementComponents;
import styledLayoutComponents from "../styles/customLayoutStyle";
const { CustomFlexListWrap, CustomFlexList } = styledLayoutComponents;

import badge_bg from "../assets/svg/badge_background.svg";
import badge_none from "../assets/svg/badges/badge_none.svg";
import badge0 from "../assets/svg/badges/badge00.svg";
import badge1 from "../assets/svg/badges/badge01.svg";
import badge2 from "../assets/svg/badges/badge02.svg";
import badge3 from "../assets/svg/badges/badge03.svg";
import badge4 from "../assets/svg/badges/badge04.svg";
import badge5 from "../assets/svg/badges/badge05.svg";
import badge6 from "../assets/svg/badges/badge06.svg";
import badge7 from "../assets/svg/badges/badge07.svg";
import badge8 from "../assets/svg/badges/badge08.svg";

const Badge = () => {
  const badges = [
    {
      imgUrl: badge0,
      borderColor: "#FEDE8A, #FEDE8A",
      name: "레시피 첫 발자국",
      isExist: false,
    },
    {
      imgUrl: badge1,
      borderColor: "#BCDCF8, #BCDCF8",
      name: "댓글 첫 발자국",
      isExist: false,
    },
    {
      imgUrl: badge2,
      borderColor: "#FACCCE, #FACCCE",
      name: "좋아요 첫 발자국",
      isExist: false,
    },
    {
      imgUrl: badge3,
      borderColor: "#FDD783, #EB7A89",
      name: "레시피 연금술사",
      isExist: false,
    },
    {
      imgUrl: badge4,
      borderColor: "#B6D8F8, #8299F9",
      name: "능숙한 리스너",
      isExist: false,
    },
    {
      imgUrl: badge5,
      borderColor: "#F9C8CD, #D28DE8",
      name: "친화력 대장",
      isExist: false,
    },
    {
      imgUrl: badge6,
      borderColor: "#EB7F8B, #D692E3",
      name: "인기쟁이 바리스타",
      isExist: false,
    },
    {
      imgUrl: badge7,
      borderColor: "#EFD491, #899FF6",
      name: "위클리 승리자",
      isExist: false,
    },
    {
      imgUrl: badge8,
      borderColor: "#8DA3F7, #EA7C8C",
      name: "진정한 커픽커",
      isExist: false,
    },
  ];
  const userBadges = [
    { name: "레시피 첫 발자국", createdAt: "2022. 10. 26" },
    { name: "댓글 첫 발자국", createdAt: "2022. 10. 26" },
    { name: "좋아요 첫 발자국", createdAt: "2022. 10. 26" },
    { name: "레시피 연금술사", createdAt: "2022. 10. 26" },
    // { name: "능숙한 리스너", createdAt: "2022. 10. 26" },
    { name: "친화력 대장", createdAt: "2022. 10. 26" },
    { name: "인기쟁이 바리스타", createdAt: "2022. 10. 26" },
    { name: "위클리 승리자", createdAt: "2022. 10. 26" },
    { name: "진정한 커픽커", createdAt: "2022. 10. 26" },
  ];

  /** badge리스트와 유저 배지를 비교해, 새로운 배지 배열를 리턴합니다. */
  const matchBadges = (badges, userBadges) => {
    const matchResult = [];

    badges.map((badge) => {
      let badgeMatch;

      for (const ub in userBadges) {
        badgeMatch = badge.name == userBadges[ub].name;
        if (badgeMatch) {
          matchResult.push({
            ...badge,
            createdAt: userBadges[ub].createdAt,
            isExist: true,
          });
          break;
        }
      }

      if (!badgeMatch) {
        matchResult.push({
          ...badge,
          isExist: false,
        });
      }
    });
    return matchResult;
  };
  const matchBadgeslist = matchBadges(badges, userBadges);

  return (
    <StWrap>
      <div className="contents_area">
        <StTitle>
          <p>활동 배지</p>
          <h1>
            <strong>Cupick</strong> Badge
          </h1>
        </StTitle>

        <StFlexListWrap scale={2}>
          {matchBadgeslist.map((badge, idx) => {
            let boderColorProps;
            let imgUrlProps;

            if (badge.isExist) {
              boderColorProps = badge.borderColor;
              imgUrlProps = badge.imgUrl;
            } else {
              boderColorProps = "#eee, #eee";
              imgUrlProps = badge_none;
            }

            return (
              <StFlexList
                key={"badge" + idx}
                scale={2}
                borderColor={boderColorProps}
                fontColor={badge.isExist ? "#393939" : "#cdcdcd"}
              >
                <StBegdeImage src={imgUrlProps} alt={"badge" + idx} />
                <p>
                  {badge.name}
                  <span className="createAt">{badge.createdAt}</span>
                </p>
              </StFlexList>
            );
          })}
        </StFlexListWrap>
      </div>
      {/* <img className="badge_bg" src={badge_bg} alt="배경 이미지" /> */}
    </StWrap>
  );
};

export default Badge;

const StWrap = styled.div`
  height: calc((var(--vh, 1vh) * 100) - 5rem - 9rem);
  position: relative;
  padding-bottom: 4rem;
  overflow-y: auto;

  .contents_area {
    position: relative;
    z-index: 9;
  }

  .badge_bg {
    width: 100%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StTitle = styled(CustomTitle)`
  text-align: center;
  font-size: 1.7rem;
  color: #393939;

  margin-top: 0;
  position: sticky;

  h1 {
    margin-top: 3.5rem;
    font-weight: 400;
    /* color: #eee; */
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

  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${(props) => props.fontColor};

  // A. 애니메이션 없는 그라데이션 보더
  /* border: 2px solid transparent;
  background: linear-gradient(#fff, #fff),
    linear-gradient(to right bottom, ${(props) => props.borderColor});
  background-origin: border-box;
  background-clip: content-box, border-box; */

  // B. 애니메이션 있는 보더 관련 속성
  position: relative;
  z-index: 99;
  background-color: #fff;

  ::after {
    content: "";
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    border-radius: 0.7rem;
    position: absolute;
    background-color: #fff;
    background-origin: content-box;
    z-index: -1;
  }

  ::before {
    content: "";
    width: 100%;
    height: 0;
    position: absolute;

    border: 2px solid transparent;
    background: linear-gradient(
      to right bottom,
      ${(props) => props.borderColor}
    );
    background-origin: border-box;
    background-clip: border-box;
    z-index: -1;

    animation: borderBehavior 1s ease-out forwards;
  }

  @keyframes borderBehavior {
    0% {
      height: 0%;
    }
    100% {
      height: 100%;
    }
  }
  //

  .createAt {
    display: block;
    font-size: 1rem;
    color: #c5c5c5;
  }
`;

const StBegdeImage = styled.img`
  width: 7.6rem;
  height: 7.6rem;
  border-radius: 50%;
  background-color: #eee;
`;
