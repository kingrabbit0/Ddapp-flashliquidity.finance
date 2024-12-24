import { ChainId, Currency, Token, ETHER } from 'flashliquidity-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components/macro'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
//import GraphLogo from '../../assets/images/graph.png'
//import SolanaLogo from '../../assets/images/solana.png'
import MaticLogo from '../../assets/images/matic.png'
import AvalancheLogo from '../../assets/images/avalanche.png'
//import ManaLogo from '../../assets/images/mana.png'
import FliqLogo from '../../assets/images/fliq.png'
//import SandLogo from '../../assets/images/sand.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'
import {
  UNI,
  ETHER as ETH,
  /*GRT, SOL,*/ MATIC /*, MANA, SAND*/,
  FLIQ
} from '../../constants'

const getTokenLogoURL = (address: string, chainName: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainName}/assets/${address}/logo.png`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

export default function CurrencyLogo({
  chainId,
  currency,
  size = '24px',
  style
}: {
  chainId: ChainId
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(
    currency instanceof WrappedTokenInfo ? currency.logoURI : undefined
  )

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER[chainId]) return []
    let networkName: string
    if (chainId === 137) {
      networkName = 'polygon'
    } else if (chainId === 1101) {
      networkName = 'polygonzkevm'
    } else if (chainId === 43114) {
      networkName = 'avalanche'
    } else if (chainId === 8453) {
      networkName = 'base'
    } else if (chainId === 1) {
      networkName = 'ethereum'
    } else if (chainId === 42161) {
      networkName = 'arbitrum'
    } else if (chainId === 421614) {
      networkName = 'sepolia'
    }

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [
          ...uriLocations,
          getTokenLogoURL(currency.address, networkName!)
        ]
      }

      return [getTokenLogoURL(currency.address, networkName!)]
    }
    return []
  }, [chainId, currency, uriLocations])

  if (currency === ETHER[ChainId.MATIC] || currency === ETHER[ChainId.MUMBAI]) {
    return <StyledEthereumLogo src={MaticLogo} size={size} style={style} />
  } else if (
    currency === ETHER[ChainId.ZKEVM] ||
    currency === ETHER[ChainId.ZKEVM_TESTNET]
  ) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  } else if (
    currency === ETHER[ChainId.AVALANCHE] ||
    currency === ETHER[ChainId.FUJI]
  ) {
    return <StyledEthereumLogo src={AvalancheLogo} size={size} style={style} />
  } else if (
    currency === ETHER[ChainId.BASE] ||
    currency === ETHER[ChainId.BASE_TESTNET]
  ) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  } else if (
    currency === ETHER[ChainId.ARBITRUM] ||
    currency === ETHER[ChainId.ARBITRUM_TESTNET]
  ) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  } else if (
    currency === ETHER[ChainId.ETHEREUM] ||
    currency === ETHER[ChainId.SEPOLIA]
  ) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  }

  if (currency instanceof Token) {
    if (currency?.address === MATIC.address) {
      return <StyledEthereumLogo src={MaticLogo} size={size} style={style} />
    } else if (currency?.address === UNI[ChainId.MATIC].address) {
      return <StyledEthereumLogo src={FliqLogo} size={size} style={style} />
    } else if (currency?.address === FLIQ.address) {
      return <StyledEthereumLogo src={FliqLogo} size={size} style={style} />
    } else if (currency?.address === ETH.address) {
      return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
    }
    /*else if (currency?.address === SAND.address) {
      return <StyledEthereumLogo src={SandLogo} size={size} style={style} />
    }
    else if (currency?.address === MANA.address) {
      return <StyledEthereumLogo src={ManaLogo} size={size} style={style} />
    }
    else if (currency?.address === GRT.address) {
      return <StyledEthereumLogo src={GraphLogo} size={size} style={style} />
    }
    else if (currency?.address === SOL.address) {
      return <StyledEthereumLogo src={SolanaLogo} size={size} style={style} />
    } */
  }

  return (
    <StyledLogo
      size={size}
      srcs={srcs}
      alt={`${currency?.symbol ?? 'token'} logo`}
      style={style}
    />
  )
}
