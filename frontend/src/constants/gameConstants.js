export const actions = [
  { label: 'Rock', emoji: '🪨', value: 'rock' },
  { label: 'Paper', emoji: '📄', value: 'paper' },
  { label: 'Scissors', emoji: '✂️', value: 'scissors' },
  { label: 'Lizard', emoji: '🦎', value: 'lizard' },
  { label: 'Spock', emoji: '🖖', value: 'spock' },
];

export const actionEmojis = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️',
  lizard: '🦎',
  spock: '🖖',
};

export const winMap = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock'],
};

export const resultMessages = {
  win: 'You win! 🎉',
  lose: 'You lose 😞',
  draw: "It's a draw 🤝",
};
