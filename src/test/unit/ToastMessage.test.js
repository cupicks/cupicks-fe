import ToastMessage from "../../components/elements/modal/ToastMessage.jsx";

import {
  render,
  screen,
  cleanup,
  fireEvent,
  renderHook,
} from "@testing-library/react";
import renderer from "react-test-renderer";

afterEach(cleanup);

describe("ToastMessage component", () => {
  // **arrange**
  // props
  const propsText = "사용자가 입력하는 메시지";
  const propsTimer = 2000;
  // component
  const component = renderer.create(
    <ToastMessage
      text={propsText}
      timer={propsText}
      imageUrl="/image.png"
      backgroundShadow={false}
      smallFont={false}
      title="modal"
    />,
  );

  // **act**
  // 0. 가짜 타이머 만들기
  // 1. 가짜 state의 값을 변경하기
  //   - 최초 마운트 시, true값
  //   - timer만큼의 시간이 지난 후 false값으로 변경

  // jest.mock("state", () => ({
  //   useState: (initial) => [initial, mockSetState], // mockSetState
  // }));

  // **assert**
  it("ToastMessage가 render되었습니다.", () => {
    // 컴포넌트가 Document에 존재하고, 화면에 보임
    expect(component).toBeInTheDocument;
    expect(component).toBeVisible;
  });

  it("ToastMessage가 기존 스냅샷과 같습니다.", () => {
    expect(component).toMatchSnapshot();
  });

  it("ToastMessage의 modal이 화면에 보입니다.", () => {
    // 컴포넌트가 Document에 존재하고, 화면에 보임
    const modal = screen.findByTitle("modal");
    expect(modal).toBeInTheDocument;
    expect(modal).toBeTruthy;
    expect(modal).toBeVisible;
  });

  it("전달받은 메시지(text)가 화면에 출력됩니다.", () => {
    // 0. 텍스트가 화면에 존재하는가
    expect(propsText).toBeInTheDocument;
    // 1. 텍스트가 모달 안에 존재하는가
    const modal = screen.findByTestId("modal");
  });

  it("props로 전달받은 이미지(imageUrl)가 화면에 출력됩니다.", () => {
    // 0. img가 화면에 표시됨
    const imageElement = screen.findByRole("img");
    expect(imageElement).toBeInTheDocument;
    // 1. img src 출력에 에러가 없음
    // 2. img src에 버킷 주소가 포함됨

    // const { imageUrl } = component.props;
    // expect(imageElement.src).toMatch(imageUrl);
  });

  it("modalShow state이 true일 때, StModal 엘리먼트를 render합니다.", () => {
    // Mock state사용
    // 0. state값이 true입니다.
    // 1. stModal이 존재합니다.
    // const { result, renderer } = renderHook(({ modalShow } = {}) => modalShow, {
    //   initialProps: { modalShow: true, text: "토스트 메시지" },
    // });
    // expect(result.current).toEqual(false);
    // const modal = screen.findByRole("aside");
    // expect(modal).toBeInTheDocument;
  });

  it("modalShow값이 false일 때, StModal 엘리먼트를 render하지 않음", () => {
    // Mock state사용 jest.setTimeout / test(()=>{}, timer)사용
    // 0. 시간이 timer시간만큼 경과합니다.
    // 1. 시간이 timer시간만큼 경과한 후, state값이 false입니다.
    // 2. 시간이 timer시간만큼 경과한 후, stModal이 존재하지 않습니다.
    // const modal = document.querySelector(".contents");
    // expect(modal).toBeInTheDocument;
  });

  it("modalShow값이 timer시간 후 false로 바뀝니다.", () => {
    // Mock state사용 jest.setTimeout / test(()=>{}, timer)사용
    // 0. state값이 true입니다.
    // 1. 시간이 timer시간만큼 경과합니다.
    // 2. 시간이 timer시간만큼 경과한 후, state값이 false입니다.
  });
});
