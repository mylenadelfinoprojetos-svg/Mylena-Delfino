import { ShieldCheck, Compass, AlertCircle } from 'lucide-react';
import { ValidationStatus } from '../data/types';

interface StatusBadgeProps {
  status: ValidationStatus;
  size?: 'sm' | 'md';
  showDescription?: boolean;
}

export function StatusBadge({ status, size = 'sm', showDescription = false }: StatusBadgeProps) {
  if (status === 'OFICIAL_VALIDADO') {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800">
        <ShieldCheck className={size === 'sm' ? 'w-3.5 h-3.5 text-emerald-700 shrink-0' : 'w-4 h-4 text-emerald-700 shrink-0'} />
        <span className="font-semibold tracking-tight uppercase text-[11px]">Critério Oficial CEMIG</span>
        {showDescription && (
          <span className="text-slate-500 font-normal hidden sm:inline">· Norma vigente e homologada no APR</span>
        )}
      </div>
    );
  }

  if (status === 'ILUSTRATIVO_RECOMENDADO') {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-blue-800">
        <Compass className={size === 'sm' ? 'w-3.5 h-3.5 text-blue-700 shrink-0' : 'w-4 h-4 text-blue-700 shrink-0'} />
        <span className="font-semibold tracking-tight uppercase text-[11px]">Conteúdo Ilustrativo</span>
        {showDescription && (
          <span className="text-slate-500 font-normal hidden sm:inline">· Prática recomendada em campo (não mandatório)</span>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-amber-900">
      <AlertCircle className={size === 'sm' ? 'w-3.5 h-3.5 text-amber-700 shrink-0' : 'w-4 h-4 text-amber-700 shrink-0'} />
      <span className="font-semibold tracking-tight uppercase text-[11px]">Em Validação Técnica</span>
      {showDescription && (
        <span className="text-slate-500 font-normal hidden sm:inline">· Consulta interna / minuta não homologada</span>
      )}
    </div>
  );
}
