import {
  ChainId,
  JSBI,
  Percent,
  Token,
  WETH,
  Fraction
} from 'flashliquidity-sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'
import Polygon from '../assets/images/matic.png'
import PolygonHermez from '../assets/images/polygon-hermez-logo.png'
import Avalanche from '../assets/images/avalanche.png'
import Arbitrum from '../assets/images/arbitrum.png'
import Base from '../assets/images/base.png'
import Ethereum from '../assets/images/ethereum-logo.png'

import {
  injected,
  walletconnect,
  /* walletconnect, */ walletlink
} from '../connectors'

export const ROUTER_ADDRESS = '0xaf5990f587f4e10aE0361f657712F9B1067e25b3'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const USDC_MULTI: { [chainId: number]: Token } = {
  [ChainId.BASE]: new Token(
    ChainId.BASE,
    '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    6,
    'USDC',
    'USD Coin'
  ),
  [ChainId.BASE_TESTNET]: new Token(
    ChainId.BASE_TESTNET,
    '0x2e668Bb88287675e34c8dF82686dfd0b7F0c0383',
    6,
    'USDC',
    'USD Coin'
  ),
  [ChainId.MATIC]: new Token(
    ChainId.MATIC,
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    6,
    'USDC',
    'USD Coin'
  ),
  [ChainId.MUMBAI]: new Token(
    ChainId.MUMBAI,
    '0xF493Af87835D243058103006e829c72f3d34b891',
    6,
    'USDC',
    'USD Coin'
  ),
  [ChainId.ZKEVM]: new Token(
    ChainId.ZKEVM,
    '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035',
    6,
    'USDC',
    'USD Coin'
  ),
  [ChainId.ZKEVM_TESTNET]: new Token(
    ChainId.ZKEVM_TESTNET,
    '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035',
    6,
    'USDC',
    'USD Coin'
  ),
  [ChainId.AVALANCHE]: new Token(
    ChainId.AVALANCHE,
    '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    6,
    'USDC',
    'USD Coin'
  ),
  [ChainId.FUJI]: new Token(
    ChainId.FUJI,
    '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    6,
    'USDC',
    'USD Coin'
  ),
  [ChainId.ARBITRUM]: new Token(
    ChainId.ARBITRUM,
    '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    6,
    'USDC',
    'USD Coin'
  ),
  [ChainId.ARBITRUM_TESTNET]: new Token(
    ChainId.ARBITRUM_TESTNET,
    '0xe97A5e6C4670DD6fDeA0B5C3E304110eB0e599d9',
    6,
    'USDC',
    'USD Coin'
  )
}

