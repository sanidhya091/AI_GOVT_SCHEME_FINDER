import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft } from "lucide-react";
import TypingIndicator from "./TypingIndicator";
import ProfileChips from "./ProfileChips";
import SchemeCard from "./SchemeCard";
import { extractUserProfile, getEligibleSchemes } from "@/mock/services";
import type { Scheme } from "@/mock/schemes";

interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
}

interface ProfileChip {
  label: string;
  value: string;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const INITIAL_BOT_MESSAGE =
  "Hello! 👋 I'm here to help you find government schemes you might be eligible for. Tell me a bit about yourself — your age, where you live, what you do, and your family's income.";

const FOLLOW_UP_MESSAGE =
  "Got it! Could you also share your caste category (General, OBC, SC, ST) and gender? This helps me find the most relevant schemes for you.";

const ANALYSIS_MESSAGE =
  "Great, I have everything I need! Let me search through 400+ government schemes to find what you qualify for...";

const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "bot", content: INITIAL_BOT_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chips, setChips] = useState<ProfileChip[]>([]);
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [conversationStep, setConversationStep] = useState(0);
  const [isLoadingSchemes, setIsLoadingSchemes] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, schemes, scrollToBottom]);

  const addBotMessage = useCallback(
    (content: string) => {
      return new Promise<void>((resolve) => {
        setIsTyping(true);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), role: "bot", content },
          ]);
          setIsTyping(false);
          resolve();
        }, 1200);
      });
    },
    []
  );

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping || isLoadingSchemes) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    if (conversationStep === 0) {
      // First user message — extract profile chips
      const profile = await extractUserProfile(text);
      setChips([
        { label: "Age", value: String(profile.age) },
        { label: "State", value: profile.state },
        { label: "Income", value: `₹${(profile.income / 100000).toFixed(1)}L` },
        { label: "Occupation", value: profile.occupation },
      ]);
      setConversationStep(1);
      await addBotMessage(FOLLOW_UP_MESSAGE);
    } else if (conversationStep === 1) {
      // Second user message — add more chips and find schemes
      setChips((prev) => [
        ...prev,
        { label: "Category", value: "OBC" },
        { label: "Gender", value: "Male" },
      ]);
      setConversationStep(2);
      await addBotMessage(ANALYSIS_MESSAGE);

      // Show loading then schemes
      setIsLoadingSchemes(true);
      const profile = await extractUserProfile(text);
      const results = await getEligibleSchemes(profile);
      setSchemes(results);
      setIsLoadingSchemes(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-display text-base font-semibold text-foreground">
            Scheme<span className="text-primary">Aware</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            Finding your eligible schemes
          </p>
        </div>
      </header>

      {/* Profile chips bar */}
      {chips.length > 0 && (
        <div className="border-b border-border bg-card px-4 py-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Your Profile
          </p>
          <ProfileChips chips={chips} />
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-2xl space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-2xl rounded-tr-none bg-primary text-primary-foreground"
                      : "rounded-2xl rounded-tl-none bg-muted text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && <TypingIndicator />}

          {/* Loading skeleton for schemes */}
          {isLoadingSchemes && (
            <motion.div
              className="space-y-3 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-center text-sm text-muted-foreground">
                Analyzing 400+ schemes...
              </p>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-card bg-muted"
                />
              ))}
            </motion.div>
          )}

          {/* Scheme results */}
          {schemes.length > 0 && !isLoadingSchemes && (
            <div className="space-y-3 pt-4">
              <motion.p
                className="text-center text-sm font-medium text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Found {schemes.length} schemes you may qualify for
              </motion.p>
              {schemes.map((scheme, i) => (
                <SchemeCard key={scheme.id} scheme={scheme} index={i} />
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      {conversationStep < 2 && (
        <div className="border-t border-border bg-card px-4 py-4">
          <div className="mx-auto flex max-w-2xl items-center gap-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                conversationStep === 0
                  ? 'E.g. "I\'m a 22 year old student from Mumbai, family income 2 lakh"'
                  : 'E.g. "I\'m OBC, male"'
              }
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={isTyping || isLoadingSchemes}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping || isLoadingSchemes}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-95 disabled:opacity-40"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
