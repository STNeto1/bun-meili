import { faker } from '@faker-js/faker'

export const PRODUCT_INDEX = 'products' as const

export type Product = {
  id: string
  title: string
  slug: string
  description: string
  price: number
  promotional_price: number | null
  rating: number
  categories: Array<string>
  seller: string
  brand: string
}

export const createProduct = (): Product => {
  const price = faker.datatype.float({ min: 20, max: 500 })

  return {
    id: faker.datatype.uuid(),
    title: faker.commerce.product(),
    slug: faker.lorem.slug(5),
    description: faker.lorem.words(100),
    price,
    promotional_price: faker.datatype.boolean()
      ? faker.datatype.float({ min: 20, max: price - 1 })
      : null,
    rating: faker.datatype.float({ min: 0, max: 5 }),
    categories: Array.from(
      {
        length: faker.datatype.number({ min: 2, max: 4 })
      },
      () => faker.commerce.department()
    ),
    seller: faker.name.fullName(),
    brand: faker.commerce.department()
  }
}
