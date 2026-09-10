// MessageBubble.tsx — Renders a single chat message (user or agent)

import TokenBadge from "./TokenBadge";
import { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`message-row ${isUser ? "user-row" : ""}`}>
      <div className={`message-avatar ${isUser ? "user-avatar" : "agent-avatar"}`}>
        {isUser ? "👤" : "🤖"}
      </div>

      <div className="bubble-wrap">
        <div className={`bubble ${isUser ? "user-bubble" : "agent-bubble"}`}>
          {message.content}
        </div>

        {!isUser && message.agent && (
          <TokenBadge
            agent={message.agent}
            inputTokens={message.inputTokens ?? 0}
            outputTokens={message.outputTokens ?? 0}
            totalTokens={message.totalTokens ?? 0}
          />
        )}
      </div>
    </div>
  );
}
