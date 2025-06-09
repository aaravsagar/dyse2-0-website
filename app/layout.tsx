import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://dyse.vercel.app'),
  title: {
    default: 'DYSE - Discord Casino Bot | Custom Economy & Game Bot',
    template: '%s | DYSE - Discord Casino Bot'
  },
  description: 'DYSE is the best Discord Casino Bot with customizable economy, games, and rewards. Perfect for leveling up your Discord server with blackjack, coinflip, mines, and more!',
  keywords: [
    'Discord Casino Bot',
    'Discord Casino Bot Commands',
    'Discord Gambling Bot',
    'Discord Gambling Bot Commands',
    'Discord Economy Bot',
    'Discord Game Bot',
    'Discord Bot Commands',
    'Blackjack Discord Bot',
    'Coinflip Discord Bot',
    'Mines Discord Bot',
    'High Low Discord Bot',
    'Discord Bot Economy',
    'Virtual Casino Discord',
    'Discord Server Games',
    'Discord Bot Leaderboard',
    'Discord Currency Bot',
    'Discord Entertainment Bot'
  ],
  authors: [{ name: 'YEKKIHORA' }],
  creator: 'YEKKIHORA',
  publisher: 'DYSE Team',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dyse.vercel.app',
    title: 'DYSE - Discord Casino Bot | Custom Economy & Game Bot',
    description: 'Customizable Discord economy and game bot. Boost engagement in your Discord server with DYSE.',
    siteName: 'DYSE Discord Bot',
    images: [
      {
        url: 'https://cdn.discordapp.com/app-icons/1322592306670338129/daab4e79fea4d0cb886b1fc92e8560e3.png?size=512',
        width: 512,
        height: 512,
        alt: 'DYSE Discord Bot Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DYSE - Discord Casino Bot',
    description: 'A fully customizable Discord casino bot for fun, economy, and engagement.',
    images: ['https://cdn.discordapp.com/app-icons/1322592306670338129/daab4e79fea4d0cb886b1fc92e8560e3.png?size=512'],
  },
  verification: {
    google: 'google4133e9b15c3cea6e',
  },
  alternates: {
    canonical: 'https://dyse.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://cdn.discordapp.com/app-icons/1322592306670338129/daab4e79fea4d0cb886b1fc92e8560e3.png?size=512" />
        <meta name="google-site-verification" content="google4133e9b15c3cea6e" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B] text-white">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}