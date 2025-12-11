"use client";

import { useState, useEffect, useRef } from "react";
import { ChatShell } from "@/components/chat/ChatShell";

// Types
export type Role = "user" | "assistant" | "system";

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp?: string;
  isError?: boolean;
}

type Stage = "chat" | "verification" | "underwriting";

export default function ChatPage() {
  // -----------------------------
  // STATE
  // -----------------------------
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hi! I’m your loan assistant. Tell me a bit about your income and goals, and I’ll guide you through eligibility → verification → approval.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([
    "Check my loan eligibility",
    "What documents do I need?",
    "Show me next steps",
  ]);

  const [currentStage, setCurrentStage] = useState<Stage>("chat");

  const [lowLevelError, setLowLevelError] = useState<string | null>(null);

  // -----------------------------
  // HANDLERS
  // -----------------------------
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    // Clear any previous error message
    setLowLevelError(null);

    // Add user message
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // -----------------------------
      // API CALL → /api/chat
      // -----------------------------
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, stage: currentStage }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();

      // Example backend shape:
      // { reply: "...", nextStage: "verification" }
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // If backend indicates stage change
      if (data.nextStage && data.nextStage !== currentStage) {
        setCurrentStage(data.nextStage as Stage);
      }
    } catch (err: any) {
      console.error("Chat error:", err);

      setLowLevelError("Something went wrong. Please try again.");

      // Show error bubble
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "system",
          content: "Failed to connect. Please check your internet and try again.",
          timestamp: new Date().toLocaleTimeString(),
          isError: true,
        },
      ]);
    }

    setIsLoading(false);
  };

  // Suggestion click → fills input
  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  // -----------------------------
  // JSX OUTPUT
  // -----------------------------
  return (
    <ChatShell
      messages={messages}
      input={input}
      setInput={setInput}
      sendMessage={sendMessage}
      isLoading={isLoading}
      suggestions={suggestions}
      onSuggestionClick={handleSuggestionClick}
      currentStage={currentStage}
      lowLevelError={lowLevelError}
    />
  );
}
