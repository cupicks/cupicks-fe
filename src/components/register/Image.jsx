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
        {...register("image", { required: true })}
        accept="image/*"
        hidden
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
`;
const StImg = styled.img`
  width: 250px;
  height: 250px;

  margin: 50px auto;
  border-radius: 50%;
`;
const StLabelButton = styled.div`
  width: 100%;
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
  }
`;
const StLabel = styled.label`
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  font-size: 18px;
  color: #a3a2a2;
  :hover {
    background-color: #000;
    color: #fff;
  }
`;
