"use client";

import { useEffect, useState } from "react";
import { Conversation } from "@/lib/types";
import { POLICY_DOCS, PolicyDoc } from "@/lib/docs";
import DocModal from "./DocModal";

interface SidebarProps {
  currentConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

export default function Sidebar({
  currentConversationId,
  onSelectConversation,
  onNewChat,
}: SidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeDoc, setActiveDoc] = useState<PolicyDoc | null>(null);

  useEffect(() => {
    async function fetchConversations() {
      setLoading(true);
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
        const res = await fetch(`${API_URL}/conversations`);
        if (res.ok) {
          const data = await res.json();
          setConversations(data);
        }
      } catch (err) {
        console.error("Failed to fetch conversations", err);
      } finally {
        setLoading(false);
      }
    }
    fetchConversations();
  }, [currentConversationId]);

  return (
    <>
      <div className="sidebar">
        {/* New Chat */}
        <div className="sidebar-header">
          <button className="new-chat-btn sidebar-new" onClick={onNewChat}>
            <span>+</span> New Chat
          </button>
        </div>

        {/* Dokumen Kebijakan */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">📂 Dokumen Kebijakan</div>
          {POLICY_DOCS.map((doc) => (
            <button
              key={doc.id}
              className="sidebar-doc-item"
              onClick={() => setActiveDoc(doc)}
            >
              <span className="sidebar-item-icon">{doc.emoji}</span>
              <span className="sidebar-item-text">{doc.title}</span>
              <span className="sidebar-doc-arrow">↗</span>
            </button>
          ))}
        </div>

        <div className="sidebar-divider" />

        {/* Riwayat Chat */}
        <div className="sidebar-section-label sidebar-section-label-pad">
          💬 Riwayat Chat
        </div>
        <div className="sidebar-list">
          {loading && conversations.length === 0 ? (
            <div className="sidebar-empty">Memuat...</div>
          ) : conversations.length === 0 ? (
            <div className="sidebar-empty">Belum ada riwayat chat.</div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                className={`sidebar-item ${
                  conv.id === currentConversationId ? "active" : ""
                }`}
                onClick={() => onSelectConversation(conv.id)}
              >
                <div className="sidebar-item-icon">💬</div>
                <div className="sidebar-item-text">
                  {conv.title ||
                    new Date(conv.created_at).toLocaleString("id-ID", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal dokumen */}
      <DocModal doc={activeDoc} onClose={() => setActiveDoc(null)} />
    </>
  );
}
