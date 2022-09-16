import React from "react";

import styled from "styled-components";

import profile from "../../assets/svg/profile.svg";

const Image = (props) => {
  const { register, errors, watch, getValues } = props;
  const [imagePreview, setImagePreview] = React.useState("");

  const image = watch("image");

  React.useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
    console.log(image);
  }, [image]);

  return (
    <StDiv>
      <label>프로필 이미지</label>
      {imagePreview === "" ? (
        <StImg src={profile} alt="프로필 이미지" />
      ) : (
        <StImg src={imagePreview} />
      )}
      <input
        type="file"
        id="picture"
        {...register("image", { required: true })}
        accept="image/*"
        hidden='hidden'
      />
      {/* {errors.image && <p>이미지를 추가해 주세요</p>} */}
      <StLabelButton>
        <StLabel htmlFor="picture">사진 선택</StLabel>
      </StLabelButton>
    </StDiv>
  );
};

export default Image;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;

  input[type="file"]{
    display: none;
  }
`;

const StImg = styled.img`
  width: 130px;
  height: 130px;

  margin: 30px auto 40px;
  border-radius: 50%;
`;

const StLabelButton = styled.div`
  all: unset;
  height: 55px;
  border-radius: 10px;

  display: flex;
  align-items: center;

  background-color: var(--button-activeBackgroundColor);
  border: 2px solid var(--button-activeBorderColor);

  color: #ffffff;
  
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  
  transition: all 0.2s;
  box-sizing: border-box;

  cursor: pointer;
  overflow: hidden;
  
  :hover {
    color: #ffffff;
    background-color: #333333;
    border-color: #333333;
  }
  :disabled {
    pointer-events: none;
  }
  /* width: 100%;
  height: 60px;
  border: 3px solid #eee;
  border-radius: 10px;
  text-align: center;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: -200px;
  :hover {
    border-color: #000;
  } */
`;

const StLabel = styled.label`
  width: 100%;
  line-height: 55px;

  font-size: 18px;

  cursor: pointer;

  :hover {
    color: #fff;
  }
`;
