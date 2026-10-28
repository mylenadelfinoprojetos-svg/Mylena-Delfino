import { useState } from 'react';
import { QuizQuestion, NormaCode } from '../data/types';
import { StatusBadge } from './StatusBadge';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

interface QuizzesViewProps {
  questions: QuizQuestion[];
  selectedNorma: NormaCode | 'ALL';
}

export function QuizzesView({ questions, selectedNorma }: QuizzesViewProps) {
  const [activeNorma, setActiveNorma] = useState<NormaCode | 'ALL'>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const filteredQuestions = questions.filter((q) => {
    if (activeNorma !== 'ALL') return q.norma === activeNorma;
    if (selectedNorma !== 'ALL') return q.norma === selectedNorma;
    return true;
  });

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanation((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setCurrentIndex(0);
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = Object.entries(selectedAnswers).filter(([qId, ansIdx]) => {
    const q = questions.find((item) => item.id === qId);
    return q && q.correctIndex === ansIdx;
  }).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 lg:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-5 h-5 text-emerald-800 shrink-0" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Simulado Técnico & Quizzes de Normas CEMIG
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Teste seus conhecimentos em fórmulas de engaste, limites de queda de tensão, afastamentos de segurança e requisitos de microgeração.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Acertos / Respondidas</span>
              <span className="font-mono font-bold text-emerald-800 text-sm tabular-nums">
                {correctCount} / {totalAnswered}
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetQuiz}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
              title="Reiniciar Simulado"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter by Norma */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg mt-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'Todas as Normas' },
            { id: 'ND-2.1', label: 'ND 2.1 (Urbanas)' },
            { id: 'ND-2.2', label: 'ND 2.2 (Rurais)' },
            { id: 'ND-2.9', label: 'ND 2.9 (Telecom)' },
            { id: 'ND-3.1', label: 'ND 3.1 (Elétrico)' },
            { id: 'ND-9.3', label: 'ND 9.3 (Solar GD)' },
          ].map((tab) => {
            const isActive = activeNorma === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveNorma(tab.id as any);
                  setCurrentIndex(0);
                }}
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
      </div>

      {/* Question Card */}
      {currentQ ? (
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-5">
          
          {/* Top question info */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded">
                {currentQ.norma}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Questão {currentIndex + 1} de {filteredQuestions.length}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <StatusBadge status={currentQ.status} />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="px-2.5 py-1 text-xs border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              >
                Anterior
              </button>
              <button
                type="button"
                disabled={currentIndex >= filteredQuestions.length - 1}
                onClick={() => setCurrentIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                className="px-2.5 py-1 text-xs bg-slate-900 text-white rounded hover:bg-slate-800 disabled:opacity-40"
              >
                Próxima
              </button>
            </div>
          </div>

          {/* Question Text */}
          <h3 className="text-base font-bold text-slate-900 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options List */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((option, idx) => {
              const hasAnswered = selectedAnswers[currentQ.id] !== undefined;
              const isSelected = selectedAnswers[currentQ.id] === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600 font-medium';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-red-600 bg-red-50 text-red-950 ring-1 ring-red-600';
                } else {
                  btnStyle = 'border-slate-100 bg-slate-50 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm flex items-center justify-between gap-3 transition-all ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {hasAnswered && isCorrect && (
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {showExplanation[currentQ.id] && (
            <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span className={selectedAnswers[currentQ.id] === currentQ.correctIndex ? 'text-emerald-800' : 'text-red-800'}>
                  {selectedAnswers[currentQ.id] === currentQ.correctIndex ? 'Resposta Correta!' : 'Resposta Incorreta'}
                </span>
                <span className="font-mono text-slate-500">{currentQ.normaRef}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg p-10 text-center">
          <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500">Nenhuma questão disponível para a norma selecionada.</p>
        </div>
      )}

    </div>
  );
}
