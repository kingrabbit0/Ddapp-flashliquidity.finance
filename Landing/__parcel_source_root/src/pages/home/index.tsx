import React from 'react';
import Navbar from './v2/Navbar';
import Banner from './v2/Banner';
import { isMobile } from '~src/utils/device';
import { FliqIntro } from './FliqIntro/index';
import Dex from './v3/Dex';
import SBP from './v3/SBP';
import Footer from './v3/Footer';
import PreFooter from './v3/PreFooter';
import Launchpad from './v3/Launchpad';
import Composable from './v3/Composable';

const HomePage = () => {
  const mobile = isMobile();
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <header>
        <Navbar />
      </header>
      <div className="mx-auto">
        <section className="mx-auto">
          <Banner />
          {/* <Intro /> */}
          <Dex />
          <SBP />
          <FliqIntro />
{/*           <Launchpad /> */}
{/*           <Composable /> */}
{/*           <Investors /> */}
          <PreFooter />
        </section>
      </div>
      <footer className="Home_footer flex justify-center">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
