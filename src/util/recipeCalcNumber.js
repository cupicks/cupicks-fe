/** 입력 숫자를 단위로 자르기 */
const cutNumberByLength = (e) =>{
  const value = String(e.target.value)
  const currValue = value.length > 3 ? Number(value.slice(0, 3)) : Number(value);

  return currValue;
}

/** 숫자를 양수 정수로 floor */
const numberPositiveInteger = (value) => {
  console.log(+value);
  console.log(+value);
  return Math.floor(Math.abs(+value));
}

export { cutNumberByLength, numberPositiveInteger }