export const WBTC = new Token(
  ChainId.MATIC,
  '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
  18,
  'WBTC',
  'Wrapped Bitcoin'
)
export const ETHER = new Token(
  ChainId.MATIC,
  '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  18,
  'ETH',
  'Ether'
)
export const USDC = new Token(
  ChainId.MATIC,
  '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  6,
  'USDC',
  'USDC'
)
export const USDT = new Token(
  ChainId.MATIC,
  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  18,
  'USDT',
  'Tether USD'
)
export const DAI = new Token(
  ChainId.MATIC,
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const FRAX = new Token(
  ChainId.MATIC,
  '0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89',
  18,
  'FRAX',
  'Frax'
)
export const MAI = new Token(
  ChainId.MATIC,
  '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1',
  18,
  'MAI',
  'miMATIC'
)
export const LINK = new Token(
  ChainId.MATIC,
  '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
  18,
  'LINK',
  'ChainLink'
)
export const AAVE = new Token(
  ChainId.MATIC,
  '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
  18,
  'AAVE',
  'Aave'
)
export const CRV = new Token(
  ChainId.MATIC,
  '0x172370d5Cd63279eFa6d502DAB29171933a610AF',
  18,
  'CRV',
  'Curve DAO Token'
)
export const GRT = new Token(
  ChainId.MATIC,
  '0x5fe2B58c013d7601147DcdD68C143A77499f5531',
  18,
  'GRT',
  'The Graph'
)
export const QI = new Token(
  ChainId.MATIC,
  '0x580A84C73811E1839F75d86d75d88cCa0c241fF4',
  18,
  'QI',
  'Qi Dao'
)
export const MANA = new Token(
  ChainId.MATIC,
  '0xA1c57f48F0Deb89f569dFbE6E2B7f46D33606fD4',
  18,
  'MANA',
  'Decentraland'
)
export const SAND = new Token(
  ChainId.MATIC,
  '0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683',
  18,
  'SAND',
  'Sandbox'
)
export const GHST = new Token(
  ChainId.MATIC,
  '0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7',
  18,
  'GHST',
  'Aavegotchi'
)
export const FTM = new Token(
  ChainId.MATIC,
  '0xC9c1c1c20B3658F8787CC2FD702267791f224Ce1',
  18,
  'FTM',
  'Fantom Token'
)
export const AVAX = new Token(
  ChainId.MATIC,
  '0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b',
  18,
  'AVAX',
  'Avalanche'
)
export const SOL = new Token(
  ChainId.MATIC,
  '0x7DfF46370e9eA5f0Bad3C4E29711aD50062EA7A4',
  18,
  'SOL',
  'Solana'
)
export const UNISWAP = new Token(
  ChainId.MATIC,
  '0xb33EaAd8d922B1083446DC23f610c2567fB5180f',
  18,
  'UNI',
  'Uniswap'
)
export const SUSHI = new Token(
  ChainId.MATIC,
  '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
  18,
  'SUSHI',
  'Sushiswap'
)
export const QUICK = new Token(
  ChainId.MATIC,
  '0x831753DD7087CaC61aB5644b308642cc1c33Dc13',
  18,
  'QUICK',
  'Quickswap'
)
export const ELON = new Token(
  ChainId.MATIC,
  '0xE0339c80fFDE91F3e20494Df88d4206D86024cdF',
  18,
  'ELON',
  'Dogelon'
)
export const SHIB = new Token(
  ChainId.MATIC,
  '0x6f8a06447Ff6FcF75d803135a7de15CE88C1d4ec',
  18,
  'SHIB',
  'Shiba Inu'
)
export const SX = new Token(
  ChainId.MATIC,
  '0x840195888Db4D6A99ED9F73FcD3B225Bb3cB1A79',
  18,
  'SX',
  'SportX'
)
export const FL_MATIC_USDC = new Token(
  ChainId.MATIC,
  '0x03A3Ee62eAc79Ab0Ab8a2a7C8aF2CF92356F33a8',
  18,
  'stFLASH',
  'fl-MATIC/USDC'
)
export const FL_USDC_ETH = new Token(
  ChainId.MATIC,
  '0xd8FEce47db7711A05ea873e5D606a07f36EcDA27',
  18,
  'stFLASH',
  'fl-USDC/ETH'
)
export const FL_ETH_LINK = new Token(
  ChainId.MATIC,
  '0x329338aBd017bA9247bCF052Cc0CF2ed9a506FDE',
  18,
  'stFLASH',
  'fl-ETH/LINK'
)
export const FL_ETH_AAVE = new Token(
  ChainId.MATIC,
  '0x6a3f75DcFb02d786De8877D68429D1F07B3163fc',
  18,
  'stFLASH',
  'fl-ETH/AAVE'
)
export const FL_MATIC_USDC_OLD = new Token(
  ChainId.MATIC,
  '0x7EDBf73Cb7b2bC33969caD13948c182e850174cC',
  18,
  'stFLASH',
  'fl-MATIC/USDC'
)
export const FL_USDC_ETH_OLD = new Token(
  ChainId.MATIC,
  '0xa0e9eA553a25D60cDddB2f1938C1Fc2Ad41c0CbC',
  18,
  'stFLASH',
  'fl-USDC/ETH'
)
export const FL_ETH_LINK_OLD = new Token(
  ChainId.MATIC,
  '0xC2BaF9C81850B8D66273C871406eFcC172172C0a',
  18,
  'stFLASH',
  'fl-ETH/LINK'
)
export const FL_ETH_AAVE_OLD = new Token(
  ChainId.MATIC,
  '0xECC1F7c9D5E5f97C7D6Fba5B8079eEfDdbB4197e',
  18,
  'stFLASH',
  'fl-ETH/AAVE'
)
export const MATIC_ZKEVM = new Token(
  ChainId.ZKEVM,
  '0xa2036f0538221a77A3937F1379699f44945018d0',
  18,
  'MATIC',
  'Polygon'
)
export const SBP_ETH_USDC = new Token(
  ChainId.ARBITRUM,
  '0x690F8C3eFF2fD7e5494319F4BDf9114d3B52885e',
  18,
  'SBP-ETH/USDC',
  'SBP-ETH/USDC'
)
export const ETHER_ARB = new Token(
  ChainId.ARBITRUM,
  '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  18,
  'ETH',
  'Ether'
)
export const FLIQ = new Token(
  ChainId.MUMBAI,
  '0x9e05E935C4d2e34980D4913B0fC01fC3dd60b7D5',
  18,
  'FLIQ',
  'FlashLiquidity'
)
//export const  = new Token(ChainId.MATIC, '', 18, '', '')
export const MATIC = WETH[ChainId.MATIC]
// TODO this is only approximate, it's actually based on blocks
export const PROPOSAL_LENGTH_IN_DAYS = 7

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F' //TODO: MATIC

const UNI_ADDRESS = '0x03079F967A37cCAc6eb01d5dcC98FC45E6b57517' //TODO: MATIC FLIQ

export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.ETHEREUM]: new Token(
    ChainId.ETHEREUM,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  ),
  [ChainId.SEPOLIA]: new Token(
    ChainId.SEPOLIA,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  ),
  [ChainId.BASE]: new Token(
    ChainId.BASE,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  ),
  [ChainId.BASE_TESTNET]: new Token(
    ChainId.BASE_TESTNET,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  ),
  [ChainId.MATIC]: new Token(
    ChainId.MATIC,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  ),
  [ChainId.MUMBAI]: new Token(
    ChainId.MUMBAI,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  ),
  [ChainId.ZKEVM_TESTNET]: new Token(
    ChainId.ZKEVM_TESTNET,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  ),
  [ChainId.ZKEVM]: new Token(
    ChainId.ZKEVM,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  ),
  [ChainId.AVALANCHE]: new Token(
    ChainId.AVALANCHE,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  ),
  [ChainId.FUJI]: new Token(
    ChainId.FUJI,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  ),
  [ChainId.ARBITRUM]: new Token(
    ChainId.ARBITRUM,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  ),
  [ChainId.ARBITRUM_TESTNET]: new Token(
    ChainId.ARBITRUM_TESTNET,
    UNI_ADDRESS,
    18,
    'FLIQ',
    'FlashLiquidity'
  )
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MATIC]: '0x4087F566796b46eEB01A38174c06E2f9924eAea8' //TODO: MATIC
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.SEPOLIA]: [WETH[ChainId.MUMBAI]],
  [ChainId.ETHEREUM]: [WETH[ChainId.MATIC]],
  [ChainId.BASE_TESTNET]: [WETH[ChainId.BASE_TESTNET]],
  [ChainId.BASE]: [WETH[ChainId.BASE]],
  [ChainId.MUMBAI]: [WETH[ChainId.MUMBAI]],
  [ChainId.MATIC]: [WETH[ChainId.MATIC]],
  [ChainId.ZKEVM_TESTNET]: [WETH[ChainId.ZKEVM_TESTNET]],
  [ChainId.ZKEVM]: [WETH[ChainId.ZKEVM]],
  [ChainId.FUJI]: [WETH[ChainId.FUJI]],
  [ChainId.AVALANCHE]: [WETH[ChainId.AVALANCHE]],
  [ChainId.ARBITRUM_TESTNET]: [WETH[ChainId.ARBITRUM_TESTNET]],
  [ChainId.ARBITRUM]: [WETH[ChainId.ARBITRUM]]
}

