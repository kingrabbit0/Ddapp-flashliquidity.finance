import { useState, useLayoutEffect } from 'react'
//import { shade } from 'polished'
//import Vibrant from 'node-vibrant'
//import { hex } from 'wcag-contrast'
import { Token /*, ChainId */ } from 'flashliquidity-sdk'

/*async function getColorFromToken(token: Token): Promise<string | null> {
  if (token.chainId === ChainId.MUMBAI && token.address === '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735') {//TODO:MUMBAI
    return Promise.resolve('#FAAB14')
  }

  const path = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/${token.address}/logo.png`

  return Vibrant.from(path)
    .getPalette()
    .then(palette => {
      if (palette?.Vibrant) {
        let detectedHex = palette.Vibrant.hex
        let AAscore = hex(detectedHex, '#FFF')
        while (AAscore < 3) {
          detectedHex = shade(0.005, detectedHex)
          AAscore = hex(detectedHex, '#FFF')
        }
        return detectedHex
      }
      return null
    })
    .catch(() => null)
}*/

export function useColor(token?: Token) {
  const [color, setColor] = useState('#00e5b9')

  useLayoutEffect(() => {
    //let stale = false

    /*if (token) {
      getColorFromToken(token).then(tokenColor => {
        if (!stale && tokenColor !== null) {
          setColor(tokenColor)
        }
      })
    }*/

    return () => {
      //let stale = true
      setColor('#00e5b9')
    }
  }, [token])

  return color
}
