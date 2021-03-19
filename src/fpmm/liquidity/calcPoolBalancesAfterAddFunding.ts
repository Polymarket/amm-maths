import { BigNumber } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";
import { calcAddFundingSendAmounts } from "./calcAddFundingSendAmounts";

export const calcPoolBalancesAfterAddFunding = (
  addedFunds: BigNumber,
  initPoolBalances: BigNumber[],
  poolShareSupply: BigNumber,
): BigNumber[] => {
  const sendAmounts = calcAddFundingSendAmounts(addedFunds, initPoolBalances, poolShareSupply);

  const updatedBalances = initPoolBalances.map((balance, i) =>
    balance.add(addedFunds).sub((sendAmounts && sendAmounts[i]) || Zero),
  );

  return updatedBalances;
};
