'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'

export interface ProjectCardData {
  _id: string
  title: string
  slug: { current: string }
  client?: string
  category: string
  coverImage?: { asset: { _ref: string } }
  tags?: string[]
}

interface ProjectCardProps {
  project: ProjectCardData
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const imageUrl = project.coverImage?.asset
    ? urlFor(project.coverImage).width(800).height(1000).url()
    : null

  return (
    /*
      `layout` prop tells Framer Motion this element participates in layout animations.
      When the grid reflows (e.g. after a filter), Framer Motion smoothly animates
      each card from its old position to its new position instead of snapping.

      `layoutId` is unique per card so Framer Motion can track it across renders.
    */
    <motion.div
      layout
      layoutId={project._id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group relative aspect-[3/4] overflow-hidden bg-cc-surface cursor-pointer"
    >
      <Link href={`/work/${project.slug.current}`} className="block w-full h-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full bg-cc-surface flex items-center justify-center">
            <span className="font-mono text-[9px] uppercase tracking-widest text-cc-subtle">No Image</span>
          </div>
        )}

        {/* Hover overlay — invisible by default, fades in on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-bebas text-xl leading-none text-cc-text">{project.title}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-cc-muted mt-1">
                {project.category}
              </p>
            </div>
            <ArrowUpRight size={16} className="text-cc-text flex-shrink-0" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
