import { Metadata } from 'next';
import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts';

// Metadata for the whole app
export const metadata: Metadata = {
  title: {
    // the '%s' will be replaced with whatever titles you set in children pages. Ej: 'Invoices | Acme Dashboard'
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard'
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

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
