import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import { Portfolio } from '../types'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})


export const getPortfolio = async (): Promise<Portfolio[]> => {
  const query = `*[_type == "portfolio" && defined(slug.current)]
{
  title,
  "slug" : slug.current,
  technologies,
  "image" : image.asset._ref,
  description,
  githubLink,
  projectLink
}|order(date desc)`
  const portfolio = await client.fetch(query)
  return portfolio
}
