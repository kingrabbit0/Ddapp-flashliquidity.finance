import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, NormalizedCacheObject, gql } from '@apollo/client'

export const useStatsDex = () => {
  const [TVL, setTVL] = useState(0)
  const [TV, setTV] = useState(0)
  const [TXs, setTXs] = useState(0)
  const [pairs, setPairs] = useState(0)
  const [allChains, setAllChains] = useState(0)
  const [fetchedChains, setFetchedChains] = useState(0)
  const APIURL_POLYGON = 'https://api.studio.thegraph.com/query/72402/flashliquidity/v0.0.1'
  const APIURL_ZKEVM = 'https://api.studio.thegraph.com/query/72402/flashliquidity-zkevm/1.0.3'
  const APIURL_AVALANCHE = 'https://api.studio.thegraph.com/query/72402/flashliquidity-avalanche/v0.0.1'
  const APIURL_BASE = 'https://api.studio.thegraph.com/query/72402/flashliquidity-base/0.0.1'
  const APIURL_ARBITRUM = 'https://api.studio.thegraph.com/query/72402/flashliquidity-arbitrum-one/v0.0.1'
  
  async function fetchDataAndUpdateStats(
    client: ApolloClient<NormalizedCacheObject>,
    query: string | readonly string[]
  ) {
    const response = await client.query({ query: gql(query) })
    return {
      tvl: Number(response.data?.uniswapFactories[0]?.totalLiquidityUSD ?? 0),
      tv: Number(response.data?.uniswapFactories[0]?.totalVolumeUSD ?? 0),
      pairs: Number(response.data?.uniswapFactories[0]?.pairCount ?? 0),
      txs: Number(response.data?.uniswapFactories[0]?.txCount ?? 0)
    }
  }
  useEffect(() => {

    const client1 = new ApolloClient({
      uri: APIURL_POLYGON,
      cache: new InMemoryCache()
    })
  
    const client2 = new ApolloClient({
      uri: APIURL_ZKEVM,
      cache: new InMemoryCache({
        typePolicies: {
          Token: {
            // Singleton types that have no identifying field can use an empty
            // array for their keyFields.
            keyFields: false
          },
          Pool: {
            // Singleton types that have no identifying field can use an empty
            // array for their keyFields.
            keyFields: false
          }
        }
      }),
      queryDeduplication: true,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache'
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all'
        }
      }
    })
  
    const client3 = new ApolloClient({
      uri: APIURL_AVALANCHE,
      cache: new InMemoryCache()
    })
  
    const client4 = new ApolloClient({
      uri: APIURL_BASE,
      cache: new InMemoryCache({
        typePolicies: {
          Token: {
            // Singleton types that have no identifying field can use an empty
            // array for their keyFields.
            keyFields: false
          },
          Pool: {
            // Singleton types that have no identifying field can use an empty
            // array for their keyFields.
            keyFields: false
          }
        }
      }),
      queryDeduplication: true,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache'
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all'
        }
      }
    })
  
    const client5 = new ApolloClient({
      uri: APIURL_ARBITRUM,
      cache: new InMemoryCache()
    })

    const dexQuery = `
    query {
      uniswapFactories(first: 1) {
        id
        pairCount
        totalVolumeUSD
        totalLiquidityUSD
        txCount
      }
    }
  `

    async function updateStats() {
      let fetched = 0
      let allNetworks = 0
      let { tvl, tv, pairs, txs } = { tvl: 0, tv: 0, pairs: 0, txs: 0 }
      tv += 22505 // Additional constant value
      const clients = [client1, client2, client3, client4, client5]
      // Assuming client2, client3, and client4 are similar to client
      for (const client of clients) {
        const stats = await fetchDataAndUpdateStats(client, dexQuery)
        allNetworks += 1
        if(stats.tvl !== 0) fetched +=1
        tvl += stats.tvl
        tv += stats.tv
        pairs += stats.pairs
        txs += stats.txs
      }
      setTVL(tvl)
      setTV(tv)
      setPairs(pairs)
      setTXs(txs)
      setAllChains(allNetworks)
      setFetchedChains(fetched)
    }

    updateStats().catch(console.error)
  }, [])

  return {TVL, TV, pairs, fetchedChains, allChains};
};

export interface Token {
  rank: number;
  symbol: string;
  icon?: string;
  amount: string;
  price: string;
  volume24h: string;
  tvl: string;
}

export interface TokenBaseInfo {
  decimals: number;
  icon: string;
  name: string;
  reference: string;
  reference_hash: string;
  spec: string;
  symbol: string;
}
