import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { sanityClient } from './client'

const builder = createImageUrlBuilder({
  projectId: sanityClient.config().projectId ?? '',
  dataset: sanityClient.config().dataset ?? 'production',
})

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
