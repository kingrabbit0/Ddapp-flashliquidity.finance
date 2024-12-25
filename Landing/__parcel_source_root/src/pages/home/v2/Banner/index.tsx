import React, { useEffect, useState } from 'react'
import {
  BannerMainIcon,
  BannerArrowIcon,
  BannerMainMobileIcon,
} from '~src/components/layoutIcon/Icon'
import './index.scss'
import { isMobile } from '~src/utils/device'
import { useTrail, animated } from '@react-spring/web'
import useAnimateNumber from 'use-animate-number'
import { toInternationalCurrencySystemSplit } from '~src/utils/numbers'
import { useStatsDex } from '~src/hooks/home'

const Trail: React.FC<{ open: boolean }> = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 600 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div className="flex items-start flex-col l:mt-6 s:mt-4">
      {trail.map(({ height, ...style }, index) => (
        <animated.div key={index} style={style}>
          {items[index]}
        </animated.div>
      ))}
    </div>
  )
}
const Banner = () => {
  const dexStats = useStatsDex()
  function goRefApp() {
    window.open('https://app.flashliquidityai.com/')
  }

  function addDotsToNumber(num: { toString: () => string }) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
  const [currentWord, setCurrentWord] = useState('Decentralized')
  const words = ['Decentralized', 'Permissionless', 'On-chain', 'Unstoppable']

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWord((prevWord: string) => {
        let nextIndex = (words.indexOf(prevWord) + 1) % words.length
        return words[nextIndex]
      })
    }, 4000)

    return () => clearInterval(intervalId)
  }, [])

  const mobile = isMobile()
  return (
    <div className="relative sm:mt-12 md:mt-12 pr-10 sm:pr-0">
      <div className="absolute sm:hidden">
        <BannerMainIcon />
      </div>
      <div className="absolute lg:hidden md:hidden">
        <BannerMainMobileIcon />
      </div>
      <div className="relative z-10 flex justify-center mx-auto sm:w-full">
        <div className="flex flex-col sm:justify-center md:justify-center lg:justify-center text-white mt-44 sm:mt-0 md:mt-0">
          <Trail open>
            <span
              className="text-white gotham_font_bold  lg:hidden"
              style={{ fontSize: '32px' }}
            >
              The Future is
            </span>
            <span
              className="text-primary text-center gotham_font_bold  lg:hidden"
              style={{ fontSize: '32px' }}
            >
              <span
                style={{
                  background:
                    'linear-gradient(to right, #ce1fde, #9231FD, #667eea)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline',
                }}
              >
                {currentWord}
              </span>
            </span>
            <span
              className="mb-5 text-white gotham_font_bold sm:hidden md:hidden"
              style={{ fontSize: '42px' }}
            >
              {'The Future is '}
              <span
                style={{
                  background:
                    'linear-gradient(to right, #ce1fde, #9231FD, #667eea)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline',
                }}
              >
                {currentWord}
              </span>
            </span>
          </Trail>
          <div className="flex justify-center">
            <div
              onClick={goRefApp}
              style={{ width: '200px' }} // Set a fixed width
              className="mt-10 flex items-center gotham_font_bold justify-center rounded-lg cursor-pointer text-lg text-white h-14 font-extrabold bg-primary-gradient sm:text-sm md:text-sm sm:h-10 md:h-10 sm:px-3.5 md:px-3.5"
            >
              Launch APP{' '}
              <BannerArrowIcon className="ml-2 sm:transform sm:scale-75 sm:origin-left md:transform md:scale-75 md:origin-left sm:ml-1 md:ml-1" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex top-16 lg:top-12 mt-64 sm:-mt-1 sm:flex-col justify-around mx-auto lg:w-4/5 sm:w-full sm:px-5 md:-mr-10">
        <div className="flex flex-col items-center rounded-2xl sm:p-5  sm:my-5 md:my-5 ">
          <span
            style={{
              background:
                'linear-gradient(to right, #ce1fde, #9231FD, #667eea)', // Adjust the gradient colors as needed
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline', // Ensures the gradient applies to the text only, not the entire line
            }}
            className={`text-primary text-2xl sm:text-2xl md:text-xl gotham_font_bold`}
          >
            TVL
          </span>
          <span className="text-white gotham_font_bold text-32 my-2 md:text-4xl">
            {'$'}
            {dexStats.TVL ? (
              <>
                <GrowNumber num={dexStats.TVL}></GrowNumber>
              </>
            ) : (
              '-'
            )}
          </span>
          <span className="text-white text-base">Total value locked</span>
        </div>
        <div className="flex flex-col items-center rounded-2xl sm:p-5  sm:my-5 md:my-5 ">
          <span
            style={{
              background:
                'linear-gradient(to right, #ce1fde, #9231FD, #667eea)', // Adjust the gradient colors as needed
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline', // Ensures the gradient applies to the text only, not the entire line
            }}
            className={`text-mobile text-2xl sm:text-2xl md:text-xl gotham_font_bold`}
          >
            Trading Volume
          </span>
          <span className="text-white gotham_font_bold text-32 my-2 md:text-4xl">
            {'$'}
            {dexStats.TV ? (
              <>
                <GrowNumber num={dexStats.TV}></GrowNumber>
              </>
            ) : (
              '-'
            )}
          </span>
          <span className="text-white text-base">
            Cumulative trading volume
          </span>
        </div>
        <div className="flex flex-col items-center rounded-2xl sm:p-5 md:px-5 sm:my-5 md:my-5 ">
          <span
            style={{
              background:
                'linear-gradient(to right, #ce1fde, #9231FD, #667eea)', // Adjust the gradient colors as needed
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline', // Ensures the gradient applies to the text only, not the entire line
            }}
            className={`text-mobile text-2xl sm:text-2xl md:text-xl gotham_font_bold`}
          >
            Pairs
          </span>
          <span className="text-white gotham_font_bold text-32 my-2 md:text-4xl">
            {dexStats.pairs ? (
              <>
                <GrowNumber num={dexStats.pairs}></GrowNumber>
              </>
            ) : (
              '-'
            )}
          </span>
          <span className="text-white text-base">Trading pairs</span>
        </div>
      </div>
      <div className="flex flex-col items-center mt-24 z-10">
        {dexStats.fetchedChains !== dexStats.allChains && (
          <span className="text-warningColor text-13 z-10">{`Data loaded from ${dexStats.fetchedChains} out of ${dexStats.allChains} supported networks`}</span>
        )}
      </div>
    </div>
  )
}

export default Banner

function GrowNumber(props: any) {
  function addDotsToNumber(num: { toString: () => string }) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
  const [value, setValue] = useAnimateNumber(+props.num, {
    decimals: 0,
  })
  return <>{addDotsToNumber(value)}</>
}
