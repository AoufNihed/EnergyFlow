import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Sun, Wind, Droplet, Flame, Power } from 'lucide-react';

const timeData = [
  { time: '00:00', solar: 120, wind: 80, hydro: 200, gas: 150, steam: 100 },
  { time: '04:00', solar: 150, wind: 100, hydro: 220, gas: 160, steam: 110 },
  { time: '08:00', solar: 280, wind: 150, hydro: 240, gas: 170, steam: 120 },
  { time: '12:00', solar: 320, wind: 180, hydro: 250, gas: 180, steam: 130 },
  { time: '16:00', solar: 290, wind: 160, hydro: 230, gas: 165, steam: 115 },
  { time: '20:00', solar: 220, wind: 130, hydro: 210, gas: 155, steam: 105 },
  { time: '23:59', solar: 140, wind: 90, hydro: 190, gas: 145, steam: 95 },
];

const sourceData = [
  { name: 'Solaire', value: 1520, color: '#eab308' },
  { name: 'Éolien', value: 890, color: '#0ea5e9' },
  { name: 'Hydro', value: 1540, color: '#06b6d4' },
  { name: 'Gaz', value: 1125, color: '#f97316' },
  { name: 'Vapeur', value: 775, color: '#a855f7' },
];

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de Bord</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Production Totale</h3>
          <p className="text-3xl font-bold text-green-600">5,850 kWh</p>
          <p className="text-sm text-gray-500 mt-1">+12% vs hier</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Consommation</h3>
          <p className="text-3xl font-bold text-orange-600">4,890 kWh</p>
          <p className="text-sm text-gray-500 mt-1">-5% vs hier</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Efficacité</h3>
          <p className="text-3xl font-bold text-blue-600">83.5%</p>
          <p className="text-sm text-gray-500 mt-1">+2.1% vs hier</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Économies CO2</h3>
          <p className="text-3xl font-bold text-green-600">2.4 tonnes</p>
          <p className="text-sm text-gray-500 mt-1">Cette semaine</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Production par Source</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="solar" stroke="#eab308" strokeWidth={2} />
                <Line type="monotone" dataKey="wind" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="hydro" stroke="#06b6d4" strokeWidth={2} />
                <Line type="monotone" dataKey="gas" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="steam" stroke="#a855f7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des Sources</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Source Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Sun, title: 'Solaire', value: '1,520 kWh', color: 'text-yellow-500', bg: 'bg-yellow-50' },
          { icon: Wind, title: 'Éolien', value: '890 kWh', color: 'text-blue-500', bg: 'bg-blue-50' },
          { icon: Droplet, title: 'Hydroélectrique', value: '1,540 kWh', color: 'text-cyan-500', bg: 'bg-cyan-50' },
          { icon: Flame, title: 'Gaz', value: '1,125 kWh', color: 'text-orange-500', bg: 'bg-orange-50' },
          { icon: Power, title: 'Cycle à Vapeur', value: '775 kWh', color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((source, index) => (
          <div key={index} className={`${source.bg} p-6 rounded-xl`}>
            <div className="flex items-center mb-4">
              <source.icon className={`h-8 w-8 ${source.color} mr-3`} />
              <h3 className="text-lg font-semibold text-gray-900">{source.title}</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{source.value}</p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div
                className={`h-2 rounded-full ${source.color.replace('text', 'bg')}`}
                style={{ width: `${(parseInt(source.value) / 1540) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;