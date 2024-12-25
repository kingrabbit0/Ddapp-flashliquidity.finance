import React from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components/macro'
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake1/hooks'
import { TYPE, ExternalLink, StyledInternalLink } from '../../theme'
import PoolCard from '../../components/earn1/PoolCard'
import { RowBetween } from '../../components/Row'
import {
  CardSection,
  DataCard /*, CardNoise, CardBGImage */,
} from '../../components/earn1/styled'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../../components/Button'

const PageWrapper = styled(AutoColumn)`
  margin-top: 24px;
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

const DataRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
flex-direction: column;
`};
`

export default function Earn() {
  const { chainId } = useActiveWeb3React()
  const stakingInfos = useStakingInfo()

  const stakingRewardsExist = Boolean(
    typeof chainId === 'number' &&
      (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0
  )

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.body fontWeight={600}> SBP Vaults</TYPE.body>
              </RowBetween>
              <RowBetween>
                <TYPE.body fontSize={14}>
                  Deposit your LP tokens into a vault to earn profits from
                  rebalancing operations. You will receive vault tokens which
                  can be used to withdraw your staked LP tokens along with any
                  accrued rewards
                </TYPE.body>
              </RowBetween>{' '}
              {
                <ExternalLink
                  style={{ color: 'blueviolet', textDecoration: 'underline' }}
                  href="https://docs.flashliquidityai.com/ecosystem/self-balancing-pools"
                  target="_blank"
                >
                  <TYPE.link fontSize={14}>
                    Read more about self-balancing pools
                  </TYPE.link>
                </ExternalLink>
              }
              <StyledInternalLink
                to={`/selfbalancing/archive`}
                style={{ width: '33%' }}
              >
                <ButtonPrimary padding="8px" borderRadius="24px">
                  Archived
                </ButtonPrimary>
              </StyledInternalLink>
            </AutoColumn>
          </CardSection>
        </DataCard>
      </TopSection>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>
            Active farms:
          </TYPE.mediumHeader>
        </DataRow>

        <PoolSection>
          {stakingRewardsExist && stakingInfos?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active farms'
          ) : (
            stakingInfos?.map((stakingInfo) => {
              // need to sort by added liquidity here
              return (
                <PoolCard
                  key={stakingInfo.stakingRewardAddress}
                  stakingInfo={stakingInfo}
                />
              )
            })
          )}
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}
