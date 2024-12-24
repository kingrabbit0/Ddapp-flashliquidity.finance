import React, { useRef, useState } from 'react'
import { Text } from 'rebass'
import styled from 'styled-components/macro'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import {
  useModalOpen,
  useToggleSettingsMenu
} from '../../state/application/hooks'
import { ButtonGray, ButtonSecondary } from '../Button'
import { AutoColumn } from '../Column'
import Modal from '../Modal'
//import { RowBetween } from '../Row'
import { useTermsToggle, useTermsVisible } from '../../state/user/hooks'
import { TYPE } from '../../theme'
import { AlertTriangle } from 'react-feather'

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const Break = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`

const ModalContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 20px;
`

export default function TermsTab() {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.TERMS)
  const toggle = useToggleSettingsMenu()
  const [isChecked, setIsChecked] = useState(false)
  const toggleTerms = useTermsToggle()
  const showTerms = useTermsVisible()

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }
  // show confirmation view before turning on
  //const [showConfirmation, setShowConfirmation] = useState(true)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <Modal isOpen={showTerms} onDismiss={() => null} maxHeight={100}>
        <ModalContentWrapper>
          <AutoColumn gap="lg">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 2rem'
              }}
            >
              <AlertTriangle size={24} color="#c203fc"></AlertTriangle>
              <Text
                fontWeight={500}
                fontSize={22}
                style={{ marginLeft: '8px', marginRight: '8px' }}
              >
                Warning
              </Text>
            </div>
            <Break />
            <AutoColumn gap="lg" style={{ padding: '0 2rem' }}>
              <Text fontWeight={100} fontSize={14}>
                FlashLiquidity protocol is currently in BETA test and has not
                been audited yet. Use of the underlying smart contracts, either
                via the frontend or directly, is at the user’s own risk.
              </Text>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <TYPE.body fontSize={12} fontWeight={100} marginLeft={'10px'}>
                  I understand and accept the risks associated.
                </TYPE.body>
              </div>
              {isChecked ? (
                <ButtonSecondary padding={'12px'} onClick={toggleTerms}>
                  <Text fontSize={20} fontWeight={500}>
                    Get me in.
                  </Text>
                </ButtonSecondary>
              ) : (
                <ButtonGray padding={'12px'}>
                  <Text fontSize={16} fontWeight={400}>
                    Check the box to proceed.
                  </Text>
                </ButtonGray>
              )}
            </AutoColumn>
          </AutoColumn>
        </ModalContentWrapper>
      </Modal>
    </StyledMenu>
  )
}
