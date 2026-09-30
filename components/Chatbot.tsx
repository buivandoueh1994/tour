'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, X, Send, Sparkles, RotateCcw, 
  ArrowRight, Loader2, Compass
} from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { useLanguage } from '@/context/LanguageContext';
import { TOURS_DATA } from '@/data/tours';
import { getLocalizedTour } from '@/lib/utils';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  relatedTourSlug?: string;
}

const WELCOME_MESSAGES = {
  vi: 'Xin chào! Tôi là **Hà Giang AI** — trợ lý du lịch của Hà Giang Loop Expedition.\n\nTôi sẵn sàng tư vấn chi tiết cho bạn về thời điểm ngắm hoa tam giác mạch, kinh nghiệm vượt đèo Mã Pí Lèng, thủ tục giấy phép biên giới, đặc sản ẩm thực và các lịch trình phượt phù hợp nhất. Bạn đang dự định khám phá Hà Giang thế nào?',
  en: 'Hello! I am **Ha Giang AI** — your virtual guide at Ha Giang Loop Expedition.\n\nI am here to advise you on the best travel seasons, navigating Ma Pi Leng Pass, motorbike rental & driving tips, and selecting the perfect loop itinerary. How would you like to explore Ha Giang?',
};

const RESET_MESSAGES = {
  vi: 'Đã làm mới cuộc hội thoại. Hãy đặt bất kỳ câu hỏi nào về Hà Giang cho tôi nhé!',
  en: 'Conversation reset. Feel free to ask me anything about the Ha Giang Loop!',
};

const QUICK_SUGGESTIONS = {
  vi: [
    '🌸 Đi Hà Giang mùa nào đẹp nhất?',
    '🏍️ Tour Easy Rider có gì khác tự lái?',
    '📄 Cần chuẩn bị bằng lái hay giấy phép gì?',
    '🍲 Đặc sản Hà Giang có gì ngon?',
    '🗺️ Lịch trình 3N2Đ nên đi những đâu?',
  ],
  en: [
    '🌸 Best season to visit Ha Giang?',
    '🏍️ Self-drive vs. Easy Rider difference?',
    '📄 Driving license & border permits?',
    '🍲 What local foods should I try?',
    '🗺️ Recommended 3D2N Loop itinerary?',
  ],
};

/**
 * Component render nội dung tin nhắn sạch, format chuẩn đậm, gạch đầu dòng
 */
