import React from 'react'
import { BannerArrowIcon, FliqIcon } from '~src/components/layoutIcon/Icon'

export const FliqIntro = () => {
  return (
    <div
      style={{ borderRadius: '3rem', border: '2px solid #1a1a3a' }}
      className="relative bg-secondary-gradient lg:pb-12 mt-24 lg:ml-36"
    >
      <div className="relative z-10 flex sm:flex-col md:flex-col items-center justify-center mx-auto mt-12 sm:mt-8 md:mt-6 lg:w-4/5 sm:w-full md:w-full md:mb-12 sm:mb-12">
        <div className="lg:w-full sm:w-full md:w-full flex flex-col">
          <div className="text-white text-2xl mb-4 sm:mt-4 md:mt-4 sm:text-center md:text-center gotham_font_bold ">
            <p
              style={{
                background:
                  'linear-gradient(to right, #ce1fde, #9231FD, #667eea)', // Adjust the gradient colors as needed
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline', // Ensures the gradient applies to the text only, not the entire line
              }}
              className="flex gotham_font_bold mt-2 text-42 sm:text-4xl md:text-center md:text-4xl sm:relative"
            >
              FLIQA token
            </p>
          </div>
          <div className="text-white lg:mr-28 text-26 sm:text-2xl md:text-3xl sm:px-10 md:px-10 mt-4 sm:text-center md:text-center lg:flex lg:items-center lg:w-auto">
            Governance and utility token.
          </div>
          <div className="text-white lg:mr-28 text-26 sm:text-2xl md:text-3xl sm:px-10 md:px-10 mt-4 sm:text-center md:text-center mb-8 lg:flex lg:items-center lg:w-auto">
            To be launched.
          </div>
          <div className="flex items-center sm:hidden md:hidden">
            <button
              className="flex mr-5 items-center rounded-lg text-white gotham_font_bold text-lg px-6 py-4 h-14"
              style={{
                background: 'linear-gradient(to right, #9231FD, #ce1fde)',
              }}
              onClick={() => {
                window.open(
                  'https://docs.flashliquidityai.com/ecosystem/fliq-token',
                  '_blank'
                )
              }}
            >
              View docs
              <span className="ml-3">
                <BannerArrowIcon />
              </span>
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-12 flex justify-center">
          <FliqIcon />
        </div>
        <div className="flex flex-col px-10 w-full items-center lg:hidden md:flex-row md:mt-16 md:space-x-4 md:justify-center">
          <button
            className="flex mt-8 w-full mb-8 md:w-auto justify-center items-center rounded-lg text-white gotham_font_bold text-lg px-6 py-4 h-14"
            style={{
              background: 'linear-gradient(to right, #9231FD, #ce1fde)',
            }}
            onClick={() => {
              window.open(
                'https://docs.flashliquidityai.com/ecosystem/fliq-token',
                '_blank'
              )
            }}
          >
            View docs
            <span className="ml-3">
              <BannerArrowIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
