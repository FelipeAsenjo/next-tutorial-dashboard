import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* By adding Inter to the <body> element, the font will be applied throughout your application. */}
      <body className={`${inter.className} antialiased`}>{children}</body>
      {/* you're also adding the Tailwind antialiased class which smooths out the font. It's not necessary to use this class, but it adds a nice touch. */}
    </html>
  );
}
