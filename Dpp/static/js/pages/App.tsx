import React, { Suspense, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import Header from '../components/Header'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
//import { ApplicationModal } from '../state/application/actions'
//import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Earn1 from './Earn1'
import Manage1 from './Earn1/Manage'
import Earn2 from './Earn2'
import Manage2 from './Earn2/Manage'
import Archive1 from './Archive1'
import Manage3 from './Archive1/Manage'
import Stake from './Stake'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import Bridge from './Bridge'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { RedirectToSwap } from './Swap/redirects'
import { RedirectPathToHomeOnly } from './Home/redirects'
import backgroundgLogo from '../assets/images/flashlogo.png'
//import { useDarkModeManager } from '../state/user/hooks'

import HomePage from './Home'
import TermsTab from '../components/Terms'
import ParticlesComponent from '../components/Particles'
import { initParticlesEngine } from '@tsparticles/react'
import { loadFull } from 'tsparticles'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 40px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export const FadedBackgroundLogo = styled.div<{ isDark: boolean }>`
  background-image: url(${backgroundgLogo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 5vh;
  margin-top: 10vh;

  height: 93%;
  width: 100%;
  filter: ${props =>
    props.isDark ? 'blur(6px)' : 'blur(6px) hue-rotate(-115deg)'};
  overflow: hidden;
  z-index: -2;
  position: absolute;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding-top: 10px;
    margin-top: 10px;
    height: 80%;
    overflow: hidden;

  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding-top: 2vh;
    margin-top: 2vh;
  `};
`

export default function App() {
  const [init, setInit] = useState(false)
  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadFull(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])
  return (
    <Suspense fallback={null}>
      <HelmetProvider>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Anta"
            rel="stylesheet"
          />
        </Helmet>
      </HelmetProvider>
      <HashRouter>
        <Route component={DarkModeQueryParamReader} />
        <AppWrapper>
          {init && <ParticlesComponent />}
          <URLWarning />
          <TermsTab />
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <Popups />
            <Web3ReactManager>
              <Switch>
                <Route exact strict path="/swap" component={Swap} />
                <Route
                  exact
                  strict
                  path="/swap/:outputCurrency"
                  component={RedirectToSwap}
                />
                <Route exact strict path="/pool" component={Pool} />
                <Route exact strict path="/selfbalancing" component={Earn1} />
                <Route
                  exact
                  strict
                  path="/selfbalancing/archive"
                  component={Archive1}
                />
                <Route exact strict path="/farm/fliq" component={Earn2} />
                <Route exact strict path="/staking" component={Stake} />
                <Route exact strict path="/find" component={PoolFinder} />
                <Route
                  exact
                  strict
                  path="/create"
                  component={RedirectToAddLiquidity}
                />
                <Route exact path="/add" component={AddLiquidity} />
                <Route
                  exact
                  path="/add/:currencyIdA"
                  component={RedirectOldAddLiquidityPathStructure}
                />
                <Route
                  exact
                  path="/add/:currencyIdA/:currencyIdB"
                  component={RedirectDuplicateTokenIds}
                />
                <Route exact path="/create" component={AddLiquidity} />
                <Route
                  exact
                  path="/create/:currencyIdA"
                  component={RedirectOldAddLiquidityPathStructure}
                />
                <Route
                  exact
                  path="/create/:currencyIdA/:currencyIdB"
                  component={RedirectDuplicateTokenIds}
                />
                <Route
                  exact
                  strict
                  path="/remove/:tokens"
                  component={RedirectOldRemoveLiquidityPathStructure}
                />
                <Route
                  exact
                  strict
                  path="/remove/:currencyIdA/:currencyIdB"
                  component={RemoveLiquidity}
                />
                <Route
                  exact
                  strict
                  path="/selfbalancing/:currencyIdA/:currencyIdB/:index"
                  component={Manage1}
                />
                <Route
                  exact
                  strict
                  path="/farm/fliq/:currencyIdA/:currencyIdB/:index"
                  component={Manage2}
                />
                <Route
                  exact
                  strict
                  path="/selfbalancing/archive/:currencyIdA/:currencyIdB/:index"
                  component={Manage3}
                />
                <Route exact strict path="/bridge" component={Bridge} />
                <Route exact strict path="/home" component={HomePage} />
                <Route component={RedirectPathToHomeOnly} />
              </Switch>
            </Web3ReactManager>
            <Marginer />
          </BodyWrapper>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
