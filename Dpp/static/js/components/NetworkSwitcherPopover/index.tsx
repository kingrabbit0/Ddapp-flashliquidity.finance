import React, { ReactNode, useCallback, useRef } from 'react'
import { ChainId } from 'flashliquidity-sdk'
import styled from 'styled-components'
import Option from './Option'
import { ApplicationModal } from '../../state/application/actions'
import {
  useModalOpen,
  useCloseModals,
  useAddPopup
} from '../../state/application/hooks'
import Popover from '../Popover'
import { useActiveWeb3React } from '../../hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { NETWORK_DETAIL } from '../../constants'
import { CustomNetworkConnector } from '../../connectors/CustomNetworkConnector'
import { NETWORK_LOGOS } from '../../constants'
import { NETWORK_LABELS } from '../../constants'

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`

export default function NetworkSwitcherPopover({
  children
}: {
  children: ReactNode
}) {
  const { connector } = useActiveWeb3React()
  const networkSwitcherPopoverOpen = useModalOpen(
    ApplicationModal.NETWORK_SWITCHER
  )
  const popoverRef = useRef(null)
  const addPopup = useAddPopup()
  const closeModals = useCloseModals()
  useOnClickOutside(popoverRef, () => {
    if (networkSwitcherPopoverOpen) closeModals()
  })

  const { chainId, account } = useActiveWeb3React()

  const switchNetwork = useCallback(
    async (networkId: ChainId) => {
      if (connector) {
        const provider = await connector.getProvider()
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: NETWORK_DETAIL[networkId].chainId }]
          })
        } catch (error) {
          console.log(error)
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: NETWORK_DETAIL[networkId].chainId,
                  chainName: NETWORK_DETAIL[networkId].chainName,
                  rpcUrls: NETWORK_DETAIL[networkId].rpcUrls,
                  blockExplorerUrls:
                    NETWORK_DETAIL[networkId].blockExplorerUrls,
                  nativeCurrency: NETWORK_DETAIL[networkId].nativeCurrency
                }
              ]
            })
          } catch (error: any) {
            // user rejects the request to "add chain" or param values are wrong, maybe you didn't use hex above for `chainId`?
            console.log(`wallet_addEthereumChain Error: ${error.message}`)
          }
          // handle other "switch" errors
        }
      }
    },
    [connector]
  )

  const selectNetwork = useCallback(
    (optionChainId: ChainId) => {
      if (optionChainId === chainId) return
      if (connector instanceof CustomNetworkConnector) {
        connector.changeChainId(optionChainId)
      }
      if (
        window.ethereum &&
        NETWORK_DETAIL[optionChainId] &&
        NETWORK_DETAIL[optionChainId].metamaskAddable
      ) {
        addPopup({ newNetworkChainId: optionChainId })
        if (account) {
          switchNetwork(optionChainId)
        }
      }
      closeModals()
    },
    [account, addPopup, chainId, closeModals, connector, switchNetwork]
  )

  return (
    <div ref={popoverRef} style={{}}>
      <Popover
        content={
          <OptionGrid>
            <Option
              onClick={() => {
                selectNetwork(ChainId.MATIC)
              }}
              header={NETWORK_LABELS[ChainId.MATIC]}
              logoSrc={NETWORK_LOGOS[ChainId.MATIC]}
            />
            <Option
              onClick={() => {
                selectNetwork(ChainId.ZKEVM)
              }}
              header={NETWORK_LABELS[ChainId.ZKEVM]}
              logoSrc={NETWORK_LOGOS[ChainId.ZKEVM]}
            />
            <Option
              onClick={() => {
                selectNetwork(ChainId.AVALANCHE)
              }}
              header={NETWORK_LABELS[ChainId.AVALANCHE]}
              logoSrc={NETWORK_LOGOS[ChainId.AVALANCHE]}
            />
            <Option
              onClick={() => {
                selectNetwork(ChainId.ARBITRUM)
              }}
              header={NETWORK_LABELS[ChainId.ARBITRUM]}
              logoSrc={NETWORK_LOGOS[ChainId.ARBITRUM]}
            />
            <Option
              onClick={() => {
                selectNetwork(ChainId.BASE)
              }}
              header={NETWORK_LABELS[ChainId.BASE]}
              logoSrc={NETWORK_LOGOS[ChainId.BASE]}
            />
          </OptionGrid>
        }
        show={networkSwitcherPopoverOpen}
      >
        {children}
      </Popover>
    </div>
  )
}
