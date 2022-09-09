import { useNavigate } from "react-router-dom";

import prfilePicSrc from '../../assets/svg/profile.svg'
import dropDownIcon from '../../assets/svg/arrow_down.svg'

import styled from "styled-components";

const MypageMyInfo = (props) => {
  const navigate = useNavigate();
  const {nickname, imageUrl, userId} = props.userData

  const onClickGoToProfileEdit = () => {
    navigate(`/profile/${userId}/edit`)
  }

  return (
    <StMypageMyInfo>
      
      <div className="left">
        <StProfilePic prfilePicSrc={prfilePicSrc} />
        <span>
          {nickname}
        </span>
        <img 
          src={dropDownIcon} 
          alt="프로필 수정"
          onClick={onClickGoToProfileEdit}
        />
      </div>

      <div className="right"
        onClick={onClickGoToProfileEdit}
      >
        □
      </div>
      
    </StMypageMyInfo>
  )
};

export default MypageMyInfo;

const StMypageMyInfo = styled.div`
  padding: 10px 20px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: wrap;
  
  background-color: #fff;
  
  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  img {
    width: 14px;
  }
  
  .right {
    padding: 0 12px;
  }
`

const StProfilePic = styled.div`
  flex: 0 0 auto;
  width: 50px;
  height: 50px;
  border-radius: 50%;

  margin-right: 5px;

  position: relative;

  background:#eee url(${props => props.prfilePicSrc}) no-repeat center / cover;

  img {
    position: absolute;
    right: 0;
    bottom: 0;
  }

`;
