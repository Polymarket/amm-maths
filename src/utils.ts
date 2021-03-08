import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { Zero } from "@ethersproject/constants";

/**
 * Performs multiplication between a BigNumber and a decimal number while temporarily scaling the decimal to preserve precision
 * @param a - a BigNumber to multiply by b
 * @param b - a decimal by which to multiple a by.
 * @param scale - the factor by which to scale the numerator by before division
 */
export const mulBN = (a: BigNumberish, b: number, scale = 10000): BigNumber => {
  return BigNumber.from(a)
    .mul(Math.round(b * scale))
    .div(scale);
};

/**
 * Performs division between two BigNumbers while temporarily scaling the numerator to preserve precision
 * @param a - the numerator
 * @param b - the denominator
 * @param scale - the factor by which to scale the numerator by before division
 */
export const divBN = (a: BigNumberish, b: BigNumberish, scale = 10000): number => {
  return (
    BigNumber.from(a)
      .mul(scale)
      .div(b)
      .toNumber() / scale
  );
};

/**
 * Peforms ceil(numerator/denominator)
 * @param a - the numerator
 * @param b - the denominator
 */
export const ceilDiv = (a: BigNumber, b: BigNumber): BigNumber => {
  return a.mod(b) === Zero ? a.div(b) : a.div(b).add(1);
};
