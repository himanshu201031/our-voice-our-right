
import React from 'react';
import type { DistrictData } from '../types';
import HeroStats from './HeroStats';
import PerformanceChart from './PerformanceChart';
import Insights from './Insights';
import { useLocalization } from '../App';

interface Props {
  data: DistrictData;
  isOffline: boolean;
}

const Dashboard: React.FC<Props> = ({ data, isOffline }) => {
    const { t } = useLocalization();
    const lastUpdatedDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

  return (
    <div className="space-y-8 animate-fade-in">
        {isOffline && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md shadow-sm" role="alert">
                <p className="font-bold">{t('offlineModeTitle')}</p>
                <p className="text-sm">{t('offlineModeMessage')}</p>
            </div>
        )}
        <div className="text-right text-gray-500 italic">
            {t('lastUpdated')}: {lastUpdatedDate}
        </div>
      <HeroStats data={data} />
      <PerformanceChart data={data.monthlyPerformance} />
      <Insights data={data} />
    </div>
  );
};

// Simple fade-in animation for dashboard loading
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
`;
document.head.appendChild(style);


export default Dashboard;