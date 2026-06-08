'use client'

/*
  InquiryForm.tsx — the contact form.

  REACT HOOK FORM + ZOD:
  - react-hook-form manages form state, validation triggers, and field registration
    without causing a re-render on every keystroke (unlike controlled inputs).
  - zod defines the validation rules as a schema.
  - @hookform/resolvers/zod connects the two — form knows to use the zod schema.

  STATES:
  - idle     → form is ready
  - loading  → POST in flight
  - success  → saved + emails sent
  - error    → something failed
*/

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Loader2 } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  projectType: z.string().min(1, 'Please select a project type'),
  budgetRange: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().optional(),
  brief: z.string().min(20, 'Please describe your project in at least 20 characters'),
  source: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface InquiryFormProps {
  disabled?: boolean
}

// Shared Tailwind classes for all inputs/selects/textarea
const inputClass = `
  w-full bg-cc-surface border border-cc-border text-cc-text
  font-mono text-[12px] tracking-[0.05em]
  px-4 py-3 outline-none
  focus:border-cc-muted transition-colors duration-200
  placeholder:text-cc-subtle
`

export default function InquiryForm({ disabled = false }: InquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,      // connects each input to react-hook-form
    handleSubmit,  // wraps our submit fn with validation
    formState: { errors }, // per-field error messages from zod
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 py-16">
        <CheckCircle size={32} className="text-cc-chrome" />
        <h3 className="font-bebas text-3xl tracking-[0.08em] text-cc-text">Inquiry Sent.</h3>
        <p className="font-sans text-cc-muted">
          We&apos;ll review your brief and get back to you within 24–48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

      {/* Name + Email — side by side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[9px] uppercase tracking-[0.12em] text-cc-muted">
            Full Name *
          </label>
          <input
            {...register('name')}
            disabled={disabled || status === 'loading'}
            placeholder="Your name"
            className={inputClass}
          />
          {errors.name && <FieldError msg={errors.name.message} />}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-mono text-[9px] uppercase tracking-[0.12em] text-cc-muted">
            Email *
          </label>
          <input
            {...register('email')}
            type="email"
            disabled={disabled || status === 'loading'}
            placeholder="you@example.com"
            className={inputClass}
          />
          {errors.email && <FieldError msg={errors.email.message} />}
        </div>
      </div>

      {/* Project Type */}
      <div className="flex flex-col gap-1">
        <label className="font-mono text-[9px] uppercase tracking-[0.12em] text-cc-muted">
          Project Type *
        </label>
        <select
          {...register('projectType')}
          disabled={disabled || status === 'loading'}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>Select a type...</option>
          {['Apparel Mockup', 'Brand Identity', 'Logo Design', 'Campaign Visuals', 'Other'].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {errors.projectType && <FieldError msg={errors.projectType.message} />}
      </div>

      {/* Budget + Timeline — side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[9px] uppercase tracking-[0.12em] text-cc-muted">
            Budget Range *
          </label>
          <select
            {...register('budgetRange')}
            disabled={disabled || status === 'loading'}
            className={inputClass}
            defaultValue=""
          >
            <option value="" disabled>Select a range...</option>
            {['Under $200', '$200–$500', '$500–$1,000', '$1,000–$2,500', '$2,500+'].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {errors.budgetRange && <FieldError msg={errors.budgetRange.message} />}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-mono text-[9px] uppercase tracking-[0.12em] text-cc-muted">
            Timeline
          </label>
          <select
            {...register('timeline')}
            disabled={disabled || status === 'loading'}
            className={inputClass}
            defaultValue=""
          >
            <option value="">Flexible</option>
            {['ASAP', '1–2 weeks', '2–4 weeks', '1–3 months'].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Brief */}
      <div className="flex flex-col gap-1">
        <label className="font-mono text-[9px] uppercase tracking-[0.12em] text-cc-muted">
          Project Brief *
        </label>
        <textarea
          {...register('brief')}
          disabled={disabled || status === 'loading'}
          placeholder="Tell us about your project — vision, references, goals..."
          rows={5}
          className={`${inputClass} resize-none`}
        />
        {errors.brief && <FieldError msg={errors.brief.message} />}
      </div>

      {/* Source */}
      <div className="flex flex-col gap-1">
        <label className="font-mono text-[9px] uppercase tracking-[0.12em] text-cc-muted">
          How Did You Find Us?
        </label>
        <select
          {...register('source')}
          disabled={disabled || status === 'loading'}
          className={inputClass}
          defaultValue=""
        >
          <option value="">Prefer not to say</option>
          {['Instagram', 'Referral', 'Google', 'Other'].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      {/* Error state */}
      {status === 'error' && (
        <p className="font-mono text-[10px] text-red-400 uppercase tracking-[0.1em]">
          Something went wrong. Email us directly at hello@creativecore.pro
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={disabled || status === 'loading'}
        className="
          w-full font-bebas text-[18px] tracking-[0.08em] text-cc-text
          border border-cc-border py-4
          hover:border-cc-subtle transition-colors duration-200
          disabled:opacity-40 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
        "
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : 'Send Inquiry'}
      </button>
    </form>
  )
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="font-mono text-[9px] text-red-400 uppercase tracking-[0.1em]">{msg}</p>
}
