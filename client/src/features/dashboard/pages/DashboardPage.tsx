import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth.ts';
import dashboardService, {
  InvestigatorDashboardData,
  FiscalDashboardData,
} from '../services/dashboard.service.ts';
import { InvestigatorDashboard } from '../components/InvestigatorDashboard.tsx';
import { FiscalDashboard } from '../components/FiscalDashboard.tsx';

export const DashboardPage: React.FC = () => {
  const { role } = useAuth();
  const [investigatorData, setInvestigatorData] = useState<InvestigatorDashboardData | null>(null);
  const [fiscalData, setFiscalData] = useState<FiscalDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (role === 'INVESTIGADOR') {
        const data = await dashboardService.getInvestigatorDashboard();
        setInvestigatorData(data);
      } else {
        const data = await dashboardService.getFiscalDashboard();
        setFiscalData(data);
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar datos del dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [role]);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center text-sm text-[#120B8F]">
        <div className="w-5 h-5 rounded-full border-2 border-[#5087F7] border-t-transparent animate-spin mr-2" />
        <span>Cargando panel institucional...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-rose-300 rounded-3xl p-8 max-w-lg mx-auto text-center space-y-2 shadow-sm">
        <h3 className="font-bold text-sm text-rose-600">Error en el dashboard</h3>
        <p className="text-xs text-[#120B8F]/70">{error}</p>
      </div>
    );
  }

  if (role === 'INVESTIGADOR' && investigatorData) {
    return <InvestigatorDashboard data={investigatorData} onRefresh={fetchDashboard} />;
  }

  if (role === 'FISCAL' && fiscalData) {
    return <FiscalDashboard data={fiscalData} />;
  }

  return null;
};

export default DashboardPage;
