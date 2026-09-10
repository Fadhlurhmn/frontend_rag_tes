"use client";

// ChatWindow.tsx — Main chat UI: messages + input bar + welcome state

import { useState, useRef, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { Message, TokenLogEntry } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const SUGGESTION_CHIPS = [
  "Berapa hari cuti tahunan saya?",
  "WFH boleh berapa hari seminggu?",
  "Batas reimbursement transportasi?",
  "Saya kerja 7 bulan, dapat cuti berapa?",
];

interface ChatWindowProps {
  conversationId: string;
  onTokenLog: (entry: TokenLogEntry) => void;
  onReset: () => void;
}

export default function ChatWindow({
  conversationId,
  onTokenLog,
  onReset,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-resize textarea
  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  };

  // Fetch history when conversationId changes
  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/history/${conversationId}`);
        if (res.ok) {
          const data = await res.json();
          const loadedMessages: Message[] = data.messages.map((m: any) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            agent: m.agent_role,
            inputTokens: m.input_tokens,
            outputTokens: m.output_tokens,
            totalTokens: m.total_tokens,
            sources: m.sources,
          }));
          setMessages(loadedMessages);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error("Failed to load history", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    }
    
    // Check if we already have messages for this conversation to prevent refetching unnecessarily
    // Or if we just generated a new ID, it will be empty anyway
    fetchHistory();
  }, [conversationId]);


  const sendMessage = useCallback(
    async (question: string) => {
      if (!question.trim() || loading) return;

      // Append user message
      const userMsg: Message = {
        id: uuidv4(),
        role: "user",
        content: question.trim(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      setLoading(true);

      try {
        const res = await fetch(`${API_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: question.trim(),
            conversation_id: conversationId,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        // Append agent message
        const agentMsg: Message = {
          id: data.message_id ?? uuidv4(),
          role: "agent",
          content: data.answer,
          agent: data.agent as "manager" | "specialist",
          inputTokens: data.input_tokens,
          outputTokens: data.output_tokens,
          totalTokens: data.total_tokens,
          sources: data.sources,
        };
        setMessages((prev) => [...prev, agentMsg]);

        // Log to token panel
        onTokenLog({
          id: data.message_id ?? uuidv4(),
          question: question.trim(),
          agent: data.agent,
          inputTokens: data.input_tokens,
          outputTokens: data.output_tokens,
          totalTokens: data.total_tokens,
        });
      } catch (err) {
        const errMsg: Message = {
          id: uuidv4(),
          role: "agent",
          content:
            "Maaf, terjadi kesalahan saat menghubungi server. Pastikan backend sudah berjalan dan coba lagi.",
          agent: "manager",
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
        };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setLoading(false);
        setTimeout(() => textareaRef.current?.focus(), 50);
      }
    },
    [conversationId, loading, onTokenLog]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <section className="chat-column">
      {/* Header */}
      <header className="chat-header">
        <div className="header-avatar">🤖</div>
        <div className="header-info">
          <h1>HR Assistant</h1>
          <p>PT. XYZ · Kebijakan Internal</p>
        </div>
        <div className="header-badge">
          <span className="header-dot" />
          Online
        </div>
      </header>

      {/* Messages */}
      <div className="messages-area">
        {messages.length === 0 ? (
          <div className="welcome-state">
            <div className="welcome-icon">💬</div>
            <h2>Tanya apa saja tentang kebijakan kantor</h2>
            <p>
              Saya siap menjawab pertanyaan seputar cuti, reimbursement, dan WFH
              berdasarkan dokumen resmi perusahaan.
            </p>
            <div className="welcome-chips">
              {SUGGESTION_CHIPS.map((chip) => (
                <button
                  key={chip}
                  className="chip"
                  onClick={() => sendMessage(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}

        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="input-bar">
        <form className="input-form" onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            className="input-textarea"
            placeholder="Tanya kebijakan cuti, WFH, reimbursement…  (Enter untuk kirim)"
            value={input}
            rows={1}
            onChange={(e) => {
              setInput(e.target.value);
              autoResize();
            }}
            onKeyDown={handleKeyDown}
            disabled={loading}
            id="chat-input"
          />
          <button
            type="submit"
            className="send-btn"
            disabled={!input.trim() || loading}
            aria-label="Kirim pertanyaan"
          >
            ➤
          </button>
        </form>
      </div>
    </section>
  );
}
