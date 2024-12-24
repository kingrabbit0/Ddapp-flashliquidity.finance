import {
  CurrencyAmount,
  ETHER /*, JSBI, TokenAmount*/
} from 'flashliquidity-sdk'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ButtonDropdownWhite,
  ButtonSecondary,
  ButtonWhite
} from '../../components/Button'
//import { LightCard } from '../../components/Card'
import { AutoColumn } from '../../components/Column'
//import CurrencyLogo from '../../components/CurrencyLogo'
import { BridgeFliqTabs } from '../../components/NavigationTabs'
//import { MinimalPositionCard } from '../../components/PositionCard'
import Row, { RowBetween, RowFixed } from '../../components/Row'
import { useActiveWeb3React } from '../../hooks'
//import { useTokenBalance } from '../../state/wallet/hooks'
//import { StyledInternalLink } from '../../theme'
//import { currencyId } from '../../utils/currencyId'
import { TransactionResponse } from '@ethersproject/providers'
import AppBody from '../AppBody'
import { FLIQ, NETWORK_LABELS, NETWORK_LOGOS } from '../../constants'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { useSwapActionHandlers, useSwapState } from '../../state/swap/hooks'
import { Field } from '../../state/swap/actions'
import { useCurrencyBalance, useTokenBalance } from '../../state/wallet/hooks'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { BottomGrouping } from '../../components/swap/styleds'
import { GreyCard, LightCard } from '../../components/Card'
import { CloseIcon, ExternalLink, TYPE } from '../../theme'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { useFliqFaucet, useFliqToken } from '../../hooks/useContract'
import {
  LoadingChainsView,
  LoadingView,
  SubmittedBridgeTxView
} from '../../components/ModalViews'
import { formatEther, parseEther } from 'ethers/lib/utils'
//import { BigNumber } from 'ethers'
import styled from 'styled-components'
//import { DataCard } from '../../components/earn1/styled'
import { useDarkModeManager } from '../../state/user/hooks'
import { AlertTriangle } from 'react-feather'
import QuestionHelper from '../../components/QuestionHelper'
//import { useFliqToken } from '../../hooks/useContract'
//import { useCurrencyBalance } from '../../state/wallet/hooks'
//import { Dots } from '../Pool/styleds'

