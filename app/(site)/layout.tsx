import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/ui/SmoothScroll'
import ScrollProgress from '@/components/ui/ScrollProgress'
import { CustomCursor } from '@/components/ui/CustomCursor'

/*
  Site layout — wraps all public pages (not the studio).
  Provides: Nav, Footer, smooth scroll, scroll progress bar, custom cursor.
*/
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      {/* Chrome progress line — fixed, top of viewport */}
      <ScrollProgress />

      {/* Magnetic dot + ring cursor — desktop only, hidden on touch */}
      <CustomCursor />

      <Nav />
      <main className="pt-16">{children}</main>
      <Footer />
    </SmoothScroll>
  )
}
