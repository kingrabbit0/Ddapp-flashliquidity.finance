import React from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components/macro'
import {
  STAKING_REWARDS_INFO,
  useStakingInfo
} from '../../state/archive1/hooks'
import { TYPE, StyledInternalLink } from '../../theme'
import ArchivedPoolCard from '../../components/earn1/ArchivedPoolCard'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard } from '../../components/earn1/styled'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
import { ButtonPrimary } from '../../components/Button'

const PageWrapper = styled(AutoColumn)`
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
                <TYPE.body fontWeight={600}>Archived Arbitrage Farms</TYPE.body>
              </RowBetween>
              <RowBetween>
                <TYPE.body fontSize={14}>
                  Archived arbitrage farms are no longer receiving profits from
                  arbitrage automation, consider migrating your LP tokens to
                  active farms.
                </TYPE.body>
              </RowBetween>{' '}
              <StyledInternalLink
                to={`/selfbalancing`}
                style={{ width: '25%' }}
              >
                <ButtonPrimary padding="8px" borderRadius="8px">
                  Active
                </ButtonPrimary>
              </StyledInternalLink>
            </AutoColumn>
          </CardSection>
        </DataCard>
      </TopSection>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>
            Participating pools
          </TYPE.mediumHeader>
        </DataRow>

        <PoolSection>
          {stakingRewardsExist && stakingInfos?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            stakingInfos?.map(stakingInfo => {
              // need to sort by added liquidity here
              return (
                <ArchivedPoolCard
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
