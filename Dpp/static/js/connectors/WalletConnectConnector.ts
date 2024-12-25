import {
  EthereumProvider,
  EthereumProviderOptions,
} from '@walletconnect/ethereum-provider/dist/types/EthereumProvider'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { ConnectorUpdate } from '@web3-react/types'
import invariant from 'tiny-invariant'

export const URI_AVAILABLE = 'URI_AVAILABLE'

export class UserRejectedRequestError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}

export class WalletConnectConnector extends AbstractConnector {
  private readonly config: EthereumProviderOptions

  public walletConnectProvider?: EthereumProvider

  constructor(defaultChainId: number) {
    super()
    this.config = {
      chains: [defaultChainId],
      optionalChains: [
        137, 80001, 1101, 1442, 43114, 43113, 42161, 421614, 11155111, 84532,
        8453,
      ], // Assert type here
      rpcMap: {
        137: 'https://polygon-rpc.com/',
        80001: 'https://rpc-mumbai.maticvigil.com/',
        1101: 'https://zkevm-rpc.com',
        1442: 'https://rpc.public.zkevm-test.net',
        43114: 'https://api.avax.network/ext/bc/C/rpc',
        43113: 'https://api.avax-test.network/ext/bc/C/rpc',
        42161: 'https://arb1.arbitrum.io/rpc',
        421614: 'https://sepolia-rollup.arbitrum.io/rpc',
        11155111: 'https://rpc.sepolia.org',
        84532: 'https://sepolia.base.org',
        8453: 'https://base.llamarpc.com',
      },
      projectId: 'b2642f3879d12e45ad5f56697e4efc70',
      showQrModal: true,
      //disableProviderPing: true,
      /*       qrModalOptions: {
        themeVariables: {
          '--wcm-z-index': '3000'
        }
      }, */
      /*       methods: [
        'eth_sendTransaction',
        'personal_sign',
        'wallet_switchEthereumChain',
        'wallet_addEthereumChain'
      ],
      optionalMethods: [
        'eth_accounts',
        'eth_requestAccounts',
        'eth_sign',
        'eth_signTypedData_v4',
      ],
      events: ['chainChanged', 'accountsChanged'],
      optionalEvents: ['disconnect'], */
      metadata: {
        name: 'FlashLiquidity',
        description: 'FlashLiquidity Interface',
        url: 'https://app.flashliquidityai.com', // origin must match your domain & subdomain
        icons: ['	https://avatars.githubusercontent.com/u/91729903'],
      },
    }

    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  private handleChainChanged(chainId: number | string): void {
    this.emitUpdate({ chainId })
  }

  private handleAccountsChanged(accounts: string[]): void {
    this.emitUpdate({ account: accounts[0] })
  }

  private handleDisconnect(): void {
    this.emitDeactivate()
  }

  private handleDisplayURI = (uri: string): void => {
    this.emit(URI_AVAILABLE, uri)
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!this.walletConnectProvider) {
      const walletConnectProviderFactory = await import(
        '@walletconnect/ethereum-provider'
      )
        .then()
        .then((m) => m?.default ?? m)
      this.walletConnectProvider = await walletConnectProviderFactory.init(
        this.config
      )
    }

    this.walletConnectProvider.on('chainChanged', this.handleChainChanged)
    this.walletConnectProvider.on('accountsChanged', this.handleAccountsChanged)
    this.walletConnectProvider.on('disconnect', this.handleDisconnect)
    this.walletConnectProvider.on('display_uri', this.handleDisplayURI)
    try {
      const accounts = await this.walletConnectProvider.enable()
      const defaultAccount = accounts[0]
      return { provider: this.walletConnectProvider, account: defaultAccount }
    } catch (error: any) {
      if (error.message === 'Connection request reset. Please try again.') {
        throw new UserRejectedRequestError()
      }
      throw error
    }
  }

  public async getProvider(): Promise<any> {
    return this.walletConnectProvider
  }

  public async getChainId(): Promise<number | string> {
    invariant(
      this.walletConnectProvider,
      'WalletConnectProvider should exist when calling getChainId'
    )
    return Promise.resolve(this.walletConnectProvider.chainId)
  }

  public async getAccount(): Promise<null | string> {
    invariant(
      this.walletConnectProvider,
      'WalletConnectProvider should exist when calling getAccount'
    )
    return Promise.resolve(this.walletConnectProvider.accounts).then(
      (accounts: string[]): string => accounts[0]
    )
  }

  public deactivate() {
    if (this.walletConnectProvider) {
      this.walletConnectProvider.removeListener(
        'disconnect',
        this.handleDisconnect
      )
      this.walletConnectProvider.removeListener(
        'chainChanged',
        this.handleChainChanged
      )
      this.walletConnectProvider.removeListener(
        'accountsChanged',
        this.handleAccountsChanged
      )
      this.walletConnectProvider.removeListener(
        'display_uri',
        this.handleDisplayURI
      )
      this.walletConnectProvider.disconnect()

      this.walletConnectProvider = undefined
      localStorage.removeItem('walletProvider')
    }
  }

  public async close() {
    this.emitDeactivate()
  }
}
