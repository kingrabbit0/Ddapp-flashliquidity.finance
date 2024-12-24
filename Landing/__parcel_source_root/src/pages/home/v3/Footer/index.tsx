import React from 'react';
import {
  BannerArrowIcon,
  FooterIcon1,
  FooterIcon2,
  FooterIcon3,
  FooterIcon4,
  DclIcon18,
  NavbarRefMobileIcon
} from '~src/components/layoutIcon/Icon';
import './index.scss';
import { FooterLink } from '~src/components/common/FooterLink';
import { IconLink } from '~src/components/common/FooterIconLink';

const Footer = () => {
  function openApp() {
    window.open('https://app.flashliquidity.finance/');
  }
  return (
    <div className="mx-auto lg:w-5/6 sm:w-full md:w-full mb-10 sm:px-9 sm:mb-8 md:mb-8 pt-24">
      <div className="flex justify-between text-base text-white mb-16 sm:flex-wrap sm:mb-0 md:flex-wrap md:mb-0 px-4">
          <FooterLink href="https://analytics.flashliquidity.finance/">Analytics</FooterLink>
          <FooterLink href="https://docs.flashliquidity.finance/">Docs</FooterLink>
          <FooterLink href="https://github.com/flashliquidity">Github</FooterLink>
          <FooterLink href="https://defillama.com/protocol/flashliquidity">Defi Llama</FooterLink>
      </div>
      <div className="flex justify-center">
        <NavbarRefMobileIcon className="cursor-pointer" onClick={openApp}></NavbarRefMobileIcon>
      </div>
    </div>
  );
};

export default Footer;
