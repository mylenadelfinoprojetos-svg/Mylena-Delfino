import { useState } from 'react';
import { ChecklistItem, NormaCode, ValidationStatus } from '../data/types';
import { StatusBadge } from './StatusBadge';
import { CheckSquare, Square, Download, RotateCcw, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

interface ChecklistsViewProps {
  initialItems: ChecklistItem[];
  selectedNorma: NormaCode | 'ALL';
}

export function ChecklistsView({ initialItems, selectedNorma }: ChecklistsViewProps) {
  const [items, setItems] = useState<Array<ChecklistItem & { completed: boolean; note: string }>>(
    initialItems.map((item) => ({ ...item, completed: false, note: '' }))
  );
  const [statusFilter, setStatusFilter] = useState<ValidationStatus | 'ALL'>('ALL');
  const [projectTitle, setProjectTitle] = useState<string>('Extensão de Rede MT/BT - Bairro Primavera');
  const [engineerName, setEngineerName] = useState<string>('Eng. Projetista');
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Toggle item completion
  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  // Update item custom note
  const updateNote = (id: string, note: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  // Reset checklist
  const handleReset = () => {
    if (window.confirm('Deseja realmente limpar todos os itens marcados neste checklist?')) {
      setItems((prev) => prev.map((item) => ({ ...item, completed: false, note: '' })));
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    if (selectedNorma !== 'ALL' && item.norma !== selectedNorma) return false;
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    return true;
  });

  const totalFiltered = filteredItems.length;
  const completedFiltered = filteredItems.filter((i) => i.completed).length;
  const percentage = totalFiltered > 0 ? Math.round((completedFiltered / totalFiltered) * 100) : 0;

  // Official items only readiness:
  const officialItems = items.filter((i) => i.status === 'OFICIAL_VALIDADO');
  const officialCompleted = officialItems.filter((i) => i.completed).length;
  const officialPercentage = officialItems.length > 0 ? Math.round((officialCompleted / officialItems.length) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Readiness Meter */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 lg:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckSquare className="w-5 h-5 text-emerald-800 shrink-0" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Checklist Interativo de Pré-Submissão CEMIG APR
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Roteiro de inspeção prévia de pranchas, memoriais descritivos e arquivos DWG antes do protocolo no WebProjetos.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>

            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Laudo</span>
            </button>
          </div>
        </div>

        {/* Project Meta Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 pb-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Identificação do Projeto / Obra:
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="w-full text-xs py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
              Responsável Técnico (CREA / CFT):
            </label>
            <input
              type="text"
              value={engineerName}
              onChange={(e) => setEngineerName(e.target.value)}
              className="w-full text-xs py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-md text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
            />
          </div>
        </div>

        {/* Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">
                Conformidade com Critérios Oficiais Mandatórios:
              </span>
              <span className="font-mono font-bold text-emerald-800 tabular-nums">
                {officialCompleted}/{officialItems.length} ({officialPercentage}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  officialPercentage === 100 ? 'bg-emerald-600' : 'bg-emerald-700'
                }`}
                style={{ width: `${officialPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {officialPercentage === 100
                ? '✓ Todos os critérios obrigatórios verificados. Risco de reprovação no APR minimizado.'
                : 'Atenção: pendências em normas oficiais geram exigência técnica formal no portal CEMIG.'}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">
                Progresso Geral do Checklist Filtrado:
              </span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {completedFiltered}/{totalFiltered} ({percentage}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-800 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Inclui orientações de campo e critérios complementares.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs for Status */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto no-scrollbar">
        {[
          { id: 'ALL', label: 'Todos os Itens' },
          { id: 'OFICIAL_VALIDADO', label: 'Critérios Oficiais Obrigatórios' },
          { id: 'ILUSTRATIVO_RECOMENDADO', label: 'Práticas Ilustrativas de Campo' },
          { id: 'EM_VALIDACAO', label: 'Em Validação Técnica' },
        ].map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Checklist Items List */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white border rounded-lg p-4 transition-all ${
              item.completed
                ? 'border-emerald-200 bg-emerald-50/20 shadow-2xs'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className="mt-0.5 text-slate-400 hover:text-slate-600 shrink-0"
              >
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-emerald-700" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded">
                    {item.norma}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {item.category}
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <StatusBadge status={item.status} />
                </div>

                <p
                  className={`text-sm font-semibold transition-all leading-snug ${
                    item.completed ? 'text-slate-500 line-through' : 'text-slate-900'
                  }`}
                >
                  {item.requirement}
                </p>

                <p className="text-xs text-slate-600 mt-1">
                  <strong className="text-slate-700">Dica de Verificação:</strong> {item.verificationTip}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-100">
                  <span className="text-xs font-mono text-slate-400">
                    Ref: {item.normaRef}
                  </span>

                  {/* Note Input */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Adicionar anotação (ex: Folha 02/05, Poste 14...)"
                      value={item.note || ''}
                      onChange={(e) => updateNote(item.id, e.target.value)}
                      className="text-xs py-1 px-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 placeholder:text-slate-400 w-full sm:w-64 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Export / Report Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-300 rounded-lg max-w-2xl w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Laudo de Conformidade de Projeto CEMIG (Checklist APR)
                </h3>
                <p className="text-xs text-slate-500">
                  Resumo executivo de pré-validação técnica de normas de distribuição.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-md border border-slate-200 grid grid-cols-2 gap-2">
                <div><strong>Obra / Projeto:</strong> {projectTitle}</div>
                <div><strong>Projetista:</strong> {engineerName}</div>
                <div><strong>Data de Emissão:</strong> {new Date().toLocaleDateString('pt-BR')}</div>
                <div><strong>Índice de Prontidão Oficial:</strong> {officialPercentage}%</div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1">Status dos Itens Obrigatórios Oficiais:</h4>
                <ul className="divide-y divide-slate-100 border border-slate-200 rounded-md">
                  {officialItems.map((item) => (
                    <li key={item.id} className="p-2 flex items-center justify-between gap-2">
                      <span className={item.completed ? 'text-slate-800' : 'text-red-700 font-semibold'}>
                        {item.completed ? '✓ ' : '✗ PENDENTE: '}{item.requirement}
                      </span>
                      <span className="font-mono text-slate-400 shrink-0">{item.norma}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-md">
                <strong>Declaração do Projetista:</strong> O projeto atesta observância aos parâmetros das normas CEMIG ND 2.1, ND 2.2, ND 2.9, ND 3.1 e ND 9.3 para fins de protocolo no sistema WebProjetos.
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-md"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md shadow-xs"
              >
                Imprimir / Salvar PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
