import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components/macro'
import { TYPE, StyledInternalLink } from '../../theme'
import DoubleCurrencyLogo from '../DoubleLogo'
import { useCurrency } from '../../hooks/Tokens'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
import { ETHER, JSBI, TokenAmount } from 'flashliquidity-sdk'
import { ButtonPrimary } from '../Button'
import { StakingInfo } from '../../state/stakefliq/hooks'
import { useColor } from '../../hooks/useColor'
import { useActiveWeb3React } from '../../hooks'
import { Break, CardNoise, CardBGImage } from './styled'
import { useTotalSupply } from '../../data/TotalSupply'
import { usePair } from '../../data/Reserves'
import useUSDCPrice from '../../utils/useUSDCPrice'

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
`

const Wrapper = styled(AutoColumn)<{ showBackground: boolean; bgColor: any }>`
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  position: relative;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '1')};
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%, ${
      showBackground ? theme.black : theme.bg5
    } 100%) `};
  color: ${({ theme, showBackground }) =>
    showBackground ? theme.white : theme.text1} !important;

  ${({ showBackground }) =>
    showBackground &&
    `  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);`}
`

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr 120px;
  grid-gap: 0px;
  align-items: center;
  padding: 1rem;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 48px 1fr 96px;
  `};
`

// const APR = styled.div`
//   display: flex;
//   justify-content: flex-end;
// `

const BottomSection = styled.div<{ showBackground: boolean }>`
  padding: 12px 16px;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '0.4')};
  border-radius: 0 0 12px 12px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  z-index: 1;
`

export default function PoolCard({
  stakingInfo
}: {
  stakingInfo: StakingInfo
}) {
  const { chainId } = useActiveWeb3React()
  // get currencies and pair
  const [currency0, currency1] = [
    useCurrency(stakingInfo.tokens[0].address),
    useCurrency(stakingInfo.tokens[1].address)
  ]
  const token0 = wrappedCurrency(currency0 ?? undefined, chainId)
  const token1 = wrappedCurrency(currency1 ?? undefined, chainId)

  //const [,stakingTokenPair] = usePair(...stakingInfo.tokens)

  const isStaking = Boolean(stakingInfo.stakedAmount.greaterThan('0'))

  // get the color of the token
  const isWETH = currency0 === ETHER[chainId!] ? token1 : token0
  //console.log(currencyId(currency0))
  //console.log(currencyId(currency1))
  //const WETH = currency0 === ETHER ? token0 : token1
  const backgroundColor = useColor(isWETH)
  const [, stakingTokenPair] = usePair(...stakingInfo.tokens)

  // let returnOverMonth: Percent = new Percent('0')
  const totalSupplyOfStakingToken = useTotalSupply(
    stakingInfo.stakedAmount.token
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
            stakingInfo.totalStakedAmount.raw,
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

  //var stakedToken = JSBI.divide(stakingInfo.totalStakedAmount.raw, JSBI.BigInt(1000000000000000000));
  //let stakedToken09 = JSBI.toNumber(stakingInfo.totalStakedAmount.raw);
  //stakedToken09 = (window as any).web3.fromWei(stakedToken09.toString());*/
  const show = isStaking || true

  // get the USD value of staked WETH
  /*const USDPrice = useUSDCPrice(WETH[chainId ? chainId : 137])
  const valueOfTotalStakedAmountInUSDC =
    valueOfTotalStakedAmountInWETH && USDPrice?.quote(valueOfTotalStakedAmountInWETH)*/

  //<RowBetween>
  //  <TYPE.white> Total deposited LP tokens</TYPE.white>
  //  <TYPE.white>
  //    {`${stakingInfo.totalStakedAmount.toSignificant(4) ?? '0'}`}
  //  </TYPE.white>
  // </RowBetween>
  return show ? (
    <Wrapper showBackground={isStaking} bgColor={backgroundColor}>
      <CardBGImage desaturate />
      <CardNoise />

      <TopSection>
        <DoubleCurrencyLogo
          chainId={chainId!}
          currency0={currency0!}
          currency1={currency1!}
          size={24}
        />
        <TYPE.white
          fontWeight={600}
          fontSize={24}
          style={{ marginLeft: '8px' }}
        >
          {currency0?.symbol}-{currency1?.symbol}
        </TYPE.white>

        <StyledInternalLink to={`/staking/fliq`} style={{ width: '100%' }}>
          <ButtonPrimary padding="8px" borderRadius="8px">
            {isStaking ? 'Manage' : 'Deposit'}
          </ButtonPrimary>
        </StyledInternalLink>
      </TopSection>

      <StatContainer>
        <RowBetween>
          <TYPE.white>{`Total deposited`}</TYPE.white>
          <TYPE.white>
            {valueOfTotalStakedAmountInUSDC
              ? `${valueOfTotalStakedAmountInUSDC.toFixed(0, {
                  groupSeparator: ','
                })}$`
              : `${
                  valueOfTotalStakedAmountInWETH?.toSignificant(4, {
                    groupSeparator: ','
                  }) ?? '-'
                } MATIC`}
          </TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> Staking rate </TYPE.white>
          <TYPE.white>{`${stakingInfo.totalRewardRate
            ?.multiply(`${60 * 60 * 24}`)
            ?.toFixed(0, { groupSeparator: ',' })} FLIQ / day`}</TYPE.white>
        </RowBetween>
        <RowBetween>
          <TYPE.white> Status </TYPE.white>
          <TYPE.white>{!stakingInfo.ended ? 'Running' : 'Closed'}</TYPE.white>
        </RowBetween>
      </StatContainer>

      {isStaking && (
        <>
          <Break />
          <StatContainer>
            <RowBetween>
              <TYPE.white>{`Your deposit`}</TYPE.white>
            </RowBetween>
          </StatContainer>
          <BottomSection showBackground={true}>
            <TYPE.black color={'white'} fontWeight={500}>
              <span>Your rate</span>
            </TYPE.black>

            <TYPE.black
              style={{ textAlign: 'right' }}
              color={'white'}
              fontWeight={500}
            >
              <span
                role="img"
                aria-label="wizard-icon"
                style={{ marginRight: '0.5rem' }}
              >
                ⚡
              </span>
              {`${stakingInfo.rewardRate
                ?.multiply(`${60 * 60 * 24}`)
                ?.toSignificant(4, { groupSeparator: ',' })} FLIQ / day`}
            </TYPE.black>
          </BottomSection>
        </>
      )}
    </Wrapper>
  ) : (
    <span></span>
  )
}