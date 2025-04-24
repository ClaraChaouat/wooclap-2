import React from "react";
import { render, screen, act } from "@testing-library/react";
import useGameSocket from "./useGameSocket";
import { socket } from "../socket";

jest.mock("../socket", () => {
  const listeners = {};
  return {
    socket: {
      id: "test-socket-id",
      on: jest.fn((event, cb) => {
        listeners[event] = cb;
      }),
      off: jest.fn(),
      emit: jest.fn(),
      __listeners: listeners,
    },
  };
});

function TestComponent() {
  const { gameState, playerChoice, sendChoice, resetGame } = useGameSocket();
  return (
    <>
      <div data-testid="state">{gameState}</div>
      <div data-testid="choice">{playerChoice || ""}</div>
      <button onClick={() => sendChoice("spock")}>Choose Spock</button>
      <button onClick={resetGame}>Reset</button>
    </>
  );
}

async function triggerConnect() {
  const connectCall = socket.on.mock.calls.find(([e]) => e === "connect");
  expect(connectCall).toBeDefined();
  const connectHandler = connectCall[1];
  await act(() => connectHandler());
}

beforeEach(() => {
  socket.on.mockClear();
  socket.emit.mockClear();
});

test("initial state is 'waiting'", async () => {
  render(<TestComponent />);
  await triggerConnect();
  expect(screen.getByTestId("state").textContent).toBe("waiting");
});

test("handles choice and emit", async () => {
  render(<TestComponent />);
  await triggerConnect();

  await act(async () => {
    screen.getByText("Choose Spock").click();
  });

  expect(socket.emit).toHaveBeenCalledWith("send-msg", {
    type: "player-choice",
    data: "spock",
    sender: "test-socket-id",
  });
  expect(screen.getByTestId("choice").textContent).toBe("spock");
});

test("resets state correctly", async () => {
  render(<TestComponent />);
  await triggerConnect();

  await act(async () => {
    screen.getByText("Choose Spock").click();
    screen.getByText("Reset").click();
  });

  expect(screen.getByTestId("state").textContent).toBe("choosing");
  expect(screen.getByTestId("choice").textContent).toBe("");
  expect(socket.emit).toHaveBeenCalledWith("send-msg", { type: "new-round" });
});
