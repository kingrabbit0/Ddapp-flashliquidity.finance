import React, { useEffect, useRef, useState } from 'react'
import {
  ArbitrumIcon,
  AvalancheIcon,
  BannerArrowIcon,
  BaseIcon,
  DclIcon1,
  DclIcon19,
  DclIcon2,
  DclIcon3,
  DclIcon4,
  DclIcon5,
  PolygonIcon,
  ZkevmIcon,
} from '~src/components/layoutIcon/Icon'
import './index.scss'

type FeatureCardProps = {
  Icon: React.ElementType
  title: string
  description: string
  animationDelay?: string // Add this line
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
  animationDelay,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const checkVisibility = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      if (rect.top <= window.innerHeight && rect.bottom >= 0 && !isVisible) {
        const delay = parseFloat(animationDelay || '0') * 1000 // Convert seconds to milliseconds
        setTimeout(() => setIsVisible(true), delay)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkVisibility)
    checkVisibility() // Initial check

    return () => {
      window.removeEventListener('scroll', checkVisibility)
    }
  }, [])

  let cardStyle: React.CSSProperties = {
    transform: 'translateX(-100%)',
    opacity: 0,
  }

  if (isVisible) {
    cardStyle = {
      ...cardStyle,
      animation: `1s ease-out ${animationDelay} forwards slideInFromLeft`,
      opacity: 1,
      transform: 'translateX(0)',
    }
  }

  const titleStyle = {
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textFillColor: 'transparent',
    display: 'block',
    margin: '0 auto',
    marginTop: '16px',
    marginBottom: '8px',
  }
  const cardClassName =
    `flex-1 sm:w-full sm:mr-0 sm:mb-14 md:w-full lg:mb-6 bg-secondary-gradient rounded-3xl p-6 ${
      isVisible ? 'card-visible' : 'card-hidden'
    }` + (isVisible ? ` animate-${animationDelay}` : '')

  return (
    <div
      ref={cardRef}
      className={cardClassName}
      style={{ border: '2px solid #1a1a3a' }}
    >
      <div className="flex justify-center items-center sm:overflow-hidden md:scale-110 md:transform">
        <Icon />
      </div>
      <h1
        className="mt-16 mb-2.5 text-32 gotham_font_bold sm:mt-10 sm:text-center md:mt-10 text-center md:text-26"
        style={titleStyle}
      >
        {title}
      </h1>
      <p className="text-lg gotham_font_light text-center md:text-base sm:text-center">
        {description}
      </p>
    </div>
  )
}

type NetworkIconProps = {
  Icon: React.ElementType // This allows any React component
  animationDelay: string
}

const NetworkIcon: React.FC<NetworkIconProps> = ({ Icon, animationDelay }) => {
  const [isVisible, setIsVisible] = useState(false)
  // Specify the type of element the ref will be attached to
  const iconRef = useRef<HTMLDivElement>(null)

  const checkVisibility = () => {
    const element = iconRef.current
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= window.innerHeight && rect.bottom >= 0 && !isVisible) {
        setIsVisible(true)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkVisibility)
    checkVisibility() // Initial check

    return () => {
      window.removeEventListener('scroll', checkVisibility)
    }
  }, [])

  let iconStyle: React.CSSProperties = {
    transform: 'translateY(100%)',
    opacity: 0,
  }

  if (isVisible) {
    iconStyle = {
      ...iconStyle,
      animation: `slideUpFromBottom 1s ease-out ${animationDelay} forwards`,
    }
  }

  return (
    <div ref={iconRef} style={iconStyle}>
      <Icon />
    </div>
  )
}

