import { motion, useScroll, useTransform } from 'motion/react';
import { TrendingUp, TrendingDown, IndianRupee, Activity, Zap, Target, Sparkles, ArrowUp, ArrowDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-20 relative overflow-hidden">
      {/* Animated 3D candlestick visualizations with sentiment */}
      <AnimatedCandlesticksWithSentiment position="left" sentiment="bullish" />
      <AnimatedCandlesticksWithSentiment position="right" sentiment="bearish" />

      {/* Floating sentiment indicators */}
      <FloatingSentimentBadges />

      {/* Animated glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 20) % 100}%`,
              top: `${(i * 25) % 100}%`,
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
            className="bg-gradient-radial from-orange-500/30 to-transparent blur-3xl"
          />
        ))}
      </div>
      
      {/* Enhanced floating stock symbols with sentiment */}
      <FloatingStockSymbolsWithSentiment />

      <div className="text-center max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Badge with complex animations */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/20 via-orange-600/20 to-orange-500/20 border border-orange-500/30 mb-8 relative overflow-hidden backdrop-blur-sm"
            animate={{
              boxShadow: [
                '0 0 30px rgba(249, 115, 22, 0.3)',
                '0 0 60px rgba(249, 115, 22, 0.6)',
                '0 0 30px rgba(249, 115, 22, 0.3)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Sparkles className="w-5 h-5 text-orange-400" />
            </motion.div>
            
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            
            <span className="text-sm text-orange-300 relative z-10 font-montserrat">Live Market Research Analysis</span>
            
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Zap className="w-5 h-5 text-orange-400" />
            </motion.div>
          </motion.div>

          {/* Enhanced title with gradient animation */}
          <motion.h2 
            className="text-6xl md:text-8xl mb-8 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <motion.span
              className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent inline-block font-poppins"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Real-Time Stock
            </motion.span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-orange-400 via-orange-200 to-white bg-clip-text text-transparent inline-block font-poppins"
              animate={{
                backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              & Sector Sentiment
            </motion.span>

            {/* Floating accent icons around title */}
            <motion.div
              className="absolute -left-16 top-0"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <Target className="w-12 h-12 text-orange-500/40" />
            </motion.div>
            <motion.div
              className="absolute -right-16 bottom-0"
              animate={{
                y: [0, 20, 0],
                rotate: [0, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              <Activity className="w-12 h-12 text-orange-500/40" />
            </motion.div>
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-montserrat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            AI-powered analysis of market sentiment across stocks and sectors, backed by{' '}
            <motion.span
              className="text-orange-400 font-poppins"
              animate={{
                textShadow: [
                  '0 0 10px rgba(249, 115, 22, 0.5)',
                  '0 0 20px rgba(249, 115, 22, 0.8)',
                  '0 0 10px rgba(249, 115, 22, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              real-time
            </motion.span>{' '}
            news and social media insights
          </motion.p>

          {/* Animated visual separator with dollar icons */}
          <div className="flex items-center justify-center gap-6 mb-16">
            <motion.div
              className="h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-md"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
            <motion.div
              className="relative"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <IndianRupee className="w-8 h-8 text-orange-500" />
              <motion.div
                className="absolute inset-0 bg-orange-500/30 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
            <motion.div
              className="h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent flex-1 max-w-md"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
          </div>

          {/* Enhanced stat cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 font-montserrat">
            <StatCard
              icon={<TrendingUp className="w-10 h-10 text-green-400" />}
              value={68}
              suffix="%"
              label="Bullish Sentiment"
              sublabel="Market Optimism"
              color="green"
              delay={0.2}
            />
            <StatCard
              icon={<Activity className="w-10 h-10 text-orange-400" />}
              value={2847}
              suffix=""
              label="Stocks Analyzed"
              sublabel="Real-time Tracking"
              color="orange"
              delay={0.3}
            />
            <StatCard
              icon={<TrendingDown className="w-10 h-10 text-red-400" />}
              value={32}
              suffix="%"
              label="Bearish Sentiment"
              sublabel="Market Caution"
              color="red"
              delay={0.4}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AnimatedCandlesticksWithSentiment({ position, sentiment }: { position: 'left' | 'right'; sentiment: 'bullish' | 'bearish' }) {
  const candles = Array.from({ length: 20 }, (_, i) => {
    const trend = sentiment === 'bullish' ? i * 2 : -i * 2;
    return {
      high: 60 + Math.random() * 40 + trend,
      low: 20 + Math.random() * 30 + trend,
      open: 30 + Math.random() * 30 + trend,
      close: 40 + Math.random() * 30 + trend,
    };
  });

  const isBullish = sentiment === 'bullish';

  return (
    <motion.div
      className={`absolute ${position === 'left' ? 'left-4' : 'right-4'} top-48 w-96 opacity-40`}
      initial={{ opacity: 0, x: position === 'left' ? -100 : 100 }}
      animate={{ opacity: 0.4, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="relative">
        {/* Sentiment label */}
        <motion.div
          className={`absolute -top-12 ${position === 'left' ? 'left-0' : 'right-0'} ${
            isBullish ? 'bg-green-500/20 border-green-500/40' : 'bg-red-500/20 border-red-500/40'
          } backdrop-blur-md border rounded-lg px-4 py-2`}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className={`flex items-center gap-2 text-sm ${isBullish ? 'text-green-400' : 'text-red-400'}`}>
            {isBullish ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            <span>{sentiment === 'bullish' ? 'Bullish Trend' : 'Bearish Trend'}</span>
          </div>
        </motion.div>

        <svg viewBox="0 0 400 200" className="w-full">
          {/* Grid lines */}
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={i * 40}
              x2="400"
              y2={i * 40}
              stroke="#333"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}

          {/* Candlesticks */}
          {candles.map((candle, i) => {
            const x = i * 20 + 10;
            const isGreen = candle.close > candle.open;
            const bodyTop = Math.min(candle.open, candle.close);
            const bodyHeight = Math.abs(candle.close - candle.open);
            
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 1 }}
              >
                {/* Wick */}
                <motion.line
                  x1={x}
                  y1={200 - candle.high}
                  x2={x}
                  y2={200 - candle.low}
                  stroke={isGreen ? '#22c55e' : '#ef4444'}
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ 
                    pathLength: { duration: 0.5, delay: i * 0.05 + 1 },
                    opacity: { duration: 2, repeat: Infinity, delay: i * 0.1 },
                  }}
                />
                {/* Body */}
                <motion.rect
                  x={x - 5}
                  y={200 - bodyTop - bodyHeight}
                  width="10"
                  height={bodyHeight || 2}
                  fill={isGreen ? '#22c55e' : '#ef4444'}
                  initial={{ scaleY: 0 }}
                  animate={{ 
                    scaleY: 1,
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ 
                    scaleY: { duration: 0.5, delay: i * 0.05 + 1 },
                    opacity: { duration: 2, repeat: Infinity, delay: i * 0.1 },
                  }}
                  style={{ transformOrigin: 'bottom' }}
                />
                {/* Glow effect */}
                <motion.rect
                  x={x - 6}
                  y={200 - bodyTop - bodyHeight - 1}
                  width="12"
                  height={bodyHeight + 2 || 3}
                  fill={isGreen ? '#22c55e' : '#ef4444'}
                  opacity="0"
                  animate={{
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  filter="blur(4px)"
                />
              </motion.g>
            );
          })}

          {/* Trend line */}
          <motion.path
            d={`M 10 ${isBullish ? '150' : '50'} Q 200 ${isBullish ? '100' : '100'} 390 ${isBullish ? '50' : '150'}`}
            fill="none"
            stroke={isBullish ? '#22c55e' : '#ef4444'}
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: 2,
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

function FloatingSentimentBadges() {
  const sentiments = [
    { label: 'Strong Buy', color: 'green', icon: '🚀' },
    { label: 'Positive', color: 'green', icon: '📈' },
    { label: 'Neutral', color: 'yellow', icon: '⚖️' },
    { label: 'Negative', color: 'red', icon: '📉' },
    { label: 'Strong Sell', color: 'red', icon: '⚠️' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sentiments.map((sentiment, i) => {
        const isLeft = i % 2 === 0;

        return (
          <motion.div
            key={i}
            className={`absolute px-5 py-3 rounded-xl backdrop-blur-md border-2 ${
              sentiment.color === 'green'
                ? 'bg-green-500/15 border-green-500/40 text-green-300'
                : sentiment.color === 'yellow'
                ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-300'
                : 'bg-red-500/15 border-red-500/40 text-red-300'
            }`}
            style={{
              left: isLeft ? `${2 + Math.random() * 4}%` : 'auto',
              right: !isLeft ? `${2 + Math.random() * 4}%` : 'auto',
              top: `${20 + i * 12}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 8, -8, 0],
              scale: [0.95, 1.1, 0.95],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          >
            <div className="flex items-center gap-3">
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {sentiment.icon}
              </motion.span>
              <span className="text-sm whitespace-nowrap">
                {sentiment.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function FloatingStockSymbolsWithSentiment() {
  const symbols = [
    { name: 'RELIANCE', change: '+2.4%', positive: true, sentiment: 'Bullish' },
    { name: 'HDFCBANK', change: '+1.2%', positive: true, sentiment: 'Positive' },
    { name: 'BHARTIARTL', change: '+1.8%', positive: true, sentiment: 'Bullish' },
    { name: 'ICICIBANK', change: '+5.2%', positive: true, sentiment: 'Strong Buy' },
    { name: 'SBIN', change: '+0.5%', positive: true, sentiment: 'Positive' },
    { name: 'INFY', change: '-1.3%', positive: false, sentiment: 'Negative' },
    { name: 'BAJFINANCE', change: '-0.3%', positive: false, sentiment: 'Neutral' },
    { name: 'HINDUNILVR', change: '+3.1%', positive: true, sentiment: 'Bullish' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((symbol, i) => {
        // ✅ GUARANTEED left/right balance
        const isLeft = i % 2 === 0;

        return (
          <motion.div
            key={symbol.name}
            className={`absolute px-5 py-3 rounded-xl backdrop-blur-md border-2 shadow-lg ${
              symbol.positive
                ? 'bg-green-500/15 border-green-500/40'
                : 'bg-red-500/15 border-red-500/40'
            }`}
            style={{
              ...(isLeft
                ? { left: `${2 + Math.random() * 4}%` }
                : { right: `${2 + Math.random() * 4}%` }),
              top: `${15 + i * 12}%`,
            }}
            animate={{
              y: [0, -45, 0],
              x: [0, isLeft ? 8 : -8, 0], // 🔒 no center drift
              opacity: [0.3, 0.9, 0.3],
              rotate: [0, 10, -10, 0],
              scale: [0.95, 1.1, 0.95],
            }}
            transition={{
              duration: 7 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          >
            <div className="space-y-1">
              <div
                className={`flex items-center gap-3 ${
                  symbol.positive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                <motion.div
                  animate={{
                    rotate: symbol.positive ? [0, 360] : [0, -360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {symbol.positive ? (
                    <ArrowUp className="w-5 h-5" />
                  ) : (
                    <ArrowDown className="w-5 h-5" />
                  )}
                </motion.div>

                <span className="text-lg">{symbol.name}</span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <span
                  className={
                    symbol.positive ? 'text-green-300' : 'text-red-300'
                  }
                >
                  {symbol.change}
                </span>
                <span className="text-gray-400">{symbol.sentiment}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function StatCard({ icon, value, suffix, label, sublabel, color, delay }: any) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const colorClasses = {
    green: 'from-green-600/30 via-green-700/20 to-green-900/10 border-green-500/30',
    orange: 'from-orange-600/30 via-orange-700/20 to-orange-900/10 border-orange-500/30',
    red: 'from-red-600/30 via-red-700/20 to-red-900/10 border-red-500/30',
  };

  const glowColors = {
    green: 'bg-green-500/30',
    orange: 'bg-orange-500/30',
    red: 'bg-red-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.8, type: 'spring' }}
      whileHover={{ 
        y: -15, 
        rotateY: 5,
        transition: { duration: 0.3 } 
      }}
      className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} p-10 rounded-2xl border-2 relative overflow-hidden group cursor-pointer`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Multiple animated background layers */}
      <motion.div
        className={`absolute inset-0 ${glowColors[color as keyof typeof glowColors]} opacity-0 group-hover:opacity-100`}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      
      {/* Shimmer effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ['-200%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
          delay: delay,
        }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {/* Icon with 3D effect */}
        <div className="flex items-center justify-center mb-6">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`${glowColors[color as keyof typeof glowColors]} p-5 rounded-2xl relative`}
          >
            <motion.div
              className={`absolute inset-0 ${glowColors[color as keyof typeof glowColors]} rounded-2xl blur-xl`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <div className="relative">{icon}</div>
          </motion.div>
        </div>
        
        {/* Animated number */}
        <motion.div 
          className={`text-6xl mb-2 ${
            color === 'green' ? 'text-green-400' : 
            color === 'orange' ? 'text-orange-400' : 
            'text-red-400'
          }`}
          animate={{
            textShadow: [
              `0 0 20px ${color === 'green' ? 'rgba(34, 197, 94, 0.5)' : color === 'orange' ? 'rgba(249, 115, 22, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
              `0 0 40px ${color === 'green' ? 'rgba(34, 197, 94, 0.8)' : color === 'orange' ? 'rgba(249, 115, 22, 0.8)' : 'rgba(239, 68, 68, 0.8)'}`,
              `0 0 20px ${color === 'green' ? 'rgba(34, 197, 94, 0.5)' : color === 'orange' ? 'rgba(249, 115, 22, 0.5)' : 'rgba(239, 68, 68, 0.5)'}`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {count}{suffix}
        </motion.div>
        
        <div className="text-lg text-gray-200 mb-1">{label}</div>
        <div className="text-sm text-gray-500">{sublabel}</div>

        {/* Enhanced mini chart visualization */}
        <div className="mt-6 h-16 flex items-end gap-1.5 justify-center opacity-60">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 ${
                color === 'green' ? 'bg-gradient-to-t from-green-600 to-green-400' : 
                color === 'orange' ? 'bg-gradient-to-t from-orange-600 to-orange-400' : 
                'bg-gradient-to-t from-red-600 to-red-400'
              } rounded-full shadow-lg`}
              initial={{ height: 0 }}
              animate={{
                height: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.03,
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 1,
              }}
            />
          ))}
        </div>

        {/* Pulse effect on hover */}
        <motion.div
          className={`absolute inset-0 rounded-2xl ${
            color === 'green' ? 'border-green-400' : 
            color === 'orange' ? 'border-orange-400' : 
            'border-red-400'
          } border-2 opacity-0 group-hover:opacity-100`}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>
    </motion.div>
  );
}
