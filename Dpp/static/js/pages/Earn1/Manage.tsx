import React, { useCallback, useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import { JSBI /**TokenAmount*/, ETHER, TokenAmount } from 'flashliquidity-sdk'
import { RouteComponentProps } from 'react-router-dom'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { useCurrency } from '../../hooks/Tokens'
import { useWalletModalToggle } from '../../state/application/hooks'
import { TYPE } from '../../theme'

import Row, { RowBetween } from '../../components/Row'
import { CardSection, DataCard } from '../../components/earn1/styled'
import { ButtonSecondary } from '../../components/Button'
import StakingModal from '../../components/earn1/StakingModal'
import { useStakingInfo } from '../../state/stake1/hooks'
import UnstakingModal from '../../components/earn1/UnstakingModal'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { useColor } from '../../hooks/useColor'
//import { CountUp } from 'use-count-up'

import { wrappedCurrency } from '../../utils/wrappedCurrency'
import { currencyId } from '../../utils/currencyId'
//import { useTotalSupply } from '../../data/TotalSupply'
import { usePair } from '../../data/Reserves'
import { useTotalSupply } from '../../data/TotalSupply'
import useUSDCPrice from '../../utils/useUSDCPrice'
import CurrencyLogo from '../../components/CurrencyLogo'
//import usePrevious from '../../hooks/usePrevious'
//import useUSDCPrice from '../../utils/useUSDCPrice'
//import { BIG_INT_ZERO } from '../../constants'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const PositionInfo = styled(AutoColumn)<{ dim: any }>`
  position: relative;
  max-width: 640px;
  width: 100%;
  opacity: ${({ dim }) => (dim ? 0.6 : 1)};
`

const BottomSection = styled(AutoColumn)`
  border-radius: 12px;
  width: 100%;
  position: relative;
`

const StyledDataCard = styled(DataCard)<{
  bgColor?: any
  showBackground?: any
}>`
  background: ${({ theme }) => theme.bg2};
  z-index: 2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`

const StyledBottomCard = styled(DataCard)<{ dim: any }>`
  background: ${({ theme }) => theme.bg3};
  opacity: ${({ dim }) => (dim ? 0.4 : 1)};
  margin-top: -40px;
  padding: 0 1.25rem 1rem 1.25rem;
  padding-top: 32px;
  z-index: 1;
`

const PoolData = styled(DataCard)`
  background: ${({ theme }) => theme.bg3};
  border: none;
  padding: 1rem;
  z-index: 1;
`

const VoteCard = styled(DataCard)`
  overflow: hidden;
`

const DataRow = styled(RowBetween)`
  justify-content: center;
  gap: 12px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    flex-direction: column;
    gap: 12px;
  `};
`

export default function Manage({
  match: {
    params: { currencyIdA, currencyIdB, index }
  }
}: RouteComponentProps<{
  currencyIdA: string
  currencyIdB: string
  index: string
}>) {
  const { account, chainId } = useActiveWeb3React()

  // get currencies and pair
  const [currencyA, currencyB] = [
    useCurrency(currencyIdA),
    useCurrency(currencyIdB)
  ]
  const tokenA = wrappedCurrency(currencyA ?? undefined, chainId)
  const tokenB = wrappedCurrency(currencyB ?? undefined, chainId)

  const [, stakingTokenPair] = usePair(tokenA, tokenB)
  const stakingInfo = useStakingInfo(stakingTokenPair)?.[Number(index)]
  //console.log(stakingInfo)
  // detect existing unstaked LP position to show add button if none found
  const userLiquidityUnstaked = useTokenBalance(
    account ?? undefined,
    stakingTokenPair?.liquidityToken
  )
  const showAddLiquidityButton = Boolean(
    stakingInfo?.vtUserBalance?.equalTo('0') &&
      userLiquidityUnstaked?.equalTo('0')
  )

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showUnstakingModal, setShowUnstakingModal] = useState(false)
  //const [showClaimRewardModal, setShowClaimRewardModal] = useState(false)

  // fade cards if nothing staked or nothing earned yet
  const disableTop =
    !stakingInfo?.vtUserBalance ||
    stakingInfo.vtUserBalance.equalTo(JSBI.BigInt(0))
  const isStaking = Boolean(stakingInfo.vtUserBalance.greaterThan('0'))
  const isWETH = currencyA === ETHER[chainId!] ? tokenB : tokenA
  //const WETH = currencyA === ETHER ? tokenA : tokenB
  const backgroundColor = useColor(isWETH)

  // let returnOverMonth: Percent = new Percent('0')
  const totalSupplyOfStakingToken = useTotalSupply(
    stakingTokenPair?.liquidityToken
  )

  // let returnOverMonth: Percent = new Percent('0')
  let valueOfTotalStakedAmountInWETH: TokenAmount | undefined
  if (totalSupplyOfStakingToken && stakingTokenPair) {
    // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
    valueOfTotalStakedAmountInWETH = new TokenAmount(
      isWETH!,
      JSBI.divide(
        JSBI.multiply(
          JSBI.multiply(
            stakingInfo.lpStakedBalance.raw,
            stakingTokenPair.reserveOf(isWETH!).raw
          ),
          JSBI.BigInt(2) // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
        ),
        totalSupplyOfStakingToken.raw
      )
    )
  }

  // get the USD value of staked WETH
  const USDPrice = useUSDCPrice(isWETH)
  const valueOfTotalStakedAmountInUSDC =
    valueOfTotalStakedAmountInWETH &&
    USDPrice?.quote(valueOfTotalStakedAmountInWETH, chainId!)

  let token0Deposit
  let token1Deposit
  let valueOfUserStakedAmountInUSDC
  let valueOfUserStakedAmountInWETH: TokenAmount | undefined
  //let totalToken0Deposit
  //let totalToken1Deposit
  const totalPoolTokens = useTotalSupply(stakingTokenPair?.liquidityToken)

  if (totalPoolTokens && isStaking) {
    //totalToken0Deposit = stakingTokenPair?.getLiquidityValue(token0!, totalPoolTokens,  stakingInfo.totalStakedAmount, false)
    //totalToken1Deposit = stakingTokenPair?.getLiquidityValue(token1!, totalPoolTokens,  stakingInfo.totalStakedAmount, false)
    token0Deposit = stakingTokenPair?.getLiquidityValue(
      tokenA!,
      totalPoolTokens,
      stakingInfo.lpUserStakedBalance,
      false
    )
    token1Deposit = stakingTokenPair?.getLiquidityValue(
      tokenB!,
      totalPoolTokens,
      stakingInfo.lpUserStakedBalance,
      false
    )
    // let returnOverMonth: Percent = new Percent('0')
    if (totalSupplyOfStakingToken && stakingTokenPair) {
      // take the total amount of LP tokens staked, multiply by ETH value of all LP tokens, divide by all LP tokens
      valueOfUserStakedAmountInWETH = new TokenAmount(
        isWETH!,
        JSBI.divide(
          JSBI.multiply(
            JSBI.multiply(
              stakingInfo.lpUserStakedBalance.raw,
              stakingTokenPair.reserveOf(isWETH!).raw
            ),
            JSBI.BigInt(2) // this is b/c the value of LP shares are ~double the value of the WETH they entitle owner to
          ),
          totalSupplyOfStakingToken.raw
        )
      )
    }

    // get the USD value of staked WETH
    valueOfUserStakedAmountInUSDC =
      valueOfUserStakedAmountInWETH &&
      USDPrice?.quote(valueOfUserStakedAmountInWETH, chainId!)
  }
  const toggleWalletModal = useWalletModalToggle()

  const handleDepositClick = useCallback(() => {
    if (account) {
      setShowStakingModal(true)
    } else {
      toggleWalletModal()
    }
  }, [account, toggleWalletModal])

  return (
    <PageWrapper gap="lg" justify="center">
      <RowBetween style={{ gap: '24px' }}>
        <TYPE.mediumHeader style={{ margin: 0 }}>
          {currencyA?.symbol}-{currencyB?.symbol} Vault
        </TYPE.mediumHeader>
        <DoubleCurrencyLogo
          chainId={chainId!}
          currency0={currencyA ?? undefined}
          currency1={currencyB ?? undefined}
          size={36}
        />
      </RowBetween>

      <DataRow style={{ gap: '24px' }}>
        <PoolData>
          <AutoColumn gap="sm">
            <TYPE.body style={{ margin: 0 }}>Total deposit value</TYPE.body>
            <TYPE.body fontSize={16} fontWeight={500}>
              {`${
                valueOfTotalStakedAmountInUSDC?.toFixed(0, {
                  groupSeparator: ','
                }) ?? '-'
              }$`}
            </TYPE.body>
          </AutoColumn>
        </PoolData>
        <PoolData>
          <AutoColumn gap="sm">
            <TYPE.body style={{ margin: 0 }}>Vault APR</TYPE.body>
            <TYPE.body fontSize={16} fontWeight={500}>
              {`${'N/A'} %`}
            </TYPE.body>
          </AutoColumn>
        </PoolData>
      </DataRow>

      {showAddLiquidityButton && (
        <VoteCard>
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.body fontWeight={600}>
                  Step 1. Get FlashLiquidity LPs
                </TYPE.body>
              </RowBetween>
              <RowBetween style={{ marginBottom: '1rem' }}>
                <TYPE.body fontSize={14}>
                  {`FlashLiquidity LP tokens are required. Once you've added liquidity to the ${currencyA?.symbol}-${currencyB?.symbol} pool you can stake your liquidity tokens on this page.`}
                </TYPE.body>
              </RowBetween>
              <ButtonSecondary
                padding="8px"
                width={'fit-content'}
                as={Link}
                to={`/add/${currencyA && currencyId(chainId!, currencyA)}/${
                  currencyB && currencyId(chainId!, currencyB)
                }`}
              >
                {`Add ${currencyA?.symbol}-${currencyB?.symbol} liquidity`}
              </ButtonSecondary>
            </AutoColumn>
          </CardSection>
        </VoteCard>
      )}

      {stakingInfo && (
        <>
          <StakingModal
            isOpen={showStakingModal}
            onDismiss={() => setShowStakingModal(false)}
            stakingInfo={stakingInfo}
            userLiquidityUnstaked={userLiquidityUnstaked}
          />
          <UnstakingModal
            isOpen={showUnstakingModal}
            onDismiss={() => setShowUnstakingModal(false)}
            stakingInfo={stakingInfo}
          />
        </>
      )}

      <PositionInfo gap="lg" justify="center" dim={showAddLiquidityButton}>
        <BottomSection gap="lg" justify="center">
          <StyledDataCard
            disabled={disableTop}
            bgColor={backgroundColor}
            showBackground={!showAddLiquidityButton}
          >
            <CardSection>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.body fontWeight={600}>
                    Your liquidity deposits
                  </TYPE.body>
                </RowBetween>
                <TYPE.body fontSize={16} fontWeight={500}>
                  {`Your liquidity value: ${
                    valueOfUserStakedAmountInUSDC?.toFixed(0, {
                      groupSeparator: ','
                    }) ?? '-'
                  }$`}
                </TYPE.body>
                <Row>
                  <CurrencyLogo
                    chainId={chainId!}
                    currency={currencyA!}
                    size={'28px'}
                  />
                  <TYPE.body marginLeft={'8px'} fontSize={16} fontWeight={500}>
                    {`${token0Deposit?.toSignificant(4) ?? '-'}`}
                  </TYPE.body>
                </Row>
                <Row>
                  <CurrencyLogo
                    chainId={chainId!}
                    currency={currencyB!}
                    size={'28px'}
                  />
                  <TYPE.body marginLeft={'8px'} fontSize={16} fontWeight={500}>
                    {`${token1Deposit?.toSignificant(4) ?? '-'}`}
                  </TYPE.body>
                </Row>
              </AutoColumn>
            </CardSection>
          </StyledDataCard>
          <StyledBottomCard
            dim={stakingInfo?.vtUserBalance?.equalTo(JSBI.BigInt(0))}
          >
            <AutoColumn gap="sm">
              <RowBetween style={{ alignItems: 'baseline' }}></RowBetween>
            </AutoColumn>
          </StyledBottomCard>
        </BottomSection>
        <TYPE.main style={{ textAlign: 'center' }} fontSize={12}>
          When you withdraw, the contract will automatically claim accrued
          rewards on your behalf!
        </TYPE.main>

        {!showAddLiquidityButton && (
          <DataRow style={{ marginBottom: '1rem' }}>
            <ButtonSecondary
              padding="8px"
              width="160px"
              onClick={handleDepositClick}
            >
              {stakingInfo?.vtUserBalance?.greaterThan(JSBI.BigInt(0))
                ? 'Deposit'
                : 'Deposit LPs'}
            </ButtonSecondary>
            {stakingInfo?.vtUserBalance?.greaterThan(JSBI.BigInt(0)) && (
              <>
                <ButtonSecondary
                  padding="8px"
                  width="160px"
                  onClick={() => setShowUnstakingModal(true)}
                >
                  Withdraw
                </ButtonSecondary>
              </>
            )}
          </DataRow>
        )}
        {!userLiquidityUnstaked ? null : userLiquidityUnstaked.equalTo(
            '0'
          ) ? null : (
          <TYPE.main>
            {userLiquidityUnstaked.toSignificant(6)} FLASH LP tokens available
          </TYPE.main>
        )}
      </PositionInfo>
    </PageWrapper>
  )
}
