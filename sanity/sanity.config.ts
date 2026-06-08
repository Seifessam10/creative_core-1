import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import project from './schemas/project'
import service from './schemas/service'
import settings from './schemas/settings'
import inquiry from './schemas/inquiry'

export default defineConfig({
  name: 'creative-core',
  title: 'Creative Core',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [project, service, settings, inquiry],
  },
})
