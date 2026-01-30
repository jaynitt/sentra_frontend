import { motion } from 'motion/react';
import { TrendingUp, Twitter, Linkedin, Github, Mail, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: 'Analytics', href: '/' },
      { name: 'Markets', href: '/markets' },
      { name: 'Insights', href: '/insights' },
      { name: 'API', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Status', href: '#' },
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Cookies', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/aqua-advanced-quantitative-analytics-private-limited/posts/?feedView=all', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    {icon: Mail, href: 'mailto:learn.finance@aqua.org.in', label: 'Email',},
  ];

  return (
    <footer className="relative border-t border-orange-900/20 bg-black/40 backdrop-blur-sm overflow-hidden font-montserrat">
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-orange-900/10 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
            style={{
              left: `${(i * 12.5) % 100}%`,
              top: `${(i * 20) % 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 p-2.5 rounded-lg relative"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(249, 115, 22, 0.3)',
                    '0 0 30px rgba(249, 115, 22, 0.6)',
                    '0 0 20px rgba(249, 115, 22, 0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <TrendingUp className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl text-white">Sentra by AQUA</h3>
                <p className="text-xs text-orange-400">Market Intelligence Platform</p>
              </div>
            </motion.div>
            <p className="text-sm text-gray-400 mb-4 max-w-sm">
              Advanced sentiment analysis and market intelligence powered by AI. Make informed decisions with real-time market insights.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-[#1a1a1a] border border-orange-900/20 rounded-lg text-gray-400 hover:text-orange-400 hover:border-orange-500/50 transition-all"
                  whileHover={{ 
                    scale: 1.1, 
                    y: -3,
                    boxShadow: '0 5px 20px rgba(249, 115, 22, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <FooterLinkSection title="Products" links={footerLinks.products} />
          <FooterLinkSection title="Company" links={footerLinks.company} />
          <FooterLinkSection title="Resources" links={footerLinks.resources} />
          <FooterLinkSection title="Legal" links={footerLinks.legal} />
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="mb-8 p-6 bg-gradient-to-r from-orange-900/10 to-transparent border border-orange-900/20 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg text-white mb-1">Stay Updated</h4>
              <p className="text-sm text-gray-400">Get the latest market insights delivered to your inbox.</p>
            </div>
            <motion.div 
              className="flex gap-2 w-full md:w-auto"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-[#1a1a1a] border border-orange-900/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 flex-1 md:w-64"
              />
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/50 transition-all whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
                <Mail className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-orange-900/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <motion.p
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              © {currentYear} Sentra. All rights reserved.
            </motion.p>
            <motion.p
              className="flex items-center gap-2"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              Built with <span className="text-orange-500">♥</span> for traders and investors
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkSection({ title, links }: { title: string; links: Array<{ name: string; href: string }> }) {
  return (
    <div>
      <h4 className="text-white mb-4">{title}</h4>
      <ul className="space-y-3">
        {links.map((link, i) => (
          <motion.li
            key={i}
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <a
              href={link.href}
              className="text-sm text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1 group"
            >
              {link.name}
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
