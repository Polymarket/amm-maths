import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { calcRemoveFundingSendAmounts } from "./calcRemoveFundingSendAmounts";

export const calcPoolBalancesAfterRemoveFunding = (
  removedFunds: BigNumberish,
  initPoolBalances: BigNumberish[],
  poolShareSupply: BigNumberish,
): BigNumber[] => {
  const sendAmounts = calcRemoveFundingSendAmounts(removedFunds, initPoolBalances, poolShareSupply);

  const updatedPoolBalances = initPoolBalances.map((balance, i) => BigNumber.from(balance).sub(sendAmounts[i]));
  return updatedPoolBalances;
};
