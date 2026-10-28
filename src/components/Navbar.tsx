import { Bell } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  unreadCount: number;
  onOpenNotifications: () => void;
}

export function Navbar({ currentTab, onSelectTab, unreadCount, onOpenNotifications }: NavbarProps) {
  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'resumos', label: 'Resumos Técnicos' },
    { id: 'erros', label: 'Erros Frequentes' },
    { id: 'checklists', label: 'Checklists' },
    { id: 'quizzes', label: 'Quizzes' },
    { id: 'normas', label: 'Normas CEMIG' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line, single text element wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('inicio')}
          className="text-left whitespace-nowrap shrink-0 focus-visible:outline-emerald-600"
        >
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Rede Fácil <span className="text-emerald-700 font-extrabold">CEMIG</span>
          </span>
        </button>

        {/* Zone 2: 5 nav links, 1-2 word labels, single-line */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => onSelectTab(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive
                    ? 'text-slate-950 font-semibold border-b-2 border-emerald-700'
                    : 'hover:text-slate-950'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenNotifications}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 relative"
            title="Painel de Notificações de Normas Técnicas"
          >
            <Bell className="w-4 h-4 text-emerald-800 shrink-0" />
            <span className="hidden sm:inline">Notificações Normativas</span>
            <span className="sm:hidden">Avisos</span>
            {unreadCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-emerald-700 text-white text-[10px] font-bold rounded-full tabular-nums">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile secondary navigation strip */}
      <div className="lg:hidden border-t border-slate-100 bg-slate-50 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {navLinks.map((link) => {
          const isActive = currentTab === link.id;
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => onSelectTab(link.id)}
              className={`text-xs px-2.5 py-1 rounded whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white font-medium'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
