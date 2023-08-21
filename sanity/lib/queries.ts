import { groq } from 'next-sanity'


const postFields = groq`
   _id,
  title,
  date,
  _updatedAt,
  excerpt,
  mainImage,
  thumbnailImage,
  publishedAt,
  body,
  "slug": slug.current,
  "author": author->{name, image},
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`