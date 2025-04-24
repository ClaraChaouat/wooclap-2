import React from 'react';
import { actionEmojis, resultMessages } from '../constants/gameConstants';

export default function ResultScreen({
  playerChoice,
  opponentChoice,
  result,
  onNewRound,
}) {
  return (
    <div className="text-center">
      <h2 className="mb-6 text-xl font-bold">{resultMessages[result]}</h2>

      <div className="mb-6 flex justify-center gap-8 text-4xl">
        <div className="flex flex-col items-center">
          <div className="mb-2 text-sm text-gray-600">You</div>
          <div>{actionEmojis[playerChoice]}</div>
          <div className="mt-1 text-sm capitalize">{playerChoice}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-2 text-sm text-gray-600">Opponent</div>
          <div>{actionEmojis[opponentChoice]}</div>
          <div className="mt-1 text-sm capitalize">{opponentChoice}</div>
        </div>
      </div>

      <button
        onClick={onNewRound}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        New Round
      </button>
    </div>
  );
}
