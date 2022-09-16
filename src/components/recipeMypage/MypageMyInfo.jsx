import { useNavigate } from "react-router-dom";
import { useState } from "react";

import api from '../../server/api'

import profilePlaceholder from '../../assets/svg/profile.svg'
import slideDownIcon from '../../assets/svg/arrow_down.svg'
import dropDownMenuIcon from '../../assets/svg/change.svg'
import showMore from '../../assets/svg/profile_edit.svg'

import styled from "styled-components";

const MypageMyInfo = (props) => {
  const [dropBox, setDropBox] = useState(false)
  const navigate = useNavigate();
  const {token, userData} = props
  const {nickname, imageUrl, email, userId} = userData

  const onClickGoToProfileEdit = () => {
    navigate(`/profile/edit`)
  }
  
  const ProfileImageSrc = imageUrl?imageUrl:profilePlaceholder

  // 로그아웃
  const logout = () => {
    try {
      const contentType = "application/x-www-form-urlencoded";
      api(contentType).patch(`/auth/logout?refreshToken=${token}`).then((res)=>{
        console.log(res);
      })
      
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      navigate('/')
  
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <StMypageMyInfo>
      
      <div 
        className="left"
        onClick={()=>setDropBox(true)}
      >
        <StProfilePic 
          ProfileImageSrc={ProfileImageSrc} 
          onClick={(e)=>{
            e.stopPropagation();
            onClickGoToProfileEdit();
          }}
        />
        <span>
          {nickname}
        </span>
        <img 
          className="dropdown_menu_icon"
          src={dropDownMenuIcon} 
          alt="프로필 수정"
        />
        
      </div>
      
      {dropBox &&
        <StDropMenu>
          <li
            onClick={()=>setDropBox(false)}
          >
            <span className="nickname">
              {nickname}
            </span>
            <span className="email">
              {email}
            </span>
          </li>
          <li
            onClick={logout}
          >
            로그아웃
          </li>
        </StDropMenu>
      }

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
    
    cursor: pointer;
  }

  .left {
    cursor: pointer;
  }
  
  .right {
    padding: 0 12px;
  }
  `

const StDropMenu = styled.ul`
  max-width: calc(100vw - 180px);
  border-radius: 10px;

  position: absolute;
  left: 150px;
  transform: translateY(40%);
  z-index: 9;
  
  box-shadow: 2px 2px 8px rgba(55, 55, 55, 0.2);
  color: #393939;
  
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;

  cursor: pointer;
  
  li {
    padding: 10px 22px 11px;

    border-bottom: 1px solid #cdcdcd;
    background-color: #fff;

    span {
      display: block;
      word-wrap: break-word;
      word-break: keep-all;
    }

    .email {
      color: #cdcdcd;
      font-weight: 500;
      font-size: 13px;
    }
  }

  li:last-child {
    border: none;
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