//const WETH_ETH_ONLY: ChainTokenList = {

//  [ChainId.MUMBAI]: [[WETH[ChainId.MUMBAI], ETHER],
//  [ChainId.MATIC]: [[WETH[ChainId.MATIC], ETHER]
//}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MATIC]: [...WETH_ONLY[ChainId.MATIC], DAI, ETHER, MAI],
  [ChainId.ZKEVM]: [
    ...WETH_ONLY[ChainId.ZKEVM],
    USDC_MULTI[ChainId.ZKEVM],
    MATIC_ZKEVM
  ]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] }
} = {}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MATIC]: [ETHER, LINK, USDC_MULTI[ChainId.MATIC], DAI],
  [ChainId.ZKEVM]: [USDC_MULTI[ChainId.ZKEVM]],
  [ChainId.AVALANCHE]: [USDC_MULTI[ChainId.AVALANCHE]],
  [ChainId.BASE]: [USDC_MULTI[ChainId.BASE]]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MATIC]: [...WETH_ONLY[ChainId.MATIC], DAI, ETHER, MAI],
  [ChainId.ZKEVM]: [...WETH_ONLY[ChainId.ZKEVM]]
}

export const PINNED_PAIRS: {
  readonly [chainId in ChainId]?: [Token, Token][]
} = {
  [ChainId.MATIC]: [],
  [ChainId.ZKEVM]: []
}

