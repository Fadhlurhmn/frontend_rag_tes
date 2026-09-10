// TokenBadge.tsx — Menampilkan siapa yang menjawab + berapa token dipakai

interface TokenBadgeProps {
  agent: "manager" | "specialist";
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export default function TokenBadge({
  agent,
  inputTokens,
  outputTokens,
  totalTokens,
}: TokenBadgeProps) {
  const label = agent === "manager" ? "Manager" : "Specialist";
  const icon  = agent === "manager" ? "🧑‍💼" : "🔍";

  return (
    <span className={`token-badge ${agent}`}>
      <span className="token-badge-icon">{icon}</span>
      <span>{label}</span>
      <span className="token-divider" />
      <span>in: {inputTokens}</span>
      <span className="token-divider" />
      <span>out: {outputTokens}</span>
    </span>
  );
}
