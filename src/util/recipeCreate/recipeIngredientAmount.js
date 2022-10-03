/**
 * 재료가 1개여도 배열 형태로 반환
 * @param {array | object} getIngredientValues
 * @returns { array } 재료 배열
 */
const getIngredientArray = (getIngredientValues) => {
  let ingredientList = getIngredientValues;

  if (ingredientList.length === 1) {
    ingredientList = [ingredientList];
  }

  return ingredientList;
};

/**
 * 현재 음료 타입이 ice이면 cupSize에서 200을 제외합니다.
 * @param {355 | 473 | 591} cupSize
 * @param {Boolean} isIcedTag
 * @returns {number} 얼음을 뺀 음료량
 */
const exceptIceAmount = (cupSize, isIcedTag) => {
  if (isIcedTag) cupSize -= 200;
  return cupSize;
};

/**
 * ingredientValuesArray는 각 재료 object의 배열
 * cupSize 음료의 총량
 * @param {array} ingredientValuesArray
 * @param {number} cupSize
 * @returns {number} 입력할 수 있는 최대number인 maxAmount를 리턴
 */
const calcMaxAmount = (ingredientValuesArray, cupSize) => {
  // 마지막 재료 없으면 maxAmount = 컵 사이즈
  let lastIndex = ingredientValuesArray.length - 1;
  if (lastIndex < 0) return cupSize;

  let prevSum = 0;

  ingredientValuesArray.map((list, i) => {
    if (list?.ingredientAmount && i !== lastIndex) {
      prevSum += +list?.ingredientAmount;
    }
  });

  const maxAmount = cupSize - prevSum;
  console.log(maxAmount, cupSize, prevSum);
  return maxAmount;
};

/**
 * maxAmount의 형태: number(range의 max에 입력하는 재료량의 최대치)
 * cupFull: boolean형태의 state hook
 * setCupState: 커스텀 훅 정의하는 함수
 * setValue: react hook form 훅을 정의하는 함수
 * @param {number} maxAmount
 * @param {boolean} cupFull
 * @param {function} setCupState
 * @param {function} setValue
 * @returns "함수 동작 결과"
 */
const setMaxAmountAndCupFullState = (maxAmount, cupFull, setCupState) => {
  console.log("hi");

  if (maxAmount === 0 && !cupFull) {
    setCupState((prev) => ({ ...prev, cupFull: true }));
    return "재료가 다 찼습니다.";
  } else if (maxAmount !== 0 && cupFull) {
    setCupState((prev) => ({ ...prev, cupFull: false, maxAmount: maxAmount }));
    return "재료가 다 차지 않았습니다. 재료 최대량이 변경되었습니다.";
  }

  setCupState((prev) => ({ ...prev, maxAmount: maxAmount }));
  return "재료 최대량이 변경되었습니다.";
};

/**
 * maxAmount: number(range의 max에 입력하는 재료량의 최대치)
 * @param {number 0~591} maxAmount
 * @param {object} setCupState
 * @param {boolean} cupFull
 * @returns number
 */
const setMaxAmountState = (maxAmount, setCupState, cupFull) => {
  if (maxAmount === 0 && !cupFull) {
    setCupState((prev) => ({ ...prev, cupFull: true }));
    return "재료가 다 찼습니다.";
  } else if (maxAmount !== 0 && cupFull) {
    setCupState((prev) => ({ ...prev, cupFull: false, maxAmount: maxAmount }));
    return "재료가 다 차지 않았습니다. 재료 최대량이 변경되었습니다.";
  }

  setCupState((prev) => ({ ...prev, maxAmount: maxAmount }));
  return "재료 최대량이 변경되었습니다.";
};

export {
  getIngredientArray,
  exceptIceAmount,
  calcMaxAmount,
  setMaxAmountAndCupFullState,
  setMaxAmountState,
};

// module.exports = {
//   getIngredientArray,
//   exceptIceAmount,
//   calcMaxAmount,
//   setMaxAmountAndCupFullState,
//   setMaxAmountState,
// };
