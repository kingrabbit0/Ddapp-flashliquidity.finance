/* eslint-disable @typescript-eslint/no-empty-function */
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { darken, lighten } from 'polished'
import React, { useMemo } from 'react'
import { Activity } from 'react-feather'

import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { NetworkContextName } from '../../constants'
import useENSName from '../../hooks/useENSName'
import { useWalletModalToggle } from '../../state/application/hooks'
import {
  isTransactionRecent,
  useAllTransactions
} from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { ButtonSecondary } from '../Button'
import Loader from '../Loader'

import { RowBetween } from '../Row'
import WalletModal from '../WalletModal'

//import { ChainId } from 'flashliquidity-sdk'
import { useActiveWeb3React } from '../../hooks'

const Web3StatusGeneric = styled(ButtonSecondary)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`

const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
  background-color: ${({ theme }) => theme.primary1};
  border: none;
  color: ${({ theme }) => theme.primaryText1};
  font-weight: 500;

  :hover,
  :focus {
    border: 2px solid ${({ theme }) => darken(0.05, theme.primary3)};
    color: ${({ theme }) => theme.primaryText1};
  }

  ${({ faded }) =>
    faded &&
    css`
      background-color: ${({ theme }) => theme.primary1};
      border: 2px solid ${({ theme }) => theme.primary3};
      color: ${({ theme }) => theme.primaryText1};

      :hover,
      :focus {
        border: 2px solid ${({ theme }) => darken(0.05, theme.bg3)};
        color: ${({ theme }) => darken(0.05, theme.primaryText1)};
      }
    `}
`

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background-color: ${({ pending, theme }) =>
    pending ? theme.primary1 : theme.bg2};
  border: 1px solid
    ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg3)};
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ pending, theme }) =>
      pending ? darken(0.05, theme.primary1) : lighten(0.05, theme.bg2)};

    :focus {
      border: 1px solid
        ${({ pending, theme }) =>
          pending ? darken(0.1, theme.primary1) : darken(0.1, theme.bg3)};
    }
  }
`

const Text = styled.p<{ fontSize?: number }>`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
  ${({ fontSize }) => (fontSize ? `font-size:${fontSize}px` : '')};
`

const NetworkIcon = styled(Activity)`
  width: 15px;
  height: 15px;
`

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function Web3StatusInner() {
  const { t } = useTranslation()
  const { account, error } = useWeb3React()
  const { chainId: networkConnectorChainId } = useActiveWeb3React()

  //const { ENSName } = useENSName(account ?? undefined)
  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions
    .filter(tx => !tx.receipt)
    .map(tx => tx.hash)

  const hasPendingTransactions = !!pending.length
  const toggleWalletModal = useWalletModalToggle()

  if (error) {
    console.error('webstatusinner err:', error)
    return (
      <Web3StatusError onClick={toggleWalletModal}>
        <NetworkIcon />
        <Text>
          {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}
        </Text>
      </Web3StatusError>
    )
  }
  if (networkConnectorChainId) {
    return (
      <>
        {!!account ? (
          <Web3StatusConnected
            id="web3-status-connected"
            onClick={toggleWalletModal}
            pending={hasPendingTransactions}
          >
            {hasPendingTransactions ? (
              <RowBetween>
                <Text fontSize={13}>{pending?.length} Pending</Text>{' '}
                <Loader size="12px" />
              </RowBetween>
            ) : null}
          </Web3StatusConnected>
        ) : (
          <Web3StatusConnect
            id="connect-wallet"
            onClick={toggleWalletModal}
            faded={!account}
          >
            {t('Connect Wallet')}
          </Web3StatusConnect>
        )}
      </>
    )
  }
  return null
}

export default function Web3Status() {
  const { active, account } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions
    .filter(tx => !tx.receipt)
    .map(tx => tx.hash)
  const confirmed = sortedRecentTransactions
    .filter(tx => tx.receipt)
    .map(tx => tx.hash)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal
        ENSName={ENSName ?? undefined}
        pendingTransactions={pending}
        confirmedTransactions={confirmed}
      />
    </>
  )
}
