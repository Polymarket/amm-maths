/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";

import {
  calcPoolTokens,
} from "./calcPoolTokens";

describe("calcPoolTokens", () => {
  it("should return addedFunds if poolShares are zero", () =>
    expect(calcPoolTokens(BigNumber.from(20), [1, 2, 3].map(BigNumber.from), Zero)).toStrictEqual(
      BigNumber.from(20),
    ));

  it("should return funds*supply/poolWeight", () =>
    expect(calcPoolTokens(BigNumber.from(20), [1, 2, 3].map(BigNumber.from), BigNumber.from(2))).toStrictEqual(
      BigNumber.from(13),
    ));
});

