import React from 'react'
import { Price } from 'flashliquidity-sdk'
import { useContext } from 'react'
import { Repeat } from 'react-feather'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components/macro'
import { StyledBalanceMaxMini } from './styleds'

interface TradePriceProps {
  price?: Price
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

export default function TradePrice({
  price,
  showInverted,
  setShowInverted
}: TradePriceProps) {
  const theme = useContext(ThemeContext)

  const formattedPrice = showInverted
    ? price?.toSignificant(6)
    : price?.invert()?.toSignificant(6)

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = showInverted
    ? `${price?.quoteCurrency?.symbol} per ${price?.baseCurrency?.symbol}`
    : `${price?.baseCurrency?.symbol} per ${price?.quoteCurrency?.symbol}`

  return (
    <Text
      fontWeight={500}
      fontSize={12}
      color={theme.text1}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}
    >
      {show ? (
        <>
          <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
            <Repeat size={12} />
          </StyledBalanceMaxMini>
          {formattedPrice ?? '-'} {label}
        </>
      ) : (
        '-'
      )}
    </Text>
  )
}
