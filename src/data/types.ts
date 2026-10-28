export type NormaCode = 'ND-2.1' | 'ND-2.2' | 'ND-2.9' | 'ND-3.1' | 'ND-9.3';

export type ValidationStatus = 
  | 'OFICIAL_VALIDADO'       // Critério Oficial CEMIG Vigente (normativo estrito)
  | 'ILUSTRATIVO_RECOMENDADO' // Conteúdo Ilustrativo / Prática Recomendada de Campo
  | 'EM_VALIDACAO';          // Critério Em Validação / Consulta Técnica

export interface TechnicalSummary {
  id: string;
  title: string;
  norma: NormaCode;
  category: 'Posteamento' | 'Condutores' | 'Afastamentos' | 'Telecom' | 'Proteção' | 'Geração Distribuída' | 'Aterramento' | 'Cálculo de Queda';
  status: ValidationStatus;
  summary: string;
  officialReference: string;
  officialCitation: string;
  illustrativeNotes?: string;
  parameters: Array<{
    parameter: string;
    value: string;
    toleranceOrRule: string;
    isOfficial: boolean;
  }>;
  practicalTips: string[];
  lastReviewDate: string;
}

export interface NormativeReference {
  id: string;
  code: NormaCode;
  title: string;
  shortDescription: string;
  currentEdition: string;
  effectiveDate: string;
  status: 'VIGENTE' | 'EM_REVISAO' | 'ATUALIZADA_RECENTEMENTE';
  scope: string;
  mainChapters: Array<{
    chapter: string;
    title: string;
    keyPoints: string[];
  }>;
  standardDrawings: Array<{
    code: string;
    title: string;
    description: string;
  }>;
}

export interface FrequentError {
  id: string;
  title: string;
  norma: NormaCode;
  severity: 'CRITICO_REPROVA' | 'ALTO_RISCO' | 'ADVERTENCIA';
  category: string;
  description: string;
  whyCemigRejects: string;
  howToSolve: string;
  normaItemRef: string;
  officialVsIllustrativeNotice: string;
  status: ValidationStatus;
  exampleScenario: string;
}

export interface ChecklistItem {
  id: string;
  norma: NormaCode;
  category: string;
  requirement: string;
  normaRef: string;
  status: ValidationStatus;
  verificationTip: string;
  completed?: boolean;
}

export interface QuizQuestion {
  id: string;
  norma: NormaCode;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  normaRef: string;
  status: ValidationStatus;
}

export interface NormaNotification {
  id: string;
  norma: NormaCode;
  title: string;
  date: string;
  type: 'REVISAO_NORMATIVA' | 'COMUNICADO_TECNICO' | 'ALERTA_CRITICO' | 'CONSULTA_PUBLICA';
  summary: string;
  bulletinCode: string;
  read: boolean;
  changes: Array<{
    item: string;
    previousRule: string;
    newRule: string;
    impact: string;
  }>;
  actionRequired: string;
}
