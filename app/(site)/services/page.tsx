import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { getServicesQuery } from '@/lib/sanity/queries'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export const revalidate = 60

export const metadata = {
  title: 'Services — Creative Core',
  description: 'Apparel mockups, brand identity, logo design, and creative direction. View pricing and turnaround times.',
}

// The 4 process steps are hardcoded — no CMS needed, they never change
const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Brief',
    description: 'You fill the inquiry form with your vision, references, and timeline.',
  },
  {
    number: '02',
    title: 'Concept',
    description: 'We align on direction, scope, and deliverables before any design begins.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'We produce, iterate, and refine until the work feels exactly right.',
  },
  {
    number: '04',
    title: 'Delivery',
    description: 'Final files handed off — print-ready, web-ready, yours to own.',
  },
]

interface Service {
  _id: string
  name: string
  tagline?: string
  description?: string
  startingPrice?: string
  turnaround?: string
}

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>(getServicesQuery) ?? []

  return (
    <div className="min-h-screen bg-cc-bg">

      {/* ── Page header ──────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12 border-b border-cc-border">
        <AnimatedSection>
          <h1 className="font-bebas text-[64px] md:text-[96px] tracking-[0.08em] text-cc-text leading-none">
            What We Do
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-cc-muted mt-4">
            Services offered by Creative Core
          </p>
        </AnimatedSection>
      </div>

      {/* ── Services grid ─────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        {services.length === 0 ? (
          <p className="font-bebas text-3xl text-cc-muted">No services published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cc-border">
            {services.map((service, i) => (
              <AnimatedSection key={service._id} delay={i * 0.08}>
                {/*
                  `gap-px bg-cc-border` on the grid parent + `bg-cc-bg` on each card
                  creates 1px border lines between cards without actual border elements.
                  It's a cleaner technique for editorial grid layouts.
                */}
                <div className="bg-cc-bg p-8 md:p-10 flex flex-col gap-4 h-full">
                  <div>
                    <h2 className="font-bebas text-[32px] leading-none tracking-[0.06em] text-cc-text">
                      {service.name}
                    </h2>
                    {service.tagline && (
                      <p className="font-sans text-sm text-cc-muted mt-1">{service.tagline}</p>
                    )}
                  </div>

                  <div className="w-8 h-px bg-cc-border" />

                  {service.description && (
                    <p className="font-sans text-sm text-cc-muted leading-[1.7] flex-1">
                      {service.description}
                    </p>
                  )}

                  <div className="flex flex-col gap-1 mt-2">
                    {service.startingPrice && (
                      <p className="font-mono text-[12px] tracking-[0.1em] text-cc-chrome">
                        From {service.startingPrice}
                      </p>
                    )}
                    {service.turnaround && (
                      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-cc-muted">
                        Turnaround: {service.turnaround}
                      </p>
                    )}
                  </div>

                  <Link
                    href="/contact"
                    className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-text hover:text-cc-chrome transition-colors duration-200 mt-2 self-start"
                  >
                    Inquire →
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>

      {/* ── How It Works ──────────────────────────────────────────── */}
      <div className="border-t border-cc-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
          <AnimatedSection>
            <h2 className="font-bebas text-[48px] md:text-[64px] tracking-[0.08em] text-cc-text mb-12">
              How It Works
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-cc-border">
            {PROCESS_STEPS.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.1}>
                <div className="bg-cc-bg p-6 md:p-8">
                  {/* Decorative large step number — very muted, purely visual */}
                  <p className="font-bebas text-[64px] leading-none text-cc-subtle mb-4">
                    {step.number}
                  </p>
                  <h3 className="font-bebas text-2xl tracking-[0.06em] text-cc-text mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-cc-muted leading-[1.7]">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <div className="border-t border-cc-border py-20 text-center">
        <AnimatedSection>
          <h2 className="font-bebas text-4xl md:text-6xl tracking-[0.08em] text-cc-text mb-6">
            Ready to Start?
          </h2>
          <Link
            href="/contact"
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-text border border-cc-border px-8 py-4 hover:border-cc-subtle transition-colors duration-200"
          >
            Start a Project
          </Link>
        </AnimatedSection>
      </div>
    </div>
  )
}
