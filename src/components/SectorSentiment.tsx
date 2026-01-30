import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const sectors = [
  {
    name: 'Technology',
    sentiment: 'Bullish',
    score: 82,
    change: '+5.2%',
    icon: '💻',
    news: 'AI and cloud computing drive strong investor confidence in tech sector',
    stocks: ['AAPL', 'MSFT', 'NVDA', 'GOOGL'],
    positive: true,
  },
  {
    name: 'Healthcare',
    sentiment: 'Bullish',
    score: 76,
    change: '+3.8%',
    icon: '🏥',
    news: 'Breakthrough drug approvals boost pharmaceutical stocks',
    stocks: ['JNJ', 'PFE', 'UNH', 'ABBV'],
    positive: true,
  },
  {
    name: 'Finance',
    sentiment: 'Neutral',
    score: 58,
    change: '+0.5%',
    icon: '💰',
    news: 'Banking sector shows mixed signals amid interest rate uncertainty',
    stocks: ['JPM', 'BAC', 'WFC', 'GS'],
    positive: true,
  },
  {
    name: 'Energy',
    sentiment: 'Bearish',
    score: 38,
    change: '-4.2%',
    icon: '⚡',
    news: 'Oil price volatility and renewable transition concerns weigh on sector',
    stocks: ['XOM', 'CVX', 'COP', 'SLB'],
    positive: false,
  },
  {
    name: 'Consumer',
    sentiment: 'Neutral',
    score: 62,
    change: '+1.2%',
    icon: '🛒',
    news: 'Retail sales data shows steady consumer spending patterns',
    stocks: ['AMZN', 'WMT', 'TGT', 'COST'],
    positive: true,
  },
  {
    name: 'Industrial',
    sentiment: 'Bullish',
    score: 71,
    change: '+2.9%',
    icon: '🏭',
    news: 'Manufacturing sector benefits from infrastructure investments',
    stocks: ['CAT', 'BA', 'GE', 'HON'],
    positive: true,
  },
];

const chartData = sectors.map(s => ({
  name: s.name,
  score: s.score,
  sentiment: s.sentiment,
}));

export function SectorSentiment() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl border border-orange-900/20 p-6"
      >
        <h3 className="text-xl mb-6 font-poppins">Sector Sentiment Overview</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              barCategoryGap={16}
              margin={{ top: 10, right: 20, left: 90, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2a2a2a"
                horizontal={false}
              />

              <XAxis
                type="number"
                stroke="#888"
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                type="category"
                dataKey="name"
                width={80}
                stroke="#aaa"
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.06)' }} // subtle slate hover
                contentStyle={{
                  backgroundColor: '#020617',  // slate-950
                  border: '1px solid #1e293b', // slate-800
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#e5e7eb',            // neutral text
                }}
                labelStyle={{
                  color: '#94a3b8',            // slate-400
                  fontWeight: 600,
                }}
                formatter={(value, name, props) => {
                  const sentiment = props.payload.sentiment;

                  const color =
                    sentiment === 'Bullish'
                      ? '#22c55e'
                      : sentiment === 'Bearish'
                      ? '#ef4444'
                      : '#eab308';

                  return [
                    <span style={{ color, fontWeight: 600 }}>
                      Score: {value} ({sentiment})
                    </span>,
                    ,
                  ];
                }}
              />

              <Bar
                dataKey="score"
                barSize={10}
                radius={[0, 10, 10, 0]}
                isAnimationActive
                animationDuration={1200}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.sentiment === 'Strong Buy'
                        ? '#16a34a'
                        : entry.sentiment === 'Bullish'
                        ? '#22c55e'
                        : entry.sentiment === 'Positive'
                        ? '#4ade80'
                        : entry.sentiment === 'Neutral'
                        ? '#eab308'
                        : '#ef4444'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        {sectors.map((sector, index) => (
          <SectorCard key={sector.name} sector={sector} index={index} />
        ))}
      </div>
    </div>
  );
}

function SectorCard({ sector, index }: any) {
  const getSentimentColor = (sentiment: string) => {
    if (sentiment === 'Bullish') return 'text-green-400';
    if (sentiment === 'Bearish') return 'text-red-400';
    return 'text-yellow-400';
  };

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment === 'Bullish') return <TrendingUp className="w-5 h-5" />;
    if (sentiment === 'Bearish') return <TrendingDown className="w-5 h-5" />;
    return <Activity className="w-5 h-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl border border-orange-900/20 p-6 relative overflow-hidden group"
    >
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-600/10 to-transparent rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 font-poppins">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
            >
              {sector.icon}
            </motion.div>
            <div>
              <h3 className="text-xl">{sector.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className={`flex items-center gap-1 text-sm ${getSentimentColor(sector.sentiment)}`}>
                  {getSentimentIcon(sector.sentiment)}
                  <span className='font-poppins'>{sector.sentiment}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg ${sector.positive ? 'text-green-400' : 'text-red-400'}`}>
              {sector.change}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Sentiment Score</span>
            <span className="text-sm">{sector.score}%</span>
          </div>
          <div className="bg-[#0a0a0a] rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${sector.score}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
              className={`h-full ${
                sector.sentiment === 'Bullish'
                  ? 'bg-gradient-to-r from-green-600 to-green-400'
                  : sector.sentiment === 'Bearish'
                  ? 'bg-gradient-to-r from-red-600 to-red-400'
                  : 'bg-gradient-to-r from-yellow-600 to-yellow-400'
              }`}
            />
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-lg p-4 border border-orange-900/10 mb-4">
          <div className="flex items-start gap-2">
            <div className="text-orange-400 mt-1">📊</div>
            <p className="text-sm text-gray-300">{sector.news}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2">Key Stocks</p>
          <div className="flex gap-2 flex-wrap">
            {sector.stocks.map((stock, i) => (
              <motion.span
                key={stock}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-orange-900/20 text-orange-400 rounded-full text-xs border border-orange-500/20"
              >
                {stock}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
