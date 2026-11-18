import { useState, useCallback, useEffect } from 'react';
import { generateMondayResponse } from '../lib/responseEngine';
import type { ChatMessage } from '../lib/responseEngine';
import {
  callChatGPT,
  getOpenAIApiKey,
  setOpenAIApiKey as saveOpenAIApiKey,
  getOpenAIModel,
  setOpenAIModel as saveOpenAIModel,
} from '../lib/aiService';
import { OFFICIAL_SOURCES } from '../data/sourceLinks';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'monday-welcome',
  sender: 'assistant',
  content: `Hi! I'm **Monday**, your dedicated AI Assistant for the **Army Institute of Technology (AIT), Pune**.\n\nI can help you with anything related to AIT Pune:\n- **Eligibility & Armed Forces Categories** (Serving, ESM, Gallantry, Navy/Air Force quotas)\n- **JEE Main Merit & Expected Cutoffs** across all 5 autonomous branches\n- **Autonomous Syllabus & SPPU Degree** starting AY 2025–26\n- **Placements & Top Recruiters** (₹52+ LPA highest, ₹14.5 LPA CS/IT averages)\n- **Hostels, Mess, Campus Life & Student Clubs** (OssCube, Robotics, ACM, IEEE)\n- **Document Checklist** (Form P1 to P4, service records, gap affidavits)\n\nWhat would you like to know first?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[3]],
  suggestedFollowUps: [
    'Am I eligible to apply to AIT Pune?',
    'What are the cutoff ranks for Computer Engineering?',
    'Tell me about placements and highest package',
    'How do I register on the AIT ERP portal?',
    'What documents and certificates are required?',
  ],
  provider: 'local',
};

const STORAGE_KEY = 'ait_admissions_monday_chat_v2';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback if local storage blocked
    }
    return [INITIAL_MESSAGE];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => getOpenAIApiKey());
  const [model, setModel] = useState<string>(() => getOpenAIModel());
  const hasCustomKey = Boolean(apiKey && apiKey.trim());
  const hasChatGPT = true; // ChatGPT is integrated and active by default

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore storage errors
    }
  }, [messages]);

  const updateApiKey = useCallback((newKey: string) => {
    saveOpenAIApiKey(newKey);
    setApiKey(newKey);
  }, []);

  const updateModel = useCallback((newModel: string) => {
    saveOpenAIModel(newModel);
    setModel(newModel);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMessage: ChatMessage = {
        id: `student-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        sender: 'student',
        content: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // 1. Attempt live ChatGPT (using personal key if available or built-in engine)
      try {
        const history = messages.map((m) => ({
          sender: m.sender,
          content: m.content,
        }));

        const aiResp = await callChatGPT(text, history);

        const assistantMessage: ChatMessage = {
          id: `monday-gpt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          sender: 'assistant',
          content: aiResp.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: aiResp.sources,
          suggestedFollowUps: aiResp.suggestedFollowUps,
          provider: 'chatgpt',
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
        return;
      } catch (err: any) {
        console.warn('Live ChatGPT service encountered an issue, falling back to local AIT engine:', err);
      }

      // 2. Offline Fallback: Monday's rich local intelligence engine
      setTimeout(() => {
        const response = generateMondayResponse(text);

        const assistantMessage: ChatMessage = {
          id: `monday-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          sender: 'assistant',
          content: response.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: response.sources,
          suggestedFollowUps: response.suggestedFollowUps,
          provider: 'local',
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 500);
    },
    [messages]
  );

  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
    apiKey,
    updateApiKey,
    model,
    updateModel,
    hasChatGPT,
    hasCustomKey,
  };
}
