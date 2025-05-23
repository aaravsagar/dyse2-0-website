export interface Command {
  id: string;
  name: string;
  title: string;
  usage: string;
  description: string;
  example: string;
  tips?: string;
  category: 'admin' | 'casino' | 'earn' | 'leaderboard' | 'utility' | 'Bank' | 'Fun';
}

export const commandData: Command[] = [
  // Casino Commands
  {
    id: 'blackjack',
    name: 'blackjack',
    title: 'Blackjack',
    usage: '$blackjack <amount>',
    description: 'Play a game of blackjack against the dealer. Beat the dealer’s hand without busting (going over 21).',
    example: '$blackjack 100',
    tips: 'Use basic strategy to improve your odds!',
    category: 'casino'
  },
  {
    id: 'coinflip',
    name: 'coinflip',
    title: 'Coin Flip',
    usage: '$coinflip <amount>',
    description: 'Bet on a coin flip. Choose heads or tails and the amount you want to bet.',
    example: '$coinflip 50',
    tips: 'This game has a 50% chance of winning, with a 1.9x payout.',
    category: 'casino'
  },
  {
    id: 'gamble',
    name: 'gamble',
    title: 'Gamble',
    usage: '$gamble <amount>',
    description: 'Gamble your coins with a random chance to win a 1.9x of your bet.',
    example: '$gamble 200',
    tips: 'Risky but potentially rewarding!',
    category: 'casino'
  },
  {
    id: 'roulette',
    name: 'roulette',
    title: 'Roulette',
    usage: '$roulette <amount>',
    description: 'Bet on roulette. Red/black pays 2x, green pays 14x your bet.',
    example: '$roulette 150',
    tips: 'Green has a very low chance, but highest payout!',
    category: 'casino'
  },

  // Earn Commands
  {
    id: 'claim',
    name: 'claim',
    title: 'Daily Claim',
    usage: '$claim',
    description: 'Claim your daily reward of DYSE coins. Can be claimed once every 24 hours.',
    example: '$claim',
    tips: 'Streak Break after 48hrs',
    category: 'earn'
  },
  {
    id: 'work',
    name: 'work',
    title: 'Work',
    usage: '$work',
    description: 'Perform a random job to earn money—but outcomes may not always be in your favor.',
    example: '$work',
    category: 'earn'
  },

  // Bank Commands
  {
    id: 'balance',
    name: 'balance',
    title: 'Check Balance',
    usage: '$balance',
    description: 'Check Your Both Bank and Wallet Balance.',
    example: '$balance',
    category: 'Bank'
  },
  {
    id: 'bank',
    name: 'bank',
    title: 'Bank',
    usage: '$bank',
    description: 'Withdraw Or Deposit Money From/To Bank.',
    example: '$deposit 500',
    tips: 'you can either use $deposit <amount> & $withdraw <amount> to deposit or withdraw a custom amount from bank.',
    category: 'Bank'
  },

  // Utility Commands
  {
    id: 'limit',
    name: 'limit',
    title: 'Limits',
    usage: '$limit',
    description: 'Check the cooldowns, bet limits for all games.',
    example: '$limit',
    category: 'utility'
  },
  {
    id: 'version',
    name: '/version',
    title: 'Version',
    usage: '/version',
    description: 'Check For Version Of Bot & Prefix of Server.',
    example: '/version',
    tips: 'use this when you forgot the prefix of server',
    category: 'utility'
  },

  // Admin Commands
  {
    id: 'setprefix',
    name: 'setprefix',
    title: 'Change Prefix',
    usage: '$setprefix <your custom prefix>',
    description: 'Change the bot\'s prefix to prevent command conflicts with other bots in the server.',
    example: '$setprefix !',
    tips: 'Stay within limits to avoid errors!',
    category: 'admin'
  },
  {
    id: 'setcurrencysymbol',
    name: 'setcurrencysymbol',
    title: 'Change Currency Symbol',
    usage: '$setcurrencysymbol <your custom symbol>',
    description: 'Change the currency symbol used in the bot.',
    example: '$setcurrencysymbol ₹',
    tips: 'You can use a Symbol or Emoji for Currency of Bot',
    category: 'admin'
  },
  {
    id: 'setonlychannel',
    name: 'setonlychannel',
    title: 'Set a Only Channel',
    usage: '$set-onlychannel <tag one or more channels>',
    description: 'Set a channel Where Bot will only respond.',
    example: '$set-onlychannel #bot-commands',
    category: 'admin'
  },
  {
    id: 'resetonlychannel',
    name: 'resetonlychannel',
    title: 'Reset the Channel Restrictions',
    usage: '$reset-onlychannel',
    description: 'Reset the Channel Restrictions to Allow Commands to be Used Anywhere.',
    example: '$reset-onlychannel',
    category: 'admin'
  },
  {
    id: 'listonlychannel',
    name: 'listonlychannel',
    title: 'List the Channels Where Bot is Allowed only',
    usage: '$list-onlychannel <tag one or more channels>',
    description: 'Get the List of Channels Where Bot is Allowed only.',
    example: '$list-onlychannel',
    category: 'admin'
  },
  {
    id: 'crime',
    name: 'Commit A Crime',
    title: 'Commit A Crime Risk It Earn It',
    usage: '$crime ',
    description: 'Commit A Crime Risk For More Money ',
    example: '$crime',
    category: 'Fun'
  },
  {
    id: 'Rob',
    name: 'Rob Anyone',
    title: 'Rob User to Steal Their Money',
    usage: '$rob <user> ',
    description: 'Rob User to Steal Their Money',
    example: '$rob @user',
    category: 'Fun'
  }
];
