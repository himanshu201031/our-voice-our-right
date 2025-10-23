
import React from 'react';
import type { DistrictData } from '../types';
import HeroStats from './HeroStats';
import PerformanceChart from './PerformanceChart';
import Insights from './Insights';
import { useLocalization } from '../App';

interface Props {
  data: DistrictData;
}

const Dashboard: React.FC<Props> = ({ data }) => {
    const { t } = useLocalization();
    const lastUpdatedDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

  return (
    <div className="space-y-8 animate-fade-in">
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
