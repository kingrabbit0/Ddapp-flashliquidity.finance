import React, { useEffect, useState } from 'react'
import {
  BannerArrowIcon,
  SelfBalancingIcon,
} from '~src/components/layoutIcon/Icon'

const SBP = () => {
  function goToSBP() {
    window.open('https://app.flashliquidityai.com/#/selfbalancing')
  }
  return (
    <div
      className="relative lg:mr-36 bg-secondary-gradient pb-8 top-2"
      style={{ borderRadius: '3rem', border: '2px solid #1a1a3a' }}
    >
      <div className="relative z-10 mt-4 flex items-center mx-auto sm:mt-12 sm:flex-col-reverse md:flex-col-reverse md:mt-12 sm:px-9 md:px-9 sm:w-full md:w-full">
        <div className="relative w-fit sm:justify-center md:justify-center sm:w-full md:w-full sm:text-center md:text-center sm:mb-11 md:mb-11">
          <div className="flex justify-center items-center text-white mt-12 mr-24 ml-24 sm:hidden md:hidden">
            <SelfBalancingIcon />
          </div>
          <div className="flex justify-center items-center text-white mb-12 lg:hidden">
            <SelfBalancingIcon />
          </div>
          <div className="flex justify-center items-center text-white mb-4 lg:hidden">
            <p className="sm:text-center md:text-center text-lg md:text-26">
              Managed pools, not open for public trading.
            </p>
          </div>
          <div className="flex justify-center items-start text-white mb-4 lg:hidden">
            <p className="sm:text-center md:text-center text-lg md:text-26">
              Automated rebalancing via on-chain arbitrage.
            </p>
          </div>
          <div className="flex justify-center items-start text-white mb-12 lg:hidden">
            <p className="sm:text-center md:text-center text-lg md:text-26">
              Profits distributed to liquidity providers.
            </p>
          </div>
          <div className="lg:hidden flex sm:flex-col justify-center items-center relative mt-14">
            <div
              onClick={goToSBP}
              className="flex z-40 items-center justify-center bg-primary gotham_font_bold rounded-lg px-8 cursor-pointer text-lg text-white h-14 font-extrabold w-max hover:bg-hightGreenColor"
            >
              View self-balancing pools
              <BannerArrowIcon className="ml-2 transform scale-75 origin-left" />
            </div>
          </div>
        </div>
        <div className="text-white z-10 ml-7 pt-2 sm:ml-0 sm:text-center md:mr-7">
          <h1
            style={{
              background:
                'linear-gradient(to right, #ce1fde, #9231FD, #667eea)', // Adjust the gradient colors as needed
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline', // Ensures the gradient applies to the text only, not the entire line
            }}
            className="text-42 text-white gotham_font_bold pt-6 mb-2.5 sm:text-4xl sm:mb-3 md:text-4xl md:text-center xs:text-2xl"
          >
            Self-balancing pools
          </h1>
          <p className="mt-8 mr-4 flex items-center text-26 sm:justify-start sm:text-lg sm:hidden md:hidden">
            Managed pools, not open for public trading.
          </p>
          <p className="mt-4 mr-4 flex items-center text-26 sm:justify-start sm:text-lg sm:hidden md:hidden">
            Automated rebalancing, no external arbitrageurs.
          </p>
          <p className="mt-4 mr-4 flex items-center text-26 mb-10 sm:justify-start sm:mb-0 sm:text-lg sm:hidden  md:hidden">
            Profits distributed to liquidity providers.
          </p>
          <div
            onClick={goToSBP}
            className="z-20 sm:hidden md:hidden flex items-center justify-center bg-primary gotham_font_bold px-8 rounded-lg cursor-pointer text-lg text-white h-14 font-extrabold w-max  hover:bg-hightGreenColor sm:text-sm md:text-sm sm:w-full md:w-full"
          >
            View self-balancing pools
            <BannerArrowIcon className="ml-2 sm:transform sm:scale-75 sm:origin-left md:transform md:scale-75 md:origin-left sm:ml-1 md:ml-1" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SBP
