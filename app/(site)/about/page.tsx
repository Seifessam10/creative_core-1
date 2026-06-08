import Image from 'next/image'
import Link from 'next/link'
import { AtSign, Globe, Mail } from 'lucide-react'
import { sanityFetch } from '@/lib/sanity/client'
import { getSettingsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const revalidate = 60

export const metadata = {
  title: 'About — Creative Core',
  description: 'The story behind Creative Core — a graphic design studio specializing in streetwear and brand identity.',
}

const PILLARS = [
  {
    label: 'Design That Means Something',
    description: 'Every mark, typeface, and color decision serves a purpose. We don\'t decorate — we communicate.',
  },
  {
    label: 'Underground, Not Underground',
    description: 'Professional execution with genuine edge. The streets inform the work, but the craft is uncompromising.',
  },
  {
    label: 'Your Identity, Our Craft',
    description: 'We\'re not here to make it look like us. The work should feel unmistakably like you.',
  },
]

interface Settings {
  displayName?: string
  tagline?: string
  bio?: string
  profilePhoto?: { asset: { _ref: string } }
  instagram?: string
  behance?: string
  email?: string
}

export default async function AboutPage() {
  const settings = await sanityFetch<Settings>(getSettingsQuery)
  const photoUrl = settings?.profilePhoto?.asset
    ? urlFor(settings.profilePhoto).width(800).height(1000).url()
    : null

  return (
    <div className="min-h-screen bg-cc-bg">

      {/* ── Split layout: text left, photo right ─────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left — text content */}
          <AnimatedSection>
            <div className="flex flex-col gap-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-muted">
                About the Studio
              </p>
              <h1 className="font-bebas text-[56px] md:text-[80px] leading-none tracking-[0.06em] text-cc-text">
                {settings?.displayName ?? 'Creative Core'}
              </h1>
              {settings?.tagline && (
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-cc-muted">
                  {settings.tagline}
                </p>
              )}
              {settings?.bio && (
                <p className="font-sans text-base text-cc-muted leading-[1.8]">
                  {settings.bio}
                </p>
              )}

              {/* Social links */}
              <div className="flex flex-col gap-3 mt-2">
                {settings?.instagram && (
                  <a
                    href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-cc-muted hover:text-cc-text transition-colors duration-200"
                  >
                    <AtSign size={14} />
                    {settings.instagram}
                  </a>
                )}
                {settings?.behance && (
                  <a
                    href={settings.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-cc-muted hover:text-cc-text transition-colors duration-200"
                  >
                    <Globe size={14} />
                    Behance
                  </a>
                )}
                {settings?.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-cc-muted hover:text-cc-text transition-colors duration-200"
                  >
                    <Mail size={14} />
                    {settings.email}
                  </a>
                )}
              </div>

              <div className="mt-4">
                <Link
                  href="/contact"
                  className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-text border border-cc-border px-6 py-3 hover:border-cc-subtle transition-colors duration-200 inline-block"
                >
                  Work With Us →
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — profile photo */}
          <AnimatedSection delay={0.2} variant="fadeIn">
            <div className="relative aspect-[4/5] border border-cc-border overflow-hidden">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={settings?.displayName ?? 'Creative Core'}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                // Placeholder until a photo is added in Sanity
                <div className="w-full h-full bg-cc-surface flex items-center justify-center">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-cc-subtle">
                    Add photo in Sanity
                  </p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* ── The Approach — philosophy pillars ───────────────────── */}
      <div className="border-t border-cc-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
          <AnimatedSection>
            <h2 className="font-bebas text-[48px] md:text-[64px] tracking-[0.08em] text-cc-text mb-12">
              The Approach
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cc-border">
            {PILLARS.map((pillar, i) => (
              <AnimatedSection key={pillar.label} delay={i * 0.1}>
                <div className="bg-cc-bg p-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-cc-chrome mb-4">
                    0{i + 1}
                  </p>
                  <h3 className="font-bebas text-2xl tracking-[0.06em] text-cc-text mb-3">
                    {pillar.label}
                  </h3>
                  <p className="font-sans text-sm text-cc-muted leading-[1.7]">
                    {pillar.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
