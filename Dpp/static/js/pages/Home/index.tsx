import React, { useCallback, useMemo, useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { TYPE, StyledInternalLink } from '../../theme'
import { RowBetween } from '../../components/Row'
import {
  toV2LiquidityToken,
  useDarkModeManager,
  useTrackedTokenPairs
} from '../../state/user/hooks'
import { CardSection, DataCard } from '../../components/earn1/styled'
import { Repeat, Droplet, TrendingUp } from 'react-feather'
import { ButtonSecondary } from '../../components/Button'
import QuestionHelper from '../../components/QuestionHelper'
import { Dots } from '../Pool/styleds'
import { NETWORK_DETAIL } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { transparentize } from 'polished'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs } from '../../data/Reserves'
import { Pair } from 'flashliquidity-sdk'
import { MicroPositionCard } from '../../components/PositionCard'
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake1/hooks'
import { MicroPoolCard } from '../../components/earn1/PoolCard'

const PageWrapper = styled(AutoColumn)``

const TopSection = styled(AutoColumn)`
  margin-top: 24px;
  max-width: 640px;
  width: 100%;
`

const BottomSection = styled(AutoColumn)`
  max-width: 480px;
  width: 100%;
`

const VoteCard = styled(DataCard)`
  background: ${({ theme }) => transparentize(0.35, theme.bg1)};
  overflow: hidden;
`

const PoolDataNoBorder = styled(DataCard)`
  background: transparent;
  border: none;
  padding: 1rem;
  z-index: 1;
`

const BadgeData = styled(DataCard)`
  background: none;
  border: none;
  padding: 1rem;
`

const DataRow = styled(RowBetween)`
  justify-content: center;
  gap: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    gap: 12px;
  `};
