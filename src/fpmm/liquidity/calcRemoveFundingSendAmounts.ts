import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";

/**
 * Compute the number of outcome tokens that will be sent to the user by the Market Maker
 * after removing `removedFunds` of pool shares.
 * @param removedFunds - the amount of liquidity pool tokens being sent to the market maker in return for underlying outcome tokens
 * @param poolBalances - the market maker's balances of outcome tokens
 * @param poolShareSupply - the total supply of liquidity pool tokens
 */
export const calcRemoveFundingSendAmounts = (
  removedFunds: BigNumberish,
  poolBalances: BigNumberish[],
  poolShareSupply: BigNumberish,
): BigNumber[] => {
  const sendAmounts = poolBalances.map(h =>
    BigNumber.from(poolShareSupply).gt(0)
      ? BigNumber.from(h)
          .mul(removedFunds)
          .div(poolShareSupply)
      : Zero,
  );
  return sendAmounts;
};
