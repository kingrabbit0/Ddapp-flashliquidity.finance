import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from 'flashliquidity-sdk'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from './WalletConnectConnector'
import { WalletLinkConnector } from './WalletLink'
//import { NetworkConnector } from './NetworkConnector'
import { CustomNetworkConnector } from './CustomNetworkConnector'

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL

export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.REACT_APP_CHAIN_ID ?? '137'
)

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(
    `REACT_APP_NETWORK_URL must be a defined environment variable`
  )
}

/* export const network = new NetworkConnector({
  urls: {
    [Number('137')]: 'https://polygon-rpc.com/'
  }
}) */

export const network = new CustomNetworkConnector({
  urls: {
    [ChainId.MATIC]: 'https://polygon-rpc.com/',
    [ChainId.MUMBAI]: 'https://rpc-mumbai.maticvigil.com/',
    [ChainId.ZKEVM]: 'https://zkevm-rpc.com',
    [ChainId.ZKEVM_TESTNET]: 'https://rpc.public.zkevm-test.net',
    [ChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
    [ChainId.FUJI]: 'https://api.avax-test.network/ext/bc/C/rpc',
    [ChainId.ARBITRUM]: 'https://arb1.arbitrum.io/rpc',
    [ChainId.ARBITRUM_TESTNET]: 'https://sepolia-rollup.arbitrum.io/rpc',
    [ChainId.SEPOLIA]: 'https://rpc.sepolia.org',
    [ChainId.BASE]: 'https://mainnet.base.org',
    [ChainId.BASE_TESTNET]: 'https://sepolia.base.org'
  },
  defaultChainId: ChainId.MATIC
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary =
    networkLibrary ?? new Web3Provider(network.getProvider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [
    137, 80001, 1101, 1442, 43114, 43113, 42161, 421614, 11155111, 84531, 8453
  ]
})

// mainnet only
export const walletconnect = new WalletConnectConnector(137)

//export const plenawallet = new PlenaConnector({
//  supportedChainIds : [137]
//})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'FlashLiquidity',
  appLogoUrl:
    'https://raw.githubusercontent.com/flashliquidity/flashliquidity-token-list/master/logo.png',
  supportedChainIds: [
    137, 80001, 1101, 1442, 43114, 43113, 42161, 421614, 11155111, 84531, 8453
  ]
})
