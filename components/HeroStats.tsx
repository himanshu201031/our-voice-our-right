
import React from 'react';
import type { DistrictData } from '../types';
import { HouseholdIcon, RupeeIcon, WorkerIcon } from './icons';
import { useLocalization } from '../App';

interface Props {
  data: DistrictData;
}

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <div className={`p-4 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm md:text-base">{label}</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const HeroStats: React.FC<Props> = ({ data }) => {
    const { t } = useLocalization();

    const stats = [
        {
            icon: <HouseholdIcon />,
            label: t('heroHouseholds'),
            value: data.totalHouseholds.toLocaleString('en-IN'),
            color: 'bg-blue-100',
        },
        {
            icon: <WorkerIcon />,
            label: t('heroWorkers'),
            value: data.totalWorkers.toLocaleString('en-IN'),
            color: 'bg-green-100',
        },
        {
            icon: <RupeeIcon />,
            label: t('heroFunds'),
            value: `₹${data.totalFundsUsed.toLocaleString('en-IN')}`,
            color: 'bg-orange-100',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(stat => (
                <StatCard key={stat.label} {...stat} />
            ))}
        </div>
    );
};

export default HeroStats;
