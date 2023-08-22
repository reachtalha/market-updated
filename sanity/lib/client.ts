import {createClient, SanityClient} from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'
import {indexQuery, postBySlugQuery, postSlugsQuery} from "./queries";

export const getClient = () => {
  return createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn,
  })
}

export async function getPostBySlug(
  slug: string,
) {
  const client = getClient();
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getPostsSlugs(){
  const client = getClient();
  return (await client.fetch(postSlugsQuery)) || ({} as any)
}

export async function getAllPosts(){
  const client = getClient();
  return (await client.fetch(indexQuery)) || ({} as any)
}
