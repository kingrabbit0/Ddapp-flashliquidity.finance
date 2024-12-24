import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components/macro'
import { TYPE, StyledInternalLink } from '../../theme'
import DoubleCurrencyLogo from '../DoubleLogo'
import CurrencyLogo from '../CurrencyLogo'
import { useCurrency } from '../../hooks/Tokens'
import { wrappedCurrency } from '../../utils/wrappedCurrency'
//import LogoDark from '../../assets/svg/logo_white.svg'
import { ETHER, JSBI, TokenAmount } from 'flashliquidity-sdk'
import { ButtonPrimary } from '../Button'
import { StakingInfo } from '../../state/archive1/hooks'
import { useColor } from '../../hooks/useColor'
//import { currencyId } from '../../utils/currencyId'
import { Break } from './styled'
//import { unwrappedToken } from '../../utils/wrappedCurrency'
import { useTotalSupply } from '../../data/TotalSupply'
import { usePair } from '../../data/Reserves'
import { useActiveWeb3React } from '../../hooks'
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
  border: none;
  overflow: hidden;
  position: relative;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '1')};
  background: ${({ theme }) => theme.bg2};
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
      token0!,
      totalPoolTokens,
      stakingInfo.stakedAmount,
      false
    )
    token1Deposit = stakingTokenPair?.getLiquidityValue(
      token1!,
      totalPoolTokens,
      stakingInfo.stakedAmount,
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
              stakingInfo.stakedAmount.raw,
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

  return show ? (
    <Wrapper showBackground={isStaking} bgColor={backgroundColor}>
      <TopSection>
        <DoubleCurrencyLogo
          chainId={chainId!}
          currency0={currency0!}
          currency1={currency1!}
          size={28}
        />
        <TYPE.body
          fontWeight={600}
          fontSize={22}
          style={{ marginLeft: '12px' }}
        >
          {currency0?.symbol}-{currency1?.symbol}
        </TYPE.body>

        <StyledInternalLink
          to={`/selfbalancing/archive/${token0?.address}/${token1?.address}/${stakingInfo.index}`}
          style={{ width: '100%' }}
        >
          <ButtonPrimary padding="8px" borderRadius="24px">
            {isStaking ? 'Manage' : 'Deposit'}
          </ButtonPrimary>
        </StyledInternalLink>
      </TopSection>
      <StatContainer>
        <RowBetween>
          <TYPE.body>{`Rewards distributed in ${stakingInfo.rewardToken.symbol}`}</TYPE.body>
          {token0?.address === stakingInfo.rewardToken.address ? (
            <CurrencyLogo chainId={chainId!} currency={currency0!} />
          ) : (
            <CurrencyLogo chainId={chainId!} currency={currency1!} />
          )}
        </RowBetween>
        <RowBetween>
          <TYPE.body>{`Total deposit:`}</TYPE.body>
          <TYPE.body>
            {valueOfTotalStakedAmountInUSDC
              ? `${valueOfTotalStakedAmountInUSDC.toFixed(0, {
                  groupSeparator: ','
                })}$`
              : `${
                  valueOfTotalStakedAmountInWETH?.toSignificant(4, {
                    groupSeparator: ','
                  }) ?? '-'
                } MATIC`}
          </TYPE.body>
        </RowBetween>
      </StatContainer>

      {isStaking && (
        <>
          <Break />
          <StatContainer>
            <RowBetween>
              <TYPE.body>{`Your deposit:`}</TYPE.body>
              <TYPE.body>
                {valueOfUserStakedAmountInUSDC
                  ? `${valueOfUserStakedAmountInUSDC.toFixed(0, {
                      groupSeparator: ','
                    })}$`
                  : `${
                      valueOfUserStakedAmountInWETH?.toSignificant(4, {
                        groupSeparator: ','
                      }) ?? '-'
                    } MATIC`}
              </TYPE.body>
            </RowBetween>
            <RowBetween>
              <TYPE.body>{`Your ${currency0?.symbol} reserve:`}</TYPE.body>
              <TYPE.body>
                {`${token0Deposit?.toSignificant(4) ?? '-'}`}
              </TYPE.body>
            </RowBetween>
            <RowBetween>
              <TYPE.body>{`Your ${currency1?.symbol} reserve:`}</TYPE.body>
              <TYPE.body>
                {`${token1Deposit?.toSignificant(4) ?? '-'}`}
              </TYPE.body>
            </RowBetween>
          </StatContainer>
          <BottomSection showBackground={true}>
            <TYPE.body fontWeight={500}>
              <span>Your rate</span>
            </TYPE.body>

            <TYPE.body style={{ textAlign: 'right' }} fontWeight={500}>
              <span
                role="img"
                aria-label="wizard-icon"
                style={{ marginRight: '0.5rem' }}
              >
                ⚡
              </span>
              {`${stakingInfo.rewardRate
                ?.multiply(`${60 * 60 * 24}`)
                ?.toFixed(6, { groupSeparator: ',' })} Credit / day`}
            </TYPE.body>
          </BottomSection>
        </>
      )}
    </Wrapper>
  ) : (
    <span></span>
  )
}
