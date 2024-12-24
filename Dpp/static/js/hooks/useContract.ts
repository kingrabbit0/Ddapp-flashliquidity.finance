import { Contract } from '@ethersproject/contracts'
import GOVERNANCE_ABI from '@uniswap/governance/build/GovernorAlpha.json'
import UNI_ABI from '@uniswap/governance/build/Uni.json'
import SBP_VAULT_ABI from '../constants/abis/SBPVault.json'
import STAKING_REWARDS_ABI1 from '../constants/abis/StakingRewards1.json'
import STAKING_REWARDS_ABI2 from '../constants/abis/StakingRewards2.json'
import MERKLE_DISTRIBUTOR_ABI from '@uniswap/merkle-distributor/build/MerkleDistributor.json'
import { ChainId, WETH } from 'flashliquidity-sdk'
import IUniswapV2PairABI from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useMemo } from 'react'
import {
  GOVERNANCE_ADDRESS,
  MERKLE_DISTRIBUTOR_ADDRESS,
  UNI
} from '../constants'
import {
  ARGENT_WALLET_DETECTOR_ABI,
  ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS
} from '../constants/abis/argent-wallet-detector'
import FLIQ_ABI from '../constants/abis/FliqToken.json'
import FAUCET_ABI from '../constants/abis/FliqFaucet.json'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import { MIGRATOR_ABI, MIGRATOR_ADDRESS } from '../constants/abis/migrator'
import UNISOCKS_ABI from '../constants/abis/unisocks.json'
import WETH_ABI from '../constants/abis/weth.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
import { getContract } from '../utils'
import { useActiveWeb3React } from './index'

const FLIQ_ADDRESS = '0x9e05E935C4d2e34980D4913B0fC01fC3dd60b7D5'
const FAUCET_ADDRESS = '0xd34b8e6c9d312938D85f791A6c0937be93dee9a5'
// returns null on errors
function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      )
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useV2MigratorContract(): Contract | null {
  return useContract(MIGRATOR_ADDRESS, MIGRATOR_ABI, true)
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? WETH[chainId].address : undefined,
    WETH_ABI,
    withSignerIfPossible
  )
}

export function useFliqToken(): Contract | null {
  return useContract(FLIQ_ADDRESS, FLIQ_ABI, true)
}

export function useFliqFaucet(): Contract | null {
  return useContract(FAUCET_ADDRESS, FAUCET_ABI, true)
}

export function useArgentWalletDetectorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId === ChainId.MATIC
      ? ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS
      : undefined,
    ARGENT_WALLET_DETECTOR_ABI,
    false
  )
}

export function useENSRegistrarContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.MATIC:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' //TODO: MATIC
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(
  address: string | undefined,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(
  pairAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI.abi, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId && MULTICALL_NETWORKS[chainId],
    MULTICALL_ABI,
    false
  )
}

export function useMerkleDistributorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? MERKLE_DISTRIBUTOR_ADDRESS[chainId] : undefined,
    MERKLE_DISTRIBUTOR_ABI,
    true
  )
}

export function useGovernanceContract(): Contract | null {
  return useContract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI.abi, true)
}

export function useUniContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? UNI[chainId].address : undefined,
    UNI_ABI.abi,
    true
  )
}

export function useSBPVaultContract(
  vaultAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(vaultAddress, SBP_VAULT_ABI.abi, withSignerIfPossible)
}

export function useStakingContract1(
  stakingAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(
    stakingAddress,
    STAKING_REWARDS_ABI1.abi,
    withSignerIfPossible
  )
}

export function useStakingContract2(
  stakingAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(
    stakingAddress,
    STAKING_REWARDS_ABI2.abi,
    withSignerIfPossible
  )
}

export function useSocksController(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId === ChainId.MATIC ? undefined : undefined,
    UNISOCKS_ABI,
    false
  )
}
