"use client";

import { useEffect } from "react";
import { PolicyDoc } from "@/lib/docs";

interface DocModalProps {
  doc: PolicyDoc | null;
  onClose: () => void;
}

// Render markdown-like content as simple HTML
function renderMarkdown(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let inList = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (/^\|---/.test(line)) continue; // skip table separators

    if (/^\|(.+)\|$/.test(line)) {
      const cells = line.slice(1, -1).split("|").map((c) => c.trim());
      result.push("<tr>" + cells.map((c) => `<td>${c}</td>`).join("") + "</tr>");
      inList = false;
    } else if (/^### (.+)/.test(line)) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(line.replace(/^### (.+)/, "<h3>$1</h3>"));
    } else if (/^## (.+)/.test(line)) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(line.replace(/^## (.+)/, "<h2>$1</h2>"));
    } else if (/^# (.+)/.test(line)) {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push(line.replace(/^# (.+)/, "<h1>$1</h1>"));
    } else if (/^[-\d]+[.)]\s+(.+)/.test(line)) {
      if (!inList) { result.push("<ul>"); inList = true; }
      result.push("<li>" + line.replace(/^[-\d]+[.)]\s+/, "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") + "</li>");
    } else if (line === "") {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push("<br/>");
    } else {
      if (inList) { result.push("</ul>"); inList = false; }
      result.push("<p>" + line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") + "</p>");
    }
  }

  if (inList) result.push("</ul>");
  return result.join("\n");
}


export default function DocModal({ doc, onClose }: DocModalProps) {
  // Close on ESC key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!doc) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <span className="modal-emoji">{doc.emoji}</span>
            <h2 className="modal-title">{doc.title}</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Tutup">
            ✕
          </button>
        </div>
        <div
          className="modal-body"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(doc.content) }}
        />
      </div>
    </div>
  );
}
