import { useState } from 'react';
import { NormativeReference, NormaCode } from '../data/types';
import { FileText, Calendar, CheckCircle2, Download, Layers, ExternalLink } from 'lucide-react';

interface NormasReferencesViewProps {
  normas: NormativeReference[];
  selectedNorma: NormaCode | 'ALL';
  onSelectNorma: (norma: NormaCode | 'ALL') => void;
}

export function NormasReferencesView({ normas, selectedNorma, onSelectNorma }: NormasReferencesViewProps) {
  const [selectedDocId, setSelectedDocId] = useState<string>(normas[0]?.id || '');

  const filteredNormas = selectedNorma === 'ALL'
    ? normas
    : normas.filter((n) => n.code === selectedNorma);

  const activeDoc = normas.find((n) => n.id === selectedDocId) || filteredNormas[0] || normas[0];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Catálogo Oficial de Normas de Distribuição CEMIG (NDs)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Documentação técnica com controle de versões vigentes, capítulos normativos e cadernos de desenhos padrão.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left List of Normas */}
        <div className="lg:col-span-5 space-y-3">
          {normas.map((item) => {
            const isSelected = activeDoc?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedDocId(item.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-emerald-700 bg-white shadow-xs ring-1 ring-emerald-700'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-900 rounded">
                    {item.code}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    {item.currentEdition}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {item.shortDescription}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Vigência: {item.effectiveDate}</span>
                  <span className="text-emerald-700 font-medium">Ver capítulos →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        {activeDoc && (
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-6">
            
            {/* Top metadata */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
                  {activeDoc.code}
                </span>
                <span className="text-xs text-emerald-800 font-semibold">
                  {activeDoc.currentEdition}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Publicação em {activeDoc.effectiveDate}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {activeDoc.title}
              </h3>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {activeDoc.shortDescription}
              </p>
            </div>

            {/* Scope Box */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Campo de Aplicação & Abrangência
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeDoc.scope}
              </p>
            </div>

            {/* Main Chapters */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-800" />
                <span>Principais Capítulos Normativos</span>
              </h4>

              <div className="space-y-3">
                {activeDoc.mainChapters.map((ch, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-md">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1.5">
                      <span className="font-mono text-emerald-800 font-semibold">{ch.chapter}:</span>
                      <span>{ch.title}</span>
                    </div>
                    <ul className="space-y-1">
                      {ch.keyPoints.map((kp, kIdx) => (
                        <li key={kIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-slate-400 mt-0.5">•</span>
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Standard Drawings Table */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-500" />
                <span>Desenhos Padrão de Engenharia CEMIG</span>
              </h4>

              <div className="border border-slate-200 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                    <tr>
                      <th className="py-2 px-3 font-semibold">Código do Desenho</th>
                      <th className="py-2 px-3 font-semibold">Título do Padrão Construtivo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeDoc.standardDrawings.map((draw, dIdx) => (
                      <tr key={dIdx} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                          {draw.code}
                        </td>
                        <td className="py-2 px-3 text-slate-700">
                          <div className="font-medium text-slate-900">{draw.title}</div>
                          <div className="text-[11px] text-slate-500">{draw.description}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Download advice */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span>Para obter arquivos DWG editáveis e caderno completo, acesse o Portal de Fornecedores CEMIG.</span>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
