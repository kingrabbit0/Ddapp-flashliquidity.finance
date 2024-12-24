import {
  ChainId,
  CurrencyAmount,
  JSBI,
  Token,
  TokenAmount,
  Pair
} from 'flashliquidity-sdk'
import { useMemo } from 'react'
import {
  UNI,
  USDC,
  ETHER,
  AAVE,
  LINK,
  FL_ETH_LINK,
  MATIC,
  FL_MATIC_USDC
} from '../../constants'
import { FL_USDC_ETH, FL_ETH_AAVE } from '../../constants'
import { STAKING_REWARDS_INTERFACE } from '../../constants/abis/staking-rewards1'
import { useActiveWeb3React } from '../../hooks'
import { NEVER_RELOAD, useMultipleContractSingleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/hooks'

export const STAKING_GENESIS = 1609516800

export const REWARDS_DURATION_DAYS = 14

// TODO add staking rewards addresses here
export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    index: number
    rewardToken: Token
    liquidToken: Token
  }[]
} = {
  [ChainId.MATIC]: [
    //TODO: MATIC
    {
      tokens: [MATIC, USDC],
      stakingRewardAddress: FL_MATIC_USDC.address,
      index: 0,
      rewardToken: MATIC,
      liquidToken: FL_MATIC_USDC
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [ETHER, LINK],
      stakingRewardAddress: FL_ETH_LINK.address,
      index: 0,
      rewardToken: LINK,
      liquidToken: FL_ETH_LINK
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [USDC, ETHER],
      stakingRewardAddress: FL_USDC_ETH.address,
      index: 0,
      rewardToken: ETHER,
      liquidToken: FL_USDC_ETH
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    },
    {
      tokens: [ETHER, AAVE],
      stakingRewardAddress: FL_ETH_AAVE.address,
      index: 0,
      rewardToken: AAVE,
      liquidToken: FL_ETH_AAVE
      //STAKINGREWARDSFACTORY- 0xce2944738CA9Ae803E692124F6Fa78C1cbE3a354
    }
  ]
}

export interface StakingInfo {
  // the address of the reward contract
  stakingRewardAddress: string
  // the tokens involved in this pair
  tokens: [Token, Token]
  // reward token
  rewardToken: Token
  // liquid token
  liquidToken: Token
  // the amount of token currently staked, or undefined if no account
  stakedAmount: TokenAmount
  // the amount of credits earned by the active account, or undefined if no account
  earnedAmount: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account
  earnedRewardAmount: TokenAmount
  // the total amount of token staked in the contract
  totalStakedAmount: TokenAmount
  // the amount of token distributed per second to all LPs, constant
  totalRewardRate: TokenAmount
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: TokenAmount
  // when the period ends

  index: number
  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: TokenAmount,
    totalStakedAmount: TokenAmount,
    totalRewardRate: TokenAmount
  ) => TokenAmount
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

  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'balanceOf',
    accountArg
  )
  const earnedAmounts = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'earned',
    accountArg
  )
  const totalSupplies = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'totalSupply'
  )
  const earnedRewardAmounts = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'earnedRewardToken',
    accountArg
  )

  // tokens per second, constants
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )

  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<StakingInfo[]>(
      (memo, rewardsAddress, index) => {
        // these two are dependent on account
        const balanceState = balances[index]
        const earnedAmountState = earnedAmounts[index]
        const earnedRewardAmountState = earnedRewardAmounts[index]

        // these get fetched regardless of account
        const totalSupplyState = totalSupplies[index]
        const rewardRateState = rewardRates[index]

        if (
          // these may be undefined if not logged in
          !balanceState?.loading &&
          !earnedAmountState?.loading &&
          !earnedRewardAmountState?.loading &&
          // always need these
          totalSupplyState &&
          !totalSupplyState.loading &&
          rewardRateState &&
          !rewardRateState.loading
        ) {
          if (
            balanceState?.error ||
            earnedAmountState?.error ||
            totalSupplyState.error ||
            rewardRateState.error
          ) {
            console.error('Failed to load staking rewards info')
            return memo
          }

          // get the LP token
          const tokens = info[index].tokens
          const rewardToken = info[index].rewardToken
          const dummyPair = new Pair(
            new TokenAmount(tokens[0], '0'),
            new TokenAmount(tokens[1], '0')
          )

          // check for account, if no account set to 0

          const stakedAmount = new TokenAmount(
            dummyPair.liquidityToken,
            JSBI.BigInt(balanceState?.result?.[0] ?? 0)
          )
          const totalStakedAmount = new TokenAmount(
            dummyPair.liquidityToken,
            JSBI.BigInt(totalSupplyState.result?.[0])
          )
          const totalRewardRate = new TokenAmount(
            uni,
            JSBI.BigInt(rewardRateState.result?.[0])
          )
          //const earnedRewardToken = new TokenAmount(rewardToken, JSBI.BigInt(earnedRewardAmountState.result?.[0]))

          const getHypotheticalRewardRate = (
            stakedAmount: TokenAmount,
            totalStakedAmount: TokenAmount,
            totalRewardRate: TokenAmount
          ): TokenAmount => {
            return new TokenAmount(
              uni,
              JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
                ? JSBI.divide(
                    JSBI.multiply(totalRewardRate.raw, stakedAmount.raw),
                    totalStakedAmount.raw
                  )
                : JSBI.BigInt(0)
            )
          }

          const individualRewardRate = getHypotheticalRewardRate(
            stakedAmount,
            totalStakedAmount,
            totalRewardRate
          )

          memo.push({
            stakingRewardAddress: rewardsAddress,
            tokens: info[index].tokens,
            index: info[index].index,
            rewardToken: info[index].rewardToken,
            liquidToken: info[index].liquidToken,
            earnedAmount: new TokenAmount(
              uni,
              JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)
            ),
            earnedRewardAmount: new TokenAmount(
              rewardToken,
              JSBI.BigInt(earnedRewardAmountState?.result?.[0] ?? 0)
            ),
            rewardRate: individualRewardRate,
            totalRewardRate: totalRewardRate,
            stakedAmount: stakedAmount,
            totalStakedAmount: totalStakedAmount,
            getHypotheticalRewardRate
          })
        }
        return memo
      },
      []
    )
  }, [
    balances,
    chainId,
    earnedAmounts,
    earnedRewardAmounts,
    info,
    rewardRates,
    rewardsAddresses,
    totalSupplies,
    uni
  ])
}

export function useTotalUniEarned(): TokenAmount | undefined {
  const { chainId } = useActiveWeb3React()
  const uni = chainId ? UNI[chainId] : undefined
  const stakingInfos = useStakingInfo()

  return useMemo(() => {
    if (!uni) return undefined
    return (
      stakingInfos?.reduce(
        (accumulator, stakingInfo) =>
          accumulator.add(stakingInfo.earnedRewardAmount),
        new TokenAmount(uni, '0')
      ) ?? new TokenAmount(uni, '0')
    )
  }, [stakingInfos, uni])
}

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
    chainId!,
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
    chainId!,
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
