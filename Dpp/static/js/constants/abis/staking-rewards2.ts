import { Interface } from '@ethersproject/abi'
import STAKING_REWARDS_ABI from './StakingRewards2.json'
import STAKING_REWARDS_FACTORY_ABI from './StakingRewardsFactory2.json'

const STAKING_REWARDS_INTERFACE = new Interface(STAKING_REWARDS_ABI.abi)

const STAKING_REWARDS_FACTORY_INTERFACE = new Interface(
  STAKING_REWARDS_FACTORY_ABI.abi
)

export { STAKING_REWARDS_FACTORY_INTERFACE, STAKING_REWARDS_INTERFACE }
