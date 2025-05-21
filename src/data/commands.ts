export interface Command {
  name: string;
  title: string;
  usage: string;
  description: string;
  tips?: string;
  category: 'admin' | 'casino' | 'earn' | 'leaderboard' | 'utility' | 'Bank';
}

export const commandData: Command[] = [
  // Casino Commands
  {
    name: 'blackjack',
    title: 'Blackjack',
    usage: '$blackjack <amount>',
    description: 'Play a game of blackjack against the dealer. Beat the dealer’s hand without busting (going over 21).',
    tips: 'Use basic strategy to improve your odds!',
    category: 'casino'
  },
  {
    name: 'coinflip',
    title: 'Coin Flip',
    usage: '$coinflip <amount>',
    description: 'Bet on a coin flip. Choose heads or tails and the amount you want to bet.',
    tips: 'This game has a 50% chance of winning, with a 1.9x payout.',
    category: 'casino'
  },
  {
    name: 'gamble',
    title: 'Gamble',
    usage: '$gamble <amount>',
    description: 'Gamble your coins with a random chance to win a 1.9x of your bet.',
    tips: 'Risky but potentially rewarding!',
    category: 'casino'
  },
  {
    name: 'roulette',
    title: 'Roulette',
    usage: '$roulette <amount>',
    description: 'Bet on roulette. Red/black pays 2x, green pays 14x your bet.',
    tips: 'Green has a very low chance, but highest payout!',
    category: 'casino'
  },

  // Earn Commands
  {
    name: 'claim',
    title: 'Daily Claim',
    usage: '$claim',
    description: 'Claim your daily reward of DYSE coins. Can be claimed once every 24 hours.',
    tips: 'Streak Break after 48hrs',
    category: 'earn'
  },
  {
    name: 'work',
    title: 'Work',
    usage: '$work',
    description: 'Perform a random job to earn money—but outcomes may not always be in your favor.',
    category: 'earn'
  },

  // Bank Commands

  {
    name: 'balance',
    title: 'Check Balance',
    usage: '$balance',
    description: 'Check Your Both Bank and Wallet Balance.',
    category: 'Bank'
  },
  {
    name: 'bank',
    title: 'Bank',
    usage: '$bank',
    description: 'Withdraw Or Deposit Money From/To Bank.',
    tips: 'you can either use $deposit <amount> & $withdraw <amount> to deposit or withdraw a custom amount from bank.',
    category: 'Bank'
  },

  // Utility Commands
  {
    name: 'limit',
    title: 'Limits',
    usage: '$limit',
    description: 'Check the cooldowns, bet limits for all games.',
    category: 'utility'
  },
  {
    name: '/version',
    title: 'Version',
    usage: '/version',
    description: 'Check For Version Of Bot & Prefix of Server.',
    tips: 'use this when you forgot the prefix of server',
    category: 'utility'
  },
 
  

  {
    name: 'setprefix',
    title: 'Change Prefix',
    usage: '$setprefix <your custom prefix>',
    description: 'Change the bot\'s prefix to prevent command conflicts with other bots in the server.',
    tips: 'Stay within limits to avoid errors!',
    category: 'admin'
  },

  {
    name: 'setcurrencysymbol',
    title: 'Change Currency Symbol',
    usage: '$setcurrencysymbol <your custom symbol> ',
    description: 'Change the currency symbol used in the bot.',
    tips: 'You can use a Symbol or Emoji for Currency of Bot',
    category: 'admin'
  },

  {
    name: 'setonlychannel',
    title: 'Set a Only Channel',
    usage: '$setonlychannel <tag one or more channels>',
    description: 'Set a channel Where Bot will only respond.',
    category: 'admin'
  }
];
