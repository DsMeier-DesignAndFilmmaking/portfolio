export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  // ✅ Nested layouts should NOT have <html> or <body> tags
  // Only the root layout should have those. This allows proper inheritance.
  return (
    <>
      {/* ✅ Navbar removed - starting clean to rebuild */}
      {children}
    </>
  );
}
