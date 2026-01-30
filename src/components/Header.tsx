import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Bell, DollarSign, LineChart, Percent, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const tickerData = [
  { symbol: 'RELIANCE', price: 178.42, change: 2.4, positive: true },
  { symbol: 'HDFCBANK', price: 242.84, change: 5.2, positive: true },
  { symbol: 'BHARTIARTL', price: 378.91, change: 1.8, positive: true },
  { symbol: 'TCS', price: 139.45, change: 1.2, positive: true },
  { symbol: 'ICICIBANK', price: 495.22, change: 0.5, positive: true },
  { symbol: 'SBIN', price: 334.57, change: -1.3, positive: false },
  { symbol: 'INFY', price: 145.33, change: -0.3, positive: false },
];

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="border-b border-orange-900/20 backdrop-blur-sm bg-black/40 sticky top-0 z-50 overflow-hidden relative"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGdyYXBofGVufDF8fHx8MTc2MTIwNjI4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Financial charts"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          >
            <div className="w-2 h-2 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50" />
          </motion.div>
        ))}
      </div>

      {/* Floating icons with 3D effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(12)].map((_, i) => (
          <FloatingIcon key={i} delay={i * 0.4} index={i} />
        ))}
      </div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="relative">
              {/* Multiple animated rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.4 + i * 0.2, 1],
                    opacity: [0.6, 0.1, 0.6],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 rounded-lg blur-lg"
                  style={{ zIndex: -i }}
                />
              ))}
              
              <motion.div
                animate={{
                  rotate: [0, 360],
                  boxShadow: [
                    '0 0 20px rgba(249, 115, 22, 0.5)',
                    '0 0 40px rgba(249, 115, 22, 0.8)',
                    '0 0 20px rgba(249, 115, 22, 0.5)',
                  ],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 p-3 rounded-lg"
              >
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <TrendingUp className="w-7 h-7" />
                </motion.div>
              </motion.div>
            </div>
            <div>
              <motion.h1 
                className="text-2xl tracking-tight bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent font-poppins"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Sentra by AQUA
              </motion.h1>
              <motion.p
                className="text-xs text-orange-400 font-poppins"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  textShadow: [
                    '0 0 10px rgba(249, 115, 22, 0.3)',
                    '0 0 20px rgba(249, 115, 22, 0.6)',
                    '0 0 10px rgba(249, 115, 22, 0.3)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Market Intelligence Platform
              </motion.p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-6">
            <motion.div
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 relative group"
              >
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-r from-orange-600/20 to-orange-400/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm"
                  layoutId="navHover"
                />
                <BarChart3 className="w-5 h-5 relative z-10" />
                <span className="relative z-10 font-poppins">Analytics</span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/markets"
                className="text-gray-300 hover:text-orange-400 transition-colors relative group"
              >
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-r from-orange-600/20 to-orange-400/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm"
                />
                <span className="relative z-10 font-poppins">Research</span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/insights"
                className="text-gray-300 hover:text-orange-400 transition-colors relative group"
              >
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-r from-orange-600/20 to-orange-400/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm"
                />
                <span className="relative z-10 font-poppins">Insights</span>
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-gray-300 hover:text-orange-400"
            >
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Bell className="w-6 h-6" />
              </motion.div>
              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    '0 0 0px rgba(249, 115, 22, 0.5)',
                    '0 0 10px rgba(249, 115, 22, 1)',
                    '0 0 0px rgba(249, 115, 22, 0.5)',
                  ],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="absolute top-1 right-1 w-3 h-3 bg-orange-500 rounded-full"
              />
            </motion.button>
          </nav>
        </div>
      </div>

      {/* Enhanced animated stock ticker */}
      <TickerBar />
    </motion.header>
  );
}

function FloatingIcon({ delay, index }: { delay: number; index: number }) {
  const icons = [DollarSign, LineChart, TrendingUp, Percent, Activity, BarChart3, ArrowUpRight, ArrowDownRight];
  const Icon = icons[index % icons.length];
  
  return (
    <motion.div
      className="absolute text-orange-500"
      style={{
        left: `${(index * 8.33) % 100}%`,
        top: `${(index * 13) % 100}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, Math.random() * 40 - 20, 0],
        rotate: [0, 180, 360],
        opacity: [0.2, 0.7, 0.2],
        scale: [0.8, 1.3, 0.8],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      <Icon className="w-10 h-10" />
    </motion.div>
  );
}

function TickerBar() {
  return (
    <div className="bg-gradient-to-r from-orange-950/30 via-orange-900/30 to-orange-950/30 py-2 overflow-hidden border-t border-orange-900/20 relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <motion.div
        className="flex gap-12 whitespace-nowrap relative z-10"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...tickerData, ...tickerData].map((stock, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 text-sm px-4 py-1 rounded-full bg-black/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1, y: -2 }}
          >
            <motion.span
              className="text-orange-400 font-poppins"
              animate={{
                textShadow: [
                  '0 0 5px rgba(249, 115, 22, 0.5)',
                  '0 0 15px rgba(249, 115, 22, 0.8)',
                  '0 0 5px rgba(249, 115, 22, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              {stock.symbol}
            </motion.span>
            <span className="text-gray-300 font-poppins">₹{stock.price}</span>
            <motion.span
              className={`flex items-center gap-1 ${stock.positive ? 'text-green-400' : 'text-red-400'}`}
              animate={{
                opacity: [1, 0.6, 1],
                y: stock.positive ? [0, -2, 0] : [0, 2, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            >
              {stock.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {Math.abs(stock.change)}%
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}