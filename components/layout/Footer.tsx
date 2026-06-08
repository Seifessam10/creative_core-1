export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-cc-border py-8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-subtle">
          © {year} Creative Core. All rights reserved.
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-subtle">
          Design · Branding · Identity
        </span>
      </div>
    </footer>
  )
}
