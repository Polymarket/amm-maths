/* eslint-env jest */
import { BigNumber } from "@ethersproject/bignumber";

import { calcSellAmountInCollateral } from "./calcSellAmountInCollateral";
import { divBN } from "../../utils";


const testCases: [[string, number, string[]], string][] = [
  [["669745046301742827", 0, ["502512562814070351", "2000000000000000000"]], "496532989893612286"],
  [["669745046301742827", 1, ["2000000000000000000", "502512562814070351"]], "496532989893612286"],

  [["365128583991411574", 0, ["1502512562814070351", "673378000740715800"]], "100000000000000000"],
  [["148526984259244846", 0, ["673378000740715800", "1502512562814070351"]], "99336468831519624"],
  [
    [
      "169611024591650211",
      2,
      ["1500000000000000000", "1500000000000000000", "299279122636316870", "1500000000000000000"],
    ],
    "99437054864518193",
  ],
  [
    ["18399816000000000000", 2, ["11009048601975904608", "17551468438676294710", "139733493703807763"]],
    "10381992534881175324",
  ],
  [["200000", 1, ["100000", "100000", "100000"]], "37815"],
];

describe("calcSellAmountInCollateral", () => {
  it.each(testCases)(`should compute the amount of collateral to sell`, ([sharesToSell, outcomeIndex, poolBalances], expected) => {
    const result = calcSellAmountInCollateral(
      BigNumber.from(sharesToSell),
      outcomeIndex,
      poolBalances.map(BigNumber.from),
      0.01,
    );

    expect(result).not.toBe(null);

    expect(divBN(result as BigNumber, BigNumber.from(expected))).toBeCloseTo(1);
  });
});

