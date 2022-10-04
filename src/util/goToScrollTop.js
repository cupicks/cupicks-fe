/**
 * scrollTopToRef은 스크롤이 이동할 위치의 ref,
 * scrollElement은 스크롤이 일어나는 컴포넌트 영역의 ref입니다.
 * @param {ref} scrollElement
 * @param {ref} scrollTopToRef
 */
const gotoScrollTop = (scrollElement, scrollTopToRef) => {
  let targetScrollTop = 0;
  if (scrollTopToRef) {
    targetScrollTop = scrollTopToRef.current.offsetTop + 10;
  }
  scrollElement.current.scrollTo({
    top: targetScrollTop,
    behavior: "smooth",
  });
};

export { gotoScrollTop };
