import { Metadata } from 'next';
import { FeedbackPage } from '@/components/pages/FeedbackPage';

export const metadata: Metadata = {
  title: 'Feedback | DYSE Discord Bot Suggestions & Feedback',
  description: 'Share your feedback and suggestions for DYSE Discord bot. Help us improve and add new features to enhance your Discord server experience.',
  keywords: [
    'Discord bot feedback',
    'DYSE feedback',
    'Discord bot suggestions',
    'bot feature requests',
    'Discord bot improvements',
    'user feedback',
    'Discord bot contact'
  ],
  openGraph: {
    title: 'Feedback | DYSE Discord Bot',
    description: 'Share your feedback and suggestions to help improve DYSE Discord bot.',
    url: 'https://dyse.vercel.app/feedback',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dyse.vercel.app/feedback',
  },
};

export default function Feedback() {
  return <FeedbackPage />;
}