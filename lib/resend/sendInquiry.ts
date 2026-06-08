/*
  sendInquiry.ts — email templates sent via Resend.

  WHY RESEND:
  Resend is a developer-first email API. You get a domain, an API key,
  and you send HTML emails with a single fetch call. No SMTP config,
  no complex setup.

  TWO EMAILS PER SUBMISSION:
  1. To the designer — full inquiry details so they can respond
  2. To the client — confirmation that their message was received
*/

import { Resend } from 'resend'

interface InquiryData {
  name: string
  email: string
  projectType: string
  budgetRange: string
  timeline?: string
  brief: string
  source?: string
  inquiryEmail: string // designer's email from Sanity settings
}

export async function sendInquiryEmails(data: InquiryData) {
  // Instantiated here (not at module level) so env vars are available at runtime
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { name, email, projectType, budgetRange, timeline, brief, source, inquiryEmail } = data

  // Send both emails in parallel — Promise.all waits for both to finish
  await Promise.all([
    // Email 1 — to the designer
    resend.emails.send({
      from: 'Creative Core <noreply@creativecore.pro>',
      to: inquiryEmail,
      subject: `New Inquiry — ${projectType} from ${name}`,
      html: `
        <div style="font-family: monospace; background: #080808; color: #e8e8e8; padding: 32px; max-width: 600px;">
          <h2 style="font-size: 24px; letter-spacing: 0.08em; margin-bottom: 24px;">NEW INQUIRY</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c8c8c8;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Project Type</td><td style="padding: 8px 0;">${projectType}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Budget</td><td style="padding: 8px 0;">${budgetRange}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Timeline</td><td style="padding: 8px 0;">${timeline ?? 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Source</td><td style="padding: 8px 0;">${source ?? 'Not specified'}</td></tr>
          </table>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #1e1e1e;">
            <p style="color: #666; margin-bottom: 8px;">PROJECT BRIEF</p>
            <p style="line-height: 1.7;">${brief}</p>
          </div>
        </div>
      `,
    }),

    // Email 2 — confirmation to the client
    resend.emails.send({
      from: 'Creative Core <noreply@creativecore.pro>',
      to: email,
      subject: `We got your message — Creative Core`,
      html: `
        <div style="font-family: monospace; background: #080808; color: #e8e8e8; padding: 32px; max-width: 600px;">
          <h2 style="font-size: 24px; letter-spacing: 0.08em; margin-bottom: 16px;">THANKS, ${name.toUpperCase()}.</h2>
          <p style="color: #666; line-height: 1.7;">
            We received your inquiry about <strong style="color: #e8e8e8;">${projectType}</strong>.
            We'll review your brief and get back to you within 24–48 hours.
          </p>
          <p style="color: #333; margin-top: 32px; font-size: 11px; letter-spacing: 0.1em;">
            — CREATIVE CORE · CREATIVECORE.PRO
          </p>
        </div>
      `,
    }),
  ])
}
