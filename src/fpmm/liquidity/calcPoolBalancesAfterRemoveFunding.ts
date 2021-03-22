import { BigNumber } from "@ethersproject/bignumber";
import { calcRemoveFundingSendAmounts } from "./calcRemoveFundingSendAmounts";

export const calcPoolBalancesAfterRemoveFunding = (
  removedFunds: BigNumber,
  initPoolBalances: BigNumber[],
  poolShareSupply: BigNumber,
): BigNumber[] => {
  const sendAmounts = calcRemoveFundingSendAmounts(removedFunds, initPoolBalances, poolShareSupply);

  const updatedPoolBalances = initPoolBalances.map((balance, i) => balance.sub(sendAmounts[i]));
  return updatedPoolBalances;
};
