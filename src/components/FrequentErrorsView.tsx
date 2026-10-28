import { useState } from 'react';
import { FrequentError, NormaCode, ValidationStatus } from '../data/types';
import { StatusBadge } from './StatusBadge';
import { AlertTriangle, CheckCircle, HelpCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FrequentErrorsViewProps {
  errors: FrequentError[];
  selectedNorma: NormaCode | 'ALL';
  searchQuery: string;
}

export function FrequentErrorsView({
  errors,
  selectedNorma,
  searchQuery,
}: FrequentErrorsViewProps) {
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'CRITICO_REPROVA' | 'ALTO_RISCO'>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(errors[0]?.id || null);

  const filteredErrors = errors.filter((err) => {
    if (selectedNorma !== 'ALL' && err.norma !== selectedNorma) return false;
    if (severityFilter !== 'ALL' && err.severity !== severityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = err.title.toLowerCase().includes(q);
      const matchDesc = err.description.toLowerCase().includes(q);
      const matchWhy = err.whyCemigRejects.toLowerCase().includes(q);
      const matchHow = err.howToSolve.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchWhy && !matchHow) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Catálogo de Erros Frequentes & Reprovações no APR CEMIG
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Diagnóstico dos principais motivos de devolução de projetos elétricos no WebProjetos e diretrizes de saneamento.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSeverityFilter('ALL')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              severityFilter === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs font-semibold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos ({errors.length})
          </button>
          <button
            type="button"
            onClick={() => setSeverityFilter('CRITICO_REPROVA')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              severityFilter === 'CRITICO_REPROVA'
                ? 'bg-red-800 text-white shadow-xs font-semibold'
                : 'bg-red-50 text-red-800 hover:bg-red-100'
            }`}
          >
            Reprovação Imediata
          </button>
        </div>
      </div>

      {/* List of Frequent Errors */}
      <div className="space-y-4">
        {filteredErrors.map((item) => {
          const isExpanded = expandedId === item.id;
          const isCritical = item.severity === 'CRITICO_REPROVA';

          return (
            <article
              key={item.id}
              className={`bg-white border transition-all rounded-lg overflow-hidden ${
                isExpanded ? 'border-slate-300 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-4 select-none"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded">
                      {item.norma}
                    </span>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isCritical ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isCritical ? 'Reprovação Imediata no APR' : 'Alto Risco de Exigência'}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500 font-medium">{item.category}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-start">
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    {item.normaItemRef}
                  </span>
                  <div className="p-1.5 rounded-md bg-slate-100 text-slate-600">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-slate-100 p-5 bg-slate-50/60 space-y-4">
                  
                  {/* Two Column Grid: Error vs Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Why CEMIG rejects */}
                    <div className="bg-white border border-red-200 rounded-md p-4">
                      <div className="flex items-center gap-2 mb-2 text-red-800 font-bold text-xs uppercase tracking-tight">
                        <XCircle className="w-4 h-4 shrink-0 text-red-600" />
                        <span>Por que o Sistema APR CEMIG Reprova</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.whyCemigRejects}
                      </p>
                      <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-red-700 font-mono">
                        Infração: {item.normaItemRef}
                      </div>
                    </div>

                    {/* How to solve */}
                    <div className="bg-white border border-emerald-200 rounded-md p-4">
                      <div className="flex items-center gap-2 mb-2 text-emerald-800 font-bold text-xs uppercase tracking-tight">
                        <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span>Como Adequar o Projeto Corretamente</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.howToSolve}
                      </p>
                      <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-mono font-medium">
                        Solução 100% Homologada pela Engenharia CEMIG
                      </div>
                    </div>

                  </div>

                  {/* Real World Scenario Case Study */}
                  <div className="bg-white border border-slate-200 rounded-md p-4">
                    <div className="flex items-center gap-2 mb-1.5 text-slate-800 font-bold text-xs uppercase tracking-wider">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Exemplo Real Ocorrido em Análise de Projeto</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{item.exampleScenario}"
                    </p>
                  </div>

                  {/* Classification notice */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                    <StatusBadge status={item.status} showDescription={true} />
                    <span className="font-mono">{item.normaItemRef}</span>
                  </div>

                </div>
              )}
            </article>
          );
        })}
      </div>

    </div>
  );
}
