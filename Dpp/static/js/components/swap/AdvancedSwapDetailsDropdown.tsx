import React from 'react'
import styled from 'styled-components/macro'
import { useLastTruthy } from '../../hooks/useLast'
import {
  AdvancedSwapDetails,
  AdvancedSwapDetailsProps
} from './AdvancedSwapDetails'

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  padding-top: 16px;
  padding-bottom: 16px;
  border-radius: 8px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.bg1};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transition: transform 300ms ease-in-out;
`
export default function AdvancedSwapDetailsDropdown({
  trade,
  ...rest
}: AdvancedSwapDetailsProps) {
  const lastTrade = useLastTruthy(trade)

  return (
    <AdvancedDetailsFooter show={Boolean(trade)}>
      <AdvancedSwapDetails {...rest} trade={trade ?? lastTrade ?? undefined} />
    </AdvancedDetailsFooter>
  )
}
