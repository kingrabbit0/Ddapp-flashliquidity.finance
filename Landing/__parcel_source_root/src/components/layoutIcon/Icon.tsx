import React from 'react';
import FlashLiquidityLogo from '../../assets/logoplustext.png'
import LiquidityBg from '../../assets/bgl1.webp'
import SelfBalancing from '../../assets/selfbalancing.png'
import SwapTokens from '../../assets/swaptokens.png'
import Bridges from '../../assets/bridges.png'
import OwnYourCrypto from '../../assets/ownyourcrypto.png'
import Speeding from '../../assets/speeding.png'
import Arbitrum from '../../assets/arbitrum.png'
import Avalanche from '../../assets/avalanche.png'
import BaseChain from '../../assets/base.png'
import Polygon from '../../assets/matic.png'
import PolygonZKEVM from '../../assets/polygon-hermez-logo.png'
import Fliq from '../../assets/fliq.png'
import Launchpad from '../../assets/launchpad.webp';

export const BannerMainIcon = (props: any) => {
  return (
    <img src={LiquidityBg} alt="Icon" style={{ width: '100vw', height: 'auto', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} {...props} />
  );
};

export const BannerMainMobileIcon = (props: any) => {
  return (
    <img src={LiquidityBg} alt="Icon" style={{ width: 'auto', height: '50vh', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} {...props} />
  );
};

export const FliqIcon = (props: any) => {
  return (
    <img
      src={Fliq}
      style={{
        width: '50vw',
        height: '50vw',
        maxWidth: '240px',
        maxHeight: '240px'
      }}
      alt="Icon"
      {...props}
    />
  );
};

export const ArbitrumIcon = (props: any) => {
  return (
    <img src={Arbitrum} style={{ maxWidth: '64px', width: '10vw', height: 'auto' }} alt="Icon" {...props} />
  );
};

export const AvalancheIcon = (props: any) => {
  return (
    <img src={Avalanche} style={{ maxWidth: '64px', width: '10vw', height: 'auto' }} alt="Icon" {...props} />
  );
};

export const BaseIcon = (props: any) => {
  return (
    <img src={BaseChain} style={{ maxWidth: '64px', width: '10vw', height: 'auto' }} alt="Icon" {...props} />
  );
};

export const PolygonIcon = (props: any) => {
  return (
    <img src={Polygon} style={{ maxWidth: '64px', width: '10vw', height: 'auto' }} alt="Icon" {...props} />
  );
};

export const ZkevmIcon = (props: any) => {
  return (
    <img src={PolygonZKEVM} style={{ maxWidth: '64px', width: '10vw', height: 'auto' }} alt="Icon" {...props} />
  );
};

export const BannerArrowIcon = (props: any) => {
  return (
    <svg {...props} width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.7071 8.70711C20.0976 8.31658 20.0976 7.68342 19.7071 7.29289L13.3431 0.928932C12.9526 0.538408 12.3195 0.538408 11.9289 0.928932C11.5384 1.31946 11.5384 1.95262 11.9289 2.34315L17.5858 8L11.9289 13.6569C11.5384 14.0474 11.5384 14.6805 11.9289 15.0711C12.3195 15.4616 12.9526 15.4616 13.3431 15.0711L19.7071 8.70711ZM19 7L0.333334 7V9L19 9V7Z"
        fill="white"
      />
    </svg>
  );
};

export const FooterIcon1 = (props: any) => {
  return (
    <svg {...props} width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.6051 3.68212C17.6524 3.7698 17.6524 3.94513 17.6524 4.16431C17.6524 5.87386 17.2265 7.53957 16.3273 9.11762C15.3808 10.7834 14.103 12.1422 12.4466 13.1504C10.6482 14.2463 8.51859 14.8162 6.19965 14.8162C3.92803 14.8162 1.89301 14.2463 0 13.1504C0.283953 13.1943 0.615224 13.1943 0.946518 13.1943C2.83953 13.1943 4.49593 12.6682 5.96302 11.5724C5.06384 11.5724 4.2593 11.3094 3.59673 10.8272C2.93417 10.345 2.46092 9.73132 2.17697 8.98612C2.4136 9.02997 2.69755 9.02997 2.88685 9.02997C3.26546 9.02997 3.59673 8.98612 3.97534 8.94229C3.07617 8.76696 2.27163 8.3286 1.6564 7.62725C1.04118 6.9259 0.757201 6.13687 0.757201 5.26017V5.17249C1.32511 5.47935 1.94035 5.65468 2.55558 5.65468C2.03499 5.304 1.56174 4.86566 1.23047 4.29581C0.899177 3.7698 0.709883 3.1561 0.709883 2.49858C0.709883 1.84106 0.899177 1.22737 1.27779 0.613693C2.27162 1.79723 3.5021 2.71776 4.96918 3.37528C6.43626 4.0328 7.95069 4.42732 9.60709 4.51497C9.55975 4.25197 9.51243 3.94513 9.51243 3.68212C9.51243 3.0246 9.70172 2.4109 10.033 1.79723C10.3643 1.18356 10.8849 0.745198 11.5001 0.438341C12.1627 0.175332 12.8252 0 13.5824 0C14.1503 0 14.7182 0.0876763 15.2388 0.306836C15.7594 0.526017 16.1853 0.789025 16.5639 1.18354C17.5104 1.00821 18.3623 0.701349 19.1195 0.306836C18.8356 1.18354 18.2203 1.88489 17.3685 2.36708C18.1257 2.2794 18.8829 2.06024 19.6874 1.75338C19.0722 2.49858 18.4096 3.1561 17.6051 3.68212Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const FooterIcon1Hover = (props: any) => {
  const { hoverLogo, ...reset } = props;
  return (
    <svg {...reset} width="44" height="39" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter={`${hoverLogo ? 'url(#filter0_d_276_220)' : ''}`}>
        <path
          d="M10.7142 7.62265L17.4162 0H15.8286L10.0068 6.61729L5.3604 0H0L7.0278 10.0075L0 18H1.5876L7.7316 11.0104L12.6396 18H18M2.1606 1.17142H4.5996L15.8274 16.8861H13.3878"
          fill="currentColor"
          transform="translate(16, 12.5) scale(0.85)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_276_220"
          x="0"
          y="0"
          width="43.6875"
          height="38.8162"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.82 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_276_220" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_276_220" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export const FooterIcon2 = (props: any) => {
  return (
    <svg {...props} width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.96891 14.5522L8.27476 10.2201L16.6637 3.13293C17.0351 2.81544 16.5873 2.66182 16.0957 2.93834L5.74059 9.07301L1.2621 7.74161C0.300859 7.48557 0.289936 6.86084 1.48056 6.41022L18.9248 0.101442C19.7222 -0.236528 20.4868 0.285789 20.181 1.43284L17.2099 14.5522C17.0024 15.4842 16.4016 15.7095 15.5714 15.2794L11.0492 12.1455L8.87553 14.1221C8.6243 14.3576 8.41676 14.5522 7.96891 14.5522Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const FooterIcon2Hover = (props: any) => {
  const { hoverLogo, ...reset } = props;
  return (
    <svg {...reset} width="45" height="40" viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter={hoverLogo ? 'url(#filter0_d_276_221)' : ''}>
        <path
          d="M19.9689 26.5522L20.2748 22.2201L28.6637 15.1329C29.0351 14.8154 28.5873 14.6618 28.0957 14.9383L17.7406 21.073L13.2621 19.7416C12.3009 19.4856 12.2899 18.8608 13.4806 18.4102L30.9248 12.1014C31.7222 11.7635 32.4868 12.2858 32.181 13.4328L29.2099 26.5522C29.0024 27.4842 28.4016 27.7095 27.5714 27.2794L23.0492 24.1455L20.8755 26.1221C20.6243 26.3576 20.4168 26.5522 19.9689 26.5522Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_276_221"
          x="0.5625"
          y="0"
          width="43.6875"
          height="39.4893"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.82 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_276_221" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_276_221" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export const FooterIcon3 = (props: any) => {
  return (
    <svg {...props} width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.84322 0.628298C5.92411 0.628298 3.17489 2.16562 3.17489 2.16562C4.68111 0.935763 7.31335 0.227257 7.31335 0.227257L7.06475 0C4.59337 0.0401041 2.35597 1.60416 2.35597 1.60416C-0.159279 6.40329 0.00158038 10.5474 0.00158038 10.5474C2.04888 12.967 5.09057 12.7932 5.09057 12.7932L6.12884 11.5901C4.3009 11.2291 3.14564 9.74529 3.14564 9.74529C3.14564 9.74529 5.89487 11.4564 9.84322 11.4564C13.7916 11.4564 16.5408 9.74529 16.5408 9.74529C16.5408 9.74529 15.3855 11.2291 13.5576 11.5901L14.5959 12.7932C14.5959 12.7932 17.6376 12.967 19.6849 10.5474C19.6849 10.5474 19.8457 6.40329 17.3305 1.60416C17.3305 1.60416 15.0931 0.0401041 12.6217 0L12.3731 0.227257C12.3731 0.227257 15.0053 0.935763 16.5116 2.16562C16.5116 2.16562 13.7623 0.628298 9.84322 0.628298ZM6.81615 5.69478C7.76668 5.69478 8.54173 6.45676 8.5271 7.39252C8.5271 8.31491 7.76668 9.09026 6.81615 9.09026C5.88024 9.09026 5.11982 8.31491 5.11982 7.39252C5.11982 6.45676 5.86562 5.69478 6.81615 5.69478ZM12.9142 5.69478C13.8647 5.69478 14.6251 6.45676 14.6251 7.39252C14.6251 8.31491 13.8647 9.09026 12.9142 9.09026C11.9783 9.09026 11.2178 8.31491 11.2178 7.39252C11.2178 6.45676 11.9636 5.69478 12.9142 5.69478Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const FooterIcon3Hover = (props: any) => {
  const { hoverLogo, ...reset } = props;
  return (
    <svg {...reset} width="44" height="37" viewBox="0 0 44 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter={hoverLogo ? 'url(#filter0_d_276_222)' : ''}>
        <path
          d="M21.8432 12.6283C17.9241 12.6283 15.1749 14.1656 15.1749 14.1656C16.6811 12.9358 19.3133 12.2273 19.3133 12.2273L19.0648 12C16.5934 12.0401 14.356 13.6042 14.356 13.6042C11.8407 18.4033 12.0016 22.5474 12.0016 22.5474C14.0489 24.967 17.0906 24.7932 17.0906 24.7932L18.1288 23.5901C16.3009 23.2291 15.1456 21.7453 15.1456 21.7453C15.1456 21.7453 17.8949 23.4564 21.8432 23.4564C25.7916 23.4564 28.5408 21.7453 28.5408 21.7453C28.5408 21.7453 27.3855 23.2291 25.5576 23.5901L26.5959 24.7932C26.5959 24.7932 29.6376 24.967 31.6849 22.5474C31.6849 22.5474 31.8457 18.4033 29.3305 13.6042C29.3305 13.6042 27.0931 12.0401 24.6217 12L24.3731 12.2273C24.3731 12.2273 27.0053 12.9358 28.5116 14.1656C28.5116 14.1656 25.7623 12.6283 21.8432 12.6283ZM18.8161 17.6948C19.7667 17.6948 20.5417 18.4568 20.5271 19.3925C20.5271 20.3149 19.7667 21.0903 18.8161 21.0903C17.8802 21.0903 17.1198 20.3149 17.1198 19.3925C17.1198 18.4568 17.8656 17.6948 18.8161 17.6948ZM24.9142 17.6948C25.8647 17.6948 26.6251 18.4568 26.6251 19.3925C26.6251 20.3149 25.8647 21.0903 24.9142 21.0903C23.9783 21.0903 23.2178 20.3149 23.2178 19.3925C23.2178 18.4568 23.9636 17.6948 24.9142 17.6948Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_276_222"
          x="-0.000488281"
          y="0"
          width="43.6875"
          height="36.7959"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.82 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_276_222" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_276_222" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export const FooterIcon4 = (props: any) => {
  return (
    <svg {...props} width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2_98)">
        <path
          d="M0 14.35L1.55 12.275C1.55 12.275 1.975 11.95 1.975 10.5V4.075C1.975 4.075 2.05 3.5 1.5 2.825C0.95 2.15 0.425 1.5 0.425 1.5H4.825L8.475 9.4L11.65 1.5H16L14.65 3.05V12.9L16.025 14.325H9.925L11.25 13L11.325 4.275L7.2 14.5L2.7 4.6L2.625 10.925C2.625 10.925 2.575 11.625 3 12.225C3.425 12.8 4.65 14.35 4.65 14.35H0Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_2_98">
          <rect width="16.0156" height="16" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FooterIcon4Hover = (props: any) => {
  const { hoverLogo, ...reset } = props;
  return (
    <svg {...reset} width="41" height="38" viewBox="0 0 41 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter={hoverLogo ? 'url(#filter0_d_276_219)' : ''}>
        <path
          d="M12 25.35L13.55 23.275C13.55 23.275 13.975 22.95 13.975 21.5V15.075C13.975 15.075 14.05 14.5 13.5 13.825C12.95 13.15 12.425 12.5 12.425 12.5H16.825L20.475 20.4L23.65 12.5H28L26.65 14.05V23.9L28.025 25.325H21.925L23.25 24L23.325 15.275L19.2 25.5L14.7 15.6L14.625 21.925C14.625 21.925 14.575 22.625 15 23.225C15.425 23.8 16.65 25.35 16.65 25.35H12Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_276_219"
          x="0"
          y="0.5"
          width="40.0249"
          height="37"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.82 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_276_219" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_276_219" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export const FooterIcon5Hover = (props: any) => {
  const { hoverLogo, ...reset } = props;
  return (
    <svg {...reset} width="41" height="38" viewBox="0 0 41 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter={hoverLogo ? 'url(#filter0_d_276_219)' : ''}>
        <path
          d="M15.9956 1.84755L7.89516 6.13558L0.002207 1.95885V1.33558C0.002207 0.598988 0.653331 0 1.45896 0H14.5432C15.3467 0 16 0.596965 16 1.33558V1.84755H15.9956ZM15.9956 3.38752V10.6644C15.9956 11.401 15.3445 12 14.5388 12H1.45675C0.653331 12 0 11.403 0 10.6644V3.49882L7.53318 7.48533C7.79142 7.62293 8.10264 7.59663 8.32777 7.44486C8.33881 7.44081 8.34763 7.43474 8.35867 7.43069L15.9956 3.38752Z"
          fill="currentColor"
          transform="translate(13, 12.5)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_276_219"
          x="0"
          y="0.5"
          width="40.0249"
          height="37"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.82 0 0 0 0.6 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_276_219" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_276_219" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export const NavbarRefIcon = (props: any) => {
  return (
    <img src={FlashLiquidityLogo} style={{ width: '240px', height: '60px' }} alt="Icon" {...props} />
  );
};

export const NavbarRefMobileIcon = (props: any) => {
  return (
    <img src={FlashLiquidityLogo} style={{ width: '160px', height: '40px' }} alt="Icon" {...props} />
  );
};

export const DclIcon1 = (props: any) => {
  return (
    <svg width="122" height="96" viewBox="0 0 122 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.1">
        <circle cx="3.66871" cy="3.66871" r="3.66871" fill="#00FFD1" />
        <circle cx="3.66871" cy="21.2787" r="3.66871" fill="#00FFD1" />
        <circle cx="3.66871" cy="38.8887" r="3.66871" fill="#00FFD1" />
        <circle cx="3.66871" cy="56.4977" r="3.66871" fill="#00FFD1" />
        <circle cx="3.66871" cy="74.1077" r="3.66871" fill="#00FFD1" />
        <circle cx="3.66871" cy="91.7177" r="3.66871" fill="#00FFD1" />
        <circle cx="22.7461" cy="3.66871" r="3.66871" fill="#00FFD1" />
        <circle cx="22.7461" cy="21.2787" r="3.66871" fill="#00FFD1" />
        <circle cx="22.7461" cy="38.8887" r="3.66871" fill="#00FFD1" />
        <circle cx="22.7461" cy="56.4977" r="3.66871" fill="#00FFD1" />
        <circle cx="22.7461" cy="74.1077" r="3.66871" fill="#00FFD1" />
        <circle cx="22.7461" cy="91.7177" r="3.66871" fill="#00FFD1" />
        <circle cx="41.8233" cy="3.66871" r="3.66871" fill="#00FFD1" />
        <circle cx="41.8233" cy="21.2787" r="3.66871" fill="#00FFD1" />
        <circle cx="41.8233" cy="38.8887" r="3.66871" fill="#00FFD1" />
        <circle cx="41.8233" cy="56.4977" r="3.66871" fill="#00FFD1" />
        <circle cx="41.8233" cy="74.1077" r="3.66871" fill="#00FFD1" />
        <circle cx="41.8233" cy="91.7177" r="3.66871" fill="#00FFD1" />
        <circle cx="60.9007" cy="3.66871" r="3.66871" fill="#00FFD1" />
        <circle cx="60.9007" cy="21.2787" r="3.66871" fill="#00FFD1" />
        <circle cx="60.9007" cy="38.8887" r="3.66871" fill="#00FFD1" />
        <circle cx="60.9007" cy="56.4977" r="3.66871" fill="#00FFD1" />
        <circle cx="60.9007" cy="74.1077" r="3.66871" fill="#00FFD1" />
        <circle cx="60.9007" cy="91.7177" r="3.66871" fill="#00FFD1" />
        <circle cx="79.978" cy="3.66871" r="3.66871" fill="#00FFD1" />
        <circle cx="79.978" cy="21.2787" r="3.66871" fill="#00FFD1" />
        <circle cx="79.978" cy="38.8887" r="3.66871" fill="#00FFD1" />
        <circle cx="79.978" cy="56.4977" r="3.66871" fill="#00FFD1" />
        <circle cx="79.978" cy="74.1077" r="3.66871" fill="#00FFD1" />
        <circle cx="79.978" cy="91.7177" r="3.66871" fill="#00FFD1" />
        <circle cx="99.0554" cy="3.66871" r="3.66871" fill="#00FFD1" />
        <circle cx="99.0554" cy="21.2787" r="3.66871" fill="#00FFD1" />
        <circle cx="99.0554" cy="38.8887" r="3.66871" fill="#00FFD1" />
        <circle cx="99.0554" cy="56.4977" r="3.66871" fill="#00FFD1" />
        <circle cx="99.0554" cy="74.1077" r="3.66871" fill="#00FFD1" />
        <circle cx="99.0554" cy="91.7177" r="3.66871" fill="#00FFD1" />
        <circle cx="118.133" cy="3.66871" r="3.66871" fill="#00FFD1" />
        <circle cx="118.133" cy="21.2787" r="3.66871" fill="#00FFD1" />
        <circle cx="118.133" cy="38.8887" r="3.66871" fill="#00FFD1" />
        <circle cx="118.133" cy="56.4977" r="3.66871" fill="#00FFD1" />
        <circle cx="118.133" cy="74.1077" r="3.66871" fill="#00FFD1" />
        <circle cx="118.133" cy="91.7177" r="3.66871" fill="#00FFD1" />
      </g>
    </svg>
  );
};

export const DclIcon2 = (props: any) => {
  return (
      <svg width="1054" height="746" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5" filter="url(#filter0_f_65_1342)">
          <path
            d="M1106.48 353.335C1106.48 490.418 1076.99 368.837 940.157 368.837C803.323 368.837 354.163 626.628 209 503.849C571.669 411.174 673.72 209 891.466 209C1081.38 209 1120.27 399.209 1106.48 353.335Z"
            fill="url(#paint0_linear_65_1342)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_65_1342"
            x="0"
            y="0"
            width="1318"
            height="746"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="104.5" result="effect1_foregroundBlur_65_1342" />
          </filter>
          <linearGradient
            id="paint0_linear_65_1342"
            x1="773.526"
            y1="639.731"
            x2="859.239"
            y2="133.266"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#ce1fde" stop-opacity="0.7" />
            <stop offset="1" stop-color="#7000FF" stop-opacity="0.61" />
          </linearGradient>
        </defs>
      </svg>
  );
};

export const DclIcon3 = (props: any) => {
  return (
    <img src={SwapTokens} style={{ maxWidth: '100%', height: 'auto', maxHeight: '12rem' }} alt="Icon" {...props} />
  );
};

export const DclIcon4 = (props: any) => {
  return (
    <img src={OwnYourCrypto} style={{ maxWidth: '75%', height: 'auto', maxHeight: '12rem' }} alt="Icon" {...props} />
  );
};

export const DclIcon5 = (props: any) => {
  return (
    <img src={Speeding} style={{ maxWidth: '100%', height: 'auto', maxHeight: '12rem' }} alt="Icon" {...props} />
  );
};

export const SelfBalancingIcon = (props: any) => {
  return (
    <img src={SelfBalancing} style={{ width: '24rem' }} alt="Icon" {...props} />
  );
};

export const LaunchpadIcon = (props: any) => {
  return (
    <img src={Launchpad} style={{ border: '2px solid #2a0a2a', borderRadius: '3rem', maxWidth: '100%', height: 'auto', maxHeight: '18rem' }} alt="Icon" {...props} />
  );
};

export const DclIcon18 = (props: any) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.7142 7.62265L17.4162 0H15.8286L10.0068 6.61729L5.3604 0H0L7.0278 10.0075L0 18H1.5876L7.7316 11.0104L12.6396 18H18M2.1606 1.17142H4.5996L15.8274 16.8861H13.3878"
        fill="white"
      />
    </svg>
  );
};
export const DclIcon19 = (props: any) => {
  return (
    <svg width="100%" height="644" viewBox="0 0 640 644" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_f_249_64)">
        {/* Updated path for a different shape */}
        <path d="M0 322C0 500 140 644 320 644C500 644 640 500 640 322C640 144 500 0 320 0C140 0 0 144 0 322Z" fill="url(#paint0_linear_249_64)" />
      </g>
      <defs>
        <filter id="filter0_f_249_64" x="-382" y="0" width="1150" height="644" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="88.5" result="effect1_foregroundBlur_249_64" />
        </filter>
        {/* Adjusted linearGradient for faster fade */}
        <linearGradient id="paint0_linear_249_64" x1="294.292" y1="557.829" x2="370.051" y2="110.032" gradientUnits="userSpaceOnUse">
          <stop stop-color="#00FFFF" stop-opacity="0.3" offset="0.2" /> {/* Cyan with adjusted offset */}
          <stop stop-color="#8A2BE2" stop-opacity="0.61" offset="0.5" /> {/* Cyberpunk Purple with adjusted offset */}
        </linearGradient>
      </defs>
    </svg>
  );
};

