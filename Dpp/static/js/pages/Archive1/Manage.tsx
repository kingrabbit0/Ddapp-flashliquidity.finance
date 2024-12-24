import React, { useCallback, useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import { JSBI /**TokenAmount*/, ETHER } from 'flashliquidity-sdk'
import { RouteComponentProps } from 'react-router-dom'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { useCurrency } from '../../hooks/Tokens'
import { useWalletModalToggle } from '../../state/application/hooks'
import { TYPE } from '../../theme'

import { RowBetween } from '../../components/Row'
import { CardSection, DataCard } from '../../components/earn1/styled'
import { ButtonPrimary, ButtonEmpty } from '../../components/Button'
import StakingModal from '../../components/earn1/ArchivedStakingModal'
import { useStakingInfo } from '../../state/archive1/hooks'
import UnstakingModal from '../../components/earn1/ArchivedUnstakingModal'
import ClaimRewardModal from '../../components/earn1/ArchivedClaimRewardModal'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useActiveWeb3React } from '../../hooks'
import { useColor } from '../../hooks/useColor'
import { CountUp } from 'use-count-up'

import { wrappedCurrency } from '../../utils/wrappedCurrency'
import { currencyId } from '../../utils/currencyId'
//import { useTotalSupply } from '../../data/TotalSupply'
import { usePair } from '../../data/Reserves'
import usePrevious from '../../hooks/usePrevious'
//import useUSDCPrice from '../../utils/useUSDCPrice'
import { BIG_INT_ZERO } from '../../constants'

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
  background: none;
  border: 1px solid ${({ theme }) => theme.bg4};
  padding: 1rem;
  z-index: 1;
`

const VoteCard = styled(DataCard)`
  overflow: hidden;
`

const DataRow = styled(RowBetween)`
  justify-content: center;
  gap: 12px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
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

  // detect existing unstaked LP position to show add button if none found
  const userLiquidityUnstaked = useTokenBalance(
    account ?? undefined,
    stakingInfo?.stakedAmount?.token
  )
  const showAddLiquidityButton = Boolean(
    stakingInfo?.stakedAmount?.equalTo('0') &&
      userLiquidityUnstaked?.equalTo('0')
  )

  // toggle for staking modal and unstaking modal
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [showUnstakingModal, setShowUnstakingModal] = useState(false)
  const [showClaimRewardModal, setShowClaimRewardModal] = useState(false)

  // fade cards if nothing staked or nothing earned yet
  const disableTop =
    !stakingInfo?.stakedAmount ||
    stakingInfo.stakedAmount.equalTo(JSBI.BigInt(0))

  const token = currencyA === ETHER[chainId!] ? tokenB : tokenA
  //const WETH = currencyA === ETHER ? tokenA : tokenB
  const backgroundColor = useColor(token)

  const countUpAmount = stakingInfo?.earnedRewardAmount?.toFixed(6) ?? '0'
  const countUpAmountPrevious = usePrevious(countUpAmount) ?? '0'

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
          {currencyA?.symbol}-{currencyB?.symbol} Farm
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
            <TYPE.body style={{ margin: 0 }}>
              Total deposited pool tokens
            </TYPE.body>
            <TYPE.body fontSize={24} fontWeight={500}>
              {`${stakingInfo?.totalStakedAmount.toSignificant(3) ?? '-'}`}
            </TYPE.body>
          </AutoColumn>
        </PoolData>
        <PoolData>
          <AutoColumn gap="sm">
            <TYPE.body style={{ margin: 0 }}>Pool Rate</TYPE.body>
            <TYPE.body fontSize={24} fontWeight={500}>
              {stakingInfo?.totalRewardRate
                ?.multiply((60 * 60 * 24).toString())
                ?.toSignificant(4, { groupSeparator: ',' }) ?? '-'}
              {' Credit / day'}
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
              <ButtonPrimary
                padding="8px"
                borderRadius="24px"
                width={'fit-content'}
                as={Link}
                to={`/add/${currencyA && currencyId(chainId!, currencyA)}/${
                  currencyB && currencyId(chainId!, currencyB)
                }`}
              >
                {`Add ${currencyA?.symbol}-${currencyB?.symbol} liquidity`}
              </ButtonPrimary>
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
          <ClaimRewardModal
            isOpen={showClaimRewardModal}
            onDismiss={() => setShowClaimRewardModal(false)}
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
                <RowBetween style={{ alignItems: 'baseline' }}>
                  <TYPE.body fontSize={36} fontWeight={600}>
                    {stakingInfo?.stakedAmount?.toSignificant(4) ?? '-'}
                  </TYPE.body>
                  <TYPE.body>
                    FLASH LP {currencyA?.symbol}-{currencyB?.symbol}
                  </TYPE.body>
                </RowBetween>
              </AutoColumn>
            </CardSection>
          </StyledDataCard>
          <StyledBottomCard
            dim={stakingInfo?.stakedAmount?.equalTo(JSBI.BigInt(0))}
          >
            <AutoColumn gap="sm">
              <RowBetween>
                <div>
                  <TYPE.black>{`Your unclaimed ${stakingInfo?.rewardToken.symbol}`}</TYPE.black>
                </div>
                {stakingInfo?.earnedRewardAmount.toSignificant(4) &&
                  JSBI.notEqual(
                    BIG_INT_ZERO,
                    stakingInfo?.earnedRewardAmount?.raw
                  ) && (
                    <ButtonEmpty
                      padding="8px"
                      borderRadius="8px"
                      width="fit-content"
                      onClick={() => setShowClaimRewardModal(true)}
                    >
                      Claim
                    </ButtonEmpty>
                  )}
              </RowBetween>
              <RowBetween style={{ alignItems: 'baseline' }}>
                <TYPE.largeHeader fontSize={36} fontWeight={600}>
                  <CountUp
                    key={countUpAmount}
                    isCounting
                    decimalPlaces={4}
                    start={parseFloat(countUpAmountPrevious)}
                    end={parseFloat(countUpAmount)}
                    thousandsSeparator={','}
                    duration={1}
                  />
                </TYPE.largeHeader>
                <TYPE.black fontSize={16} fontWeight={500}>
                  <span
                    role="img"
                    aria-label="wizard-icon"
                    style={{ marginRight: '8px ' }}
                  >
                    ⚡
                  </span>
                  {stakingInfo?.rewardRate
                    ?.multiply((60 * 60 * 24).toString())
                    ?.toSignificant(4, { groupSeparator: ',' }) ?? '-'}
                  {' CREDIT / day'}
                </TYPE.black>
              </RowBetween>
            </AutoColumn>
          </StyledBottomCard>
        </BottomSection>
        <TYPE.main style={{ textAlign: 'center' }} fontSize={14}>
          When you withdraw, the contract will automatically claim accrued
          rewards on your behalf!
        </TYPE.main>

        {!showAddLiquidityButton && (
          <DataRow style={{ marginBottom: '1rem' }}>
            <ButtonPrimary
              padding="8px"
              borderRadius="8px"
              width="160px"
              onClick={handleDepositClick}
            >
              {stakingInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0))
                ? 'Deposit'
                : 'Deposit FLASH LP Tokens'}
            </ButtonPrimary>
            {stakingInfo?.stakedAmount?.greaterThan(JSBI.BigInt(0)) && (
              <>
                <ButtonPrimary
                  padding="8px"
                  borderRadius="8px"
                  width="160px"
                  onClick={() => setShowUnstakingModal(true)}
                >
                  Withdraw
                </ButtonPrimary>
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
