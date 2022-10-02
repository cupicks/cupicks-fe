/**
 * scrollTopToRef은 스크롤이 이동할 위치의 ref,
 * scrollElement은 스크롤이 일어나는 컴포넌트 영역의 ref입니다.
 * @param {ref} scrollTopToRef
 * @param {ref} scrollElement
 */
const gotoScrollTop = (scrollTopToRef, scrollElement) => {
  const targetScrollTop = scrollTopToRef.current.offsetTop;

  scrollElement.current.scrollTo({
    top: targetScrollTop + 10,
    behavior: "smooth",
  });
};

export { gotoScrollTop };