`

export function addDotsToNumber(num: string) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function Home() {
  const { account, chainId } = useActiveWeb3React()
  const [darkMode] = useDarkModeManager()
  const [totalLiquidity, setTotalLiquidity] = useState(0)
  const [lastChainId, setLastChainId] = useState(0)
  const [networkFetched] = useState(0)
  const [allNetworks] = useState(0)

  //const isChainChanged = lastChainId !== chainId
  const badgeAutomation = darkMode
    ? 'https://chain.link/badge-automation-black'
    : 'https://chain.link/badge-automation-white'
  const badgeFeed = darkMode
    ? 'https://chain.link/badge-market-data-black'
    : 'https://chain.link/badge-market-data-white'

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () =>
      trackedTokenPairs.map(tokens => ({
        liquidityToken: toV2LiquidityToken(tokens),
        tokens
      })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens]
  )
  const [v2PairsBalances, fetchingV2PairBalances] =
    useTokenBalancesWithLoadingIndicator(account ?? undefined, liquidityTokens)

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(
    liquidityTokensWithBalances.map(({ tokens }) => tokens)
  )
  const v2IsLoading =
    fetchingV2PairBalances ||
    v2Pairs?.length < liquidityTokensWithBalances.length ||
    v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs
    .map(([, pair]) => pair)
    .filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const handleLiquidityValueChange = useCallback((value: number) => {
    setTotalLiquidity(prevTotal => prevTotal + value)
  }, [])

  const stakingInfos = useStakingInfo()

  const countStakingOnSBPVaults = stakingInfos.filter(info =>
    info.lpUserStakedBalance.greaterThan(BigInt(0))
  ).length

  // Reset totalLiquidity whenever allV2PairsWithLiquidity changes
  useMemo(() => {
    if (lastChainId != chainId) {
      setTotalLiquidity(0)
      setLastChainId(chainId!)
    }
  }, [chainId, lastChainId])

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <VoteCard>
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.body fontWeight={600}>FlashLiquidity</TYPE.body>
              </RowBetween>
              <RowBetween>
                <TYPE.body fontSize={14}>
                  Decentralized exchange and aggregator featuring self-balancing
                  pools, where both token swap fees and profits from rebalancing
                  automation are distributed to liquidity providers.
                </TYPE.body>
              </RowBetween>
            </AutoColumn>
          </CardSection>
        </VoteCard>
        <VoteCard>
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.body fontWeight={600}>Quickstart:</TYPE.body>
                <QuestionHelper
                  text={
                    'Self balancing pools leverage Chainlink Automation and Data Streams (or Price feeds) to perform rebalancing operations without requiring a centralized automation stack!'
                  }
                />
              </RowBetween>
              <TYPE.body fontSize={14} fontWeight={100}>
                Swap tokens, add liquidity to your favorite pool, and stake the
                LP tokens to earn arbitrage profits from rebalancing operations.
              </TYPE.body>
            </AutoColumn>
          </CardSection>
          <RowBetween>
            <PoolDataNoBorder>
              <AutoColumn gap="md">
                <StyledInternalLink to={`/swap`}>
                  <ButtonSecondary padding="4px" borderRadius="2px">
                    <Repeat />
                    Swap
                  </ButtonSecondary>
                </StyledInternalLink>
              </AutoColumn>
            </PoolDataNoBorder>
            <PoolDataNoBorder>
              <AutoColumn gap="md">
                <StyledInternalLink to={`/pool`}>
                  <ButtonSecondary padding="4px" borderRadius="2px">
                    <Droplet />
                    Pool
                  </ButtonSecondary>
                </StyledInternalLink>
              </AutoColumn>
            </PoolDataNoBorder>
            <PoolDataNoBorder>
              <AutoColumn gap="md">
                <StyledInternalLink to={`/selfbalancing`}>
                  <ButtonSecondary padding="4px" borderRadius="2px">
                    <TrendingUp />
                    Earn
                  </ButtonSecondary>
                </StyledInternalLink>
              </AutoColumn>
            </PoolDataNoBorder>
          </RowBetween>
        </VoteCard>
        <VoteCard>
          <CardSection>
            <AutoColumn gap="lg">
              <TYPE.body
                fontSize={18}
                marginBottom={'48px'}
                fontWeight={400}
                style={{ margin: 0 }}
              >
                Dashboard
              </TYPE.body>
              {account ? (
                <AutoColumn>
                  <TYPE.body fontSize={16} fontWeight={400}>
                    {`Your liquidity value on ${NETWORK_DETAIL[chainId || 137].chainName}: `}
                    {!v2IsLoading ? (
                      ` $ ${addDotsToNumber(Number(totalLiquidity).toFixed(0))}`
                    ) : (
                      <Dots />
                    )}
                  </TYPE.body>
                  {countStakingOnSBPVaults > 0 && (
                    <TYPE.body marginTop={'12px'} marginBottom={'8px'}>
                      {' '}
                      Your SBP tokens:{' '}
                    </TYPE.body>
                  )}
                  {stakingInfos.length == 0 &&
                  STAKING_REWARDS_INFO[chainId!] &&
                  STAKING_REWARDS_INFO[chainId!]!.length > 0 ? (
                    <TYPE.body marginTop="12px" textAlign="center">
                      <Dots>Loading SBP vaults</Dots>
                    </TYPE.body>
                  ) : stakingInfos?.length > 0 ? (
                    stakingInfos.map(info =>
                      info.lpUserStakedBalance.greaterThan(BigInt(0)) ? (
                        <MicroPoolCard
                          key={info.index}
                          stakingInfo={info} // Pass the callback here
                          onLiquidityValueChange={handleLiquidityValueChange}
                        />
                      ) : null
                    )
                  ) : null}
                  {!v2IsLoading && allV2PairsWithLiquidity?.length > 0 && (
                    <TYPE.body marginTop={'12px'} marginBottom={'8px'}>
                      {' '}
                      Your LPs:{' '}
                    </TYPE.body>
                  )}
                  {v2IsLoading ? (
                    <TYPE.body marginTop="12px" textAlign="center">
                      <Dots>Loading LPs</Dots>
                    </TYPE.body>
                  ) : allV2PairsWithLiquidity?.length > 0 ? (
                    allV2PairsWithLiquidity.map(v2Pair => (
                      <MicroPositionCard
                        key={v2Pair.liquidityToken.address}
                        pair={v2Pair}
                        onLiquidityValueChange={handleLiquidityValueChange} // Pass the callback here
                      />
                    ))
                  ) : null}
                </AutoColumn>
              ) : (
                <TYPE.body marginBottom={'24px'} textAlign="center">
                  Connect wallet to view your stats.
                </TYPE.body>
              )}
            </AutoColumn>
          </CardSection>
        </VoteCard>
        {networkFetched !== allNetworks && (
          <DataRow style={{ width: '90%', marginTop: '5px', marginLeft: '5%' }}>
            <TYPE.small style={{ textAlign: 'center', margin: 0 }}>
              {`Data loaded from ${networkFetched} out of ${allNetworks} supported networks`}
            </TYPE.small>
          </DataRow>
        )}
      </TopSection>
      <BottomSection>
        <RowBetween style={{ gap: '12px' }}>
          <BadgeData>
            <AutoColumn gap="md">
              <a href="https://chain.link/automation">
                <img
                  src={badgeAutomation}
                  alt="automation secured with chainlink"
                />
              </a>
            </AutoColumn>
          </BadgeData>
          <BadgeData>
            <AutoColumn gap="md">
              <a href="https://chain.link/data-feeds">
                <img src={badgeFeed} alt="market data secured with chainlink" />
              </a>
            </AutoColumn>
          </BadgeData>
        </RowBetween>
      </BottomSection>
    </PageWrapper>
  )
}
