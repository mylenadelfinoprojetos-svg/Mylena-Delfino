import { useState } from 'react';
import { NormaNotification, NormaCode } from '../data/types';
import { Bell, Check, AlertTriangle, FileText, X, ArrowRight, ExternalLink } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NormaNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationsModal({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationsModalProps) {
  const [selectedNotif, setSelectedNotif] = useState<NormaNotification | null>(notifications[0] || null);
  const [filterType, setFilterType] = useState<string>('ALL');

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter((n) => {
    if (filterType === 'UNREAD') return !n.read;
    if (filterType === 'CRITICAL') return n.type === 'ALERTA_CRITICO';
    return true;
  });

  const getTypeBadge = (type: NormaNotification['type']) => {
    switch (type) {
      case 'REVISAO_NORMATIVA':
        return <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-tight">Revisão Normativa</span>;
      case 'ALERTA_CRITICO':
        return <span className="text-[11px] font-bold text-red-800 uppercase tracking-tight">Alerta Crítico APR</span>;
      case 'COMUNICADO_TECNICO':
        return <span className="text-[11px] font-bold text-blue-800 uppercase tracking-tight">Comunicado Técnico</span>;
      case 'CONSULTA_PUBLICA':
        return <span className="text-[11px] font-bold text-amber-800 uppercase tracking-tight">Consulta Pública</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-300 rounded-lg max-w-4xl w-full h-[85vh] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-md">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Painel de Atualizações & Notificações de Normas CEMIG
              </h3>
              <p className="text-xs text-slate-500">
                Avisos oficiais, revisões vigentes de NDs e comunicados do comitê de engenharia.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium underline underline-offset-2"
            >
              Marcar todas como lidas
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-2 border-b border-slate-100 flex items-center gap-2 bg-white">
          <button
            type="button"
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filterType === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Todas ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('UNREAD')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filterType === 'UNREAD'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Não Lidas ({notifications.filter((n) => !n.read).length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('CRITICAL')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filterType === 'CRITICAL'
                ? 'bg-red-800 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Alertas Críticos
          </button>
        </div>

        {/* Modal Body - 2 Columns */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Left: Notifications List */}
          <div className="md:col-span-5 border-r border-slate-200 overflow-y-auto divide-y divide-slate-100">
            {filteredNotifs.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Nenhuma notificação encontrada neste filtro.
              </div>
            ) : (
              filteredNotifs.map((notif) => {
                const isSelected = selectedNotif?.id === notif.id;
                return (
                  <div
                    key={notif.id}
                    onClick={() => {
                      setSelectedNotif(notif);
                      if (!notif.read) onMarkAsRead(notif.id);
                    }}
                    className={`p-4 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-emerald-50/60 border-l-2 border-emerald-800'
                        : 'hover:bg-slate-50'
                    } ${!notif.read ? 'bg-white font-medium' : 'bg-slate-50/40 text-slate-600'}`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold px-1.5 py-0.2 bg-slate-200 text-slate-900 rounded">
                          {notif.norma}
                        </span>
                        {getTypeBadge(notif.type)}
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" title="Não lida" />
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                      {notif.title}
                    </h4>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{notif.bulletinCode}</span>
                      <span>{notif.date}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right: Detailed Diff Pane */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-5 bg-white">
            {selectedNotif ? (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
                      {selectedNotif.norma}
                    </span>
                    {getTypeBadge(selectedNotif.type)}
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-xs font-mono text-slate-500">
                      Boletim {selectedNotif.bulletinCode}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {selectedNotif.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {selectedNotif.summary}
                  </p>
                </div>

                {/* Changes Comparison */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                    Comparativo Técnico: O que Mudou na Norma
                  </h4>

                  <div className="space-y-3">
                    {selectedNotif.changes.map((ch, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-md p-3.5 bg-slate-50/50 space-y-2">
                        <div className="font-bold text-xs text-slate-900 font-mono">
                          {ch.item}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 bg-red-50/70 border border-red-200 rounded text-red-950">
                            <span className="font-bold text-[10px] uppercase text-red-800 block mb-0.5">
                              Regra Anterior:
                            </span>
                            {ch.previousRule}
                          </div>

                          <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded text-emerald-950">
                            <span className="font-bold text-[10px] uppercase text-emerald-800 block mb-0.5">
                              Nova Regra Homologada:
                            </span>
                            {ch.newRule}
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-600 pt-1">
                          <strong>Impacto nos Projetos:</strong> {ch.impact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Required Box */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md">
                  <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                    Ação Recomendada para o Projetista
                  </div>
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    {selectedNotif.actionRequired}
                  </p>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Selecione uma notificação ao lado para visualizar os detalhes normativos.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
