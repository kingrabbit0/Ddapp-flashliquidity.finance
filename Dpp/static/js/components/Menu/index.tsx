import React, { useRef } from 'react'
import {
  Home,
  Repeat,
  BookOpen,
  Send,
  Twitter,
  Menu as MenuIcon,
  Droplet,
  TrendingUp,
  Layers,
  BarChart2
} from 'react-feather'
import styled from 'styled-components/macro'
//import { useActiveWeb3React } from '../../hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'
import { ExternalLink } from '../../theme'
import { MenuNavItem } from '../StyledMenu'
//import { ButtonPrimary } from '../Button'
const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.bg4};
  margin: 0;
  margin-right: 12px;
  padding: 0;
  height: 40px;
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg3};

  padding: 0.15rem 0.5rem;
  border-radius: 8px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 14.125rem;
  background-color: ${({ theme }) => theme.bg1};
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow:
    0px 0px 1px rgba(0, 0, 0, 0.01),
    0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  left: 0rem;
  z-index: 100;
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

export default function Menu() {
  //const { account } = useActiveWeb3React()

  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)
  //const openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          <MenuNavItem id="link" to={'/home'} onClick={toggle}>
            <Home size={16} color="#8f46ff" />
            Home
          </MenuNavItem>
          <MenuNavItem id="link" to={'/swap'} onClick={toggle}>
            <Repeat size={16} color="#8f46ff" />
            Swap
          </MenuNavItem>
          <MenuNavItem id="link" to={'/pool'} onClick={toggle}>
            <Droplet size={16} color="#8f46ff" />
            Pool
          </MenuNavItem>
          <MenuNavItem id="link" to={'/selfbalancing'} onClick={toggle}>
            <TrendingUp size={16} color="#8f46ff" />
            Self balancing
          </MenuNavItem>
          <MenuNavItem id="link" to={'/bridge'} onClick={toggle}>
            <Layers size={16} color="#8f46ff" />
            FLIQ Bridge
          </MenuNavItem>
          {/* <MenuItem id="link" href="https://analytics-polygon.flashliquidity.finance">
            <BookOpen size={16} color="#8f46ff"/>
            Analytics (Polygon)
          </MenuItem>
          <MenuItem id="link" href="https://analytics-polygon-zkevm.flashliquidity.finance">
            <BookOpen size={16} color="#8f46ff"/>
            Analytics (zkEVM)
          </MenuItem>
          <MenuItem id="link" href="https://analytics-base.flashliquidity.finance">
            <BookOpen size={16} color="#8f46ff"/>
            Analytics (Base)
          </MenuItem>
          <MenuItem id="link" href="https://analytics-avalanche.flashliquidity.finance">
            <BookOpen size={16} color="#8f46ff"/>
            Analytics (Avalanche)
          </MenuItem> */}
          {/* <MenuItem id="link" href="https://analytics.flashliquidity.finance">
            <BarChart2 size={16} color="#8f46ff" />
            Analytics
          </MenuItem> */}
          <MenuItem id="link" href="https://docs.flashliquidity.finance">
            <BookOpen size={16} color="#8f46ff" />
            Docs
          </MenuItem>
          <MenuItem id="link" href="https://t.me/flashliquidity">
            <Send size={16} color="#8f46ff" />
            Telegram
          </MenuItem>
          <MenuItem id="link" href="https://twitter.com/flashliquidity">
            <Twitter size={14} color="#8f46ff" />
            Twitter
          </MenuItem>
          {/*account && (
            <ButtonPrimary onClick={openClaimModal} padding="8px 16px" width="100%" borderRadius="12px" mt="0.5rem">
              Claim QUICK
            </ButtonPrimary>
          )*/}
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
