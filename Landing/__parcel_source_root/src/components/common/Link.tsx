import React, { useState } from 'react';
import {
  FooterIcon1Hover,
  FooterIcon2Hover,
  FooterIcon3Hover,
  FooterIcon4Hover,
  FooterIcon5Hover
} from '~src/components/layoutIcon/Icon';
const Link = (props: any) => {
  return (
    <div className={`flex items-center ${props.className}`}>
      <FooterIconA />
      <FooterIconB />
      <FooterIconC />
      <FooterIconD />
      <FooterIconE />
    </div>
  );
};

export default Link;

function FooterIconA() {
  const [hoverLogo, setHoverLogo] = useState(false);
  function go() {
    window.open('https://twitter.com/flashliquidity');
  }
  return (
    <FooterIcon1Hover
      onMouseOver={() => setHoverLogo(true)}
      onMouseLeave={() => setHoverLogo(false)}
      onClick={go}
      hoverLogo={hoverLogo}
      className="cursor-pointer text-opacity80White drop-shadow-2xl hover:text-hightGreenColor"
    />
  );
}
function FooterIconB() {
  const [hoverLogo, setHoverLogo] = useState(false);
  function go() {
    window.open('https://t.me/flashliquidity');
  }
  return (
    <FooterIcon2Hover
      onMouseOver={() => setHoverLogo(true)}
      onMouseLeave={() => setHoverLogo(false)}
      onClick={go}
      hoverLogo={hoverLogo}
      className="cursor-pointer text-opacity80White drop-shadow-2xl hover:text-hightGreenColor lg:ml-1"
    />
  );
}
function FooterIconC() {
  const [hoverLogo, setHoverLogo] = useState(false);
  function go() {
    window.open('https://discord.com/invite/b2A5WyAGAM');
  }
  return (
    <FooterIcon3Hover
      onMouseOver={() => setHoverLogo(true)}
      onMouseLeave={() => setHoverLogo(false)}
      onClick={go}
      hoverLogo={hoverLogo}
      className="cursor-pointer text-opacity80White drop-shadow-2xl hover:text-hightGreenColor lg:ml-1"
    />
  );
}
function FooterIconD() {
  const [hoverLogo, setHoverLogo] = useState(false);
  function go() {
    window.open('https://medium.com/@flashliquidity');
  }
  return (
    <FooterIcon4Hover
      onMouseOver={() => setHoverLogo(true)}
      onMouseLeave={() => setHoverLogo(false)}
      onClick={go}
      hoverLogo={hoverLogo}
      className="cursor-pointer text-opacity80White drop-shadow-2xl hover:text-hightGreenColor lg:ml-1"
    />
  );
}

function FooterIconE() {
  const [hoverLogo, setHoverLogo] = useState(false);
  function go() {
    window.open('mailto:info@flashliquidity.finance');
  }
  return (
    <FooterIcon5Hover
      onMouseOver={() => setHoverLogo(true)}
      onMouseLeave={() => setHoverLogo(false)}
      onClick={go}
      hoverLogo={hoverLogo}
      className="cursor-pointer text-opacity80White drop-shadow-2xl hover:text-hightGreenColor lg:ml-1"
    />
  );
}
