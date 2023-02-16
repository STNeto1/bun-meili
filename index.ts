import { Context, Elysia } from 'elysia'
import client from './client'
import { PRODUCT_INDEX } from './model'

const index = client.index(PRODUCT_INDEX)

const getPagination = (ctx: Context) => {
  const queries = ctx.query ?? {}

  const rawPage = queries['page']
  const rawLimit = queries['per_page']

  return {
    page: rawPage ? parseInt(rawPage) ?? 1 : 1,
    limit: rawLimit ? parseInt(rawLimit) ?? 10 : 10
  }
}

const searchHandler = async (ctx: Context) => {
  const term = ctx.query?.['term'] ?? ''
  const { page, limit } = getPagination(ctx)

  const result = await index.search(term, {
    limit,
    offset: (page - 1) * limit
  })

  return {
    data: result['hits'],
    pages: Math.ceil((result['estimatedTotalHits'] ?? 1) / limit)
  }
}

const app = new Elysia()
  .get('/', () => 'Hello Elysia')
  .get('search', searchHandler)
  .listen(8080)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
