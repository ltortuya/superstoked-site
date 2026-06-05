// Minimal layout for Studio — strips the site Nav/Footer (which the root
// layout applies) so Sanity has the full viewport to itself.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