export const NETWORK_LABELS: { [chainId in ChainId]: string | undefined } = {
  [ChainId.ETHEREUM]: 'Ethereum',
  [ChainId.SEPOLIA]: 'Sepolia',
  [ChainId.BASE]: 'Base',
  [ChainId.BASE_TESTNET]: 'Base Goerli',
  [ChainId.MUMBAI]: 'Mumbai',
  [ChainId.MATIC]: 'Polygon',
  [ChainId.ZKEVM_TESTNET]: 'zkEVM Testnet',
  [ChainId.ZKEVM]: 'zkEVM',
  [ChainId.FUJI]: 'Fuji',
  [ChainId.AVALANCHE]: 'Avalanche',
  [ChainId.ARBITRUM]: 'Arbitrum',
  [ChainId.ARBITRUM_TESTNET]: 'Arbitrum Sepolia'
}

export const NETWORK_LOGOS: { [chainId in ChainId]: string | undefined } = {
  [ChainId.ETHEREUM]: Ethereum,
  [ChainId.SEPOLIA]: Ethereum,
  [ChainId.BASE]: Base,
  [ChainId.BASE_TESTNET]: Base,
  [ChainId.MUMBAI]: Polygon,
  [ChainId.MATIC]: Polygon,
  [ChainId.ZKEVM_TESTNET]: PolygonHermez,
  [ChainId.ZKEVM]: PolygonHermez,
  [ChainId.FUJI]: Avalanche,
  [ChainId.AVALANCHE]: Avalanche,
  [ChainId.ARBITRUM]: Arbitrum,
  [ChainId.ARBITRUM_TESTNET]: Arbitrum
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  METAMASK_MOBILE: {
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Open in MetaMask app.',
    href: 'https://metamask.app.link/dapp/app.flashliquidityai.com',
    color: '#E8831D',
    mobile: true,
    mobileOnly: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5',
    mobile: true
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const ONE_BIPS_FRACTION = new Fraction(
  JSBI.BigInt(1),
  JSBI.BigInt(10000)
)
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(
  JSBI.BigInt(100),
  BIPS_BASE
) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(
  JSBI.BigInt(300),
  BIPS_BASE
) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(
  JSBI.BigInt(500),
  BIPS_BASE
) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(
  JSBI.BigInt(1000),
  BIPS_BASE
) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(
  JSBI.BigInt(1500),
  BIPS_BASE
) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(
  JSBI.BigInt(75),
  JSBI.BigInt(10000)
)

// the Uniswap Default token list lives here
export const DEFAULT_TOKEN_LIST_URL =
  'https://raw.githubusercontent.com/flashliquidity/flashliquidity-token-list/master/token-list.json'

interface NetworkDetails {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
  metamaskAddable?: boolean
}

/* [ChainId.MATIC]: 'https://polygon-rpc.com/',
[ChainId.MUMBAI]: 'https://rpc-mumbai.maticvigil.com/',
[ChainId.ZKEVM]: 'https://zkevm-rpc.com',
[ChainId.ZKEVM_TESTNET]: 'https://rpc.public.zkevm-test.net',
[ChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
[ChainId.FUJI]: 'https://api.avax-test.network/ext/bc/C/rpc',
[ChainId.ARBITRUM]: 'https://arb1.arbitrum.io/rpc',
[ChainId.ARBITRUM_TESTNET]: 'https://sepolia-rollup.arbitrum.io/rpc',
[ChainId.SEPOLIA]: 'https://rpc.sepolia.org',
[ChainId.BASE]: 'https://mainnet.base.org',
[ChainId.BASE_TESTNET]: 'https://sepolia.base.org' */

export const NETWORK_DETAIL: { [chainId: number]: NetworkDetails } = {
  [ChainId.MATIC]: {
    chainId: `0x${ChainId.MATIC.toString(16)}`,
    chainName: 'Polygon',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
    metamaskAddable: true
  },
  [ChainId.MUMBAI]: {
    chainId: `0x${ChainId.MUMBAI.toString(16)}`,
    chainName: 'Mumbai',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    metamaskAddable: true
  },
  [ChainId.ZKEVM]: {
    chainId: `0x${ChainId.ZKEVM.toString(16)}`,
    chainName: 'zkEVM',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://zkevm-rpc.com'],
    blockExplorerUrls: ['https://zkevm.polygonscan.com/'],
    metamaskAddable: true
  },
  [ChainId.ZKEVM_TESTNET]: {
    chainId: `0x${ChainId.ZKEVM_TESTNET.toString(16)}`,
    chainName: 'zkEVM Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [''],
    blockExplorerUrls: [''],
    metamaskAddable: true
  },
  [ChainId.AVALANCHE]: {
    chainId: `0x${ChainId.AVALANCHE.toString(16)}`,
    chainName: 'Avalanche',
    nativeCurrency: {
      name: 'Avax',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io/'],
    metamaskAddable: true
  },
  [ChainId.FUJI]: {
    chainId: `0x${ChainId.FUJI.toString(16)}`,
    chainName: 'Fuji',
    nativeCurrency: {
      name: 'Avax',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io'],
    metamaskAddable: true
  },
  [ChainId.ARBITRUM]: {
    chainId: `0x${ChainId.ARBITRUM.toString(16)}`,
    chainName: 'Arbitrum',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://explorer.arbitrum.io'],
    metamaskAddable: true
  },
  [ChainId.ARBITRUM_TESTNET]: {
    chainId: `0x${ChainId.ARBITRUM_TESTNET.toString(16)}`,
    chainName: 'Arbitrum Testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://sepolia.arbiscan.io'],
    metamaskAddable: true
  },
  [ChainId.BASE]: {
    chainId: `0x${ChainId.BASE.toString(16)}`,
    chainName: 'Base',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://base.llamarpc.com'],
    blockExplorerUrls: ['https://basescan.org'],
    metamaskAddable: true
  },
  [ChainId.BASE_TESTNET]: {
    chainId: `0x${ChainId.BASE_TESTNET.toString(16)}`,
    chainName: 'Base testnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://sepolia.base.org'],
    blockExplorerUrls: ['https://sepolia-explorer.base.org'],
    metamaskAddable: true
  },
  [ChainId.SEPOLIA]: {
    chainId: `0x${ChainId.SEPOLIA.toString(16)}`,
    chainName: 'Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
    metamaskAddable: true
  }
}
