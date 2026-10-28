import { useState, useMemo } from 'react';
import {
  NORMS,
  TOPICS,
  QUIZ,
  CHECKS,
  NORMA_NOTIFICATIONS,
  NormItem,
  TopicItem,
  StudyRecord,
  NormaNotification,
} from './data/normasData';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'library' | 'quiz' | 'checklist' | 'study' | 'notifications'>('home');
  const [filterNorm, setFilterNorm] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<'norm' | 'topic'>('norm');
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Checklist state
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  // Study history state
  const [studyHistory, setStudyHistory] = useState<StudyRecord[]>([]);
  const [studyNorm, setStudyNorm] = useState<string>('ND 2.1');
  const [studySubject, setStudySubject] = useState<string>('');
  const [studyRef, setStudyRef] = useState<string>('');
  const [studyNotes, setStudyNotes] = useState<string>('');

  // Notifications state
  const [notifications, setNotifications] = useState<NormaNotification[]>(NORMA_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const totalCheckItems = useMemo(
    () => CHECKS.reduce((acc, g) => acc + g.items.length, 0),
    []
  );
  const checklistPercent = totalCheckItems > 0 ? Math.round((checkedItems.size / totalCheckItems) * 100) : 0;

  // Navigation handler
  const navigateTo = (view: 'home' | 'library' | 'quiz' | 'checklist' | 'study' | 'notifications') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered topics for library
  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLocaleLowerCase('pt-BR');
    let list = TOPICS.filter((t) => {
      const matchNorm = filterNorm === 'Todas' || t.n === filterNorm;
      const haystack = [t.title, t.n, t.cat, t.summary, t.error, t.tags, t.ref].join(' ').toLocaleLowerCase('pt-BR');
      const matchSearch = q === '' || haystack.includes(q);
      return matchNorm && matchSearch;
    });

    if (sortOption === 'topic') {
      list.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    } else {
      list.sort((a, b) => {
        const normA = NORMS.findIndex((n) => n.id === a.n);
        const normB = NORMS.findIndex((n) => n.id === b.n);
        return normA - normB || a.id - b.id;
      });
    }

    return list;
  }, [filterNorm, searchQuery, sortOption]);

  const selectedTopic = useMemo(
    () => (selectedTopicId !== null ? TOPICS.find((t) => t.id === selectedTopicId) : null),
    [selectedTopicId]
  );

  const selectedNormObj = useMemo(
    () => (selectedTopic ? NORMS.find((n) => n.id === selectedTopic.n) || NORMS[0] : NORMS[0]),
    [selectedTopic]
  );

  // Home search submit
  const handleHomeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterNorm('Todas');
    setSelectedTopicId(null);
    navigateTo('library');
  };

  // Select norm directly from home card or sidebar
  const handleSelectNormFromCard = (normId: string) => {
    setFilterNorm(normId);
    setSearchQuery('');
    setSelectedTopicId(null);
    navigateTo('library');
  };

  // Open topic detail
  const handleOpenTopic = (id: number) => {
    setSelectedTopicId(id);
    navigateTo('library');
  };

  // Quiz selection
  const currentQ = QUIZ[quizIndex];
  const handleAnswerQuiz = (optionIdx: number) => {
    if (quizAnswered) return;
    setQuizAnswered(true);
    setQuizSelected(optionIdx);
    if (optionIdx === currentQ.c) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    if (quizIndex < QUIZ.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setQuizSelected(null);
      setQuizAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizSelected(null);
    setQuizAnswered(false);
    setQuizFinished(false);
  };

  // Checklist toggle
  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleResetChecklist = () => {
    setCheckedItems(new Set());
  };

  // Study record submit
  const handleAddStudy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studySubject.trim()) return;
    const newRecord: StudyRecord = {
      id: Math.random().toString(36).substring(2, 9),
      n: studyNorm,
      subject: studySubject.trim(),
      ref: studyRef.trim(),
      notes: studyNotes.trim(),
      date: new Date().toLocaleDateString('pt-BR'),
    };
    setStudyHistory((prev) => [newRecord, ...prev]);
    setStudySubject('');
    setStudyRef('');
    setStudyNotes('');
  };

  // Notifications mark read
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f8] text-[#172a35]">
      
      {/* Topbar */}
      <header className="topbar">
        <div className="topinner">
          <button
            type="button"
            onClick={() => {
              setSelectedTopicId(null);
              navigateTo('home');
            }}
            className="brand text-left border-0 bg-transparent p-0"
          >
            <span className="brandmark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M12 2 5 22M12 2l7 20M8 13h8M9 8h6M4 22h16M12 2v20" />
              </svg>
            </span>
            <span>
              <span className="brandname">Rede Fácil</span>
              <span className="branddesc">CENTRAL TÉCNICA · CEMIG</span>
            </span>
          </button>

          <div className="topright">
            <span className="version">PROTÓTIPO 1.0</span>
            <button
              type="button"
              className="toplink"
              onClick={() => navigateTo('checklist')}
            >
              ☑ Checklist
            </button>
            <button
              type="button"
              className="toplink relative"
              onClick={() => navigateTo('notifications')}
              title="Avisos e Atualizações Normativas"
            >
              <span>🔔 Avisos</span>
              {unreadCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-emerald-700 text-white text-[10px] font-bold rounded-full tabular-nums">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navwrap */}
      <div className="navwrap">
        <nav className="nav" aria-label="Navegação principal">
          <button
            type="button"
            className={currentView === 'home' ? 'active' : ''}
            onClick={() => {
              setSelectedTopicId(null);
              navigateTo('home');
            }}
          >
            ⌂ Início
          </button>
          <button
            type="button"
            className={currentView === 'library' ? 'active' : ''}
            onClick={() => {
              setSelectedTopicId(null);
              navigateTo('library');
            }}
          >
            ▤ Biblioteca
          </button>
          <button
            type="button"
            className={currentView === 'quiz' ? 'active' : ''}
            onClick={() => navigateTo('quiz')}
          >
            ◎ Quiz
          </button>
          <button
            type="button"
            className={currentView === 'checklist' ? 'active' : ''}
            onClick={() => navigateTo('checklist')}
          >
            ☑ Checklist
          </button>
          <button
            type="button"
            className={currentView === 'study' ? 'active' : ''}
            onClick={() => navigateTo('study')}
          >
            ↗ Meu estudo
          </button>
          <button
            type="button"
            className={currentView === 'notifications' ? 'active' : ''}
            onClick={() => navigateTo('notifications')}
          >
            🔔 Notificações ({unreadCount})
          </button>
        </nav>
      </div>

      {/* Main Layout with Sidebar */}
      <div className="layout flex-1">
        
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="side-label">Navegação</div>
          <button
            type="button"
            className={`sidebtn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => {
              setSelectedTopicId(null);
              navigateTo('home');
            }}
          >
            <span className="sideico">⌂</span>Visão geral
          </button>
          <button
            type="button"
            className={`sidebtn ${currentView === 'library' ? 'active' : ''}`}
            onClick={() => {
              setSelectedTopicId(null);
              navigateTo('library');
            }}
          >
            <span className="sideico">▤</span>Normas e resumos
          </button>
          <button
            type="button"
            className={`sidebtn ${currentView === 'quiz' ? 'active' : ''}`}
            onClick={() => navigateTo('quiz')}
          >
            <span className="sideico">◎</span>Fixação e quiz
          </button>
          <button
            type="button"
            className={`sidebtn ${currentView === 'checklist' ? 'active' : ''}`}
            onClick={() => navigateTo('checklist')}
          >
            <span className="sideico">☑</span>Pré-entrega
          </button>
          <button
            type="button"
            className={`sidebtn ${currentView === 'study' ? 'active' : ''}`}
            onClick={() => navigateTo('study')}
          >
            <span className="sideico">↗</span>Registro de estudo
          </button>
          <button
            type="button"
            className={`sidebtn ${currentView === 'notifications' ? 'active' : ''}`}
            onClick={() => navigateTo('notifications')}
          >
            <span className="sideico">🔔</span>Notificações ({unreadCount})
          </button>

          <div className="side-label" style={{ marginTop: '27px' }}>
            Consultar por norma
          </div>
          <div>
            {NORMS.map((n) => (
              <button
                key={n.id}
                type="button"
                className="sidebtn"
                onClick={() => handleSelectNormFromCard(n.id)}
              >
                <span className="sideico">{n.icon}</span>
                <span>{n.id}</span>
                <span style={{ marginLeft: 'auto' }}>→</span>
              </button>
            ))}
          </div>

          <div className="side-note">
            <strong style={{ color: 'var(--ink)' }}>ⓘ Uso responsável</strong>
            <p style={{ margin: '7px 0 0' }}>
              Resumos de apoio não substituem os documentos oficiais vigentes.
            </p>
          </div>
        </aside>

        {/* Content Viewport */}
        <main style={{ padding: '26px', minWidth: 0 }}>
          
          {/* ================= PAGE: INÍCIO ================= */}
          {currentView === 'home' && (
            <section id="page-home" className="page active space-y-6">
              
              {/* Hero */}
              <div className="hero">
                <div className="eyebrow">Consulta técnica simplificada</div>
                <h1>Menos tempo procurando. Mais segurança projetando.</h1>
                <p>Encontre resumos, pontos de atenção e referências para redes de distribuição.</p>

                <form onSubmit={handleHomeSearch} className="searchbar">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar estrutura, vão, transformador…"
                    autoComplete="off"
                    aria-label="Buscar por assunto"
                  />
                  <button className="btn primary" type="submit">
                    Buscar →
                  </button>
                </form>

                <div className="hint">
                  Experimente:{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('estrutura');
                      setFilterNorm('Todas');
                      navigateTo('library');
                    }}
                    className="underline hover:text-white"
                  >
                    estrutura
                  </button>{' '}
                  ·{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('afastamento');
                      setFilterNorm('Todas');
                      navigateTo('library');
                    }}
                    className="underline hover:text-white"
                  >
                    afastamento
                  </button>{' '}
                  ·{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('demanda');
                      setFilterNorm('Todas');
                      navigateTo('library');
                    }}
                    className="underline hover:text-white"
                  >
                    demanda
                  </button>{' '}
                  ·{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('rede compacta');
                      setFilterNorm('Todas');
                      navigateTo('library');
                    }}
                    className="underline hover:text-white"
                  >
                    rede compacta
                  </button>
                </div>
              </div>

              {/* KPIs */}
              <div className="kpis">
                <div className="kpi">
                  <div className="kpi-label">Normas</div>
                  <div className="kpi-number">05</div>
                  <div className="kpi-sub">módulos de consulta</div>
                </div>
                <div className="kpi">
                  <div className="kpi-label">Assuntos</div>
                  <div className="kpi-number">{TOPICS.length}</div>
                  <div className="kpi-sub">fichas demonstrativas</div>
                </div>
                <div className="kpi">
                  <div className="kpi-label">Checklist</div>
                  <div className="kpi-number">{checklistPercent}%</div>
                  <div className="kpi-sub">concluído nesta sessão</div>
                </div>
              </div>

              {/* Section: Biblioteca técnica - Explore as normas */}
              <div className="section">
                <div className="sectionhead">
                  <div>
                    <div className="eyebrow">Biblioteca técnica</div>
                    <h2>Explore as normas</h2>
                  </div>
                  <button
                    type="button"
                    className="textlink"
                    onClick={() => {
                      setFilterNorm('Todas');
                      setSelectedTopicId(null);
                      navigateTo('library');
                    }}
                  >
                    Ver biblioteca →
                  </button>
                </div>

                <div className="normgrid">
                  {NORMS.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      className="normcard"
                      onClick={() => handleSelectNormFromCard(n.id)}
                    >
                      <div className="normtop">
                        <span className="tag">{n.id}</span>
                        <span className="normicon">{n.icon}</span>
                      </div>
                      <h3>{n.title}</h3>
                      <p>{n.desc}</p>
                      <div className="normfoot">{n.focus} →</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section: Acesso rápido - Assuntos em destaque */}
              <div className="section">
                <div className="sectionhead">
                  <div>
                    <div className="eyebrow">Acesso rápido</div>
                    <h2>Assuntos em destaque</h2>
                  </div>
                  <button
                    type="button"
                    className="textlink"
                    onClick={() => {
                      setFilterNorm('Todas');
                      setSelectedTopicId(null);
                      navigateTo('library');
                    }}
                  >
                    Todos os assuntos →
                  </button>
                </div>

                <div className="topicgrid">
                  {[TOPICS[9], TOPICS[0], TOPICS[6], TOPICS[14], TOPICS[1], TOPICS[10]].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className="topiccard"
                      onClick={() => handleOpenTopic(t.id)}
                    >
                      <div className="topicmeta">
                        <span className="tag">{t.n}</span>
                        <span className="muted small">{t.cat}</span>
                      </div>
                      <h3>{t.title}</h3>
                      <p>{t.summary}</p>
                      <div className="topicfoot">
                        <span>Ficha de apoio</span>
                        <strong style={{ color: 'var(--navy)' }}>Abrir →</strong>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notice: Transparência Técnica */}
              <div className="notice">
                <span className="noticeicon">⚠</span>
                <div>
                  <strong>Transparência técnica</strong>
                  <p>
                    Este é um protótipo demonstrativo. Conteúdo, referências e exemplos que não foram integralmente conferidos estão identificados. Não use valores ou critérios ilustrativos como exigências oficiais de projeto.
                  </p>
                </div>
              </div>

            </section>
          )}

          {/* ================= PAGE: BIBLIOTECA (NORMAS E RESUMOS) ================= */}
          {currentView === 'library' && (
            <section id="page-library" className="page active space-y-4">
              <button
                type="button"
                className="back"
                onClick={() => {
                  setSelectedTopicId(null);
                  navigateTo('home');
                }}
              >
                ← Início
              </button>

              <div className="pagehead">
                <div className="eyebrow">Biblioteca de referência</div>
                <h1>Normas e resumos</h1>
                <p>
                  Filtre por norma, pesquise um assunto ou abra uma ficha para consultar pontos de atenção, erros frequentes e referências para validação.
                </p>
              </div>

              {/* Filters & Search */}
              <div className="filters">
                {['Todas', ...NORMS.map((n) => n.id)].map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={`chip ${filterNorm === name ? 'active' : ''}`}
                    onClick={() => {
                      setFilterNorm(name);
                      setSelectedTopicId(null);
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <div className="formrow">
                <div className="field">
                  <label htmlFor="libraryQuery">Buscar assunto</label>
                  <input
                    id="libraryQuery"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedTopicId(null);
                    }}
                    placeholder="Ex.: aterramento, estrutura, demanda…"
                  />
                </div>
                <div className="field">
                  <label htmlFor="librarySort">Organizar resultados</label>
                  <select
                    id="librarySort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as any)}
                  >
                    <option value="norm">Por norma</option>
                    <option value="topic">Por assunto</option>
                  </select>
                </div>
              </div>

              {/* Detailed View if a topic is selected */}
              {selectedTopic ? (
                <div id="detail" className="detail space-y-4">
                  <button
                    type="button"
                    className="back"
                    onClick={() => setSelectedTopicId(null)}
                  >
                    ← Voltar aos resultados
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', alignItems: 'flex-start' }}>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="tag">{selectedTopic.n}</span>
                        <span className="status">
                          {selectedTopic.statusType === 'OFICIAL_VALIDADO'
                            ? 'Critério Oficial CEMIG'
                            : 'Conteúdo Ilustrativo'}
                        </span>
                      </div>
                      <h2>{selectedTopic.title}</h2>
                      <p className="muted" style={{ fontSize: '12px', margin: 0 }}>
                        {selectedTopic.cat} · Ficha de apoio
                      </p>
                    </div>
                    <span className="normicon">{selectedNormObj.icon}</span>
                  </div>

                  <div className="notice" style={{ marginTop: '18px' }}>
                    <span className="noticeicon">ⓘ</span>
                    <div>
                      <strong>Conteúdo de apoio</strong>
                      <p>
                        Este resumo não é uma transcrição normativa integral. Confirme os requisitos na revisão oficial aplicável.
                      </p>
                    </div>
                  </div>

                  <div className="detailsection">
                    <h3>Resumo rápido</h3>
                    <p>{selectedTopic.summary}</p>
                  </div>

                  <div className="detailsection">
                    <h3>Pontos para conferir</h3>
                    <ul>
                      {selectedTopic.check.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="detailsection"
                    style={{
                      borderLeft: '3px solid #c47a4d',
                      background: '#fff8f1',
                      padding: '13px',
                      borderRadius: '0 9px 9px 0',
                    }}
                  >
                    <h3 style={{ color: '#8c3d19' }}>Erro recorrente a evitar</h3>
                    <p style={{ margin: 0, color: '#683017' }}>{selectedTopic.error}</p>
                  </div>

                  {selectedTopic.parameters && selectedTopic.parameters.length > 0 && (
                    <div className="detailsection">
                      <h3>Tabela de Parâmetros e Dimensões de Referência</h3>
                      <div className="border border-slate-200 rounded-lg overflow-hidden bg-white mt-2">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#f4f7f8] border-b border-slate-200">
                            <tr>
                              <th className="p-2.5 font-bold text-slate-800">Parâmetro</th>
                              <th className="p-2.5 font-bold text-slate-800">Valor Normativo</th>
                              <th className="p-2.5 font-bold text-slate-800">Critério / Tolerância</th>
                              <th className="p-2.5 font-bold text-slate-800 text-right">Classificação</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {selectedTopic.parameters.map((p, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="p-2.5 font-medium text-slate-900">{p.parameter}</td>
                                <td className="p-2.5 font-mono font-bold text-slate-800 tabular-nums">{p.value}</td>
                                <td className="p-2.5 text-slate-600">{p.rule}</td>
                                <td className="p-2.5 text-right">
                                  <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                                    Oficial
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="detailsection refbox">
                    <h3>Referência para validação</h3>
                    <p>{selectedTopic.ref}</p>
                    <p className="small muted">
                      Situação documental: {selectedNormObj.status}. Confirmar revisão, item, página e desenho antes de usar como critério de projeto.
                    </p>
                    <a href={selectedNormObj.url} target="_blank" rel="noopener noreferrer">
                      Abrir documento de referência no portal da CEMIG ↗
                    </a>
                    <p className="small muted" style={{ marginTop: '5px' }}>
                      O link direciona a um arquivo publicado no portal, mas a vigência deve ser confirmada no portal oficial.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn primary"
                    style={{ width: '100%', marginTop: '18px' }}
                    onClick={() => navigateTo('quiz')}
                  >
                    Praticar quiz →
                  </button>
                </div>
              ) : (
                /* Grid of Cards */
                <>
                  <div className="resultline">
                    <span>Resultados</span>
                    <span className="muted" id="resultCount">
                      {filteredTopics.length} ficha{filteredTopics.length === 1 ? '' : 's'}
                    </span>
                  </div>

                  {filteredTopics.length === 0 ? (
                    <div className="empty">
                      Nenhum resultado encontrado. Tente outro termo ou selecione outra norma.
                    </div>
                  ) : (
                    <div className="topicgrid">
                      {filteredTopics.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          className="topiccard"
                          onClick={() => handleOpenTopic(t.id)}
                        >
                          <div className="topicmeta">
                            <span className="tag">{t.n}</span>
                            <span className="muted small">{t.cat}</span>
                          </div>
                          <h3>{t.title}</h3>
                          <p>{t.summary}</p>
                          <div className="topicfoot">
                            <span>Ficha de apoio</span>
                            <strong style={{ color: 'var(--navy)' }}>Abrir →</strong>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

            </section>
          )}

          {/* ================= PAGE: QUIZ (FIXAÇÃO E QUIZ) ================= */}
          {currentView === 'quiz' && (
            <section id="page-quiz" className="page active space-y-4">
              <button
                type="button"
                className="back"
                onClick={() => navigateTo('home')}
              >
                ← Início
              </button>

              <div className="pagehead">
                <div className="eyebrow">Treinamento contínuo</div>
                <h1>Fixação e quiz</h1>
                <p>Treine o raciocínio de projeto com perguntas curtas e explicações após cada resposta.</p>
              </div>

              <div className="panel quizbox" style={{ padding: '20px' }}>
                {!quizFinished && currentQ ? (
                  <>
                    <div className="quizhead">
                      <span className="tag">{currentQ.n.toUpperCase()}</span>
                      <span className="muted small">
                        {quizIndex + 1}/{QUIZ.length}
                      </span>
                    </div>

                    <div className="progress">
                      <div
                        style={{
                          width: `${((quizIndex) / QUIZ.length) * 100}%`,
                        }}
                      />
                    </div>

                    <h2 className="question">{currentQ.q}</h2>

                    <div id="quizOptions">
                      {currentQ.a.map((ans, i) => {
                        let btnClass = 'answer';
                        if (quizAnswered) {
                          if (i === currentQ.c) btnClass += ' correct';
                          else if (i === quizSelected) btnClass += ' wrong';
                        }
                        return (
                          <button
                            key={i}
                            type="button"
                            className={btnClass}
                            disabled={quizAnswered}
                            onClick={() => handleAnswerQuiz(i)}
                          >
                            {String.fromCharCode(65 + i)}. {ans}
                          </button>
                        );
                      })}
                    </div>

                    {quizAnswered && (
                      <div className="feedback">
                        <strong>
                          {quizSelected === currentQ.c ? 'Resposta correta. ' : 'Revise este ponto. '}
                        </strong>
                        {currentQ.e}
                      </div>
                    )}

                    {quizAnswered && (
                      <button
                        type="button"
                        className="btn primary"
                        style={{ width: '100%', marginTop: '15px' }}
                        onClick={handleNextQuiz}
                      >
                        {quizIndex === QUIZ.length - 1 ? 'Ver resultado →' : 'Próxima pergunta →'}
                      </button>
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '15px 0' }}>
                    <div className="quizhead" style={{ justifyContent: 'center', marginBottom: '10px' }}>
                      <span className="tag">RESULTADO</span>
                    </div>
                    <div className="progress">
                      <div style={{ width: '100%' }} />
                    </div>
                    <h2 style={{ fontSize: '27px', margin: '14px 0 6px', fontWeight: 800 }}>
                      {quizScore} de {QUIZ.length} acertos
                    </h2>
                    <p className="muted" style={{ marginBottom: '20px' }}>
                      Revise os temas em que errou e tente novamente.
                    </p>
                    <button
                      type="button"
                      className="btn primary"
                      onClick={handleRestartQuiz}
                    >
                      Refazer quiz
                    </button>
                  </div>
                )}
              </div>

              <div className="notice">
                <span className="noticeicon">ⓘ</span>
                <div>
                  <strong>Quiz didático</strong>
                  <p>
                    As perguntas são exercícios de raciocínio. Não são questões oficiais da CEMIG nem substituem a leitura dos critérios normativos.
                  </p>
                </div>
              </div>

            </section>
          )}

          {/* ================= PAGE: CHECKLIST (PRÉ-ENTREGA) ================= */}
          {currentView === 'checklist' && (
            <section id="page-checklist" className="page active space-y-4">
              <button
                type="button"
                className="back"
                onClick={() => navigateTo('home')}
              >
                ← Início
              </button>

              <div className="pagehead">
                <div className="eyebrow">Conferência de projeto</div>
                <h1>Checklist pré-entrega</h1>
                <p>
                  Marque os pontos conferidos para acompanhar a revisão do projeto. A lista é auxiliar e deve ser adaptada ao tipo de obra.
                </p>
              </div>

              <div className="panel" style={{ padding: '17px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <div>
                    <strong>
                      {checkedItems.size} de {totalCheckItems} itens
                    </strong>
                    <div className="muted small">Progresso desta sessão</div>
                  </div>
                  <button
                    type="button"
                    className="btn"
                    onClick={handleResetChecklist}
                  >
                    Limpar
                  </button>
                </div>

                <div className="progress">
                  <div style={{ width: `${checklistPercent}%` }} />
                </div>
              </div>

              {/* Check groups */}
              {CHECKS.map((group, gIdx) => {
                // Calculate starting index for group
                const startIndex = CHECKS.slice(0, gIdx).reduce((acc, g) => acc + g.items.length, 0);

                return (
                  <div key={gIdx} className="panel checkgroup">
                    <h3>{group.title}</h3>
                    {group.items.map((itemText, iIdx) => {
                      const itemGlobalId = startIndex + iIdx;
                      const isChecked = checkedItems.has(itemGlobalId);

                      return (
                        <label key={iIdx} className="checkitem">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCheck(itemGlobalId)}
                          />
                          <span style={{ textDecoration: isChecked ? 'line-through' : 'none', color: isChecked ? 'var(--muted)' : 'inherit' }}>
                            {itemText}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                );
              })}

              <div className="panel" style={{ padding: '17px', marginTop: '14px' }}>
                <strong>Antes de liberar</strong>
                <p className="muted" style={{ fontSize: '13px' }}>
                  A aprovação depende dos critérios oficiais aplicáveis, da revisão normativa, dos dados de campo e da validação técnica exigida pelo processo da empresa.
                </p>
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => window.print()}
                >
                  Imprimir / salvar em PDF
                </button>
              </div>

            </section>
          )}

          {/* ================= PAGE: MEU ESTUDO (REGISTRO) ================= */}
          {currentView === 'study' && (
            <section id="page-study" className="page active space-y-4">
              <button
                type="button"
                className="back"
                onClick={() => navigateTo('home')}
              >
                ← Início
              </button>

              <div className="pagehead">
                <div className="eyebrow">Desenvolvimento técnico</div>
                <h1>Meu estudo</h1>
                <p>Registre o que estudou, as referências confirmadas e as dúvidas a resolver.</p>
              </div>

              <form onSubmit={handleAddStudy} className="panel studyform">
                <div className="field">
                  <label htmlFor="studyNorm">Norma</label>
                  <select
                    id="studyNorm"
                    value={studyNorm}
                    onChange={(e) => setStudyNorm(e.target.value)}
                  >
                    {NORMS.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.id} - {n.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="studySubject">Assunto estudado</label>
                  <input
                    id="studySubject"
                    required
                    value={studySubject}
                    onChange={(e) => setStudySubject(e.target.value)}
                    placeholder="Ex.: seleção de estruturas"
                  />
                </div>

                <div className="field">
                  <label htmlFor="studyRef">Referência conferida</label>
                  <input
                    id="studyRef"
                    value={studyRef}
                    onChange={(e) => setStudyRef(e.target.value)}
                    placeholder="Item, página, desenho e revisão"
                  />
                </div>

                <div className="field">
                  <label htmlFor="studyNotes">Resumo e dúvidas</label>
                  <textarea
                    id="studyNotes"
                    rows={3}
                    value={studyNotes}
                    onChange={(e) => setStudyNotes(e.target.value)}
                    placeholder="O que aprendeu? O que precisa confirmar?"
                  />
                </div>

                <button className="btn primary" type="submit">
                  Registrar estudo
                </button>

                <p className="muted small" style={{ marginTop: '10px' }}>
                  Os registros ficam apenas na sessão atual do navegador e não são enviados para um banco de dados externo.
                </p>
              </form>

              <div className="section">
                <div className="sectionhead">
                  <h2>Histórico da sessão</h2>
                  <span className="muted small">
                    {studyHistory.length} registro{studyHistory.length === 1 ? '' : 's'}
                  </span>
                </div>

                <div id="historyList" className="space-y-3">
                  {studyHistory.length === 0 ? (
                    <div className="empty">
                      Seu histórico aparecerá aqui quando você registrar o primeiro estudo.
                    </div>
                  ) : (
                    studyHistory.map((item) => (
                      <div key={item.id} className="panel historyitem">
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                          <span className="tag">{item.n}</span>
                          <span className="muted small">{item.date}</span>
                        </div>
                        <h3>{item.subject}</h3>
                        {item.ref && <p className="muted small">Referência: {item.ref}</p>}
                        {item.notes && <p style={{ fontSize: '13px', marginTop: '6px' }}>{item.notes}</p>}
                      </div>
                    ))
                  )}
                </div>
              </div>

            </section>
          )}

          {/* ================= PAGE: NOTIFICAÇÕES NORMATIVAS ================= */}
          {currentView === 'notifications' && (
            <section id="page-notifications" className="page active space-y-4">
              <button
                type="button"
                className="back"
                onClick={() => navigateTo('home')}
              >
                ← Início
              </button>

              <div className="pagehead">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="eyebrow">Avisos e Boletins Técnicos</div>
                    <h1>Atualizações Normativas CEMIG</h1>
                    <p>
                      Acompanhe as revisões vigentes, boletins técnicos de engenharia e mudanças nos critérios de aprovação de projetos.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn"
                    onClick={handleMarkAllAsRead}
                  >
                    Marcar todas como lidas
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="panel"
                    style={{
                      padding: '20px',
                      borderLeft: notif.type === 'ALERTA_CRITICO' ? '4px solid #c47a4d' : '1px solid var(--line)',
                      background: notif.read ? '#fff' : '#fafcfc',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                      <div className="flex items-center gap-2">
                        <span className="tag">{notif.norma}</span>
                        <span className="muted small font-mono">{notif.bulletinCode}</span>
                        {!notif.read && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                            NOVO
                          </span>
                        )}
                      </div>
                      <span className="muted small">{notif.date}</span>
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '6px 0 8px', color: 'var(--navy)' }}>
                      {notif.title}
                    </h3>

                    <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6, margin: '0 0 14px' }}>
                      {notif.summary}
                    </p>

                    {/* What changed comparison */}
                    <div className="space-y-3 mt-3 pt-3 border-t border-slate-100">
                      <strong style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--ink)' }}>
                        Comparativo Técnico de Mudanças:
                      </strong>
                      {notif.changes.map((ch, cIdx) => (
                        <div key={cIdx} className="bg-[#f8fafb] border border-[#dbe3e8] p-3 rounded-md space-y-2 text-xs">
                          <div className="font-bold font-mono text-[#172a35]">{ch.item}</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="p-2 bg-[#fff0eb] border border-[#d9a193] rounded text-[#7a2c1b]">
                              <strong>Regra Anterior:</strong> {ch.previousRule}
                            </div>
                            <div className="p-2 bg-[#e9f5ee] border border-[#73b894] rounded text-[#1f6b43]">
                              <strong>Nova Regra Homologada:</strong> {ch.newRule}
                            </div>
                          </div>
                          <div className="text-[11px] text-[#5e707a]">
                            <strong>Impacto no Projeto:</strong> {ch.impact}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #edf1f3' }}>
                      <span className="small text-[#2f7d79] font-medium">
                        Ação: {notif.actionRequired}
                      </span>
                      {!notif.read && (
                        <button
                          type="button"
                          className="btn"
                          style={{ fontSize: '11px', padding: '4px 8px' }}
                          onClick={() => handleMarkAsRead(notif.id)}
                        >
                          Marcar como lida
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </section>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <span>Rede Fácil · Portal demonstrativo de apoio técnico</span>
        <span>Referências oficiais devem ser verificadas antes do uso em projeto.</span>
      </footer>

    </div>
  );
}