function FormattedMessage({ text }: { text: string }) {
  const renderInlineFormatted = (rawText: string) => {
    // Tách các đoạn in đậm **...**
    const parts = rawText.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, idx) => {
      // Phần tử lẻ là nội dung nằm trong **...**
      if (idx % 2 === 1) {
        const cleanBold = part.replace(/^\[(.*?)\]$/, '$1');
        return (
          <strong key={idx} className="font-bold text-stone-950">
            {cleanBold}
          </strong>
        );
      }

      // Xử lý các dấu ngoặc vuông [Tên Tour...]
      const bracketParts = part.split(/\[(.*?)\]/g);
      if (bracketParts.length > 1) {
        return bracketParts.map((sub, sIdx) => {
          if (sIdx % 2 === 1) {
            return (
              <span key={sIdx} className="font-semibold text-emerald-800">
                {sub}
              </span>
            );
          }
          return sub;
        });
      }

      return part;
    });
  };

  const lines = text.split('\n');

  return (
    <div className="space-y-2 leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // Các dòng gạch đầu dòng (• hoặc - hoặc *)
        if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const itemText = trimmed.replace(/^[•\-*]\s*/, '');
          return (
            <div key={i} className="flex items-start gap-2 pl-0.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <div className="flex-1 leading-relaxed">
                {renderInlineFormatted(itemText)}
              </div>
            </div>
          );
        }

        // Tiêu đề nhóm nội dung
        if (trimmed.startsWith('**') && (trimmed.endsWith('**') || trimmed.includes(':**'))) {
          return (
            <div key={i} className="font-bold text-stone-900 pt-1.5 pb-0.5">
              {renderInlineFormatted(trimmed)}
            </div>
          );
        }

        return (
          <p key={i} className="leading-relaxed">
            {renderInlineFormatted(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export default function Chatbot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: WELCOME_MESSAGES.vi,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openBookingModal } = useBooking();

  // Update welcome message if conversation is untouched
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id.startsWith('welcome')) {
        return [
          {
            id: `welcome-${language}`,
            sender: 'assistant',
            text: WELCOME_MESSAGES[language],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  }, [language]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Focus ô input khi mở modal lần đầu mà không giật màn hình
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      const timer = setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cuộn nội bộ khung chat khi có tin nhắn mới
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

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
        body: JSON.stringify({ message: text, language }),
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
        relatedTourSlug: data.relatedTourSlug,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: language === 'en'
          ? 'Sorry, there was an issue querying our knowledge base. Please try again in a moment or contact us on WhatsApp **+84 988 333 888**!'
          : 'Xin lỗi, đã có lỗi kết nối khi tra cứu kho tri thức. Bạn vui lòng thử lại sau giây lát hoặc liên hệ hotline **0988.333.888** để được tư vấn nhanh nhé!',
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
        id: `welcome-reset-${language}`,
        sender: 'assistant',
        text: RESET_MESSAGES[language],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50">
      {/* Floating Action Button with Tooltip */}
      {!isOpen && (
        <div className="flex flex-col items-end gap-2">
          {/* Enticing Tooltip Bubble */}
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer bg-white text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-1.5 animate-bounce transition-all hover:scale-105 select-none max-w-[240px] sm:max-w-none text-right"
          >
            <span>{t('botTooltip')}</span>
          </div>

          {/* Floating Action Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative group flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-900 hover:to-teal-800 text-white rounded-full shadow-2xl shadow-emerald-950/30 transition-all transform hover:scale-105 border border-white/20"
            aria-label="Open AI Assistant"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            </div>
            <span className="font-bold text-sm tracking-wide hidden sm:inline">
              {t('botFabLabel')}
            </span>
            <span className="px-1.5 py-0.5 text-[10px] bg-white/20 rounded-md font-mono font-bold uppercase">
              AI
            </span>
          </button>
        </div>
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
                  <h3 className="font-extrabold text-sm text-white">{t('botHeaderTitle')}</h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <p className="text-[11px] text-stone-300 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {t('botHeaderSub')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/70 text-xs sm:text-sm overscroll-contain"
          >
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl shadow-sm ${
                      isUser
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    ) : (
                      <FormattedMessage text={msg.text} />
                    )}

                    {/* Matched Tour Booking CTA Card */}
                    {msg.relatedTourSlug && (
                      <div className="mt-3 pt-3 border-t border-stone-100">
                        {(() => {
                          const tour = TOURS_DATA.find((t) => t.slug === msg.relatedTourSlug);
                          if (!tour) return null;
                          const localizedTour = getLocalizedTour(tour, language);
                          return (
                            <button
                              onClick={() => {
                                setIsOpen(false);
                                openBookingModal(localizedTour, 'book');
                              }}
                              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center justify-between shadow-sm transition-all transform hover:-translate-y-0.5"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <Compass className="w-4 h-4 shrink-0" />
                                <span className="truncate">
                                  {language === 'en' ? `Book now: ${localizedTour.title}` : `Đặt ngay: ${localizedTour.title}`}
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 shrink-0" />
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
              <div className="flex items-center gap-2 text-stone-500 text-xs bg-white p-3 rounded-2xl border border-stone-200 w-fit shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span>{language === 'en' ? 'Searching Ha Giang guidebook...' : 'Đang tra cứu cẩm nang Hà Giang...'}</span>
              </div>
            )}
          </div>

          {/* Quick Suggestions Carousel */}
          <div className="px-3 py-2 bg-white border-t border-stone-100 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 shrink-0">
            {QUICK_SUGGESTIONS[language].map((sug, idx) => (
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
                placeholder={t('botInputPlaceholder')}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 focus:bg-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-700/20"
                aria-label="Send query"
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
