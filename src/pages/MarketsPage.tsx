import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, ExternalLink, Tag, TrendingUp, X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

type Project = {
  id: string;
  name: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
};

const projectsData: Project[] = [
  {
    id: '1',
    name: 'Price Action Analysis Dashboard',
    description: 'A Streamlit web application for analyzing the price action of multiple stocks and indices from inception.',
    link: 'https://price-action-analysis.streamlit.app/',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2OTMwMTk4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['AI', 'Analytics', 'Trading', 'Machine Learning'],
  },
  {
    id: '2',
    name: 'CFS Score Calculator',
    description: 'assess the quality, growth trajectory, financial stability, and valuation efficiency of equities within the NIFTY200 universe.',
    link: 'https://sentra-frontend.vercel.app/cfs',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2OTMwMTk4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['AI', 'Analytics', 'Trading', 'Machine Learning'],
  },
  {
    id: '3',
    name: 'CryptoChain Insights',
    description: 'Blockchain-based sentiment tracking for cryptocurrency markets with on-chain analytics and social sentiment indicators.',
    link: 'https://example.com/cryptochain',
    image: 'https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3l8ZW58MXx8fHwxNzY5MjcwMzAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Blockchain', 'Crypto', 'DeFi', 'Web3'],
  },
  {
    id: '4',
    name: 'SentimentX Platform',
    description: 'Multi-source sentiment aggregation platform combining news, social media, and expert analysis for comprehensive market views.',
    link: 'https://example.com/sentimentx',
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3RhcnR1cCUyMG9mZmljZXxlbnwxfHx8fDE3NjkyOTM2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Sentiment', 'Aggregation', 'News', 'Social Media'],
  },
  {
    id: '5',
    name: 'MarketPulse Monitor',
    description: 'Real-time market pulse monitoring system tracking volume, volatility, and sentiment shifts across all major exchanges.',
    link: 'https://example.com/marketpulse',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2OTMwMTk4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Real-time', 'Monitoring', 'Volatility', 'Exchanges'],
  },
  {
    id: '2',
    name: 'Neural Market AI',
    description: 'Deep learning neural networks that analyze market sentiment from millions of data points across social media, news, and trading volumes.',
    link: 'https://example.com/neuralmarket',
    image: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmV0d29ya3xlbnwxfHx8fDE3NjkzMjc4ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['AI', 'Deep Learning', 'Sentiment', 'Neural Networks'],
  },
];

export function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projectsData.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter projects based on search and tags
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => project.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a0a00] text-white">
      <div className="container mx-auto px-4 py-8">
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
              <TrendingUp className="w-6 h-6" />
            </motion.div>
            <div>
              <h1 className="text-3xl text-white">Market Projects</h1>
              <p className="text-gray-400">Explore our portfolio of market intelligence solutions</p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, description, or tags..."
              className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-orange-900/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>
        </motion.div>

        {/* Tag Filter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-400">Filter by tags:</span>
            {allTags.map((tag, i) => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-[#1a1a1a] border border-orange-900/20 text-gray-300 hover:border-orange-500/50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Tag className="w-3 h-3 inline mr-1" />
                {tag}
              </motion.button>
            ))}
            {(searchQuery || selectedTags.length > 0) && (
              <motion.button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg text-sm bg-red-900/20 border border-red-500/30 text-red-400 hover:bg-red-900/30 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-3 h-3 inline mr-1" />
                Clear Filters
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          className="text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Showing {filteredProjects.length} of {projectsData.length} projects
        </motion.p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="bg-[#1a1a1a] border border-orange-900/20 rounded-xl overflow-hidden hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/20 transition-all group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <ImageWithFallback
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
        
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-orange-600/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        >
          <motion.div
            className="text-white"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <ExternalLink className="w-12 h-12" />
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl text-white mb-3 group-hover:text-orange-400 transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 bg-orange-900/20 border border-orange-500/30 text-orange-400 text-xs rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Link Button */}
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Project
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
}
