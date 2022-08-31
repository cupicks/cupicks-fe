import React from "react";

import styled from "styled-components";

const Image = (props) => {
  const { register, errors, watch } = props;
  const [imagePreview, setImagePreview] = React.useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const image = watch("image");

  React.useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [image]);

  return (
    <StDiv>
      <label>프로필 이미지</label>
      <StImg src={imagePreview} />
      <input
        type="file"
        id="picture"
        {...register("image")}
        accept="image/*"
        style={{ display: "none" }}
      />
      {errors.image && <p>이미지를 추가해 주세요</p>}
      <div className="labelButton">
        <label htmlFor="picture">사진 선택</label>
      </div>
    </StDiv>
  );
};

export default Image;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  & .labelButton {
    width: 100px;
    height: 30px;
    border: 1px solid red;
    border-radius: 5px;
    text-align: center;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    & label {
      cursor: pointer;
      width: 100%;
      height: 100%;
    }
  }
`;
const StImg = styled.img`
  width: 150px;
  height: 150px;
  margin: 20px;
  border-radius: 50%;
`;
