import React from 'react';
import { actions } from '../constants/gameConstants';

export default function ActionSelection({
  onSelect,
  disabled,
  playerChoice,
  waiting = false,
}) {
  return (
    <div className="text-center">
      <h2 className="mb-4 text-xl font-semibold">
        {waiting
          ? 'Waiting for opponent...'
          : playerChoice
            ? `You chose ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}`
            : 'Choose your action'}
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {actions.map((action) => (
          <button
            key={action.value}
            onClick={() => onSelect(action.value)}
            disabled={disabled}
            aria-label={action.label}
            className={`rounded-xl border p-4 text-4xl shadow transition ${
              disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
            } ${playerChoice === action.value ? 'border-blue-400 bg-blue-100' : ''}`}
          >
            <span>{action.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
