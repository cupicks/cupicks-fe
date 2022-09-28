// 테스트 코드로 사용할 수 없는 코드의 예시

/**
 * createdAt의 형태: 2022-09-27T04:37:21.000Z
 * @param {Date} createdAt
 * @returns
 */
export const getTimegap = (createdAt) => {
  const myDate = new Date(createdAt);
  const result = myDate.getTime();
  const msdiff = Date.now() - result;
  const seconds = msdiff / 1000;

  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;

  return `${Math.floor(years)}년 전`;
};
