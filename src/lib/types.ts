// Types shared across components

export interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  agent?: "manager" | "specialist";
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  sources?: string[];
}

export interface Conversation {
  id: string;
  created_at: string;
  title?: string;
}

export interface TokenLogEntry {
  id: string;
  question: string;
  agent: "manager" | "specialist";
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}