const Dex = () => {
  function learnMore() {
    window.open('https://app.flashliquidityai.com/#/swap')
  }
  function addLiquidity() {
    window.open(
      'https://app.flashliquidityai.com/#/add/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
    )
  }
  return (
    <div className="relative mt-24">
      <div className="relative z-10 mx-auto mt-64 sm:mt-24 md:mt-52 lg:w-4/5 sm:w-full md:w-full">
        <div className="relative z-10 mb-16 sm:justify-center md:justify-center sm:w-full md:w-full sm:text-center sm:mb-11 md:text-center md:mb-11">
          <div className="relative mb-4 sm:w-full md:w-full">
            <p
              style={{
                background:
                  'linear-gradient(to right, #ce1fde, #9231FD, #667eea)', // Adjust the gradient colors as needed
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline', // Ensures the gradient applies to the text only, not the entire line
              }}
              className="absolute bottom-2 left-0 text-white gotham_font_bold  text-42 sm:text-4xl  md:text-4xl md:relative sm:relative"
            >
              Decentralized exchange
            </p>
          </div>
          <p className="text-white gotham_font_bold text-26 sm:text-xl md:text-xl sm:px-4">
            Your keys, your coins
          </p>
        </div>
        <div className="relative z-10 flex flex-wrap gap-14 justify-between items-stretch text-white mb-8 grid grid-cols-3 sm:grid-cols-1 sm:pl-4 sm:pr-4 sm:mb-0 md:px-6 md:mb-24 md:gap-6">
          <FeatureCard
            animationDelay="0.2s" // First card
            Icon={DclIcon3}
            title="Swap tokens"
            description="Trade instantly from your wallet, no deposit needed."
          />
          <FeatureCard
            animationDelay="0.4s" // Second card, delayed by 0.2s
            Icon={DclIcon4}
            title="Self custodial"
            description="Always retain control over your assets while trading."
          />
          <FeatureCard
            animationDelay="0.6s" // Third card, delayed by 0.4s
            Icon={DclIcon5}
            title="Fast on-board"
            description="No registration required, start trading immediately."
          />
        </div>
        <div
          style={{ border: '2px solid #1a1a3a' }}
          className="relative bg-secondary-gradient pb-12 rounded-3xl mt-4 mb-20 sm:-mt-1 mx-auto lg:w-4/5 sm:w-full sm:px-5"
        >
          <div className="text-center pt-6 mb-10">
            <span
              style={{
                background:
                  'linear-gradient(to right, #ce1fde, #9231FD, #667eea)', // Adjust the gradient colors as needed
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline', // Ensures the gradient applies to the text only, not the entire line
              }}
              className="text-white text-42 sm:text-2xl md:text-xl gotham_font_bold"
            >
              Supported networks
            </span>
          </div>
          <div className="flex justify-around sm:mt-2">
            <NetworkIcon Icon={ArbitrumIcon} animationDelay="0s" />
            <NetworkIcon Icon={AvalancheIcon} animationDelay="0.2s" />
            <NetworkIcon Icon={BaseIcon} animationDelay="0.4s" />
            <NetworkIcon Icon={PolygonIcon} animationDelay="0.6s" />
            <NetworkIcon Icon={ZkevmIcon} animationDelay="0.8s" />
          </div>
        </div>
        <div className="z-20 relative flex justify-center mb-40 sm:mb-44 md:mb-44">
          <div className="absolute flex sm:block sm:w-full sm:pl-4 sm:pr-4 mb:block mb:w-full mb:pl-4 mb:pr-4">
            <div
              onClick={learnMore}
              className="flex items-center justify-center gotham_font_bold text-lg  mr-5 border border-primary hover:border-hightGreenColor px-10 rounded-lg cursor-pointer text-white h-14 font-extrabold w-max  sm:w-full md:w-fit sm:mb-6 md:mb-6 md:mt-6"
            >
              Trade
            </div>
            <div
              onClick={addLiquidity}
              className="sm:hidden flex items-center justify-center gotham_font_bold bg-primary rounded-lg  cursor-pointer text-lg text-white h-14 px-10 font-extrabold w-max hover:bg-hightGreenColor sm:w-full md:w-fit md:mt-6 sm:px-2"
            >
              Add Liquidity{' '}
              <BannerArrowIcon className="ml-2 sm:transform sm:scale-75 sm:origin-left md:transform md:scale-75 md:origin-left sm:ml-1 md:ml-1" />
            </div>
            <div
              onClick={addLiquidity}
              className="lg:hidden md:hidden flex items-center justify-center gotham_font_bold bg-primary rounded-lg cursor-pointer text-lg text-white h-14 px-10 font-extrabold w-max hover:bg-hightGreenColor sm:w-full md:w-fit md:mt-6 sm:px-2"
            >
              Add Liquidity{' '}
              <BannerArrowIcon className="ml-2 sm:transform sm:scale-75 sm:origin-left md:transform md:scale-75 md:origin-left sm:ml-1 md:ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dex
