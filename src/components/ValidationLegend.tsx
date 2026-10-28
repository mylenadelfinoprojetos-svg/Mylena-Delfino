import { ShieldCheck, Compass, AlertCircle, Info } from 'lucide-react';
import { ValidationStatus } from '../data/types';

interface ValidationLegendProps {
  currentFilter?: ValidationStatus | 'ALL';
  onFilterChange?: (status: ValidationStatus | 'ALL') => void;
}

export function ValidationLegend({ currentFilter = 'ALL', onFilterChange }: ValidationLegendProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-500 shrink-0" />
          <h4 className="text-sm font-semibold text-slate-900 tracking-tight">
            Classificação Normativa & Validação Técnica CEMIG
          </h4>
        </div>
        <p className="text-xs text-slate-500">
          Identificação visual de conformidade para evitar reprovações no sistema APR / WebProjetos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3">
        {/* Oficial */}
        <button
          type="button"
          onClick={() => onFilterChange && onFilterChange(currentFilter === 'OFICIAL_VALIDADO' ? 'ALL' : 'OFICIAL_VALIDADO')}
          className={`text-left p-3 rounded-md border transition-all ${
            currentFilter === 'OFICIAL_VALIDADO'
              ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
              : 'border-slate-100 bg-slate-50/60 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-tight">Critério Oficial Validado</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Prescrição mandatória das normas vigentes da CEMIG (NDs). O descumprimento gera <strong>reprovação imediata</strong> no APR.
          </p>
          <div className="mt-2 text-[11px] text-emerald-800 font-medium">
            Exigibilidade: 100% Obrigatória
          </div>
        </button>

        {/* Ilustrativo */}
        <button
          type="button"
          onClick={() => onFilterChange && onFilterChange(currentFilter === 'ILUSTRATIVO_RECOMENDADO' ? 'ALL' : 'ILUSTRATIVO_RECOMENDADO')}
          className={`text-left p-3 rounded-md border transition-all ${
            currentFilter === 'ILUSTRATIVO_RECOMENDADO'
              ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
              : 'border-slate-100 bg-slate-50/60 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-4 h-4 text-blue-700 shrink-0" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-tight">Conteúdo Ilustrativo</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Boas práticas de campo, métodos executivos e notas de prancha para acelerar aprovações e execução de obras.
          </p>
          <div className="mt-2 text-[11px] text-blue-800 font-medium">
            Exigibilidade: Guia Orientativo de Apoio
          </div>
        </button>

        {/* Em Validação */}
        <button
          type="button"
          onClick={() => onFilterChange && onFilterChange(currentFilter === 'EM_VALIDACAO' ? 'ALL' : 'EM_VALIDACAO')}
          className={`text-left p-3 rounded-md border transition-all ${
            currentFilter === 'EM_VALIDACAO'
              ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
              : 'border-slate-100 bg-slate-50/60 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-tight">Em Validação Técnica</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Critérios em consulta pública ou em teste de homologação. Requerem consulta prévia ao analista regional.
          </p>
          <div className="mt-2 text-[11px] text-amber-800 font-medium">
            Exigibilidade: Sob Análise de Comitê
          </div>
        </button>
      </div>

      {currentFilter !== 'ALL' && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-600">
            Filtrando visualização por status selecionado acima.
          </span>
          <button
            type="button"
            onClick={() => onFilterChange && onFilterChange('ALL')}
            className="text-emerald-700 hover:text-emerald-800 font-semibold underline underline-offset-2"
          >
            Limpar filtro de validação (Ver todos)
          </button>
        </div>
      )}
    </div>
  );
}
