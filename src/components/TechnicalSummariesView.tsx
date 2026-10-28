import { useState } from 'react';
import { TechnicalSummary, NormaCode, ValidationStatus } from '../data/types';
import { StatusBadge } from './StatusBadge';
import { ChevronDown, ChevronUp, BookOpen, Layers, Check, ExternalLink } from 'lucide-react';

interface TechnicalSummariesViewProps {
  summaries: TechnicalSummary[];
  selectedNorma: NormaCode | 'ALL';
  searchQuery: string;
  validationFilter: ValidationStatus | 'ALL';
}

export function TechnicalSummariesView({
  summaries,
  selectedNorma,
  searchQuery,
  validationFilter,
}: TechnicalSummariesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(summaries[0]?.id || null);

  const categories = [
    'ALL',
    'Afastamentos',
    'Posteamento',
    'Telecom',
    'Cálculo de Queda',
    'Geração Distribuída',
    'Condutores',
  ];

  // Filter logic
  const filteredSummaries = summaries.filter((item) => {
    // Norma filter
    if (selectedNorma !== 'ALL' && item.norma !== selectedNorma) {
      return false;
    }
    // Validation status filter
    if (validationFilter !== 'ALL' && item.status !== validationFilter) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchRef = item.officialReference.toLowerCase().includes(q);
      const matchParam = item.parameters.some(
        (p) => p.parameter.toLowerCase().includes(q) || p.value.toLowerCase().includes(q)
      );
      if (!matchTitle && !matchSummary && !matchRef && !matchParam) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Category selector row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Resumos Técnicos & Caderno de Dimensionamento
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tabelas paramétricas, gabaritos de projeto e referências oficiais por norma CEMIG.
          </p>
        </div>

        {/* Count indicator */}
        <div className="text-xs text-slate-600 font-mono">
          <span className="font-semibold text-slate-900 tabular-nums">{filteredSummaries.length}</span> fichas técnicas encontradas
        </div>
      </div>

      {/* Segmented Category Filter */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-white text-slate-950 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'ALL' ? 'Todas as Categorias' : cat}
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredSummaries.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-lg p-10 text-center">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-800">Nenhum resumo técnico atende aos filtros atuais</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Tente remover os filtros de norma ou validação técnica para expandir os resultados de busca.
          </p>
        </div>
      )}

      {/* Summaries Accordion List */}
      <div className="space-y-4">
        {filteredSummaries.map((summary) => {
          const isExpanded = expandedId === summary.id;

          return (
            <article
              key={summary.id}
              className={`bg-white border transition-all rounded-lg overflow-hidden ${
                isExpanded
                  ? 'border-slate-300 shadow-sm ring-1 ring-slate-200'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header clickable */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : summary.id)}
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 bg-slate-100 text-slate-800 rounded">
                      {summary.norma}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {summary.category}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <StatusBadge status={summary.status} />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                    {summary.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {summary.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    {summary.officialReference}
                  </span>
                  <div className="p-1.5 rounded-md bg-slate-100 text-slate-600">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Detailed Content */}
              {isExpanded && (
                <div className="border-t border-slate-100 px-5 pb-6 pt-4 bg-slate-50/50 space-y-5">
                  
                  {/* Official Citation Box */}
                  <div className="bg-white border border-slate-200 rounded-md p-4">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-800" />
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                          Referência Formal na Norma CEMIG
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-500">
                        {summary.officialReference}
                      </span>
                    </div>
                    <blockquote className="text-xs text-slate-700 italic leading-relaxed">
                      "{summary.officialCitation}"
                    </blockquote>
                    <div className="mt-2 text-[11px] text-slate-400 font-mono">
                      Vigência documental: {summary.lastReviewDate}
                    </div>
                  </div>

                  {/* Illustrative Notes if any */}
                  {summary.illustrativeNotes && (
                    <div className={`p-4 rounded-md border text-xs leading-relaxed ${
                      summary.status === 'OFICIAL_VALIDADO'
                        ? 'bg-blue-50/60 border-blue-200 text-slate-800'
                        : summary.status === 'EM_VALIDACAO'
                        ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                        : 'bg-slate-100 border-slate-200 text-slate-800'
                    }`}>
                      <div className="flex items-center gap-2 font-bold mb-1 uppercase tracking-tight text-[11px]">
                        <span>Nota Ilustrativa & Prática de Aplicação em Campo</span>
                      </div>
                      <p>{summary.illustrativeNotes}</p>
                    </div>
                  )}

                  {/* Dimensioning / Parameter Table */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-slate-500" />
                      <span>Tabela de Parâmetros e Valores de Projeto</span>
                    </h4>

                    <div className="overflow-x-auto rounded-md border border-slate-200 bg-white shadow-2xs">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                            <th className="py-2.5 px-3">Parâmetro de Projeto</th>
                            <th className="py-2.5 px-3">Valor Normativo</th>
                            <th className="py-2.5 px-3">Critério / Tolerância</th>
                            <th className="py-2.5 px-3 text-right">Classificação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {summary.parameters.map((param, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-2.5 px-3 font-medium text-slate-900">
                                {param.parameter}
                              </td>
                              <td className="py-2.5 px-3 font-mono font-bold text-slate-800 tabular-nums">
                                {param.value}
                              </td>
                              <td className="py-2.5 px-3 text-slate-600">
                                {param.toleranceOrRule}
                              </td>
                              <td className="py-2.5 px-3 text-right">
                                {param.isOfficial ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-semibold">
                                    <Check className="w-3 h-3 text-emerald-700" />
                                    Oficial
                                  </span>
                                ) : (
                                  <span className="text-[11px] text-blue-700 font-medium">
                                    Ilustrativo
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Practical Tips */}
                  {summary.practicalTips.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Dicas Práticas para Aprovação Rápida no APR
                      </h4>
                      <ul className="space-y-1.5">
                        {summary.practicalTips.map((tip, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                            <span className="text-emerald-700 font-bold mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              )}
            </article>
          );
        })}
      </div>

    </div>
  );
}
