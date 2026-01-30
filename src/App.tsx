import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingParticles } from './components/FloatingParticles';
import { HomePage } from './pages/HomePage';
import { InsightsPage } from './pages/InsightsPage';
import { MarketsPage } from './pages/MarketsPage';
import { CFSStocksPage } from './pages/CFSStocksPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a0a00] text-white relative overflow-hidden flex flex-col">
        <FloatingParticles />
        
        <div className="relative z-10 flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/markets" element={<MarketsPage />} />
              <Route path="/cfs" element={<CFSStocksPage/>}/>
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}