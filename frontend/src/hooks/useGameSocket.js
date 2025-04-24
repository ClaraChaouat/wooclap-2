import { useEffect, useRef, useState } from 'react';
import { socket } from '../socket';
import { winMap } from '../constants/gameConstants';

export default function useGameSocket() {
  const [gameState, setGameState] = useState('waiting');
  const [playerChoice, setPlayerChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [result, setResult] = useState(null);

  const myId = useRef(null);
  const choices = useRef({});

  useEffect(() => {
    socket.on('connect', () => {
      myId.current = socket.id;
      console.log('🔌 connected', socket.id);
    });

    socket.on('new-user', ({ connectionCount }) => {
      console.log('👥 users connected:', connectionCount);
      setGameState(connectionCount >= 2 ? 'choosing' : 'waiting');

      if (connectionCount < 2) {
        resetRoundState();
      }
    });

    return () => {
      socket.off('connect');
      socket.off('new-user');
    };
  }, []);

  useEffect(() => {
    const handleMessage = (msg) => {
      switch (msg.type) {
        case 'player-choice': {
          choices.current[msg.sender] = msg.data;

          const ids = Object.keys(choices.current);
          if (ids.length === 2) {
            const [a, b] = ids;
            const choiceA = choices.current[a];
            const choiceB = choices.current[b];
            const outcomeA = getOutcome(choiceA, choiceB);

            socket.emit('send-msg', {
              type: 'round-result',
              data: {
                results: {
                  [a]: { you: choiceA, opponent: choiceB, outcome: outcomeA },
                  [b]: {
                    you: choiceB,
                    opponent: choiceA,
                    outcome: reverseOutcome(outcomeA),
                  },
                },
              },
            });
          }
          break;
        }

        case 'round-result': {
          const res = msg.data.results[myId.current];
          if (res) {
            setPlayerChoice(res.you);
            setOpponentChoice(res.opponent);
            setResult(res.outcome);
            setGameState('result');
          }
          break;
        }

        case 'new-round': {
          resetRoundState();
          break;
        }

        default:
      }
    };

    socket.on('rcv-msg', handleMessage);
    return () => socket.off('rcv-msg', handleMessage);
  }, []);

  const sendChoice = (action) => {
    if (playerChoice) return;
    setPlayerChoice(action);
    setGameState('waitingOpponent');

    socket.emit('send-msg', {
      type: 'player-choice',
      data: action,
      sender: myId.current,
    });
  };

  const resetRoundState = () => {
    setPlayerChoice(null);
    setOpponentChoice(null);
    setResult(null);
    choices.current = {};
  };

  const resetGame = () => {
    resetRoundState();
    setGameState('choosing');
    socket.emit('send-msg', { type: 'new-round' });
  };

  return {
    gameState,
    playerChoice,
    opponentChoice,
    result,
    sendChoice,
    resetGame,
  };
}

export function getOutcome(player, opponent) {
  if (player === opponent) return 'draw';
  return winMap[player].includes(opponent) ? 'win' : 'lose';
}

export function reverseOutcome(outcome) {
  if (outcome === 'win') return 'lose';
  if (outcome === 'lose') return 'win';
  return 'draw';
}
