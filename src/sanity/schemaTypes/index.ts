import { type SchemaTypeDefinition } from 'sanity'
import { portfolioType } from './portfolioSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioType],
}
