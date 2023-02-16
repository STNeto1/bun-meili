import { MeiliSearch } from 'meilisearch'

const client = new MeiliSearch({
  host: 'http://localhost:7700',
  apiKey: 'mmk'
})

if (!(await client.isHealthy())) {
  throw new Error('failed to connect')
}

export default client
