export interface Command {
  name: string;
  title: string;
  usage: string;
  description: string;
  tips?: string;
  category: 'casino' | 'earn' | 'leaderboard' | 'utility';
}

export const commandData: Command[] = [
  // Casino Commands
  {
    name: 'slots',
    title: 'Slots',
    usage: '/slots [amount]',
    description: 'Spin the virtual slot machine with your bet amount. Match symbols to win multipliers of your original bet!',
    tips: 'Higher bets have slightly better odds, but also higher risk!',
    category: 'casino'
  },
  {
    name: 'flip',
    title: 'Coin Flip',
    usage: '/flip [heads/tails] [amount]',
    description: 'Bet on a coin flip. Choose heads or tails and the amount you want to bet.',
    tips: 'This game has a 50% chance of winning, with a 1.9x payout.',
    category: 'casino'
  },
  {
    name: 'roulette',
    title: 'Roulette',
    usage: '/roulette [red/black/green] [amount]',
    description: 'Bet on roulette. Red/black pays 2x, green pays 14x your bet.',
    tips: 'Green has a very low chance, but highest payout!',
    category: 'casino'
  },
  
  // Earn Commands
  {
    name: 'daily',
    title: 'Daily Reward',
    usage: '/daily',
    description: 'Claim your daily reward of DYSE coins. Can be claimed once every 24 hours.',
    tips: 'Don\'t miss a day to build up your streak multiplier!',
    category: 'earn'
  },
  {
    name: 'hourly',
    title: 'Hourly Reward',
    usage: '/hourly',
    description: 'Claim a smaller reward every hour. A great way to build up coins throughout the day.',
    category: 'earn'
  },
  {
    name: 'work',
    title: 'Work',
    usage: '/work',
    description: 'Complete a simple minigame to earn coins through virtual work.',
    tips: 'Work cooldown is 30 minutes. The faster you answer, the more you earn!',
    category: 'earn'
  },
  
  // Leaderboard Commands
  {
    name: 'leaderboard',
    title: 'Leaderboard',
    usage: '/leaderboard [global/server] [balance/winnings]',
    description: 'Check the top players by balance or total winnings, either globally or in your server.',
    category: 'leaderboard'
  },
  {
    name: 'rank',
    title: 'Rank',
    usage: '/rank',
    description: 'Check your current rank and position on the leaderboards.',
    category: 'leaderboard'
  },
  {
    name: 'stats',
    title: 'Statistics',
    usage: '/stats [user]',
    description: 'View detailed statistics about your or another user\'s gambling activity.',
    tips: 'Great for tracking your win rate and favorite games!',
    category: 'leaderboard'
  },
  
  // Utility Commands
  {
    name: 'balance',
    title: 'Balance',
    usage: '/balance',
    description: 'Check your current balance of DYSE coins.',
    category: 'utility'
  },
  {
    name: 'help',
    title: 'Help',
    usage: '/help [command]',
    description: 'Get help with DYSE 2.0 commands. Specify a command for detailed information.',
    category: 'utility'
  },
  {
    name: 'profile',
    title: 'Profile',
    usage: '/profile',
    description: 'View your DYSE 2.0 profile, including statistics and badges.',
    category: 'utility'
  },
  {
    name: 'transfer',
    title: 'Transfer',
    usage: '/transfer [user] [amount]',
    description: 'Transfer DYSE coins to another user.',
    tips: 'There\'s a 5% transfer fee to prevent abuse.',
    category: 'utility'
  }
];