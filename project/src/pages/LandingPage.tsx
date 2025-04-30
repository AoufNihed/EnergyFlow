import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Wind, Droplet, Flame, Power, ArrowRight, BarChart2, Shield, Zap, LineChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '00:00', production: 240, consumption: 200 },
  { name: '04:00', production: 300, consumption: 250 },
  { name: '08:00', production: 450, consumption: 380 },
  { name: '12:00', production: 500, consumption: 420 },
  { name: '16:00', production: 470, consumption: 390 },
  { name: '20:00', production: 380, consumption: 320 },
  { name: '23:59', production: 290, consumption: 240 },
];

function LandingPage() {
  return (
    <div>
      {/* Hero Section with Interactive Dashboard Preview */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Optimisez Votre Énergie Durable
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Suivez votre consommation et production d'énergie renouvelable en temps réel. 
                Prenez le contrôle de votre avenir énergétique.
              </p>
              <Link 
                to="/dashboard" 
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
              >
                Voir le Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Aperçu en Temps Réel</h3>
                <div className="flex space-x-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-sm">Production</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                    <span className="text-sm">Consommation</span>
                  </div>
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="production" stroke="#22c55e" strokeWidth={2} />
                    <Line type="monotone" dataKey="consumption" stroke="#f97316" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">Production Totale</p>
                  <p className="text-lg font-semibold text-green-900">2,450 kWh</p>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm text-orange-800">Consommation</p>
                  <p className="text-lg font-semibold text-orange-900">1,890 kWh</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">Économies</p>
                  <p className="text-lg font-semibold text-blue-900">23%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Energy Sources Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Gérez Toutes Vos Sources d'Énergie
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une plateforme unique pour surveiller et optimiser toutes vos sources d'énergie
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sun, title: 'Solaire', color: 'text-yellow-500' },
              { icon: Wind, title: 'Éolien', color: 'text-blue-500' },
              { icon: Droplet, title: 'Hydroélectrique', color: 'text-cyan-500' },
              { icon: Flame, title: 'Gaz', color: 'text-orange-500' },
              { icon: Power, title: 'Cycle à Vapeur', color: 'text-purple-500' },
              { icon: BarChart2, title: 'Prédictions', color: 'text-green-500' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                <item.icon className={`h-12 w-12 ${item.color} mb-4`} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">
                  Optimisez votre production et suivez vos performances en temps réel
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Zap className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl font-bold">EnergyFlow</span>
            </div>
            <p className="mt-4 text-gray-400">
              Optimisez votre consommation d'énergie pour un avenir plus durable
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Code by Aouf Nihed
            </p>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EnergyFlow. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;