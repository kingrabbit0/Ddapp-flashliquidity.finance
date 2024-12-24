import { createAction } from '@reduxjs/toolkit'
import { TokenList } from '@uniswap/token-lists'
import { ChainId } from 'flashliquidity-sdk'

export type PopupContent =
  | {
      txn: {
        hash: string
        success: boolean
        summary?: string
      }
    }
  | {
      listUpdate: {
        listUrl: string
        oldList: TokenList
        newList: TokenList
        auto: boolean
      }
    }
  | {
      newNetworkChainId?: ChainId
    }

export enum ApplicationModal {
  WALLET,
  BRIDGE,
  SETTINGS,
  TERMS,
  SELF_CLAIM,
  ADDRESS_CLAIM,
  CLAIM_POPUP,
  FARM,
  CHARTS,
  FLIQ,
  MENU,
  NETWORK_SWITCHER
}

export const updateBlockNumber = createAction<{
  chainId: number
  blockNumber: number
}>('application/updateBlockNumber')
export const setOpenModal = createAction<ApplicationModal | null>(
  'application/setOpenModal'
)
export const addPopup = createAction<{
  key?: string
  removeAfterMs?: number | null
  content: PopupContent
}>('application/addPopup')
export const removePopup = createAction<{ key: string }>(
  'application/removePopup'
)
