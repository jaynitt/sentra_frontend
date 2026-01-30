import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, Image as ImageIcon, FileText, TrendingUp, TrendingDown, Minus, Sparkles, X } from 'lucide-react';
import { ANALYZE_ENDPOINT } from "../../config/api";

type Message = {
  id: string;
  type: 'user' | 'ai';
  content: string;
  sentiment?: 'bullish' | 'bearish' | 'neutral';
  sentimentScore?: number;
  timestamp: Date;
  attachments?: Array<{ name: string; type: string }>;
};

type Attachment = {
  file: File;
  type: "image" | "document";
};


export function InsightsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI sentiment analyst. Share your text, upload documents, or paste images for sentiment analysis. I can analyze market news, social media posts, financial reports, and more.',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments = Array.from(files).map((file) => ({
      file,
      type: file.type.startsWith("image/") ? "image" : "document",
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
  };


  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (!inputValue.trim() && attachments.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
      attachments: attachments.map((a) => ({
        name: a.file.name,
        type: a.type,
      })),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setAttachments([]);
    setIsTyping(true);

    try {
      const formData = new FormData();

      if (inputValue.trim()) {
        formData.append("text", inputValue);
      }

      attachments.forEach((attachment) => {
        if (attachment.type === "image") {
          formData.append("image", attachment.file);
        } else {
          formData.append("document", attachment.file);
        }
      });

      const res = await fetch(ANALYZE_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Analysis failed");
      }

      // 🔄 Map backend sentiment → frontend sentiment
      let sentiment: "bullish" | "bearish" | "neutral" = "neutral";

      if (["positive", "very_positive"].includes(data.insights.sentiment)) {
        sentiment = "bullish";
      } else if (
        ["negative", "very_negative"].includes(data.insights.sentiment)
      ) {
        sentiment = "bearish";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: data.insights.key_insights,
        sentiment,
        sentimentScore: data.insights.sentiment_score,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "⚠️ Sorry, I couldn’t analyze that right now. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(scrollToBottom, 100);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a0a00] text-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              className="p-3 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(249, 115, 22, 0.3)',
                  '0 0 40px rgba(249, 115, 22, 0.6)',
                  '0 0 20px rgba(249, 115, 22, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <div>
              <h1 className="text-3xl text-white">AI Sentiment Analysis</h1>
              <p className="text-gray-400">Upload documents, images, or type text for instant sentiment insights</p>
            </div>
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          className="bg-[#0f0f0f] border border-orange-900/20 rounded-2xl shadow-2xl shadow-orange-900/10 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Messages Area */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <motion.div
              className="px-6 py-3 border-t border-orange-900/20 bg-[#1a1a1a] flex gap-2 flex-wrap"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              {attachments.map((attachment, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-[#0f0f0f] border border-orange-900/20 rounded-lg text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {attachment.type === 'image' ? (
                    <ImageIcon className="w-4 h-4 text-orange-400" />
                  ) : (
                    <FileText className="w-4 h-4 text-orange-400" />
                  )}
                  <span className="text-gray-300 max-w-[150px] truncate">{attachment.name}</span>
                  <button
                    onClick={() => removeAttachment(i)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-orange-900/20 bg-[#1a1a1a]">
            <div className="flex gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
                className="hidden"
              />
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-[#0f0f0f] border border-orange-900/20 rounded-xl text-gray-400 hover:text-orange-400 hover:border-orange-500/50 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Paperclip className="w-5 h-5" />
              </motion.button>

              <div className="flex-1 bg-[#0f0f0f] border border-orange-900/20 rounded-xl flex items-center px-4 focus-within:border-orange-500/50 transition-colors">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message or paste text for analysis..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 resize-none outline-none py-3 max-h-32"
                  rows={1}
                />
              </div>

              <motion.button
                onClick={handleSend}
                disabled={!inputValue.trim() && attachments.length === 0}
                className="p-3 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.type === 'user';

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <motion.div
          className={`px-6 py-4 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white'
              : 'bg-[#1a1a1a] border border-orange-900/20 text-gray-100'
          }`}
          whileHover={{ scale: 1.01 }}
        >
          {message.attachments && message.attachments.length > 0 && (
            <div className="mb-3 flex gap-2 flex-wrap">
              {message.attachments.map((attachment, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${
                    isUser ? 'bg-white/20' : 'bg-[#0f0f0f]'
                  }`}
                >
                  {attachment.type === 'image' ? (
                    <ImageIcon className="w-3 h-3" />
                  ) : (
                    <FileText className="w-3 h-3" />
                  )}
                  <span className="max-w-[100px] truncate">{attachment.name}</span>
                </div>
              ))}
            </div>
          )}
          
          <p className="whitespace-pre-wrap">{message.content}</p>

          {message.sentiment && message.sentimentScore !== undefined && (
            <motion.div
              className="mt-4 pt-4 border-t border-orange-900/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <SentimentIndicator sentiment={message.sentiment} score={message.sentimentScore} />
            </motion.div>
          )}
        </motion.div>
        <p className="text-xs text-gray-500 mt-2 px-2">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
}

function SentimentIndicator({ sentiment, score }: { sentiment: 'bullish' | 'bearish' | 'neutral'; score: number }) {
  const config = {
    bullish: {
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30',
      label: 'Bullish',
    },
    bearish: {
      icon: TrendingDown,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/30',
      label: 'Bearish',
    },
    neutral: {
      icon: Minus,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30',
      label: 'Neutral',
    },
  };

  const { icon: Icon, color, bgColor, borderColor, label } = config[sentiment];

  return (
    <div className="space-y-3">
      <div className={`flex items-center gap-3 p-3 ${bgColor} border ${borderColor} rounded-lg`}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: sentiment === 'bullish' ? [0, 10, 0] : sentiment === 'bearish' ? [0, -10, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </motion.div>
        <div className="flex-1">
          <p className={`font-medium ${color}`}>{label}</p>
          <p className="text-xs text-gray-400">Confidence: {score}%</p>
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="h-2 bg-[#0f0f0f] rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${
            sentiment === 'bullish'
              ? 'bg-gradient-to-r from-green-600 to-green-400'
              : sentiment === 'bearish'
              ? 'bg-gradient-to-r from-red-600 to-red-400'
              : 'bg-gradient-to-r from-yellow-600 to-yellow-400'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      className="flex justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="px-6 py-4 bg-[#1a1a1a] border border-orange-900/20 rounded-2xl">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-orange-400 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
