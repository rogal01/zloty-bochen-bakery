import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Piekarnia & Cukiernia Romanowski | Tradycja od 1989',
  description: 'Rzemieślnicze pieczywo na 35-letnim zakwasie, autorskie torty artystyczne z konfiguratorem 3D oraz 6 lokalnych pracowni na Warmii.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${outfit.variable} ${playfair.variable} font-sans antialiased bg-[#fdfaf6] text-slate-800`}>
        {children}
      </body>
    </html>
  );
}

