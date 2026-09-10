// TypingIndicator.tsx — Animated dots saat agent sedang memproses

export default function TypingIndicator() {
  return (
    <div className="typing-row">
      <div className="message-avatar agent-avatar">🤖</div>
      <div className="typing-bubble">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
