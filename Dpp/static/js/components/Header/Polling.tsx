import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components/macro'

import { useBlockNumber } from '../../state/application/hooks'

const StyledPolling = styled.div`
  display: flex;
  padding-right: 0.25rem;
  color: ${({ theme }) => theme.green1};
  border-radius: 16px;
`

const StyledPollingDot = styled.div`
  width: 8px;
  height: 8px;
  min-height: 8px;
  min-width: 8px;
  margin-left: 0.5rem;
  margin-top: 3px;
  border-radius: 50%;
  position: relative;
  background-color: ${({ theme }) => theme.green1};
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  animation: ${rotate360} 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
  transform: translateZ(0);

  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-left: 2px solid ${({ theme }) => theme.green1};
  background: transparent;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  position: relative;

  left: -3px;
  top: -3px;
`

export default function Polling() {
  const [lastBlockNumber, setLastBlockNumber] = useState(0)
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now())

  // State to indicate if the block number has been stagnant
  const [isStagnant, setIsStagnant] = useState(false)

  const blockNumber = useBlockNumber()

  const [isMounted, setIsMounted] = useState(true)

  useEffect(
    () => {
      const timer1 = setTimeout(() => setIsMounted(true), 2000)
      if (blockNumber && blockNumber !== lastBlockNumber) {
        setLastBlockNumber(blockNumber)
        setLastUpdateTime(Date.now())
        setIsStagnant(false) // Reset the stagnant state when the block number changes
      }
      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => {
        setIsMounted(false)
        clearTimeout(timer1)
      }
    },
    [blockNumber, lastBlockNumber] //useEffect will run only one time
    //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  )

  useEffect(() => {
    // Set up an interval to check if the block number has been stagnant
    const interval = setInterval(() => {
      const now = Date.now()
      if (now - lastUpdateTime > 60000 && !isStagnant) {
        // If the current time is more than the timeout since the last update, and the block number is stagnant
        setIsStagnant(true)
      }
    }, 2000)

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval)
  }, [lastUpdateTime, isStagnant])

  return (
    <StyledPolling style={{ color: isStagnant ? '#f21b29' : '#00e5b9' }}>
      <StyledPollingDot
        style={{ backgroundColor: isStagnant ? '#f21b29' : '#00e5b9' }}
      >
        {!isMounted && <Spinner />}
      </StyledPollingDot>
    </StyledPolling>
  )
}
