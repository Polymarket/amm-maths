/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { calcAddFundingSendAmounts } from "./calcAddFundingSendAmounts";

describe("calcAddFundingSendAmounts", () => {
  it("all holdings are different", () => {
    const result = calcAddFundingSendAmounts(10, [1, 2, 3]);

    expect(result).toStrictEqual([7, 4, 0].map(BigNumber.from));
  });

  it("all holdings are equal", () => {
    const result = calcAddFundingSendAmounts(10, [3, 3, 3]);

    expect(result).toStrictEqual([Zero, Zero, Zero]);
  });
});
