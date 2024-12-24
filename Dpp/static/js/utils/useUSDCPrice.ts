import {
  ChainId,
  Currency,
  currencyEquals,
  JSBI,
  Price,
  WETH
} from 'flashliquidity-sdk'
import { useMemo } from 'react'
import { USDC_MULTI } from '../constants'
import { PairState, usePairs } from '../data/Reserves'
import { useActiveWeb3React } from '../hooks'
import { wrappedCurrency } from './wrappedCurrency'

/**
 * Returns the price in USDC of the input currency
 * @param currency currency to compute the USDC price of
 */
export default function useUSDCPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [
        chainId && wrapped && currencyEquals(WETH[chainId], wrapped)
          ? undefined
          : currency,
        chainId ? WETH[chainId] : undefined
      ],
      [
        wrapped?.equals(USDC_MULTI[chainId!]) ? undefined : wrapped,
        chainId === ChainId.MATIC ||
        chainId === ChainId.ZKEVM ||
        chainId === ChainId.AVALANCHE ||
        chainId === ChainId.ARBITRUM
          ? USDC_MULTI[chainId]
          : undefined
      ],
      [
        chainId ? WETH[chainId] : undefined,
        chainId === ChainId.MATIC ||
        chainId === ChainId.ZKEVM ||
        chainId === ChainId.AVALANCHE ||
        chainId === ChainId.ARBITRUM
          ? USDC_MULTI[chainId]
          : undefined
      ]
    ],
    [chainId, currency, wrapped]
  )
  const [
    [ethPairState, ethPair],
    [usdcPairState, usdcPair],
    [usdcEthPairState, usdcEthPair]
  ] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle weth/eth
    if (wrapped.equals(WETH[chainId])) {
      if (usdcPair) {
        const price = usdcPair.priceOf(WETH[chainId])
        return new Price(
          currency,
          USDC_MULTI[chainId!],
          price.denominator,
          price.numerator
        )
      } else {
        return undefined
      }
    }
    // handle usdc
    if (wrapped.equals(USDC_MULTI[chainId!])) {
      return new Price(USDC_MULTI[chainId!], USDC_MULTI[chainId!], '1', '1')
    }
    const ethPairETHAmount = ethPair?.reserveOf(WETH[chainId])
    const ethPairETHUSDCValue: JSBI =
      ethPairETHAmount && usdcEthPair
        ? usdcEthPair.priceOf(WETH[chainId]).quote(ethPairETHAmount, chainId!)
            .raw
        : JSBI.BigInt(0)

    // all other tokens
    // first try the usdc pair
    if (
      usdcPairState in [PairState.EXISTS, PairState.LOCKED] &&
      usdcPair &&
      usdcPair.reserveOf(USDC_MULTI[chainId!]).greaterThan(ethPairETHUSDCValue)
    ) {
      const price = usdcPair.priceOf(wrapped)
      return new Price(
        currency,
        USDC_MULTI[chainId!],
        price.denominator,
        price.numerator
      )
    }
    if (
      (ethPairState === PairState.EXISTS ||
        ethPairState === PairState.LOCKED) &&
      ethPair &&
      (usdcEthPairState === PairState.EXISTS ||
        usdcEthPairState === PairState.LOCKED) &&
      usdcEthPair
    ) {
      if (
        usdcEthPair.reserveOf(USDC_MULTI[chainId!]).greaterThan('0') &&
        ethPair.reserveOf(WETH[chainId]).greaterThan('0')
      ) {
        const ethUsdcPrice = usdcEthPair.priceOf(USDC_MULTI[chainId!])
        const currencyEthPrice = ethPair.priceOf(WETH[chainId])
        const usdcPrice = ethUsdcPrice.multiply(currencyEthPrice).invert()
        return new Price(
          currency,
          USDC_MULTI[chainId!],
          usdcPrice.denominator,
          usdcPrice.numerator
        )
      }
    }
    return undefined
  }, [
    chainId,
    currency,
    ethPair,
    ethPairState,
    usdcEthPair,
    usdcEthPairState,
    usdcPair,
    usdcPairState,
    wrapped
  ])
}
