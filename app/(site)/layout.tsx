export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Nav and Footer will be added in US-01 */}
      <main>{children}</main>
    </>
  );
}