const TESTNET_CHAIN_IDS: number[] = [
  80001, 43113, 1442, 11155111, 84531, 421614
]
const MAINNET_CHAIN_IDS: number[] = []

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`
const NetworkSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 10px;
  width: 100%;
  justify-self: center;
`
const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 20px;
`

export default function Bridge() {
  const { account, chainId } = useActiveWeb3React()
  //const theme = useContext(ThemeContext)
  const [darkMode] = useDarkModeManager()
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [loadedSupportedChains, setLoadedSupportedChains] =
    useState<boolean>(false)
  // monitor call to help UI loading state
  const addTransaction = useTransactionAdder()
  const [hash, setHash] = useState<string | undefined>()
  const [attempting, setAttempting] = useState(false)
  const [dripping, setDripping] = useState(false)
  const [supportedChains, setSupportedChains] = useState<number[]>([])
  const [bridgeFee, setBridgeFee] = useState<string | undefined>()

  const fliqContract = useFliqToken()
  const faucetContract = useFliqFaucet()
  const [destChainId, setDestChainId] = useState<number>()
  const toggleWalletModal = useWalletModalToggle()
  //const toggleBridgeModal = useBridgeModalToggle()
  const { onUserInput } = useSwapActionHandlers(chainId!)
  const badgeCCIP = darkMode
    ? 'https://chain.link/badge-cross-chain-black'
    : 'https://chain.link/badge-cross-chain-white'
  const { typedValue } = useSwapState()

  async function onChainSelect(chainId: number) {
    setDestChainId(chainId)
    if (fliqContract) {
      const fee = await fliqContract.getBridgeFee(chainId)
      setBridgeFee(fee)
    } else {
      setBridgeFee(undefined)
    }
  }

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput]
  )
  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(
    chainId!,
    useTokenBalance(account ?? undefined, FLIQ)
  )

  const handleMaxInput = useCallback(() => {
    maxAmountInput && onUserInput(Field.INPUT, maxAmountInput.toExact())
  }, [maxAmountInput, onUserInput])

  function wrappedOnDismiss() {
    setAttempting(false)
    setHash(undefined)
    setShowSearch(false)
    handleTypeInput('')
  }

  async function onBridge() {
    if (fliqContract) {
      setAttempting(true)
      const fee = await fliqContract.getBridgeFee(destChainId)
      setBridgeFee(fee)
      await fliqContract
        .bridge(parseEther(typedValue), destChainId, {
          value: fee,
          gasLimit: 350000
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Bridge ${typedValue} FLIQ`
          })
          setHash(response.hash)
        })
        .catch((error: any) => {
          setAttempting(false)
          console.log(error)
        })
    }
  }

  async function onDrip() {
    if (faucetContract && !dripping) {
      setDripping(true)
      await faucetContract
        .drip()
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `FLIQ tokens sent`
          })
          setTimeout(() => setDripping(false), 20000)
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  async function discoverSupportedChains(chainId: number) {
    if (fliqContract) {
      const tempChains = []
      if (MAINNET_CHAIN_IDS.includes(chainId)) {
        for (const cId in MAINNET_CHAIN_IDS) {
          const isSupported = await fliqContract.isDestinationChainSupported(
            MAINNET_CHAIN_IDS[cId]
          )
          if (isSupported) {
            tempChains.push(MAINNET_CHAIN_IDS[cId])
          }
        }
      } else if (TESTNET_CHAIN_IDS.includes(chainId)) {
        for (const cId in TESTNET_CHAIN_IDS) {
          const isSupported = await fliqContract.isDestinationChainSupported(
            TESTNET_CHAIN_IDS[cId]
          )
          if (isSupported) {
            tempChains.push(TESTNET_CHAIN_IDS[cId])
          }
        }
      }
      if (tempChains.length > 0) {
        setSupportedChains(tempChains)
      }
      setLoadedSupportedChains(true)
    }
  }

  useEffect(() => {
    setShowSearch(false)
    setLoadedSupportedChains(false)
    setSupportedChains([])
    setAttempting(false)
    setDestChainId(undefined)
    setBridgeFee(undefined)
  }, [chainId])

  const fliqBalance = useCurrencyBalance(
    chainId ?? undefined,
    account ?? undefined,
    FLIQ
  )

  return (
    <AppBody>
      {!showSearch && !attempting && !hash && <BridgeFliqTabs />}
      {showSearch && loadedSupportedChains && !hash && !attempting && (
        <Tabs>
          <RowBetween style={{ padding: '1rem' }}>
            <CloseIcon onClick={wrappedOnDismiss} />
            <ActiveText>
              {supportedChains.length > 0
                ? 'Supported Chains'
                : 'No Supported Chain'}
            </ActiveText>
            <QuestionHelper
              text={
                supportedChains.length > 0
                  ? 'Here is the list of compatible destination chains for bridging, based on the chain currently linked to your wallet'
                  : 'No network available for bridging given the chain currently connected to your wallet'
              }
            />
          </RowBetween>
        </Tabs>
      )}
      <AutoColumn gap="md">
        {!showSearch && !attempting && !hash && (
          <Row marginTop={3}>
            <ButtonDropdownWhite
              height={50}
              width={'calc(100% - 170px)'}
              marginRight={3}
              alignSelf={'center'}
              onClick={() => {
                setShowSearch(true)
                discoverSupportedChains(chainId!)
              }}
            >
              <Row>
                {destChainId && (
                  <IconWrapper size={24}>
                    <img
                      src={
                        NETWORK_LOGOS[
                          destChainId as keyof typeof NETWORK_LABELS
                        ]
                      }
                      alt={'hermez'}
                    />
                  </IconWrapper>
                )}
                <TYPE.body fontWeight={400} fontSize={13} marginLeft={'12px'}>
                  {destChainId
                    ? NETWORK_LABELS[destChainId as keyof typeof NETWORK_LABELS]
                    : 'Select chain'}
                </TYPE.body>
              </Row>
            </ButtonDropdownWhite>
            <a href="https://chain.link/cross-chain">
              {' '}
              <img
                src={badgeCCIP}
                width="170"
                alt="CCIP secured with chainlink"
              ></img>
            </a>
          </Row>
        )}
        {!showSearch && !attempting && !hash ? (
          <CurrencyInputPanel
            label={'From'}
            value={typedValue}
            showMaxButton={true}
            currency={FLIQ}
            disableCurrencySelect={true}
            onUserInput={handleTypeInput}
            onMax={handleMaxInput}
            otherCurrency={FLIQ}
            id="swap-currency-input"
          />
        ) : null}
        {!showSearch && !attempting && !hash ? (
          <LightCard>
            <TYPE.body fontSize={13}>{`Source chain: ${
              chainId
                ? NETWORK_LABELS[chainId as keyof typeof NETWORK_LABELS]
                : ' - '
            }`}</TYPE.body>
            <TYPE.body fontSize={13}>{`Destination chain: ${
              destChainId
                ? NETWORK_LABELS[destChainId as keyof typeof NETWORK_LABELS]
                : ' - '
            }`}</TYPE.body>
            <TYPE.body marginBottom={2} fontSize={12}>{`Bridge fee: ${
              bridgeFee ? parseFloat(formatEther(bridgeFee)).toFixed(4) : '- '
            } ${bridgeFee ? ETHER[chainId!].symbol : ''}`}</TYPE.body>
            <ExternalLink
              style={{ color: 'blueviolet', textDecoration: 'underline' }}
              href="https://ccip.chain.link/address/0x9e05E935C4d2e34980D4913B0fC01fC3dd60b7D5"
              target="_blank"
            >
              <TYPE.link fontSize={13}>View all bridge TXs</TYPE.link>
            </ExternalLink>
          </LightCard>
        ) : null}
      </AutoColumn>
      <BottomGrouping>
        {!showSearch && !account && !attempting && !hash ? (
          <ButtonSecondary onClick={toggleWalletModal}>
            Connect Wallet
          </ButtonSecondary>
        ) : !showSearch &&
          fliqBalance &&
          !attempting &&
          !hash &&
          parseFloat(fliqBalance.toExact()) < parseFloat(typedValue) ? (
          <GreyCard style={{ textAlign: 'center' }}>
            <TYPE.main mb="4px">Insufficent FLIQ balance.</TYPE.main>
          </GreyCard>
        ) : !showSearch &&
          account &&
          !attempting &&
          fliqBalance?.equalTo('0') &&
          !dripping ? (
          <ButtonSecondary onClick={onDrip}>Get FLIQ tokens</ButtonSecondary>
        ) : !showSearch && account && !destChainId && !attempting && !hash ? (
          <GreyCard style={{ textAlign: 'center' }}>
            <TYPE.main mb="4px">Select destination chain.</TYPE.main>
          </GreyCard>
        ) : !showSearch &&
          account &&
          destChainId &&
          !attempting &&
          !hash &&
          (!typedValue || parseFloat(typedValue) === 0) ? (
          <GreyCard style={{ textAlign: 'center' }}>
            <TYPE.main mb="4px">Input bridge amount.</TYPE.main>
          </GreyCard>
        ) : !showSearch &&
          account &&
          destChainId &&
          !attempting &&
          !hash &&
          fliqBalance?.greaterThan('0') &&
          parseFloat(typedValue) > 0 ? (
          <ButtonSecondary onClick={onBridge}>Bridge</ButtonSecondary>
        ) : null}
      </BottomGrouping>
      <RowBetween></RowBetween>
      {attempting && !hash ? (
        <LoadingView onDismiss={wrappedOnDismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.body fontSize={20}>{`Bridging ${parseFloat(
              typedValue
            ).toFixed(2)} FLIQ`}</TYPE.body>
            <TYPE.body fontSize={16}>{`Bridge fee ${parseFloat(
              formatEther(bridgeFee!)
            ).toFixed(4)} ${ETHER[chainId!].symbol}`}</TYPE.body>
          </AutoColumn>
        </LoadingView>
      ) : null}
      {showSearch && !loadedSupportedChains ? (
        <LoadingChainsView onDismiss={wrappedOnDismiss}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.body fontSize={18}>{`Scanning chains`}</TYPE.body>
          </AutoColumn>
        </LoadingChainsView>
      ) : null}
      {showSearch && loadedSupportedChains && supportedChains.length === 0 && (
        <AutoColumn gap="12px" justify={'center'}>
          <AlertTriangle size={128} color="#c203fc"></AlertTriangle>
          <TYPE.link
            marginTop={1}
            fontSize={16}
          >{`Wallet must be connected`}</TYPE.link>
          <TYPE.body
            marginTop={2}
            marginBottom={'2px'}
            fontSize={14}
          >{`FLIQ Bridge supported chains:`}</TYPE.body>
          <AutoColumn gap="12px" justify={'flex-start'}>
            <TYPE.body fontSize={13}>{`- Ethereum Sepolia`}</TYPE.body>
            <TYPE.body fontSize={13}>{`- Base Goerli`}</TYPE.body>
            <TYPE.body fontSize={13}>{`- Polygon Mumbai`}</TYPE.body>
            <TYPE.body
              fontSize={13}
              marginBottom={'20px'}
            >{`- Avalanche Fuji`}</TYPE.body>
          </AutoColumn>
        </AutoColumn>
      )}
      <NetworkSection>
        {showSearch &&
          loadedSupportedChains &&
          supportedChains?.map(chainId => {
            return (
              <ButtonWhite
                key={chainId}
                onClick={() => {
                  onChainSelect(chainId)
                  setShowSearch(false)
                }}
              >
                <RowFixed justify="space-between">
                  <IconWrapper size={24}>
                    <img
                      src={NETWORK_LOGOS[chainId as keyof typeof NETWORK_LOGOS]}
                      alt={'hermez'}
                    />
                  </IconWrapper>
                  <TYPE.body marginLeft={10} fontSize={18}>{`${
                    NETWORK_LABELS[chainId as keyof typeof NETWORK_LABELS]
                  }`}</TYPE.body>
                </RowFixed>
              </ButtonWhite>
            )
          })}
      </NetworkSection>
      {hash && (
        <SubmittedBridgeTxView onDismiss={wrappedOnDismiss} hash={hash}>
          <AutoColumn gap="12px" justify={'center'}>
            <TYPE.largeHeader>Bridge transaction sent</TYPE.largeHeader>
            <TYPE.body fontSize={20}>{`Bridging ${parseFloat(
              typedValue
            ).toFixed(2)} FLIQ`}</TYPE.body>
          </AutoColumn>
        </SubmittedBridgeTxView>
      )}
    </AppBody>
  )
}
