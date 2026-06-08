/*
  /api/inquiry — POST route handler.

  HOW NEXT.JS API ROUTES WORK:
  Any file at app/api/.../route.ts becomes a server-side HTTP endpoint.
  It never runs in the browser — only on the server. This is where we
  put secret operations (writing to databases, sending emails) because
  the API key and write token never get sent to the client.

  FLOW:
  1. Browser submits form → POST /api/inquiry
  2. Server validates the body with Zod
  3. Server creates an Inquiry document in Sanity (via write token)
  4. Server sends two emails via Resend
  5. Server responds with { success: true }
*/

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@sanity/client'
import { sendInquiryEmails } from '@/lib/resend/sendInquiry'
import { sanityFetch } from '@/lib/sanity/client'
import { getSettingsQuery } from '@/lib/sanity/queries'

// Zod schema — validates every field before we touch the database
const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  projectType: z.string().min(1, 'Please select a project type'),
  budgetRange: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().optional(),
  brief: z.string().min(20, 'Please describe your project in at least 20 characters'),
  source: z.string().optional(),
})

// Write client — uses SANITY_API_TOKEN (never exposed to browser)
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // parse() throws if validation fails — caught below
    const data = inquirySchema.parse(body)

    // Fetch the inquiry email from Sanity settings
    const settings = await sanityFetch<{ inquiryEmail?: string; email?: string }>(getSettingsQuery)
    const inquiryEmail = settings?.inquiryEmail ?? settings?.email ?? 'hello@creativecore.pro'

    // Save to Sanity — creates an Inquiry document
    await writeClient.create({
      _type: 'inquiry',
      name: data.name,
      email: data.email,
      projectType: data.projectType,
      budgetRange: data.budgetRange,
      timeline: data.timeline ?? '',
      brief: data.brief,
      source: data.source ?? '',
      status: 'new',
    })

    // Send both emails
    await sendInquiryEmails({ ...data, inquiryEmail })

    return NextResponse.json({ success: true })
  } catch (err) {
    // ZodError means bad input from the client
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues[0].message }, { status: 400 })
    }
    console.error('Inquiry API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
