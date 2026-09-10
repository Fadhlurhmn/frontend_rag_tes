// Types shared across components

export interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  agent?: "manager" | "specialist";
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}

export interface TokenLogEntry {
  id: string;
  question: string;
  agent: "manager" | "specialist";
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}
