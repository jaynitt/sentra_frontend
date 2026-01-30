import { motion } from 'motion/react';
import { Newspaper, Clock, TrendingUp, ExternalLink } from 'lucide-react';

const newsItems = [
  {
    title: 'Federal Reserve Signals Steady Interest Rates',
    source: 'Bloomberg',
    time: '2 hours ago',
    sentiment: 'Neutral',
    impact: 'Medium',
    excerpt: 'Fed officials indicate rates will remain unchanged in upcoming meetings, providing stability to financial markets.',
    affectedSectors: ['Finance', 'Technology', 'Real Estate'],
  },
  {
    title: 'Tech Giants Report Strong Q3 Earnings',
    source: 'Reuters',
    time: '4 hours ago',
    sentiment: 'Bullish',
    impact: 'High',
    excerpt: 'Major technology companies exceed analyst expectations with robust earnings driven by cloud and AI services.',
    affectedSectors: ['Technology'],
  },
  {
    title: 'Oil Prices Drop on Supply Concerns',
    source: 'Financial Times',
    time: '6 hours ago',
    sentiment: 'Bearish',
    impact: 'High',
    excerpt: 'Crude oil prices decline as OPEC signals potential production increases to stabilize global markets.',
    affectedSectors: ['Energy'],
  },
  {
    title: 'Healthcare Sector Sees Merger Activity',
    source: 'Wall Street Journal',
    time: '8 hours ago',
    sentiment: 'Bullish',
    impact: 'Medium',
    excerpt: 'Major pharmaceutical companies announce strategic mergers aimed at expanding research capabilities.',
    affectedSectors: ['Healthcare'],
  },
];

export function NewsInsights() {
  return (
    <div className="container mx-auto px-4 py-16 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="bg-gradient-to-br from-orange-600 to-orange-500 p-3 rounded-lg"
          >
            <Newspaper className="w-6 h-6" />
          </motion.div>
          <div>
            <h3 className="text-2xl">Latest Market News & Insights</h3>
            <p className="text-sm text-gray-400">Real-time news driving market sentiment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {newsItems.map((news, index) => (
            <NewsCard key={index} news={news} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function NewsCard({ news, index }: any) {
  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'Bullish') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (sentiment === 'Bearish') return 'bg-red-500/20 text-red-400 border-red-500/30';
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'High') return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl border border-orange-900/20 p-6 relative overflow-hidden group cursor-pointer"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-600/0 via-orange-600/5 to-orange-600/0 opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{news.time}</span>
            <span className="text-gray-600">•</span>
            <span>{news.source}</span>
          </div>
        </div>

        <h4 className="text-lg mb-3 group-hover:text-orange-400 transition-colors">{news.title}</h4>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{news.excerpt}</p>

        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs border ${getSentimentColor(news.sentiment)}`}>
            {news.sentiment}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs border ${getImpactColor(news.impact)}`}>
            {news.impact} Impact
          </span>
        </div>

        <div className="pt-4 border-t border-orange-900/20">
          <p className="text-xs text-gray-500 mb-2">Affected Sectors</p>
          <div className="flex gap-2 flex-wrap mb-3">
            {news.affectedSectors.map((sector, i) => (
              <motion.span
                key={sector}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="px-2 py-1 bg-[#0a0a0a] text-orange-400 rounded text-xs border border-orange-900/20"
              >
                {sector}
              </motion.span>
            ))}
          </div>

          <motion.a
            href="#"
            className="text-xs text-orange-400 hover:text-orange-300 inline-flex items-center gap-1"
            whileHover={{ x: 2 }}
          >
            Read full article <ExternalLink className="w-3 h-3" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
