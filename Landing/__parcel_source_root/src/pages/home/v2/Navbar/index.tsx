import React, { useEffect, useState } from 'react'
import {
  NavbarRefIcon,
  NavbarRefMobileIcon,
} from '~src/components/layoutIcon/Icon'
import Link from '~src/components/common/Link'
import { isMobile } from '~src/utils/device'
const mobile = isMobile()
const Navbar = () => {
  const [float, setFloat] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', scrollFun)
    return () => window.removeEventListener('scroll', scrollFun)
  }, [])
  function scrollFun(e: any) {
    const scrollTop =
      e.srcElement.documentElement.scrollTop ||
      window.pageYOffset ||
      e.srcElement.body.scrollTop
    const h = mobile ? 60 : 43
    if (scrollTop > h) {
      setFloat(true)
    } else {
      setFloat(false)
    }
  }

  function openApp() {
    window.open('https://app.flashliquidityai.com/')
  }
  return (
    <div
      className="relative"
      style={{
        borderBottomLeftRadius: '64px',
        borderBottomRightRadius: '64px',
      }}
    >
      <div
        className={float ? 'fixed left-0 top-0 w-full bg-shadowColor z-50' : ''}
        style={{
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          overflow: 'hidden',
          boxShadow: float ? '0px 4px 20px rgba(0, 0, 0, 0.9)' : '',
          backdropFilter: float ? 'blur(16px)' : '',
          WebkitBackdropFilter: float ? 'blur(16px)' : '',
        }}
      >
        <div className="relative z-50 flex items-center justify-between mx-auto lg:w-5/6 sm:w-full md:w-full h-14 sm:px-6 md:px-6">
          <NavbarRefIcon
            className="sm:hidden md:hidden cursor-pointer"
            onClick={openApp}
          ></NavbarRefIcon>
          <NavbarRefMobileIcon
            className="lg:hidden cursor-pointer"
            onClick={openApp}
          ></NavbarRefMobileIcon>
          <Link className={float ? 'sm:hidden md:hidden' : 'sm:-mr-4'} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
