import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react';

const stocks = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Limited',
    sentiment: 'Bullish',
    score: 74,
    change: '+2.4%',
    price: '₹2,920.50',
    news: 'Strong performance in Jio and Retail segments; O2C margins improve',
    positive: true,
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sentiment: 'Bullish',
    score: 85,
    change: '+2.4%',
    price: '$178.42',
    news: 'Strong iPhone 15 sales exceed expectations in Asian markets',
    positive: true,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    sentiment: 'Bullish',
    score: 78,
    change: '+5.2%',
    price: '$242.84',
    news: 'Tesla announces new Gigafactory expansion in Texas',
    positive: true,
  },
  {
    symbol: 'TVSMOTOR',
    name: 'TVS Motor Company',
    sentiment: 'Neutral',
    score: 57,
    change: '-0.4%',
    price: '₹2,065.30',
    news: 'Margin pressure due to input costs; EV sales growth remains steady',
    positive: false,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    sentiment: 'Bullish',
    score: 82,
    change: '+1.8%',
    price: '$378.91',
    news: 'Azure cloud revenue surges 30% year-over-year',
    positive: true,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    sentiment: 'Neutral',
    score: 62,
    change: '+0.5%',
    price: '$495.22',
    news: 'Mixed analyst ratings amid AI chip demand concerns',
    positive: true,
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    sentiment: 'Bearish',
    score: 41,
    change: '-1.9%',
    price: '$148.76',
    news: 'Net interest margin concerns amid rate uncertainty and regulatory pressure',
    positive: false,
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    sentiment: 'Bullish',
    score: 70,
    change: '+1.1%',
    price: '₹1,540.80',
    news: 'Stable credit growth and improving asset quality boost investor confidence',
    positive: true,
  },
];

export function StockList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* 🔍 TOP CENTER SEARCH BAR */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-lg ">
          <input
            type="text"
            placeholder="Search stocks by name or symbol…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full rounded-xl
              bg-[#0a0a0a]
              border border-orange-500

              ring-2 ring-orange-500
              ring-offset-2 ring-offset-[#020617]

              pl-12 pr-4 py-3
              text-gray-200 placeholder-gray-500
              outline-none transition-all

              hover:ring-orange-400
              focus:ring-4 focus:ring-orange-300
            "
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z"
            />
          </svg>
        </div>
      </div>

      {/* 📊 STOCK CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStocks.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No stocks found
          </p>
        )}

        {filteredStocks.map((stock, index) => (
          <StockCard key={stock.symbol} stock={stock} index={index} />
        ))}
      </div>
    </div>
  );
}

function StockCard({ stock, index }: any) {
  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'Bullish') return 'text-green-400';
    if (sentiment === 'Bearish') return 'text-red-400';
    return 'text-yellow-400';
  };

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment === 'Bullish') return <TrendingUp className="w-5 h-5" />;
    if (sentiment === 'Bearish') return <TrendingDown className="w-5 h-5" />;
    return <Minus className="w-5 h-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl border border-orange-900/20 overflow-hidden group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-lg">{stock.symbol[0]}</span>
            </motion.div>
            <div>
              <h3 className="text-lg">{stock.symbol}</h3>
              <p className="text-sm text-gray-400">{stock.name}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl">{stock.price}</div>
            <div
              className={`text-sm ${
                stock.positive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {stock.change}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className={`flex items-center gap-2 ${getSentimentColor(stock.sentiment)}`}>
            {getSentimentIcon(stock.sentiment)}
            <span>{stock.sentiment}</span>
          </div>
          <div className="flex-1 bg-[#0a0a0a] rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stock.score}%` }}
              transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: 'easeOut' }}
              className={`h-full ${
                stock.sentiment === 'Bullish'
                  ? 'bg-gradient-to-r from-green-600 to-green-400'
                  : stock.sentiment === 'Bearish'
                  ? 'bg-gradient-to-r from-red-600 to-red-400'
                  : 'bg-gradient-to-r from-yellow-600 to-yellow-400'
              }`}
            />
          </div>
          <span className="text-sm text-gray-400">{stock.score}%</span>
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ delay: index * 0.05 + 0.4 }}
          className="bg-[#0a0a0a] rounded-lg p-4 border border-orange-900/10"
        >
          <div className="flex items-start gap-2">
            <div className="text-orange-400 mt-1">📰</div>
            <div className="flex-1">
              <p className="text-sm text-gray-300 mb-2">{stock.news}</p>
              <motion.a
                href="#"
                className="text-xs text-orange-400 hover:text-orange-300 inline-flex items-center gap-1"
                whileHover={{ x: 2 }}
              >
                Read full analysis <ExternalLink className="w-3 h-3" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
          delay: index * 0.2,
        }}
      />
    </motion.div>
  );
}
