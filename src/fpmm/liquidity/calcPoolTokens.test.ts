/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";

import { calcPoolTokens } from "./calcPoolTokens";

describe("calcPoolTokens", () => {
  it("should return addedFunds if poolShares are zero", () =>
    expect(calcPoolTokens(20, [1, 2, 3], 0)).toStrictEqual(BigNumber.from(20)));

  it("should return funds*supply/poolWeight", () =>
    expect(calcPoolTokens(20, [1, 2, 3], 2)).toStrictEqual(BigNumber.from(13)));
});
