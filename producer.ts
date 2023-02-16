import client from './client'
import { createProduct, PRODUCT_INDEX } from './model'

const index = client.index(PRODUCT_INDEX)

const products = Array.from({ length: 1_000 }, () => createProduct())

let response = await index.addDocuments(products)

console.log({ response })
