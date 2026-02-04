import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, ExternalLink, Tag, TrendingUp, X } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    description:
      'A Streamlit web application for analyzing the price action of multiple stocks and indices from inception.',
    link: 'https://price-action-analysis.streamlit.app/',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['AI', 'Analytics', 'Trading', 'Machine Learning'],
  },
  {
    id: '2',
    name: 'CFS Score Calculator',
    description:
      'Assess the quality, growth trajectory, financial stability, and valuation efficiency of equities within the NIFTY200 universe.',
    link: '/cfs',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['AI', 'Analytics', 'Trading', 'Machine Learning'],
  },
  {
    id: '3',
    name: 'CryptoChain Insights',
    description:
      'Blockchain-based sentiment tracking for cryptocurrency markets with on-chain analytics and social sentiment indicators.',
    link: 'https://example.com/cryptochain',
    image:
      'https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Blockchain', 'Crypto', 'DeFi', 'Web3'],
  },
  {
    id: '4',
    name: 'SentimentX Platform',
    description:
      'Multi-source sentiment aggregation platform combining news, social media, and expert analysis.',
    link: 'https://example.com/sentimentx',
    image:
      'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Sentiment', 'Aggregation', 'News', 'Social Media'],
  },
  {
    id: '5',
    name: 'MarketPulse Monitor',
    description:
      'Real-time market pulse monitoring system tracking volume, volatility, and sentiment shifts.',
    link: 'https://example.com/marketpulse',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Real-time', 'Monitoring', 'Volatility', 'Exchanges'],
  },
  {
    id: '6',
    name: 'Neural Market AI',
    description:
      'Deep learning neural networks that analyze market sentiment from millions of data points.',
    link: 'https://example.com/neuralmarket',
    image:
      'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['AI', 'Deep Learning', 'Sentiment', 'Neural Networks'],
  },
];

export function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projectsData.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some(tag => project.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
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
                  '0 0 20px rgba(249,115,22,0.3)',
                  '0 0 40px rgba(249,115,22,0.6)',
                  '0 0 20px rgba(249,115,22,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="w-6 h-6" />
            </motion.div>
            <div>
              <h1 className="text-3xl">Market Projects</h1>
              <p className="text-gray-400">
                Explore our portfolio of market intelligence solutions
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-orange-900/20 rounded-xl"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedTags.includes(tag)
                  ? 'bg-orange-600 text-white'
                  : 'bg-[#1a1a1a] border border-orange-900/20'
              }`}
            >
              <Tag className="inline w-3 h-3 mr-1" />
              {tag}
            </button>
          ))}
          {(searchQuery || selectedTags.length > 0) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg text-sm bg-red-900/20 text-red-400"
            >
              <X className="inline w-3 h-3 mr-1" />
              Clear
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isInternal = project.link.startsWith('/');

  return (
    <motion.div
      className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-orange-900/20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="h-48">
        <ImageWithFallback
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl mb-2">{project.name}</h3>
        <p className="text-gray-400 text-sm mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-orange-900/20 text-orange-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {isInternal ? (
          <Link
            to={project.link}
            className="flex justify-center items-center gap-2 w-full px-4 py-3 bg-orange-600 rounded-lg"
          >
            View Project <ExternalLink className="w-4 h-4" />
          </Link>
        ) : (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-2 w-full px-4 py-3 bg-orange-600 rounded-lg"
          >
            View Project <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
