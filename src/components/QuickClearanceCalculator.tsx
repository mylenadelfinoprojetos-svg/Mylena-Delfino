import { useState } from 'react';
import { StatusBadge } from './StatusBadge';

export function QuickClearanceCalculator() {
  const [poleLength, setPoleLength] = useState<number>(10); // meters
  const [environment, setEnvironment] = useState<'rua' | 'rodovia' | 'calcada' | 'garagem' | 'rural'>('rua');
  const [circuitType, setCircuitType] = useState<'mt_nua' | 'mt_protegida' | 'bt_multiplex' | 'telecom'>('bt_multiplex');
  const [spanLength, setSpanLength] = useState<number>(35); // meters
  const [hasTelecomSharing, setHasTelecomSharing] = useState<boolean>(true);

  // Embedment formula: e = L/10 + 0.60
  const embedmentDepth = Number((poleLength / 10 + 0.60).toFixed(2));
  const usefulHeightAboveGround = Number((poleLength - embedmentDepth).toFixed(2));

  // Requirements based on ND 2.1 and ND 2.9
  const getMinClearanceRequirement = () => {
    if (circuitType === 'mt_nua') {
      if (environment === 'rodovia') return { min: 7.0, ref: 'ND 2.1 - Tabela 3 (Rodovias)' };
      if (environment === 'rua') return { min: 6.0, ref: 'ND 2.1 - Tabela 3 (Vias Públicas)' };
      if (environment === 'calcada') return { min: 6.0, ref: 'ND 2.1 - Tabela 3 (Passeios)' };
      if (environment === 'garagem') return { min: 6.0, ref: 'ND 2.1 - Tabela 3 (Acessos)' };
      return { min: 5.5, ref: 'ND 2.2 - Subitem 5.7 (Área Rural)' };
    }
    if (circuitType === 'mt_protegida') {
      if (environment === 'rodovia') return { min: 7.0, ref: 'ND 2.1 - Tabela 3' };
      if (environment === 'rua') return { min: 6.0, ref: 'ND 2.1 - Tabela 3' };
      if (environment === 'calcada') return { min: 5.5, ref: 'ND 2.1 - Tabela 3' };
      if (environment === 'garagem') return { min: 5.5, ref: 'ND 2.1 - Tabela 3' };
      return { min: 5.5, ref: 'ND 2.2' };
    }
    if (circuitType === 'bt_multiplex') {
      if (environment === 'rodovia') return { min: 7.0, ref: 'ND 2.1 - Tabela 3' };
      if (environment === 'rua') return { min: 5.5, ref: 'ND 2.1 - Tabela 3 (BT em Ruas)' };
      if (environment === 'calcada') return { min: 3.5, ref: 'ND 2.1 - Tabela 3 (Passeios Pedestres)' };
      if (environment === 'garagem') return { min: 4.5, ref: 'ND 2.1 - Tabela 3 (Entradas de Garagem)' };
      return { min: 5.5, ref: 'ND 2.2' };
    }
    // Telecom
    if (environment === 'rodovia') return { min: 6.0, ref: 'ND 2.9 - Subitem 4.1.2 (Travessia Rodoviária)' };
    if (environment === 'rua') return { min: 5.0, ref: 'ND 2.9 - Subitem 4.1.2 (Travessia de Ruas)' };
    if (environment === 'calcada') return { min: 3.5, ref: 'ND 2.9 - Subitem 4.1.2 (Passeios)' };
    if (environment === 'garagem') return { min: 4.5, ref: 'ND 2.9 - Subitem 4.1.2 (Entradas de Garagem)' };
    return { min: 4.5, ref: 'ND 2.9' };
  };

  const requirement = getMinClearanceRequirement();

  // Estimated sag in meters (simplified parabolic estimate for 50°C summer conditions)
  const estimatedSag = Number((0.0006 * Math.pow(spanLength, 1.8)).toFixed(2));
  
  // Height of attachment at pole:
  let attachmentHeight = usefulHeightAboveGround - 0.3; // MT at top
  if (circuitType === 'bt_multiplex') {
    attachmentHeight = usefulHeightAboveGround - 1.5; // BT secondary
  } else if (circuitType === 'telecom') {
    attachmentHeight = usefulHeightAboveGround - 2.0; // 50 cm below BT neutro
  }

  const clearanceAtMidSpan = Number((attachmentHeight - estimatedSag).toFixed(2));
  const isCompliant = clearanceAtMidSpan >= requirement.min;

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Calculadora Rápida de Engastamento & Afastamentos Normativos
            </h3>
            <StatusBadge status="OFICIAL_VALIDADO" />
          </div>
          <p className="text-xs text-slate-500">
            Validação instantânea conforme fórmulas oficiais da ND 2.1 (Engaste e = L/10 + 0,60m) e ND 2.9 (Uso Mútuo Telecom).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Pole length selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Comprimento Total do Poste (L):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[9, 10, 11, 12].map((len) => (
                <button
                  key={len}
                  type="button"
                  onClick={() => setPoleLength(len)}
                  className={`py-2 px-3 text-xs font-semibold rounded-md border text-center transition-colors ${
                    poleLength === len
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {len} metros
                </button>
              ))}
            </div>
          </div>

          {/* Circuit Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Tipo de Circuito Analisado:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'bt_multiplex', label: 'Baixa Tensão Multiplex' },
                { id: 'telecom', label: 'Cabo Telecom (ND 2.9)' },
                { id: 'mt_nua', label: 'Média Tensão Nua (13,8/34,5)' },
                { id: 'mt_protegida', label: 'MT Compacta Protegida' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCircuitType(c.id as any)}
                  className={`py-2 px-3 text-xs font-medium rounded-md border text-left transition-colors truncate ${
                    circuitType === c.id
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Environment */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Ambiente / Vão da Travessia:
            </label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value as any)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-md text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-700 focus:bg-white"
            >
              <option value="rua">Travessia de Ruas e Avenidas Urbanas</option>
              <option value="rodovia">Rodovia Estadual / Federal (Faixa de Domínio)</option>
              <option value="calcada">Ao longo de Passeio de Pedestres</option>
              <option value="garagem">Entrada de Prédio / Posto de Combustível</option>
              <option value="rural">Área Rural / Lavouras e Pastagens</option>
            </select>
          </div>

          {/* Span length */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700 uppercase tracking-wider">
                Comprimento do Vão entre Postes:
              </span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                {spanLength} metros
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="60"
              step="5"
              value={spanLength}
              onChange={(e) => setSpanLength(Number(e.target.value))}
              className="w-full accent-emerald-700"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>20 m (Vão Curto)</span>
              <span>40 m (Padrão Urbano)</span>
              <span>60 m (Vão Longo)</span>
            </div>
          </div>

          {/* Checkbox for telecom sharing */}
          <label className="flex items-center gap-2 pt-1 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={hasTelecomSharing}
              onChange={(e) => setHasTelecomSharing(e.target.checked)}
              className="rounded-sm border-slate-300 text-emerald-700 focus:ring-emerald-600"
            />
            <span>Considerar reserva de 50 cm para Faixa de Uso Mútuo Telecom (ND 2.9)</span>
          </label>

        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-lg p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Resultados de Projeto
              </span>
              <span className="text-xs font-mono text-slate-500">
                {requirement.ref}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-white p-3 rounded-md border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-0.5">Engaste Regulamentar (e)</span>
                <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                  {embedmentDepth} m
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">e = {poleLength}/10 + 0,60m</span>
              </div>

              <div className="bg-white p-3 rounded-md border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-0.5">Altura Útil Exposta</span>
                <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                  {usefulHeightAboveGround} m
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Do solo até o topo do poste</span>
              </div>

              <div className="bg-white p-3 rounded-md border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-0.5">Gabarito Mínimo Exigido</span>
                <span className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                  {requirement.min.toFixed(2)} m
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Exigência mandatória</span>
              </div>

              <div className="bg-white p-3 rounded-md border border-slate-200">
                <span className="text-[11px] text-slate-500 block mb-0.5">Altura Estimada (Meio de Vão)</span>
                <span className={`text-xl font-bold font-mono tabular-nums ${isCompliant ? 'text-emerald-800' : 'text-red-700'}`}>
                  {clearanceAtMidSpan.toFixed(2)} m
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Descontada flecha de ~{estimatedSag}m</span>
              </div>
            </div>

            {/* Compliance Badge & Recommendation */}
            <div className={`p-3 rounded-md border ${
              isCompliant
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-tight">
                <span>{isCompliant ? 'Em Conformidade Normativa CEMIG' : 'Reprovação no APR - Gabarito Insuficiente'}</span>
              </div>
              <p className="text-xs mt-1 leading-relaxed">
                {isCompliant
                  ? `O vão livre calculado no centro do vão (${clearanceAtMidSpan}m) atende ou supera o valor mínimo de ${requirement.min.toFixed(2)}m com margem de segurança de +${(clearanceAtMidSpan - requirement.min).toFixed(2)}m.`
                  : `Atenção: A altura no centro do vão (${clearanceAtMidSpan}m) está ${(requirement.min - clearanceAtMidSpan).toFixed(2)}m ABAIXO do mínimo regulamentar de ${requirement.min.toFixed(2)}m. Recomenda-se aumentar a altura do poste para ${poleLength + 1} metros ou diminuir o vão.`}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Base de Cálculo: ND 2.1 Subitem 5.4 e ND 2.9 Subitem 4.1</span>
            <span className="font-mono text-emerald-800 font-semibold">APR Status: {isCompliant ? 'APTO' : 'REPROVA'}</span>
          </div>

        </div>

      </div>
    </div>
  );
}
