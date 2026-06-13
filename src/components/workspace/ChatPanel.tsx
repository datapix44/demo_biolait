"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

const SUGGESTIONS = [
  "Ajoute des fleurs de pivoines",
  "Style plus moderne",
  "Change les couleurs en bleu et or",
  "Ajoute le prénom Emma",
  "Version plus épurée",
  "Fond texturé papier",
];

const MOCK_RESPONSES = [
  "J'adore cette idée ! Je prépare une nouvelle version avec ce changement... Laissez-moi capturer exactement ce que vous imaginez.",
  "Parfait, je vois exactement ce que vous voulez ! Je crée une version avec ces ajustements — ça va être magnifique.",
  "Quelle belle demande ! Je travaille sur ça maintenant. Je pense que vous allez adorer ce que j'imagine pour vous.",
  "Excellente idée ! Ce détail va vraiment personnaliser votre création. Je génère la nouvelle version...",
];

interface ChatPanelProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export function ChatPanel({ onGenerate, isGenerating }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bonjour ! Je suis Belle, votre créatrice personnelle ✨\n\nQue souhaitez-vous créer aujourd'hui ? Décrivez-moi simplement votre idée — un cadeau, une décoration, un souvenir — et je vais imaginer quelque chose d'unique pour vous.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;
    const userMessage = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: userMessage },
      { id: `loading-${Date.now()}`, role: "assistant", content: "", isLoading: true },
    ]);

    onGenerate(userMessage);

    // Simulate Belle's response after generation
    setTimeout(() => {
      const response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      setMessages((prev) =>
        prev
          .filter((m) => !m.isLoading)
          .concat({
            id: `resp-${Date.now()}`,
            role: "assistant",
            content: response,
          })
      );
    }, 2500);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-champagne/40 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-terracotta flex items-center justify-center shadow-sm">
          <span className="font-cormorant text-white font-semibold">B</span>
        </div>
        <div>
          <p className="font-poppins text-sm font-semibold text-encre">Belle</p>
          <p className="font-poppins text-xs text-encre/40">Votre créatrice personnelle</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-sauge animate-pulse" />
          <span className="font-poppins text-xs text-encre/40">En ligne</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center shrink-0 shadow-sm">
                <span className="font-cormorant text-white text-sm font-semibold">B</span>
              </div>
            )}

            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.role === "user"
                  ? "bg-encre text-ivoire rounded-tr-sm"
                  : "bg-white border border-champagne/60 text-encre rounded-tl-sm"
              )}
            >
              {message.isLoading ? (
                <div className="flex items-center gap-1.5 py-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-terracotta/40 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              ) : (
                <p className="font-poppins text-sm leading-relaxed whitespace-pre-line">
                  {message.content}
                </p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="px-5 pb-3">
          <p className="font-poppins text-xs text-encre/40 mb-2">Suggestions :</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.slice(0, 4).map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="font-poppins text-xs text-encre/60 bg-ivoire border border-champagne rounded-full px-3 py-1.5 hover:border-terracotta/50 hover:text-terracotta transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-5 py-4 border-t border-champagne/40">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Décrivez votre idée... ex: « ajoute des fleurs roses et le prénom Emma »"
              rows={2}
              className="w-full resize-none rounded-xl border border-champagne bg-white px-4 py-3 font-poppins text-sm text-encre placeholder:text-encre/30 placeholder:italic focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            variant="primary"
            size="icon"
            className="shrink-0 w-11 h-11 rounded-xl"
          >
            {isGenerating ? (
              <Sparkles size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </Button>
        </div>
        <p className="font-poppins text-xs text-encre/30 mt-1.5 text-center">
          Entrée pour envoyer · Shift+Entrée pour sauter une ligne
        </p>
      </div>
    </div>
  );
}
