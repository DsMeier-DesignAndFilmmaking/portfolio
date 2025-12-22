import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        {/* Top nav bar */}
        <Navbar />

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}