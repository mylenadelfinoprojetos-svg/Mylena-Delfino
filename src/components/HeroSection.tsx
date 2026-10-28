import { Search, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { NormaCode } from '../data/types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedNorma: NormaCode | 'ALL';
  onSelectNorma: (norma: NormaCode | 'ALL') => void;
  onNavigateToTab: (tabId: string) => void;
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  selectedNorma,
  onSelectNorma,
  onNavigateToTab,
}: HeroSectionProps) {
  const normaButtons: Array<{ code: NormaCode; label: string; desc: string }> = [
    { code: 'ND-2.1', label: 'ND 2.1', desc: 'Redes Aéreas Urbanas' },
    { code: 'ND-2.2', label: 'ND 2.2', desc: 'Redes Rurais & MRT' },
    { code: 'ND-2.9', label: 'ND 2.9', desc: 'Uso Mútuo Telecom' },
    { code: 'ND-3.1', label: 'ND 3.1', desc: 'Planejamento & Queda' },
    { code: 'ND-9.3', label: 'ND 9.3', desc: 'Geração Distribuída GD' },
  ];

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Text & Search & Fast Filters */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Quiet text kicker with typographic separator */}
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-3">
              <span>Engenharia de Distribuição</span>
              <span aria-hidden="true">·</span>
              <span>Padrões Técnicos CEMIG</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-semibold">Atualizado 2026</span>
            </div>

            {/* Display Headline with balanced text */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance mb-4">
              Portal Técnico Unificado para Projetistas de Redes CEMIG
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-2xl mb-6">
              Consulte resumos executivos, tabelas de afastamentos, cálculos de queda de tensão, checklists de pré-submissão e evite reprovações no sistema APR com distinção inequívoca entre critérios oficiais homologados e sugestões práticas de campo.
            </p>

            {/* Live Search by Subject / Term */}
            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Busque por assunto: 'afastamento sacada', 'poste 10m', 'queda 5%', 'inversor GD', 'telecom 50cm'..."
                className="w-full pl-11 pr-24 py-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent focus:bg-white transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-2 px-3 flex items-center text-xs text-slate-400 hover:text-slate-700"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Normas Filter Buttons (Segmented Controls) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Filtro Direto por Norma (ND):
                </span>
                {selectedNorma !== 'ALL' && (
                  <button
                    type="button"
                    onClick={() => onSelectNorma('ALL')}
                    className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                  >
                    Exibir todas as normas
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => onSelectNorma('ALL')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    selectedNorma === 'ALL'
                      ? 'bg-white text-slate-950 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Todas as NDs
                </button>
                {normaButtons.map((norma) => {
                  const isActive = selectedNorma === norma.code;
                  return (
                    <button
                      key={norma.code}
                      type="button"
                      onClick={() => onSelectNorma(isActive ? 'ALL' : norma.code)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`}
                      title={norma.desc}
                    >
                      {norma.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick action buttons to views */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onNavigateToTab('checklists')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Checklist de Pré-Submissão APR</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('erros')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors"
              >
                <span>Catálogo de Erros Frequentes</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('quizzes')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors"
              >
                <span>Quizzes de Certificação</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset + Highlights */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900 h-64 lg:h-full min-h-[280px] shadow-xs group">
              <img
                src="/src/assets/images/hero_redes_distribuicao_1793147209575.jpg"
                alt="Infraestrutura de Rede Aérea de Distribuição Elétrica Urbana com Postes de Concreto e Transformadores"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-5">
                <div className="inline-flex items-center gap-2 text-xs text-emerald-300 font-mono mb-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Padronização 13,8 kV / 34,5 kV / BT Multiplex</span>
                </div>
                <h3 className="text-white text-base font-semibold leading-snug">
                  Conformidade Rigorosa com Caderno de Desenhos CEMIG
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Estruturas N1 a N4, engaste regulamentar e = L/10 + 0,60m e proteção seletiva de transformadores.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
