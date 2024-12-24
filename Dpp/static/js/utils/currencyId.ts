import { ChainId, Currency, ETHER, Token } from 'flashliquidity-sdk'

export function currencyId(chainId: ChainId, currency: Currency): string {
  if (currency === ETHER[chainId!]) return 'ETH'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
