import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components/macro'
import { Pair } from 'flashliquidity-sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'

import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { ExternalLink, TYPE, HideSmall } from '../../theme'
import { Text } from 'rebass'
import { RowBetween, RowFixed } from '../../components/Row'
import { ButtonPrimary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import {
  toV2LiquidityToken,
  useTrackedTokenPairs
} from '../../state/user/hooks'
import { Dots } from '../../components/swap/styleds'
import { CardSection, DataCard } from '../../components/earn1/styled'

const PageWrapper = styled(AutoColumn)`
  margin-top: 24px;
  max-width: 640px;
  width: 100%;
`

/*const VoteCard = styled(DataCard)`
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #27ae60 0%, #000000 100%);
  overflow: hidden;
`*/

const TitleRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
  `};
`

const ButtonRow = styled(RowFixed)`
  gap: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-between;
  `};
`

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

/*const ResponsiveButtonSecondary = styled(ButtonSecondary)`
  width: fit-content;
  background-color: lightgrey;
  color: black;
  &:hover { opacity: 0.7;}

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`*/

const EmptyProposals = styled.div`
  border: 1px solid ${({ theme }) => theme.text3};
  padding: 16px 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

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

  /*   const totalUSDValue = useMemo(() => {
    return allV2PairsWithLiquidity.reduce((total, pair) => {
      const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken);
      const totalPoolTokens = useTotalSupply(pair.liquidityToken);
  
      const USDPrice = useUSDCPrice(pair.token0) ?? useUSDCPrice(pair.token1);
  
      if (userPoolBalance && totalPoolTokens && USDPrice) {
        const valueOfUserStakedAmountInWETH = new TokenAmount(
          pair.token0, // Assuming token0 is WETH. Change if needed.
          JSBI.divide(
            JSBI.multiply(
              JSBI.multiply(userPoolBalance.raw, pair.reserveOf(pair.token0).raw),
              JSBI.BigInt(2)
            ),
            totalPoolTokens.raw
          )
        );
  
        const valueOfUserStakedAmountInUSDC = USDPrice.quote(valueOfUserStakedAmountInWETH);
  
        return total + parseFloat(valueOfUserStakedAmountInUSDC.toFixed(2));
      }
  
      return total;
    }, 0);
  }, [allV2PairsWithLiquidity, account]);
  
  console.log('Total USD Value of User\'s Liquidity:', totalUSDValue); */

  return (
    <>
      <PageWrapper>
        <SwapPoolTabs active={'pool'} />

        <DataCard>
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.body fontWeight={600}>
                  Liquidity provider rewards
                </TYPE.body>
              </RowBetween>
              <RowBetween>
                <TYPE.body fontSize={14}>
                  {`Liquidity providers earn a 0.30% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.`}
                </TYPE.body>
              </RowBetween>
              {
                <ExternalLink
                  style={{ color: 'blueviolet', textDecoration: 'underline' }}
                  target="_blank"
                  href="https://docs.flashliquidity.finance/ecosystem/open-pools"
                >
                  <TYPE.link fontSize={14}>
                    Read more about providing liquidity
                  </TYPE.link>
                </ExternalLink>
              }
            </AutoColumn>
          </CardSection>
        </DataCard>

        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg" style={{ width: '100%' }}>
            <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
              <HideSmall>
                <TYPE.mediumHeader
                  style={{ marginTop: '0.5rem', justifySelf: 'flex-start' }}
                >
                  Your liquidity
                </TYPE.mediumHeader>
              </HideSmall>
              <ButtonRow marginTop={'32px'}>
                <ResponsiveButtonPrimary
                  id="import-pool-button"
                  as={Link}
                  padding="6px 8px"
                  to="/find"
                >
                  <Text fontWeight={500} fontSize={14}>
                    Import Pool
                  </Text>
                </ResponsiveButtonPrimary>
                <ResponsiveButtonPrimary
                  id="join-pool-button"
                  as={Link}
                  padding="6px 8px"
                  to="/add/ETH"
                >
                  <Text fontWeight={500} fontSize={14}>
                    Add Liquidity
                  </Text>
                </ResponsiveButtonPrimary>
              </ButtonRow>
            </TitleRow>

            {!account ? (
              <EmptyProposals>
                <TYPE.body color={theme.text2} textAlign="center">
                  Connect wallet to view your liquidity.
                </TYPE.body>
              </EmptyProposals>
            ) : v2IsLoading ? (
              <EmptyProposals>
                <TYPE.body color={theme.text2} textAlign="center">
                  <Dots>Loading</Dots>
                </TYPE.body>
              </EmptyProposals>
            ) : allV2PairsWithLiquidity?.length > 0 ? (
              <>
                {allV2PairsWithLiquidity.map(v2Pair => (
                  <FullPositionCard
                    key={v2Pair.liquidityToken.address}
                    pair={v2Pair}
                  />
                ))}
              </>
            ) : (
              <EmptyProposals>
                <TYPE.body color={theme.text2} textAlign="center">
                  No liquidity found.
                </TYPE.body>
              </EmptyProposals>
            )}
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
    </>
  )
}
