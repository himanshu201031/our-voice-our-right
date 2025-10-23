
import React from 'react';
import type { MonthlyData } from '../types';
import { useLocalization } from '../App';

interface Props {
  data: MonthlyData[];
}

// Access Recharts from the global window object
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = (window as any).Recharts;

const PerformanceChart: React.FC<Props> = ({ data }) => {
  const { t, language } = useLocalization();
  const chartData = data.map(d => ({...d, month: language === 'hi' ? d.monthHi : d.month}));

  if (!LineChart) {
    return <div>Loading chart library...</div>;
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{t('monthlyPerformance')}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => new Intl.NumberFormat('en-IN', { notation: 'compact' }).format(value as number)}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="districtValue" name={t('district')} stroke="#0A6EBD" strokeWidth={3} />
            <Line type="monotone" dataKey="stateValue" name={t('stateAverage')} stroke="#F39C12" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
