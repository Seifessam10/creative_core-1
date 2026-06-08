import { groq } from 'groq'

// ── Hero marquee ──────────────────────────────────────────────────────────────
export const getFeaturedProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc) {
    _id, title, slug, client, category, coverImage
  }
`

// ── Portfolio grid ────────────────────────────────────────────────────────────
export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id, title, slug, client, category, coverImage, tags
  }
`

// ── Project detail ────────────────────────────────────────────────────────────
export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, client, category, coverImage,
    gallery[], description, tags[], publishedAt
  }
`

export const getRelatedProjectsQuery = groq`
  *[_type == "project" && category == $category && slug.current != $slug]
  | order(_createdAt desc) [0..2] {
    _id, title, slug, client, category, coverImage
  }
`

// Used by generateStaticParams in /work/[slug]
export const getAllProjectSlugsQuery = groq`
  *[_type == "project"] { "slug": slug.current }
`

// ── Services page ─────────────────────────────────────────────────────────────
export const getServicesQuery = groq`
  *[_type == "service" && visible == true] | order(_createdAt asc) {
    _id, name, tagline, description, startingPrice, turnaround
  }
`

// ── About + Contact pages ─────────────────────────────────────────────────────
export const getSettingsQuery = groq`
  *[_type == "settings"][0] {
    displayName, tagline, bio, profilePhoto,
    instagram, behance, email, inquiryEmail, acceptingInquiries
  }
`
