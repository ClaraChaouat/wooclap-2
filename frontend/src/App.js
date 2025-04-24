import useGameSocket from './hooks/useGameSocket';
import WaitingRoom from './components/WaitingRoom';
import ActionSelection from './components/ActionSelection';
import ResultScreen from './components/ResultScreen';

export default function App() {
  const {
    gameState,
    playerChoice,
    opponentChoice,
    result,
    sendChoice,
    resetGame,
  } = useGameSocket();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      {gameState === 'waiting' && <WaitingRoom />}

      {gameState === 'choosing' && (
        <ActionSelection
          onSelect={sendChoice}
          disabled={!!playerChoice}
          playerChoice={playerChoice}
        />
      )}

      {gameState === 'waitingOpponent' && (
        <ActionSelection
          onSelect={sendChoice}
          disabled={true}
          playerChoice={playerChoice}
          waiting
        />
      )}

      {gameState === 'result' && (
        <ResultScreen
          playerChoice={playerChoice}
          opponentChoice={opponentChoice}
          result={result}
          onNewRound={resetGame}
        />
      )}
    </div>
  );
}
