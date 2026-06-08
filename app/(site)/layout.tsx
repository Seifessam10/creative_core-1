import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

/*
  This layout wraps every page inside app/(site)/ — that means /, /work,
  /services, /about, and /contact all get the Nav and Footer automatically.

  The studio route at app/(studio)/ has its own separate layout, so it
  never gets this nav. That's the whole point of route groups in Next.js:
  you can share layout across some routes but not others without affecting URLs.

  `pt-16` on main pushes page content below the fixed nav (nav height = 64px = 4rem = pt-16).
*/
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  )
}
