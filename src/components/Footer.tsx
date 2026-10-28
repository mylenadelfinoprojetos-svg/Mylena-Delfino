export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div>
            <span className="text-base font-bold text-slate-900 tracking-tight">
              Rede Fácil <span className="text-emerald-700 font-extrabold">CEMIG</span>
            </span>
            <p className="text-xs text-slate-500 mt-1 max-w-lg">
              Portal técnico e repositório de dimensionamento para projetistas e engenheiros de redes aéreas de distribuição de energia elétrica (ND 2.1, ND 2.2, ND 2.9, ND 3.1 e ND 9.3).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600">
            <span className="font-mono">Vigência: 2026</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Normas CEMIG Distribuição S.A.</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Minas Gerais</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>
            Aviso de responsabilidade técnica: Os parâmetros e checklists aqui dispostos destinam-se ao suporte de elaboração de projetos e pré-análise APR. Consulte sempre as versões homologadas e cadernos de desenhos oficiais no portal oficial da concessionária.
          </p>
          <span className="shrink-0 font-mono">
            Rede Fácil v2026.1
          </span>
        </div>
      </div>
    </footer>
  );
}
