import { ETHER } from 'flashliquidity-sdk'
import React, { useRef } from 'react'
import { Text } from 'rebass'
//import { NavLink } from 'react-router-dom'
//import { darken } from 'polished'
//import { useTranslation } from 'react-i18next'
//import { toast } from 'react-toastify';
//import { useTransactionAdder } from '../../state/transactions/hooks'
//import { useLocation } from 'react-router'
import styled from 'styled-components'
import Toggle from '../ToggleDarkMode'
import LogoWhite from '../../assets/images/logo_text_white.png'
import LogoBlack from '../../assets/images/logo_text_black.png'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'
//import { ChevronDown } from 'react-feather'
/**import { CardNoise } from '../earn/styled'
import { CountUp } from 'use-count-up'
import { TYPE } from '../../theme'*/

import { PinkCard } from '../Card'
import Menu from '../Menu'

import { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
//import { MenuFlyout /*MenuItem, MenuNavItem*/ } from '../StyledMenu'
//import ClaimModal from '../claim/ClaimModal'
//import Modal from '../Modal'
//import UniBalanceContent from './UniBalanceContent'
//import usePrevious from '../../hooks/usePrevious'
import { ApplicationModal } from '../../state/application/actions'
import {
  useModalOpen,
  useNetworkSwitcherPopoverToggle,
  useToggleModal
} from '../../state/application/hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
//import Polygon from '../../assets/images/matic.png'
//import PolygonHermez from '../../assets/images/polygon-hermez-logo.png'
//import Avalanche from '../../assets/images/avalanche.png'
//import Base from '../../assets/images/base.png'
import { NETWORK_LOGOS, NETWORK_LABELS } from '../../constants'
import Polling from './Polling'
import NetworkSwitcherPopover from '../NetworkSwitcherPopover'
import { ChevronDown } from 'react-feather'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  justify-content: space-between;
  background: ${({ theme }) => theme.bg2};
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.bg4};
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  background: ${({ theme }) => theme.bg2};
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  justify-self: center;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 99;
  height: 64px;
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  border-top: 2px solid ${({ theme }) => theme.bg4};
`

// const HeaderControlsLeft = styled.div`
//   background: ${({ theme }) => `linear-gradient(180deg, ${theme.bg3}, ${theme.bg2})`};
//   display: flex;
//   align-items: center;
//   flex-direction: row;
//   justify-content: space-between;
//   justify-self: center;
//   padding: 1rem;
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   z-index: 99;
//   height: 64px;
//   border-top-right-radius: 28px;
//   border-top: 2px solid ${({ theme }) => theme.bg4};
// `

const PollingFixed = styled.div`
  position: absolute;
  right: 1%;
`

/* const HeaderTitle = styled.div<{ isDark: boolean }>`
  color: ${props => props.isDark ? 'white' : '#1B1B1B'};
  display: flex;
  font-weight: 600;
  font-size: 20px; 
  padding: 0 10 0 10;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 16px;
  `};
`; */

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 0 0.5rem;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

// const HeaderLinks = styled(Row)`
//   justify-content: center;
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     padding: 1rem 0 1rem 1rem;
//     justify-content: flex-end;
// `};
// `

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  background-color: ${({ theme, active }) => (!active ? theme.bg2 : theme.bg3)};
  border: 1px solid ${({ theme, active }) => (!active ? theme.bg2 : theme.bg3)};
  border-radius: 8px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
  /* :hover {
    background-color: ${({ theme, active }) =>
    !active ? theme.bg2 : theme.bg4};
  } */
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(PinkCard)`
  border-radius: 8px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 12px; 
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`
//const activeClassName = 'ACTIVE'

// const StyledNavLink = styled(NavLink).attrs({
//   activeClassName
// })`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: left;
//   border-radius: 3rem;
//   outline: none;
//   cursor: pointer;
//   text-decoration: none;
//   color: ${({ theme }) => theme.text2};
//   font-size: 1rem;
//   width: fit-content;
//   margin: 0 12px;
//   font-weight: 500;

//   &.${activeClassName} {
//     border-radius: 12px;
//     font-weight: 600;
//     color: ${({ theme }) => theme.text1};
//   }

//   :hover,
//   :focus {
//     color: ${({ theme }) => darken(0.1, theme.text1)};
//   }
// `

