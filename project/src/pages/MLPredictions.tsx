import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Download } from 'lucide-react';

const predictionData = {
  daily: [
    { time: '00:00', solar: 120, wind: 80, hydro: 200, gas: 150, steam: 100 },
    { time: '04:00', solar: 150, wind: 100, hydro: 220, gas: 160, steam: 110 },
    { time: '08:00', solar: 280, wind: 150, hydro: 240, gas: 170, steam: 120 },
    { time: '12:00', solar: 320, wind: 180, hydro: 250, gas: 180, steam: 130 },
    { time: '16:00', solar: 290, wind: 160, hydro: 230, gas: 165, steam: 115 },
    { time: '20:00', solar: 220, wind: 130, hydro: 210, gas: 155, steam: 105 },
    { time: '23:59', solar: 140, wind: 90, hydro: 190, gas: 145, steam: 95 },
  ],
  weekly: [
    { day: 'Lun', solar: 1520, wind: 890, hydro: 1540, gas: 1125, steam: 775 },
    { day: 'Mar', solar: 1480, wind: 920, hydro: 1510, gas: 1145, steam: 795 },
    { day: 'Mer', solar: 1550, wind: 870, hydro: 1580, gas: 1115, steam: 760 },
    { day: 'Jeu', solar: 1490, wind: 900, hydro: 1520, gas: 1135, steam: 785 },
    { day: 'Ven', solar: 1530, wind: 880, hydro: 1560, gas: 1120, steam: 770 },
    { day: 'Sam', solar: 1460, wind: 910, hydro: 1500, gas: 1140, steam: 790 },
    { day: 'Dim', solar: 1510, wind: 895, hydro: 1530, gas: 1130, steam: 780 },
  ],
  yearly: [
    { month: 'Jan', solar: 42000, wind: 28000, hydro: 45000, gas: 35000, steam: 25000 },
    { month: 'Fév', solar: 45000, wind: 29000, hydro: 46000, gas: 34000, steam: 26000 },
    { month: 'Mar', solar: 48000, wind: 30000, hydro: 47000, gas: 36000, steam: 27000 },
    { month: 'Avr', solar: 52000, wind: 31000, hydro: 48000, gas: 35000, steam: 28000 },
    { month: 'Mai', solar: 55000, wind: 32000, hydro: 49000, gas: 37000, steam: 29000 },
    { month: 'Juin', solar: 58000, wind: 33000, hydro: 50000, gas: 36000, steam: 30000 },
    { month: 'Juil', solar: 60000, wind: 34000, hydro: 51000, gas: 38000, steam: 31000 },
    { month: 'Aoû', solar: 59000, wind: 33000, hydro: 50000, gas: 37000, steam: 30000 },
    { month: 'Sep', solar: 56000, wind: 32000, hydro: 49000, gas: 36000, steam: 29000 },
    { month: 'Oct', solar: 52000, wind: 31000, hydro: 48000, gas: 35000, steam: 28000 },
    { month: 'Nov', solar: 48000, wind: 30000, hydro: 47000, gas: 34000, steam: 27000 },
    { month: 'Déc', solar: 44000, wind: 29000, hydro: 46000, gas: 35000, steam: 26000 },
  ],
};

function MLPredictions() {
  const [timeframe, setTimeframe] = useState('daily');
  
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Prédictions Énergétiques', 20, 20);
    
    // Add timestamp
    doc.setFontSize(10);
    doc.text(`Généré le ${new Date().toLocaleString()}`, 20, 30);
    
    // Create table data
    const data = predictionData[timeframe].map(entry => {
      const timeKey = timeframe === 'daily' ? 'time' : timeframe === 'weekly' ? 'day' : 'month';
      return [
        entry[timeKey],
        entry.solar,
        entry.wind,
        entry.hydro,
        entry.gas,
        entry.steam,
      ];
    });
    
    // Add table
    doc.autoTable({
      head: [['Période', 'Solaire', 'Éolien', 'Hydro', 'Gaz', 'Vapeur']],
      body: data,
      startY: 40,
    });
    
    // Save PDF
    doc.save('predictions-energetiques.pdf');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Prédictions ML</h1>
        <button
          onClick={exportToPDF}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="h-5 w-5 mr-2" />
          Exporter en PDF
        </button>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-4 mb-8">
        {[
          { id: 'daily', label: 'Jour Suivant' },
          { id: 'weekly', label: 'Semaine Suivante' },
          { id: 'yearly', label: 'Année Suivante' },
        ].map((range) => (
          <button
            key={range.id}
            onClick={() => setTimeframe(range.id)}
            className={`px-4 py-2 rounded-lg ${
              timeframe === range.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Prediction Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Prédictions de Production par Source
        </h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={predictionData[timeframe]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey={timeframe === 'daily' ? 'time' : timeframe === 'weekly' ? 'day' : 'month'} 
              />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="solar" name="Solaire" stroke="#eab308" strokeWidth={2} />
              <Line type="monotone" dataKey="wind" name="Éolien" stroke="#0ea5e9" strokeWidth={2} />
              <Line type="monotone" dataKey="hydro" name="Hydro" stroke="#06b6d4" strokeWidth={2} />
              <Line type="monotone" dataKey="gas" name="Gaz" stroke="#f97316" strokeWidth={2} />
              <Line type="monotone" dataKey="steam" name="Vapeur" stroke="#a855f7" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Prediction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: 'Production Totale Prévue', value: '15,850 kWh', change: '+8%' },
          { label: 'Efficacité Prévue', value: '87.2%', change: '+3.7%' },
          { label: 'Économies CO2 Prévues', value: '3.2 tonnes', change: '+12%' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold text-green-600">{stat.value}</p>
            <p className="text-sm text-green-500 mt-1">{stat.change} vs période actuelle</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MLPredictions;