import React from 'react'
import styled from 'styled-components/macro'
import { Sun, Moon } from 'react-feather'
const ToggleElement = styled.span<{ isActive?: boolean; isOnSwitch?: boolean }>`
  border-radius: 12px;
  background: ${({ theme, isActive, isOnSwitch }) =>
    isActive ? (isOnSwitch ? theme.primary1 : theme.text4) : 'none'};
  color: ${({ theme, isActive, isOnSwitch }) =>
    isActive ? (isOnSwitch ? theme.white : theme.text2) : theme.text3};
  font-size: 0.5rem;
  font-weight: 100;
  padding: 0.25rem 0.5rem;
  background: ${({ theme, isActive, isOnSwitch }) =>
    isActive ? (isOnSwitch ? theme.primary1 : theme.text4) : 'none'};
  color: ${({ theme, isActive, isOnSwitch }) =>
    isActive ? (isOnSwitch ? theme.white : theme.text2) : theme.text2};
  font-weight: ${({ isOnSwitch }) => (isOnSwitch ? '200' : '100')};
  :hover {
    user-select: ${({ isOnSwitch }) => (isOnSwitch ? 'none' : 'initial')};
    background: ${({ theme, isActive, isOnSwitch }) =>
      isActive ? (isOnSwitch ? theme.primary1 : theme.text3) : 'none'};
    color: ${({ theme, isActive, isOnSwitch }) =>
      isActive ? (isOnSwitch ? theme.white : theme.text2) : theme.text3};
  }
`

const StyledToggle = styled.button<{
  isActive?: boolean
  activeElement?: boolean
}>`
  border-radius: 12px;
  border: none;
  /* border: 1px solid ${({ theme, isActive }) =>
    isActive ? theme.primary5 : theme.text4}; */
  background: ${({ theme }) => theme.bg3};
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 0;
  /* background-color: transparent; */
`

export interface ToggleProps {
  id?: string
  isActive: boolean
  toggle: () => void
}

export default function Toggle({ id, isActive, toggle }: ToggleProps) {
  return (
    <StyledToggle id={id} isActive={isActive} onClick={toggle}>
      <ToggleElement isActive={isActive} isOnSwitch={true}>
        <Moon />
      </ToggleElement>
      <ToggleElement isActive={!isActive} isOnSwitch={false}>
        <Sun />
      </ToggleElement>
    </StyledToggle>
  )
}
