import { ChainId, CurrencyAmount, ETHER, JSBI } from 'flashliquidity-sdk'
import { MIN_ETH } from '../constants'

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(
  chainId?: ChainId,
  currencyAmount?: CurrencyAmount
): CurrencyAmount | undefined {
  if (!currencyAmount) return undefined
  if (currencyAmount.currency === ETHER[chainId!]) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_ETH)) {
      return CurrencyAmount.ether(
        JSBI.subtract(currencyAmount.raw, MIN_ETH),
        chainId!
      )
    } else {
      return CurrencyAmount.ether(JSBI.BigInt(0), chainId!)
    }
  }
  return currencyAmount
}
