import { render } from "@testing-library/react";
import renderer from "react-test-renderer";

// 테스트 코드: 최종 발표 이후 다시 진행!!

// 부모 컴포넌트
// import RecipeIngredient from "../element/RecipeIngredient.jsx";

// 자식 컴포넌트
// RecipeIngredientColorLists > RecipeIngredientColorList
// import RecipeIngredientNumber from "../../components/recipeCreate/element/RecipeIngredientNumber";

// src/util
// import * as dependency from "../../../util/recipeCreate/recipeIngredientAmount.js";

// const {
//   getIngredientArray,
//   exceptIceAmount,
//   calcMaxAmount,
//   setMaxAmountAndCupFullState,
//   setMaxAmountState,
// } = dependency;

describe("getIngredientArray", () => {
  it("get ingredientLists as array", () => {
    // getIngredientArray: 입력값의 형태 {} | [] 와 상관없이 배열을 return합니다.
    expect(1).toBe(1);
  });
});

// describe("exceptIceAmount", () => {
//   // 아이스 음료
// });

// describe("calcMaxAmount", () => {
//   // 최대 입력 수치 계산
// });

// describe("setMaxAmountState", () => {
//   // 다음에 입력가능한 최대값을 state에 저장
// });

// describe("setMaxAmountAndCupFullState", () => {
//   // 음료량이 최대일 때, state변경
// });
