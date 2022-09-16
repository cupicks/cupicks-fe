import React from "react";
import { useJwt } from 'react-jwt'

import styled from "styled-components";

import editIcon from '../../assets/svg/edit.svg'
import prfilePicSrc from '../../assets/svg/profile.svg'

const ProfileEditHeader = (props) => {
  const {watch, register, userData} = props
  const [imagePreview, setImagePreview] = React.useState(prfilePicSrc);

  const image = watch("image");
  
  React.useEffect(() => {
    if(userData.imageUrl !== null) setImagePreview(userData.imageUrl)
    
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  return (
    <StProfileEditHeader>
      <StProfilePic prfilePicSrc={imagePreview}>
        <label
          htmlFor="picture"
        >
          <img src={editIcon} alt="프로필 이미지 수정"/>
        </label>
      </StProfilePic>
      <input
        type="file"
        id="picture"
        {...register("imageValue")}
        accept="image/*"
      />
    </StProfileEditHeader>
  )
}

export default ProfileEditHeader;

const StProfileEditHeader = styled.div`
  padding: 10px 0 30px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  position: relative;

  &::before {
    content: '';
    width: 100%;
    height: 10px;

    position: absolute;
    top: 0;
    transform: translateY(-100%);

    background-color: #fff;
  }
  
  input[type="file"] {
    display: none;
  }

  label {
    display: block;
    width: 100%;
    height: 100%;
  }
`

const StProfilePic = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;

  position: relative;

  background:#eee url(${props => props.prfilePicSrc}) no-repeat center / cover;

  img {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
