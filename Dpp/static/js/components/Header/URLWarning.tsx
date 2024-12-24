import React from 'react'
import styled from 'styled-components/macro'

import { AlertTriangle, X } from 'react-feather'
import {
  useURLWarningToggle,
  useURLWarningVisible
} from '../../state/user/hooks'
//import { isMobile } from 'react-device-detect'

const PhishAlert = styled.div<{ isActive: any }>`
  width: 100%;
  padding: 6px 6px;
  background-image: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary1},
    ${({ theme }) => theme.primary2}
  );
  color: white;
  font-size: 11px;
  justify-content: space-between;
  align-items: center;
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`

export const StyledClose = styled(X)`
  :hover {
    cursor: pointer;
  }
`

export default function URLWarning() {
  const toggleURLWarning = useURLWarningToggle()
  const showURLWarning = useURLWarningVisible()

  return (
    <PhishAlert isActive={showURLWarning}>
      <div style={{ display: 'flex' }}>
        <AlertTriangle style={{ marginRight: 6 }} size={12} /> Make sure the URL
        is flashliquidity.finance
      </div>
      <StyledClose size={12} onClick={toggleURLWarning} />
    </PhishAlert>
  )
}
