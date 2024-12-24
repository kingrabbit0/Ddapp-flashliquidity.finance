import { Currency, ChainId } from 'flashliquidity-sdk'
import React from 'react'
import styled from 'styled-components/macro'
import CurrencyLogo from '../CurrencyLogo'

const Wrapper = styled.div<{ margin: boolean; sizeraw: number }>`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-right: ${({ sizeraw, margin }) =>
    margin && (sizeraw / 3 + 8).toString() + 'px'};
`

interface DoubleCurrencyLogoProps {
  margin?: boolean
  size?: number
  chainId: ChainId
  currency0?: Currency
  currency1?: Currency
}

const HigherLogo = styled(CurrencyLogo)`
  z-index: 2;
`
const CoveredLogo = styled(CurrencyLogo)<{ sizeraw: number }>`
  position: absolute;
  left: ${({ sizeraw }) => '-' + (sizeraw / 2).toString() + 'px'} !important;
`

export default function DoubleCurrencyLogo({
  chainId,
  currency0,
  currency1,
  size = 16,
  margin = false
}: DoubleCurrencyLogoProps) {
  return (
    <Wrapper sizeraw={size} margin={margin}>
      {currency0 && (
        <HigherLogo
          chainId={chainId}
          currency={currency0}
          size={size.toString() + 'px'}
        />
      )}
      {currency1 && (
        <CoveredLogo
          chainId={chainId}
          currency={currency1}
          size={size.toString() + 'px'}
          sizeraw={size}
        />
      )}
    </Wrapper>
  )
}
