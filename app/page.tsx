import { Metadata } from 'next';
import { HomePage } from '@/components/pages/HomePage';

export const metadata: Metadata = {
  title: 'DYSE - Discord Casino Bot | Custom Economy & Game Bot',
  description: 'DYSE is the best Discord Casino Bot with customizable economy, games, and rewards. Perfect for leveling up your Discord server with blackjack, coinflip, mines, high-low and more!',
  keywords: [
    'Discord Casino Bot',
    'Discord Economy Bot',
    'Discord Game Bot',
    'Discord Bot Commands',
    'Virtual Casino Discord',
    'Discord Server Games',
    'Discord Entertainment Bot',
    'Blackjack Discord Bot',
    'Coinflip Discord Bot',
    'Mines Discord Bot',
    'High Low Discord Bot'
  ],
  openGraph: {
    title: 'DYSE - Discord Casino Bot | Custom Economy & Game Bot',
    description: 'A fun way to experience simulated gambling with 0% real-world risk. Boost engagement in your Discord server.',
    url: 'https://dyse.vercel.app',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dyse.vercel.app',
  },
};

export default function Home() {
  return <HomePage />;
}