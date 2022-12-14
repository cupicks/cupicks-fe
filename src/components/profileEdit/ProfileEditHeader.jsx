import { useState, useEffect } from "react";
import { useJwt } from "react-jwt";

import styled from "styled-components";

import editIcon from "../../assets/svg/edit.svg";
import profilePicSrc from "../../assets/svg/profile.svg";

const ProfileEditHeader = (props) => {
  const { watch, register, profiles } = props;
  // let profilePicSrc2 = profiles?.imageUrl ? profiles?.imageUrl : imagePreview;
  const [imagePreview, setImagePreview] = useState(profiles?.imageUrl);

  const image = watch("imageValue");

  const profileImg = image?.length === 0 ? profiles?.imageUrl : imagePreview;

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
    if (image?.length === 0) {
      setImagePreview(profiles?.imageUrl);
    }
  }, [image]);

  return (
    <StProfileEditHeader>
      <StProfilePic
        profileImg={profileImg}
        onError={(e) => (e.target.src = profiles?.resizedUrl)}
      >
        <label htmlFor="picture">
          <img src={editIcon} alt="프로필 이미지 수정" />
        </label>
      </StProfilePic>
      <input
        type="file"
        id="picture"
        {...register("imageValue")}
        accept="image/*"
      />
    </StProfileEditHeader>
  );
};

export default ProfileEditHeader;

const StProfileEditHeader = styled.div`
  padding: 1rem 0 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &::before {
    content: "";
    width: 100%;
    height: 1rem;

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
`;

const StProfilePic = styled.div`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  border: 1px solid #eee;

  position: relative;

  background: #eee url(${(props) => props.profileImg}) no-repeat center / cover;

  img {
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;