// const StyledLink = styled.div<{ isActive: boolean }>`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: left;
//   border-radius: 3rem;
//   outline: none;
//   cursor: pointer;
//   text-decoration: none;
//   color: ${({ theme, isActive }) => (isActive ? theme.text1 : theme.text2)};
//   font-size: 1rem;
//   width: fit-content;
//   margin: 0 12px;
//   font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
//   font-weight: 500;
//   line-height: 24px;
//   :hover,
//   :focus {
//     color: ${({ theme }) => darken(0.1, theme.text1)};
//   }
// `
// const StyledNoLink = styled.div<{ isActive: boolean }>`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: left;
//   border-radius: 3rem;
//   outline: none;
//   cursor: pointer;
//   text-decoration: none;
//   color: ${({ theme, isActive }) => (isActive ? theme.text1 : theme.text2)};
//   font-size: 1rem;
//   width: fit-content;
//   margin: 0 12px;
//   font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
//   font-weight: 500;
//   line-height: 24px;
//   :hover,
//   :focus {
//     color: ${({ theme }) => darken(0.1, theme.text1)};
//   }
// `

// const NarrowMenuFlyout = styled(MenuFlyout)`
//   min-width: 12.125rem;
//   margin: auto;
//   border: 1px solid ${({ theme }) => theme.bg1};
//   width: 5%;
//   left: auto !important;
//   right: auto !important;
// `

// const NarrowMenuFlyout2 = styled(MenuFlyout)`
//   min-width: 12.125rem;
//   margin: auto;
//   border: 1px solid ${({ theme }) => theme.bg1};
//   width: 5%;
//   left: auto;
//   right: auto;
//   transform: translateX(-70px);
// `

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  //const { t } = useTranslation()

  const userEthBalance = useETHBalances(chainId!, account ? [account] : [])?.[
    account ?? ''
  ]
  const [isDark] = useDarkModeManager()
  const toggleNetworkSwitcherPopover = useNetworkSwitcherPopoverToggle()

  //const location: any = useLocation()
  //const toggleClaimModal = useToggleSelfClaimModal()

  //const availableClaim: boolean = useUserHasAvailableClaim(account)

  //const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  //const aggregateBalance: TokenAmount | undefined = useAggregateUniBalance()

  //const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  //const showClaimPopup = useShowClaimPopup()

  //const countUpValue = aggregateBalance?.toFixed(0) ?? '0'
  //const countUpValuePrevious = usePrevious(countUpValue) ?? '0'
  //          <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
  //          {t('swap')}
  //          </StyledNavLink>
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.FARM)
  //const open2 = useModalOpen(ApplicationModal.CHARTS)
  //const open3 = useModalOpen(ApplicationModal.FLIQ)
  const toggle = useToggleModal(ApplicationModal.FARM)
  //const toggle2 = useToggleModal(ApplicationModal.CHARTS)
  //const toggle3 = useToggleModal(ApplicationModal.FLIQ)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <HeaderFrame>
      <HeaderRow>
        <HeaderElementWrap>
          <Menu />
        </HeaderElementWrap>
        <Title href=".">
          {isDark ? (
            <img height={'36vh'} src={LogoWhite} alt="logo" />
          ) : (
            <img height={'36vh'} src={LogoBlack} alt="logo" />
          )}
        </Title>
        <PollingFixed>
          <NetworkSwitcherPopover>
            <NetworkCard
              title={NETWORK_LABELS[chainId!]}
              onClick={toggleNetworkSwitcherPopover}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Polling />
                <IconWrapper size={20}>
                  <img src={NETWORK_LOGOS[chainId!]} alt={''} />
                </IconWrapper>
                <ChevronDown size={16} />
              </div>
            </NetworkCard>
          </NetworkSwitcherPopover>
        </PollingFixed>
      </HeaderRow>
      <HeaderControls>
        <HeaderElement>
          <HeaderElementWrap>
            <Toggle isActive={darkMode} toggle={toggleDarkMode} />
          </HeaderElementWrap>
          <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconWrapper size={22}>
                    <img src={NETWORK_LOGOS[chainId]} alt={'network-logo'} />
                  </IconWrapper>
                  <span style={{ marginLeft: '8px' }}>
                    {NETWORK_LABELS[chainId]}
                  </span>
                </div>
              </NetworkCard>
            )}
          </HideSmall>

          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account ? (
              <BalanceText
                style={{ flexShrink: 0 }}
                pl="0.75rem"
                pr="0.5rem"
                fontWeight={500}
              >
                {userEthBalance?.toFixed(3)} {ETHER[chainId!].symbol}
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
      </HeaderControls>
    </HeaderFrame>
  )
}
