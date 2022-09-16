import { useNavigate } from "react-router-dom";

import profilePlaceholder from '../../assets/svg/profile.svg'
import slideDownIcon from '../../assets/svg/arrow_down.svg'
import dropDownMenuIcon from '../../assets/svg/change.svg'
import showMore from '../../assets/svg/profile_edit.svg'

import styled from "styled-components";

const MypageMyInfo = (props) => {
  const navigate = useNavigate();
  // if(props.userData === null) return null
  
  const {nickname, imageUrl, userId} = props.userData
  console.log(props.userData);

  const onClickGoToProfileEdit = () => {
    navigate(`/profile/edit`)
  }
  
  const ProfileImageSrc = imageUrl?imageUrl:profilePlaceholder

  // let nick = new TextDecoder(nickname)
  // console.log(nick);

  return (
    <StMypageMyInfo>
      
      <div className="left">
        <StProfilePic ProfileImageSrc={ProfileImageSrc} />
        <span>
          {nickname}
        </span>
        <img 
          className="dropdown_menu_icon"
          src={dropDownMenuIcon} 
          alt="프로필 수정"
          onClick={onClickGoToProfileEdit}
        />
      </div>

      <div className="right"
        onClick={onClickGoToProfileEdit}
      >
        <img 
          className="show_more_icon"
          src={showMore} 
          alt="프로필 수정"
        />
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
  
  img.dropdown_menu_icon {
    width: 12px;
    margin-top: 4px;
  }
  
  img.show_more_icon {
    max-height: 16px;
    position: relative;
    right: -10px;
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

  background:#eee url(${props => props.ProfileImageSrc}) no-repeat center / cover;

  img {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
