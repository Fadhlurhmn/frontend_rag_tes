"use client";

// page.tsx — Root chat page: wires together ChatWindow + TokenHistoryPanel

import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import TokenHistoryPanel from "@/components/TokenHistoryPanel";
import { TokenLogEntry } from "@/lib/types";

export default function Home() {
  const [conversationId, setConversationId] = useState<string>(uuidv4);
  const [tokenLog, setTokenLog] = useState<TokenLogEntry[]>([]);

  const handleTokenLog = useCallback((entry: TokenLogEntry) => {
    setTokenLog((prev) => [...prev, entry]);
  }, []);

  const handleNewChat = useCallback(() => {
    setConversationId(uuidv4());
    setTokenLog([]);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setConversationId(id);
    setTokenLog([]);
  }, []);

  return (
    <main className="app-shell">
      <Sidebar
        currentConversationId={conversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
      />
      <ChatWindow
        conversationId={conversationId}
        onTokenLog={handleTokenLog}
        onReset={handleNewChat}
      />
      <TokenHistoryPanel log={tokenLog} onNewChat={handleNewChat} />
    </main>
  );
}
