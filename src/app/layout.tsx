import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Cukiernia-Piekarnia Romanowski | Od 1969',
  description: 'Tradycja z serca Goworowa. Piekarnia i cukiernia Romanowski oferuje rzemieślnicze wypieki, pieczywo oraz torty artystyczne Poezja Smaku. 22 lokalizacje.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#fdfaf6] text-slate-800`}>
        {children}
      </body>
    </html>
  );
}