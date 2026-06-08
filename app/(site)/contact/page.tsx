import { AtSign, Mail } from 'lucide-react'
import { sanityFetch } from '@/lib/sanity/client'
import { getSettingsQuery } from '@/lib/sanity/queries'
import InquiryForm from '@/components/contact/InquiryForm'

export const revalidate = 60

export const metadata = {
  title: 'Contact — Creative Core',
  description: 'Start a project with Creative Core. Fill out our inquiry form and we\'ll get back to you within 48 hours.',
}

interface Settings {
  email?: string
  inquiryEmail?: string
  instagram?: string
  acceptingInquiries?: boolean
}

export default async function ContactPage() {
  const settings = await sanityFetch<Settings>(getSettingsQuery)
  const isOpen = settings?.acceptingInquiries !== false

  return (
    <div className="min-h-screen bg-cc-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">

        {/* Page heading */}
        <div className="mb-12">
          <h1 className="font-bebas text-[64px] md:text-[96px] tracking-[0.08em] text-cc-text leading-none">
            Contact
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-cc-muted mt-2">
            {isOpen ? 'Currently accepting new projects' : 'Currently at capacity'}
          </p>
        </div>

        {/* Two-column layout: form left, info right */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-start">

          {/* Left — inquiry form */}
          <div>
            {!isOpen && (
              <div className="border border-cc-border p-6 mb-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-cc-muted">
                  Currently at capacity — check back soon.
                </p>
              </div>
            )}
            <InquiryForm disabled={!isOpen} />
          </div>

          {/* Right — sticky contact info */}
          <div className="lg:sticky lg:top-32 flex flex-col gap-8">
            <div>
              <h2 className="font-bebas text-5xl tracking-[0.08em] text-cc-text mb-6">
                Let&apos;s Talk
              </h2>
              <div className="flex flex-col gap-4">
                {settings?.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-cc-muted hover:text-cc-text transition-colors duration-200"
                  >
                    <Mail size={14} />
                    {settings.email}
                  </a>
                )}
                {settings?.instagram && (
                  <a
                    href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-cc-muted hover:text-cc-text transition-colors duration-200"
                  >
                    <AtSign size={14} />
                    {settings.instagram}
                  </a>
                )}
              </div>
            </div>

            <div className="border-t border-cc-border pt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-subtle leading-[1.8]">
                Typical response<br />
                24–48 hours
              </p>
            </div>

            <div className="border-t border-cc-border pt-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-cc-subtle leading-[1.8]">
                Based in —<br />
                Available worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
