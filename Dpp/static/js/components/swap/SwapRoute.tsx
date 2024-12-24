import { ChainId, Trade } from 'flashliquidity-sdk'
import React, { Fragment, memo, useContext } from 'react'
import { ChevronRight } from 'react-feather'
import { Flex } from 'rebass'
import { ThemeContext } from 'styled-components/macro'
import { TYPE } from '../../theme'
import CurrencyLogo from '../CurrencyLogo'

export default memo(function SwapRoute({
  chainId,
  trade
}: {
  chainId: ChainId
  trade: Trade
}) {
  const theme = useContext(ThemeContext)
  return (
    <Flex
      px="0.2rem"
      py="0.4rem"
      my="0.4rem"
      style={{ borderRadius: '1rem' }}
      backgroundColor={theme.bg3}
      flexWrap="wrap"
      width="100%"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {trade.route.path.map((token, i, path) => {
        const isLastItem: boolean = i === path.length - 1
        return (
          <Fragment key={i}>
            <Flex my="0.2rem" alignItems="center" style={{ flexShrink: 0 }}>
              <CurrencyLogo chainId={chainId!} currency={token} size="1.5rem" />
              <TYPE.black fontSize={12} color={theme.text1} ml="0.2rem">
                {token.symbol}
              </TYPE.black>
            </Flex>
            {isLastItem ? null : <ChevronRight color={theme.text2} />}
          </Fragment>
        )
      })}
    </Flex>
  )
})
