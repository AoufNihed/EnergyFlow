import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Zap, LayoutDashboard, BrainCircuit } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import MLPredictions from './pages/MLPredictions';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <Zap className="h-8 w-8 text-green-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">EnergyFlow</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-green-600"
                >
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Dashboard
                </Link>
                <Link 
                  to="/predictions" 
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-green-600"
                >
                  <BrainCircuit className="h-5 w-5 mr-2" />
                  Prédictions ML
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predictions" element={<MLPredictions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;