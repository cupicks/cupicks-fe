/** 입력 숫자를 단위로 자르기 */
const cutNumberByLength = (e) =>{
  let value = String(e.target.value)
  let result = value.length > 3 ? Number(value.slice(0, 3)) : Number(value);

  return result;
}

/** 숫자 정수로 */
const numberInteger = (value) => {
  value = String(value)
  while(value.indexOf(".") !== -1){
    value = +value.split('.').join('')
  }
  return value;
}

export { cutNumberByLength, numberInteger }