import React from 'react'
import { useChat } from "ai/react";

const Evals = (props : {}) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "https://127.0.0.1:8080/qa/evals/stream"
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {messages.map((m) => (
          <div key={m.id}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <label>
            Enter question:
            <input value={input} onChange={handleInputChange} />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </main>
  );
}

export default Evals
