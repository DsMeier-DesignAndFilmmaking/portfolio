export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        {/* Safari status bar buffer */}
        <div className="h-safe bg-white" />

        {children}
      </body>
    </html>
  );
}
