import React from 'react'
import styled from 'styled-components/macro'
import useCopyClipboard from '../../hooks/useCopyClipboard'
import { LinkStyledButton } from '../../theme'
import { CheckCircle, Copy } from 'react-feather'

const CopyIcon = styled(LinkStyledButton)`
  color: ${({ theme }) => theme.text3};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  font-size: 0.825rem;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => theme.text2};
  }
`

const TransactionStatusText = styled.span`
  margin-left: 0.25rem;
  font-size: 0.825rem;
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
`

interface CopyHelperProps {
  toCopy: string
  children?: React.ReactNode
}

const CopyHelper: React.FC<CopyHelperProps> = ({ toCopy, children }) => {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <CopyIcon onClick={() => setCopied(toCopy)}>
      {isCopied ? (
        <TransactionStatusText>
          <CheckCircle size={'16'} />
          <span>Copied</span>
        </TransactionStatusText>
      ) : (
        <TransactionStatusText>
          <Copy size={'16'} />
          {children}
        </TransactionStatusText>
      )}
    </CopyIcon>
  )
}

export default CopyHelper
