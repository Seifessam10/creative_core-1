export default function ProjectPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-cc-bg text-cc-text flex items-center justify-center">
      <h1 className="font-bebas text-6xl">{params.slug}</h1>
    </div>
  );
}
