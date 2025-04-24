import React from 'react';

export default function WaitingRoom() {
  return (
    <div className="p-8 text-center">
      <h2 className="mb-4 text-xl font-semibold">
        Waiting for another player to join...
      </h2>
      <div className="animate-pulse text-6xl">⏳</div>
    </div>
  );
}
