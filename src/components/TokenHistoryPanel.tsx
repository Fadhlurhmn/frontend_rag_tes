// TokenHistoryPanel.tsx — Right sidebar showing per-question token log

import { TokenLogEntry } from "@/lib/types";

interface TokenHistoryPanelProps {
  log: TokenLogEntry[];
  onNewChat: () => void;
}

export default function TokenHistoryPanel({ log, onNewChat }: TokenHistoryPanelProps) {
  const totalTokens   = log.reduce((s, e) => s + e.totalTokens, 0);
  const totalQuestions = log.length;

  return (
    <aside className="token-panel">
      <div className="panel-header">
        <h2>📊 Token Usage</h2>
      </div>

      <div className="panel-stats">
        <div className="stat-card">
          <div className="stat-value">{totalQuestions}</div>
          <div className="stat-label">Pertanyaan</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalTokens.toLocaleString()}</div>
          <div className="stat-label">Total Token</div>
        </div>
      </div>

      <div className="panel-log">
        {log.length === 0 ? (
          <div className="panel-empty">
            <div className="panel-empty-icon">📋</div>
            <p>Riwayat token akan muncul di sini setelah kamu bertanya.</p>
          </div>
        ) : (
          [...log].reverse().map((entry) => (
            <div key={entry.id} className="log-item">
              <div className="log-item-question" title={entry.question}>
                {entry.question}
              </div>
              <div className="log-item-meta">
                <span className={`log-agent-badge ${entry.agent}`}>
                  {entry.agent}
                </span>
                <span className="log-tokens">
                  {entry.inputTokens}↑ {entry.outputTokens}↓ = {entry.totalTokens} tk
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        ✦ Chat Baru
      </button>
    </aside>
  );
}
