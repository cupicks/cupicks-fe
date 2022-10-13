import { useRef, useState } from "react";
import styled from "styled-components";
import buttonIcon from "../../../assets/svg/cancel_modal.svg";

const ConfirmBox = (props) => {
  const {
    text = "",
    imageUrl = "",
    confirmButtonText = "",
    backgroundShadow = false,
    timer = 1000,
    onComfirmed,
    onDenied,
  } = props;
  const [modalShow, setModalShow] = useState(true);
  const modalContents = useRef();

  const backgroundColor = backgroundShadow ? "rgba(0, 0, 0, 0.3)" : "";

  return (
    <>
      {modalShow && (
        <StModal timer={timer * 0.001}>
          <StBackground
            backgroundColor={backgroundColor}
            onMouseDown={onDenied}
            onClick={() => {
              modalContents.current.className = "contents fade_out";
              setTimeout(() => {
                setModalShow(false);
              }, timer / 3);
            }}
          />

          <div className="contents" ref={modalContents}>
            <img
              className="button_close"
              src={buttonIcon}
              alt="닫기 버튼"
              onClick={onDenied}
            />

            {imageUrl && (
              <img
                className="illust"
                src={imageUrl}
                alt="일러스트레이션 이미지"
              />
            )}

            {text}

            <button type="button" onClick={onComfirmed}>
              {confirmButtonText}
            </button>
          </div>
        </StModal>
      )}
    </>
  );
};

export default ConfirmBox;

const StBackground = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;

  background-color: ${(props) => props.backgroundColor};
`;

const StModal = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;

  font-size: 1.8rem;
  font-weight: 600;
  line-height: 150%;
  text-align: center;

  .contents {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 2rem;

    width: 90%;
    max-width: 35rem;
    border-radius: 1.5rem;

    padding: 3.5rem 0 2.2rem;

    position: relative;
    transform: translateY(-60%);

    background-color: #fff;
    color: #393939;
    border: 0.1rem solid #393939;
    box-shadow: 0rem 0.4rem 2.6rem rgba(0, 0, 0, 0.25);

    font-size: 1.8rem;
    font-weight: 700;

    box-sizing: initial;
    white-space: pre-wrap;
  }

  .fade_out {
    opacity: 0;
    transition: opacity ${(props) => props.timer}s;
  }

  .button_close {
    position: absolute;
    top: 1.1rem;
    right: 1.5rem;

    cursor: pointer;
  }

  button {
    all: unset;
    padding: 0.8rem 6rem;

    background: #101010;
    color: #fff;
    border-radius: 1rem;

    cursor: pointer;
  }

  img.illust {
    width: 80%;
  }
`;
