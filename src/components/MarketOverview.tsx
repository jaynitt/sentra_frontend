import { motion } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const mockData = [
  { value: 45 },
  { value: 52 },
  { value: 48 },
  { value: 61 },
  { value: 58 },
  { value: 65 },
  { value: 68 },
];

export function MarketOverview() {
  return (
    <div className="container mx-auto px-4 py-8 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <MarketCard
          title="Overall Sentiment"
          value="Bullish"
          change="+12%"
          positive={true}
          data={mockData}
          delay={0}
        />
        <MarketCard
          title="Tech Sector"
          value="Positive"
          change="+8%"
          positive={true}
          data={mockData.map(d => ({ value: d.value + 5 }))}
          delay={0.1}
        />
        <MarketCard
          title="Financial Sector"
          value="Neutral"
          change="+2%"
          positive={true}
          data={mockData.map(d => ({ value: d.value - 10 }))}
          delay={0.2}
        />
        <MarketCard
          title="Energy Sector"
          value="Negative"
          change="-5%"
          positive={false}
          data={mockData.map(d => ({ value: d.value - 20 }))}
          delay={0.3}
        />
      </motion.div>
    </div>
  );
}

function MarketCard({ title, value, change, positive, data, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 rounded-xl border border-orange-900/20 relative overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-600/0 via-orange-600/5 to-orange-600/0"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <div className="relative z-10">
        <div className="text-sm text-gray-400 mb-2">{title}</div>
        <div className="text-2xl mb-1">{value}</div>
        <div className={`text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {change} from yesterday
        </div>
        
        <div className="mt-4 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={positive ? '#22c55e' : '#ef4444'} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={positive ? '#22c55e' : '#ef4444'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={positive ? '#22c55e' : '#ef4444'}
                strokeWidth={2}
                fill={`url(#gradient-${title})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
