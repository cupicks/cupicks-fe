import { getTimegap } from "../../../src/util/getTimegap";

describe("getTimegap", () => {
  it("getTimegap must be defined", () => {
    expect(getTimegap).toBeDefined();
  });
  it("getTimegap should return string", () => {
    const result = getTimegap("2022-09-27T04:37:21.000Z");
    expect(result).toEqual({});
  });
});
