
import React, { useState } from 'react';
import type { MonthlyData } from '../types';
import { useLocalization } from '../App';

interface Props {
  data: MonthlyData[];
}

// Access Recharts from the global window object
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = (window as any).Recharts;

// Custom Tooltip component for a richer display
const CustomTooltip = ({ active, payload, label, t }: any) => {
    if (active && payload && payload.length) {
        const districtData = payload.find((p: any) => p.dataKey === 'districtValue');
        const stateData = payload.find((p: any) => p.dataKey === 'stateValue');

        return (
            <div className="bg-white/90 p-3 border border-gray-200 rounded-lg shadow-md">
                <p className="font-bold text-gray-800 mb-2">{label}</p>
                {districtData && !districtData.payload.hide && (
                    <p style={{ color: districtData.stroke }}>
                        {`${t('district')}: ${districtData.value.toLocaleString('en-IN')}`}
                    </p>
                )}
                {stateData && !stateData.payload.hide && (
                    <p style={{ color: stateData.stroke }}>
                        {`${t('stateAverage')}: ${stateData.value.toLocaleString('en-IN')}`}
                    </p>
                )}
            </div>
        );
    }
    return null;
};


const PerformanceChart: React.FC<Props> = ({ data }) => {
  const { t, language } = useLocalization();
  const [visibility, setVisibility] = useState({
    districtValue: true,
    stateValue: true,
  });

  const chartData = data.map(d => ({...d, month: language === 'hi' ? d.monthHi : d.month}));

  if (!LineChart) {
    return <div>Loading chart library...</div>;
  }

  // Toggle visibility on legend click
  const handleLegendClick = (e: any) => {
    const { dataKey } = e;
    setVisibility(prev => ({ ...prev, [dataKey]: !prev[dataKey] }));
  };

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
            <Tooltip content={<CustomTooltip t={t} />} />
            <Legend onClick={handleLegendClick} wrapperStyle={{ cursor: 'pointer' }} />
            <Line 
                hide={!visibility.districtValue} 
                type="monotone" 
                dataKey="districtValue" 
                name={t('district')} 
                stroke="#0A6EBD" 
                strokeWidth={3}
                activeDot={{ r: 6 }}
            />
            <Line 
                hide={!visibility.stateValue}
                type="monotone" 
                dataKey="stateValue" 
                name={t('stateAverage')} 
                stroke="#F39C12" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
