import { Interface } from '@ethersproject/abi'
import SBP_VAULT_ABI from './SBPVault.json'
import SBP_VAULT_FACTORY_ABI from './SBPVaultFactory.json'

const SBP_VAULT_INTERFACE = new Interface(SBP_VAULT_ABI.abi)

const SBP_VAULT_FACTORY_INTERFACE = new Interface(SBP_VAULT_FACTORY_ABI.abi)

export { SBP_VAULT_FACTORY_INTERFACE, SBP_VAULT_INTERFACE }
