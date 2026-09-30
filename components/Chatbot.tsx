'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, X, Send, Sparkles, RotateCcw, 
  ChevronDown, ChevronUp, BookOpen, ArrowRight, Loader2, Compass
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { TOURS_DATA } from '@/data/tours';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: { id: string; category: string; excerpt: string }[];
  relatedTourSlug?: string;
}

const QUICK_SUGGESTIONS = [
  '🌸 Đi Hà Giang mùa nào đẹp nhất?',
  '🏍️ Tour Easy Rider có gì khác tự lái?',
  '📄 Cần chuẩn bị bằng lái hay giấy phép gì?',
  '🍲 Đặc sản Hà Giang có gì ngon?',
  '🗺️ Lịch trình 3N2Đ nên đi những đâu?',
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Xin chào! Tôi là **Hà Giang AI** — trợ lý du lịch được huấn luyện trực tiếp từ tài liệu cẩm nang **Ha_Giang_RAG_Training_Knowledge_Base.pdf**.\n\nTôi có thể giúp bạn giải đáp mọi thắc mắc về các cung đường đèo, thời điểm hoa tam giác mạch, thủ tục giấy phép, ẩm thực hoặc chọn tour phù hợp. Bạn cần tư vấn điều gì hôm nay?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSourcesFor, setShowSourcesFor] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openBookingModal } = useBooking();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Không thể kết nối đến máy chủ');
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources,
        relatedTourSlug: data.relatedTourSlug,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Xin lỗi, đã có lỗi kết nối khi tra cứu kho tri thức. Bạn vui lòng thử lại sau giây lát hoặc liên hệ hotline **0988.333.888** để được hỗ trợ trực tiếp.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: 'Đã làm mới cuộc hội thoại. Hãy đặt bất kỳ câu hỏi nào về Hà Giang cho tôi nhé!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full shadow-2xl shadow-emerald-900/30 transition-all transform hover:scale-105"
          aria-label="Mở chat AI tư vấn"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          </div>
          <span className="font-bold text-sm tracking-wide hidden sm:inline">
            Hỏi AI Hà Giang (RAG)
          </span>
          <span className="px-1.5 py-0.5 text-[10px] bg-white/20 rounded-md font-mono font-bold uppercase">
            v1.0
          </span>
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-fade-in">
          {/* Chat Header */}
          <div className="p-4 bg-stone-900 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-inner">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-white">Hà Giang Tourism AI</h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <p className="text-[11px] text-stone-300 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  RAG Training Knowledge Base
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Làm mới cuộc trò chuyện"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Đóng chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/70 text-xs sm:text-sm">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                        : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {/* Render message with bold emphasis and clean layout */}
                    <div className="space-y-1">
                      {msg.text.split('\n').map((line, i) => {
                        if (!line.trim()) return <div key={i} className="h-1.5" />;
                        return (
                          <p key={i} className="leading-relaxed">
                            {line}
                          </p>
                        );
                      })}
                    </div>

                    {/* Source Citations Drawer Toggle */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-stone-100">
                        <button
                          onClick={() =>
                            setShowSourcesFor(showSourcesFor === msg.id ? null : msg.id)
                          }
                          className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>
                            {showSourcesFor === msg.id
                              ? 'Ẩn nguồn trích xuất'
                              : `Xem ${msg.sources.length} nguồn tài liệu (${msg.sources.map((s) => s.id).join(', ')})`}
                          </span>
                          {showSourcesFor === msg.id ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>

                        {/* Collapsible Source Cards */}
                        {showSourcesFor === msg.id && (
                          <div className="mt-2 space-y-1.5 pl-1 animate-fade-in">
                            {msg.sources.map((source, sIdx) => (
                              <div
                                key={sIdx}
                                className="p-2 bg-stone-50 rounded-lg border border-stone-200 text-[10px] text-stone-600"
                              >
                                <div className="font-bold text-emerald-800">
                                  [{source.id}] {source.category}
                                </div>
                                <div className="italic text-stone-500 mt-0.5">
                                  {source.excerpt}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Matched Tour Booking CTA */}
                    {msg.relatedTourSlug && (
                      <div className="mt-3 pt-2 border-t border-stone-100">
                        {(() => {
                          const tour = TOURS_DATA.find((t) => t.slug === msg.relatedTourSlug);
                          if (!tour) return null;
                          return (
                            <button
                              onClick={() => {
                                setIsOpen(false);
                                openBookingModal(tour, 'book');
                              }}
                              className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                            >
                              <Compass className="w-3.5 h-3.5" />
                              <span>Đặt Tour: {tour.title}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          );
                        })()}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-stone-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-stone-500 text-xs bg-white p-3 rounded-2xl border border-stone-200 w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Đang tra cứu từ tài liệu RAG training...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Carousel */}
          <div className="px-3 py-2 bg-white border-t border-stone-100 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 shrink-0">
            {QUICK_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sug)}
                className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 text-stone-600 text-[11px] font-medium transition-colors border border-stone-200"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-stone-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Hỏi về thời tiết, đèo Mã Pí Lèng, tour..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 focus:bg-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-700/20"
                aria-label="Gửi câu hỏi"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
