import {
  ChainId,
  CurrencyAmount,
  JSBI,
  Token,
  TokenAmount,
  Pair
} from 'flashliquidity-sdk'
import { useMemo } from 'react'
import { UNI, SBP_ETH_USDC, ETHER_ARB, USDC_MULTI } from '../../constants'
import { SBP_VAULT_INTERFACE } from '../../constants/abis/sbp-vault'
import { useActiveWeb3React } from '../../hooks'
import {
  useMultipleContractMultipleData,
  useMultipleContractSingleData
} from '../multicall/hooks'
import { tryParseAmount } from '../swap/hooks'
import ERC20_INTERFACE from '../../constants/abis/erc20'

export const STAKING_GENESIS = 1609516800
export const REWARDS_DURATION_DAYS = 14

export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    index: number
    pair: string
    liquidToken: Token
  }[]
} = {
  [ChainId.ARBITRUM]: [
    {
      tokens: [ETHER_ARB, USDC_MULTI[ChainId.ARBITRUM]],
      stakingRewardAddress: SBP_ETH_USDC.address,
      index: 0,
      pair: '0xde67c936d87455a77baef8ab7e6c26eb3d828735',
      liquidToken: SBP_ETH_USDC
    }
  ]
}

export interface StakingInfo {
  stakingRewardAddress: string
  tokens: [Token, Token]
  pair: string
  vaultToken: Token
  lpUserBalance: TokenAmount
  lpStakedBalance: TokenAmount
  lpUserStakedBalance: TokenAmount
  vtUserBalance: TokenAmount
  vtTotalSupply: TokenAmount
  index: number
}

// gets the staking info from the network for the active chain id
export function useStakingInfo(pairToFilterBy?: Pair | null): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React()

  const info = useMemo(
    () =>
      chainId
        ? STAKING_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
            pairToFilterBy === undefined
              ? true
              : pairToFilterBy === null
                ? false
                : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
                  pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
          ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(
    () => info.map(({ stakingRewardAddress }) => stakingRewardAddress),
    [info]
  )

  const pairAddresses = useMemo(() => info.map(({ pair }) => pair), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])

  const vtBalances = useMultipleContractSingleData(
    rewardsAddresses,
    SBP_VAULT_INTERFACE,
    'balanceOf',
    accountArg
  )

  const vtTotalSupplies = useMultipleContractSingleData(
    rewardsAddresses,
    SBP_VAULT_INTERFACE,
    'totalSupply'
  )

  const lpUserBalances = useMultipleContractSingleData(
    rewardsAddresses,
    ERC20_INTERFACE,
    'balanceOf',
    accountArg
  )

  const lpStakedBalances = useMultipleContractMultipleData(
    pairAddresses,
    ERC20_INTERFACE,
    'balanceOf',
    rewardsAddresses.map(address => [address])
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<StakingInfo[]>(
      (memo, rewardsAddress, index) => {
        const balanceState = vtBalances[index]
        const totalSupplyState = vtTotalSupplies[index]
        const lpStakedBalanceState = lpStakedBalances[index]
        const lpUserBalanceState = lpUserBalances[index]
        if (
          balanceState &&
          !balanceState.loading &&
          totalSupplyState &&
          !totalSupplyState.loading &&
          lpStakedBalanceState &&
          !lpStakedBalanceState.loading &&
          lpUserBalanceState &&
          !lpUserBalanceState.loading
        ) {
          if (
            balanceState.error ||
            totalSupplyState.error ||
            lpStakedBalanceState.error ||
            lpUserBalanceState.error
          ) {
            console.error('Failed to load staking rewards info')
            return memo
          }

          const tokens = info[index].tokens
          const dummyPair = new Pair(
            new TokenAmount(tokens[0], '0'),
            new TokenAmount(tokens[1], '0')
          )

          const stakedAmount = new TokenAmount(
            dummyPair.liquidityToken,
            JSBI.BigInt(balanceState.result?.[0] ?? 0)
          )
          const totalStakedAmount = new TokenAmount(
            dummyPair.liquidityToken,
            JSBI.BigInt(totalSupplyState.result?.[0])
          )
          const lpStakedBalance = new TokenAmount(
            dummyPair.liquidityToken,
            JSBI.BigInt(lpStakedBalanceState.result?.[0])
          )
          const lpUserBalance = new TokenAmount(
            dummyPair.liquidityToken,
            JSBI.BigInt(lpUserBalanceState.result?.[0])
          )
          const lpUserStakedBalance = new TokenAmount(
            dummyPair.liquidityToken,
            JSBI.BigInt(
              (
                (balanceState.result?.[0] * lpStakedBalanceState.result?.[0]) /
                totalSupplyState.result?.[0]
              ).toFixed()
            )
          )

          memo.push({
            stakingRewardAddress: rewardsAddress,
            tokens: info[index].tokens,
            index: info[index].index,
            pair: info[index].pair,
            vaultToken: info[index].liquidToken,
            lpUserBalance: lpUserBalance,
            lpStakedBalance: lpStakedBalance,
            lpUserStakedBalance: lpUserStakedBalance,
            vtUserBalance: stakedAmount,
            vtTotalSupply: totalStakedAmount
          })
        }
        return memo
      },
      []
    )
  }, [
    chainId,
    uni,
    rewardsAddresses,
    vtBalances,
    vtTotalSupplies,
    lpStakedBalances,
    lpUserBalances,
    info
  ])
}

/* export function useTotalUniEarned(): TokenAmount | undefined {
  const { chainId } = useActiveWeb3React()
  const uni = chainId ? UNI[chainId] : undefined
  const stakingInfos = useStakingInfo()

  return useMemo(() => {
    if (!uni) return undefined
    return (
      stakingInfos?.reduce(
        (accumulator, stakingInfo) => accumulator.add(stakingInfo.earnedRewardAmount),
        new TokenAmount(uni, '0')
      ) ?? new TokenAmount(uni, '0')
    )
  }, [stakingInfos, uni])
} */

// based on typed value
export function useDerivedStakeInfo(
  typedValue: string,
  stakingToken: Token,
  userLiquidityUnstaked: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account, chainId } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(
    chainId,
    typedValue,
    stakingToken
  )

  const parsedAmount =
    parsedInput &&
    userLiquidityUnstaked &&
    JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}

// based on typed value
export function useDerivedUnstakeInfo(
  typedValue: string,
  stakingAmount: TokenAmount
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account, chainId } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(
    chainId,
    typedValue,
    stakingAmount.token
  )

  const parsedAmount =
    parsedInput && JSBI.lessThanOrEqual(parsedInput.raw, stakingAmount.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}
