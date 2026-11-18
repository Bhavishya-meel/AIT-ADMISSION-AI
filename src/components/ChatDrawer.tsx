import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  RotateCcw,
  ShieldAlert,
  ArrowUpRight,
  Settings,
  Key,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import type { ChatMessage } from '../lib/responseEngine';
import { ChatMessageView } from './ChatMessageView';
import { ChatInput } from './ChatInput';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  apiKey?: string;
  onUpdateApiKey?: (key: string) => void;
  model?: string;
  onUpdateModel?: (model: string) => void;
  hasChatGPT?: boolean;
  hasCustomKey?: boolean;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  onClose,
  messages,
  isTyping,
  onSendMessage,
  onClearChat,
  apiKey = '',
  onUpdateApiKey,
  model = 'gpt-4o-mini',
  onUpdateModel,
  hasChatGPT = true,
  hasCustomKey = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [tempModel, setTempModel] = useState(model);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync temp key when prop updates
  useEffect(() => {
    setTempApiKey(apiKey);
    setTempModel(model);
  }, [apiKey, model]);

  // Auto-scroll to bottom on new message or typing state
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateApiKey) {
      onUpdateApiKey(tempApiKey.trim());
    }
    if (onUpdateModel) {
      onUpdateModel(tempModel);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSettings(false);
    }, 1200);
  };

  const handleRemoveApiKey = () => {
    setTempApiKey('');
    if (onUpdateApiKey) {
      onUpdateApiKey('');
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSettings(false);
    }, 1000);
  };

  const quickPrompts = [
    'Am I eligible to apply to AIT?',
    'What are the cutoffs for Computer Engineering?',
    'Tell me about placements and highest package',
    'Explain the AIT admission process',
    'What documents and certificates are required?',
    'What are the hostel and campus facilities?',
    'Can children of Navy or Air Force apply?',
    'What are the benefits of AIT autonomy?',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#F5F5F7] h-full shadow-2xl flex flex-col z-10 border-l border-black/[0.08]"
          >
            {/* Header */}
            <div className="bg-white px-5 py-3.5 border-b border-black/[0.08] flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0071E3] via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-1 ring-black/5">
                  <Sparkles className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base text-[#1D1D1F]">Monday</h3>
                    {hasChatGPT ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        ChatGPT Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0071E3] border border-blue-200">
                        <Cpu className="w-3 h-3 text-[#0071E3]" />
                        Monday AI Engine
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#6E6E73]">
                    AIT Pune Assistant · Autonomous AY 25–26
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* AI / ChatGPT Settings Toggle */}
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  title="AI & ChatGPT Settings"
                  className={`p-2 rounded-xl transition-colors ${
                    showSettings || hasChatGPT
                      ? 'bg-blue-50 text-[#0071E3]'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.04]'
                  }`}
                  aria-label="AI Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>

                <button
                  onClick={onClearChat}
                  title="Reset conversation"
                  className="p-2 rounded-xl text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.04] transition-colors"
                  aria-label="Clear chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.04] transition-colors"
                  aria-label="Close chat"
                  id="chat-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* AI & ChatGPT Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-white border-b border-black/[0.08] px-5 py-4 overflow-hidden shadow-sm z-20"
                >
                  <form onSubmit={handleSaveSettings} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-[#0071E3]" />
                        <h4 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-wider">
                          ChatGPT Integration (OpenAI)
                        </h4>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {hasCustomKey ? 'Personal Key Active' : 'ChatGPT Active'}
                      </span>
                    </div>

                    <p className="text-xs text-[#6E6E73] leading-relaxed">
                      Monday is directly integrated with ChatGPT to answer any question asked. You can optionally enter your personal OpenAI API key below for custom models and dedicated quota.
                    </p>

                    <div>
                      <label className="block text-[11px] font-medium text-[#1D1D1F] mb-1">
                        OpenAI API Key:
                      </label>
                      <input
                        type="password"
                        value={tempApiKey}
                        onChange={(e) => setTempApiKey(e.target.value)}
                        placeholder="sk-proj-..."
                        className="w-full text-xs px-3 py-2 rounded-xl border border-black/[0.1] bg-[#F5F5F7] text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-blue-500/20 font-mono"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] text-[#6E6E73] font-medium">Model:</label>
                        <select
                          value={tempModel}
                          onChange={(e) => setTempModel(e.target.value)}
                          className="text-xs px-2 py-1 rounded-lg border border-black/[0.1] bg-white text-[#1D1D1F] focus:outline-none"
                        >
                          <option value="gpt-4o-mini">gpt-4o-mini (Fast & Recommended)</option>
                          <option value="gpt-4o">gpt-4o (Most capable)</option>
                          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        {tempApiKey && (
                          <button
                            type="button"
                            onClick={handleRemoveApiKey}
                            className="text-xs px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-lg bg-[#0071E3] text-white hover:bg-[#0077ED] transition-colors"
                        >
                          {saveSuccess ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Saved!</span>
                            </>
                          ) : (
                            <span>Save Settings</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sub-header banner */}
            <div className="bg-amber-50/70 border-b border-amber-200/60 px-4 py-2 flex items-center justify-between text-[11px] text-amber-900">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                <span>Grounded in official AIT prospectus. Always verify guidelines on aitpune.com.</span>
              </div>
              <a
                href="https://www.aitpune.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline hover:text-amber-950 flex items-center gap-0.5"
              >
                Portal <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Messages Scroll Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-1 overscroll-contain"
            >
              {messages.map((msg) => (
                <ChatMessageView
                  key={msg.id}
                  message={msg}
                  onFollowUpClick={(prompt) => onSendMessage(prompt)}
                />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-3 my-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0071E3] via-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  </div>
                  <div className="bg-white border border-black/[0.08] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-bounce" />
                    <span className="text-xs text-[#86868B] ml-2 font-medium">
                      Monday is formulating guidance...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts Drawer Section */}
            <div className="px-4 py-2 bg-white/70 border-t border-black/[0.04]">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSendMessage(prompt)}
                    className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-white hover:bg-blue-50 text-[#1D1D1F] hover:text-[#0071E3] border border-black/[0.08] hover:border-blue-200 transition-all active:scale-95 flex-shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Composer */}
            <div className="p-4 bg-white border-t border-black/[0.06]">
              <ChatInput
                onSendMessage={onSendMessage}
                disabled={isTyping}
                placeholder="Ask Monday anything about AIT Pune admissions, cutoffs, campus, placements..."
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
