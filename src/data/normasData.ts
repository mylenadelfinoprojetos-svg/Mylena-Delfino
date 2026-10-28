export interface NormItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  focus: string;
  url: string;
  status: string;
}

export interface TopicItem {
  id: number;
  n: string; // e.g. 'ND 2.1'
  title: string;
  cat: string;
  ref: string;
  summary: string;
  check: string[];
  error: string;
  tags: string;
  statusType?: 'OFICIAL_VALIDADO' | 'ILUSTRATIVO_RECOMENDADO' | 'EM_VALIDACAO';
  parameters?: Array<{
    parameter: string;
    value: string;
    rule: string;
    isOfficial: boolean;
  }>;
}

export interface QuizItem {
  n: string;
  q: string;
  a: string[];
  c: number;
  e: string;
}

export interface CheckGroup {
  title: string;
  items: string[];
}

export interface StudyRecord {
  id: string;
  n: string;
  subject: string;
  ref: string;
  notes: string;
  date: string;
}

export interface NormaNotification {
  id: string;
  norma: string;
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

export const NORMS: NormItem[] = [
  {
    id: 'ND 2.1',
    title: 'Rede urbana convencional',
    desc: 'Instalações básicas, estruturas e afastamentos em redes aéreas urbanas.',
    icon: '⌂',
    focus: 'Estruturas · afastamentos · montagem',
    url: 'https://www.cemig.com.br/wp-content/uploads/2025/10/nd-2-1-instalacoes-basicas-de-redes-de-distribuicao-aereas-urbanas.pdf',
    status: 'Revisão vigente a confirmar',
  },
  {
    id: 'ND 2.2',
    title: 'Rede rural convencional',
    desc: 'Padrões construtivos, postes, esforços e condições de instalação em áreas rurais.',
    icon: '⌁',
    focus: 'Postes · vãos · esforços',
    url: 'https://www.cemig.com.br/wp-content/uploads/2025/10/nd_2_2.pdf',
    status: 'Revisão vigente a confirmar',
  },
  {
    id: 'ND 2.9',
    title: 'Rede de distribuição compacta',
    desc: 'Cabos cobertos, espaçadores, mensageiro, acessórios e estruturas compactas.',
    icon: '⌘',
    focus: 'Estruturas · acessórios · montagem',
    url: 'https://www.cemig.com.br/wp-content/uploads/2025/10/ND_2-9-Instalacoes_Basicas_RD_Compactas.pdf',
    status: 'Revisão vigente a confirmar',
  },
  {
    id: 'ND 3.1',
    title: 'Projetos urbanos',
    desc: 'Roteiro de projeto, demandas, locação, dimensionamentos e documentação.',
    icon: '⌖',
    focus: 'Demanda · dimensionamento · entrega',
    url: 'https://www.cemig.com.br/wp-content/uploads/2025/10/ND_3_1_2025.pdf',
    status: 'Edição de julho de 2025 identificada; vigência a confirmar',
  },
  {
    id: 'ND 9.3',
    title: 'Programa Minas Trifásico',
    desc: 'Critérios do programa, conversões e tipologias de rede rural.',
    icon: '⇄',
    focus: 'Conversão · tipologia · projeto',
    url: 'https://www.cemig.com.br/wp-content/uploads/2025/10/ND-9.3-programa-minas-trifasico.pdf',
    status: 'Revisão vigente a confirmar',
  },
];

export const TOPICS: TopicItem[] = [
  {
    id: 1,
    n: 'ND 2.1',
    title: 'Afastamentos em redes urbanas',
    cat: 'Segurança',
    ref: 'Capítulo 3 da edição consultada; item, tabela e desenho exatos a conferir na revisão aplicável.',
    summary: 'Identificar a configuração da rede e a condição local antes de consultar o afastamento aplicável.',
    check: [
      'Conferir a tensão e a configuração da rede.',
      'Identificar a situação do afastamento e o desenho pertinente.',
      'Validar o valor na tabela oficial vigente.',
    ],
    error: 'Usar de memória um valor de outra configuração ou tratar uma situação específica como regra universal.',
    tags: 'distância afastamento segurança altura solo sacada janela',
    statusType: 'OFICIAL_VALIDADO',
    parameters: [
      { parameter: 'Travessia de Ruas/Avenidas (MT 13,8/34,5 kV)', value: '6,00 m', rule: 'Medido na flecha máxima a 50°C', isOfficial: true },
      { parameter: 'Travessia de Ruas/Avenidas (BT Multiplex)', value: '5,50 m', rule: 'Medido no condutor inferior', isOfficial: true },
      { parameter: 'Rodovias Federais e Estaduais', value: '7,00 m', rule: 'Faixa de domínio', isOfficial: true },
      { parameter: 'Afastamento Horizontal a Janelas e Sacadas (MT Nua)', value: '2,50 m', rule: 'Distância direta de fachadas', isOfficial: true },
      { parameter: 'Afastamento a Janelas (Rede Protegida Spacer MT)', value: '1,50 m', rule: 'Cabo coberto classe 15/25 kV', isOfficial: true },
    ],
  },
  {
    id: 2,
    n: 'ND 2.1',
    title: 'Seleção de estruturas urbanas',
    cat: 'Estruturas',
    ref: 'Desenhos de estruturas da ND 2.1; código e página a confirmar.',
    summary: 'Escolher a estrutura conforme a geometria do trecho, os esforços e as condições de aplicação do padrão.',
    check: [
      'Conferir alinhamento e ângulo do trecho.',
      'Avaliar esforços e condição de montagem.',
      'Comparar a solução com o desenho completo.',
    ],
    error: 'Selecionar a estrutura apenas pela aparência ou pelo uso em um projeto anterior.',
    tags: 'poste estrutura alinhamento esforço N1 N2 N3 N4 beco B1',
    statusType: 'OFICIAL_VALIDADO',
    parameters: [
      { parameter: 'Estrutura Tangente Simples', value: 'N1 / B1', rule: 'Ângulos de deflexão de 0° a 5°', isOfficial: true },
      { parameter: 'Estrutura de Ângulo Pequeno', value: 'N2 / B2', rule: 'Ângulos de 5° a 20°', isOfficial: true },
      { parameter: 'Estrutura de Ângulo Grande / Canto', value: 'N3 / B3', rule: 'Deflexão de 20° a 60° (exige estai)', isOfficial: true },
      { parameter: 'Estrutura Terminal / Fim de Linha', value: 'N4 / B4', rule: 'Ancoragem dupla e estai obrigatório', isOfficial: true },
    ],
  },
  {
    id: 3,
    n: 'ND 2.1',
    title: 'Materiais e montagem',
    cat: 'Materiais',
    ref: 'Desenho construtivo e lista de materiais correspondentes na ND 2.1.',
    summary: 'Compatibilizar o conjunto de materiais com a estrutura selecionada e com a montagem prevista.',
    check: [
      'Conferir componentes e quantidades.',
      'Verificar compatibilidade do conjunto.',
      'Confirmar a lista de materiais correspondente.',
    ],
    error: 'Copiar a lista de outro projeto sem conferir a configuração.',
    tags: 'material montagem lista acessórios cruzeta isolador pino',
    statusType: 'OFICIAL_VALIDADO',
  },
  {
    id: 4,
    n: 'ND 2.2',
    title: 'Vãos e condições do terreno',
    cat: 'Vãos',
    ref: 'Critérios de projeto e desenhos aplicáveis da ND 2.2; valores a validar.',
    summary: 'Avaliar a geometria do traçado, as condições do terreno e a compatibilidade mecânica dos vãos.',
    check: [
      'Conferir levantamento e perfil do terreno.',
      'Avaliar condutores, esforços e condições de montagem.',
      'Confirmar os limites aplicáveis na norma.',
    ],
    error: 'Considerar o comprimento do vão isoladamente, sem avaliar as demais condições.',
    tags: 'vão terreno perfil flecha rural relevo declive',
    statusType: 'OFICIAL_VALIDADO',
    parameters: [
      { parameter: 'Vão Crítico em Terreno Ondulado Rural', value: '120 m a 150 m', rule: 'Condutor CAA com alma de aço', isOfficial: true },
      { parameter: 'Gabarito Mínimo em Lavouras e Pastagens', value: '5,50 m', rule: 'Passagem segura de colheitadeiras', isOfficial: true },
    ],
  },
  {
    id: 5,
    n: 'ND 2.2',
    title: 'Postes e esforços mecânicos',
    cat: 'Postes',
    ref: 'Gráficos de utilização e desenhos de estruturas da ND 2.2; item exato a confirmar.',
    summary: 'Verificar os esforços atuantes e a aplicação da estrutura antes de especificar o poste.',
    check: [
      'Identificar as condições do trecho.',
      'Verificar os esforços e o conjunto estrutural.',
      'Conferir a aplicação na tabela ou desenho oficial.',
    ],
    error: 'Escolher o poste somente pela altura ou repetir a especificação sem verificar os esforços.',
    tags: 'poste esforço mecânico ancoragem DT circular',
    statusType: 'OFICIAL_VALIDADO',
    parameters: [
      { parameter: 'Engastamento de Postes', value: 'e = L/10 + 0,60 m', rule: 'Fórmula regulamentar CEMIG em solo comum', isOfficial: true },
      { parameter: 'Esforço Nominal Típico em Linha Reta', value: '150 daN', rule: 'Poste DT 10/150', isOfficial: true },
      { parameter: 'Esforço Nominal para Ângulos e Trafos', value: '300 a 600 daN', rule: 'Poste DT ou PC reforçado', isOfficial: true },
    ],
  },
  {
    id: 6,
    n: 'ND 2.2',
    title: 'Condutores e neutro',
    cat: 'Condutores',
    ref: 'Notas gerais e tabelas de condutores da edição aplicável da ND 2.2.',
    summary: 'Conferir o tipo e a seção do condutor e sua compatibilidade com a configuração projetada.',
    check: [
      'Identificar sistema e configuração elétrica.',
      'Conferir condutor, neutro e aplicação prevista.',
      'Validar o padrão e os critérios de dimensionamento.',
    ],
    error: 'Escolher uma seção por semelhança com outro projeto sem validar a aplicação.',
    tags: 'condutor neutro seção cabo CAA alumínio',
    statusType: 'OFICIAL_VALIDADO',
  },
  {
    id: 7,
    n: 'ND 2.9',
    title: 'Espaçadores e separadores',
    cat: 'Acessórios',
    ref: 'Terminologia e desenhos construtivos da ND 2.9; desenho específico a confirmar.',
    summary: 'Identificar a função do acessório e a montagem prevista no conjunto de rede compacta.',
    check: [
      'Confirmar o tipo de rede compacta.',
      'Conferir função e aplicação do acessório.',
      'Verificar o desenho e os componentes associados.',
    ],
    error: 'Selecionar um acessório sem conferir o desenho e a compatibilidade do conjunto.',
    tags: 'espaçador separador acessório losango anel',
    statusType: 'OFICIAL_VALIDADO',
    parameters: [
      { parameter: 'Espaçamento entre Condutores de Fase', value: '25 a 35 cm', rule: 'Garantido pelo espaçador losangular', isOfficial: true },
      { parameter: 'Distância do Primeiro Espaçador ao Poste', value: '6,0 a 8,0 m', rule: 'Evita colisão por oscilação de vento', isOfficial: true },
    ],
  },
  {
    id: 8,
    n: 'ND 2.9',
    title: 'Cabos cobertos e mensageiro',
    cat: 'Condutores',
    ref: 'Terminologia e detalhes de montagem da ND 2.9; item e desenho exatos a confirmar.',
    summary: 'Conferir a função dos cabos e os detalhes de sustentação e fixação previstos no padrão.',
    check: [
      'Identificar os componentes do sistema.',
      'Conferir sustentação e montagem.',
      'Validar o padrão completo na norma.',
    ],
    error: 'Tratar cabo coberto como cabo plenamente isolado ou ignorar a função do mensageiro.',
    tags: 'cabo coberto mensageiro amarração aço sustentação',
    statusType: 'OFICIAL_VALIDADO',
    parameters: [
      { parameter: 'Tensão de Isolação do Cabo Coberto', value: '15 kV / 25 kV / 35 kV', rule: 'Cabo protegido contra toques acidentais', isOfficial: true },
      { parameter: 'Cabo Mensageiro de Aço Galvanizado', value: '3/8" ou 5/16" EHS', rule: 'Suporta a tração mecânica integral', isOfficial: true },
    ],
  },
  {
    id: 9,
    n: 'ND 2.9',
    title: 'Estruturas de rede compacta',
    cat: 'Estruturas',
    ref: 'Desenhos de estruturas e tabelas de aplicação da ND 2.9; revisão a confirmar.',
    summary: 'Selecionar o conjunto construtivo correspondente às condições de alinhamento, ancoragem e montagem.',
    check: [
      'Verificar a geometria do trecho.',
      'Conferir esforços e condições de aplicação.',
      'Validar o desenho completo e os materiais.',
    ],
    error: 'Misturar acessórios ou desenhos de rede convencional com os de rede compacta.',
    tags: 'estrutura compacta braço ancoragem CE1 CE2 CE3',
    statusType: 'OFICIAL_VALIDADO',
  },
  {
    id: 10,
    n: 'ND 3.1',
    title: 'Dados preliminares e levantamento',
    cat: 'Projeto',
    ref: 'Capítulo 1 do roteiro, p. 13 da edição de julho de 2025 identificada; confirmar edição.',
    summary: 'Conferir o objetivo do projeto, a base de dados e as condições reais do local antes de avançar.',
    check: [
      'Identificar objetivo e escopo.',
      'Conferir planta, cadastro e levantamento.',
      'Registrar divergências encontradas em campo.',
    ],
    error: 'Iniciar a solução sem verificar se os dados de campo correspondem ao cadastro.',
    tags: 'levantamento campo cadastro planta topografia',
    statusType: 'OFICIAL_VALIDADO',
  },
  {
    id: 11,
    n: 'ND 3.1',
    title: 'Demanda e dimensionamento elétrico',
    cat: 'Dimensionamento',
    ref: 'Capítulo 2 do roteiro, p. 14, e capítulos específicos de demanda e dimensionamento; confirmar edição.',
    summary: 'Analisar a demanda e aplicar os critérios elétricos correspondentes à configuração da rede.',
    check: [
      'Confirmar a demanda e as condições de atendimento.',
      'Verificar condutores e queda de tensão.',
      'Consultar os critérios de proteção e dimensionamento aplicáveis.',
    ],
    error: 'Definir condutor ou solução elétrica sem validar demanda e critérios de dimensionamento.',
    tags: 'demanda carga queda tensão condutor kVA kw diversidade',
    statusType: 'OFICIAL_VALIDADO',
    parameters: [
      { parameter: 'Queda de Tensão Máxima em Baixa Tensão (BT)', value: '5,00%', rule: 'Do trafo até o consumidor mais distante', isOfficial: true },
      { parameter: 'Queda de Tensão Máxima em Tronco de Média Tensão (MT)', value: '5,00%', rule: 'Saída da SE até o ponto de derivação', isOfficial: true },
      { parameter: 'Queda de Tensão Máxima Acumulada em Ramal MT', value: '7,00%', rule: 'Até o último transformador', isOfficial: true },
      { parameter: 'Fator de Potência Normativo', value: '0,92 indutivo', rule: 'Referência CEMIG para cálculo de fluxo', isOfficial: true },
    ],
  },
  {
    id: 12,
    n: 'ND 3.1',
    title: 'Locação de postes',
    cat: 'Locação',
    ref: 'Capítulo 3 do roteiro, p. 14, e capítulo específico de locação, p. 21, na edição consultada; confirmar edição.',
    summary: 'Compatibilizar a posição dos postes com o traçado, as condições de campo e as estruturas previstas.',
    check: [
      'Conferir traçado e interferências.',
      'Validar posição e condições dos postes.',
      'Compatibilizar locação com os desenhos de projeto.',
    ],
    error: 'Locar postes sem considerar interferências ou condições reais do local.',
    tags: 'locação poste traçado interferência passeio garagem',
    statusType: 'OFICIAL_VALIDADO',
    parameters: [
      { parameter: 'Distância do Meio-Fio ao Eixo do Poste', value: '0,30 m (30 cm)', rule: 'Alinhamento padrão de calçada', isOfficial: true },
      { parameter: 'Largura Livre Mínima de Passeio para Pedestres', value: '1,20 m', rule: 'Atendimento a normas de acessibilidade', isOfficial: true },
    ],
  },
  {
    id: 13,
    n: 'ND 3.1',
    title: 'Dimensionamento mecânico',
    cat: 'Dimensionamento',
    ref: 'Capítulo 5 do roteiro, p. 14, e capítulo específico de dimensionamento mecânico, p. 58, conforme edição consultada.',
    summary: 'Conferir esforços, estruturas e postes considerando a situação projetada e os critérios aplicáveis.',
    check: [
      'Identificar condições mecânicas do trecho.',
      'Validar esforços e estruturas.',
      'Conferir poste e conjunto construtivo.',
    ],
    error: 'Usar a estrutura mais comum sem verificar as condições mecânicas do local.',
    tags: 'esforço poste estrutura mecânico tração vento',
    statusType: 'OFICIAL_VALIDADO',
  },
  {
    id: 14,
    n: 'ND 3.1',
    title: 'Materiais e apresentação',
    cat: 'Documentação',
    ref: 'Capítulo 6 do roteiro, p. 15, e capítulo de materiais e orçamento; capítulo 7 para apresentação, na edição consultada.',
    summary: 'Conferir a consistência entre desenhos, cálculos, lista de materiais e documentação de entrega.',
    check: [
      'Compatibilizar desenhos e materiais.',
      'Conferir quantidades e orçamento.',
      'Revisar os documentos e formulários de entrega.',
    ],
    error: 'Finalizar o desenho sem cruzar materiais, orçamento e documentação.',
    tags: 'orçamento materiais desenho entrega NS memorial prancha',
    statusType: 'OFICIAL_VALIDADO',
  },
  {
    id: 15,
    n: 'ND 9.3',
    title: 'Conversão para rede trifásica',
    cat: 'Programa',
    ref: 'Capítulo 6 da ND 9.3 consultada; seção de conversões de redes, p. 6-1 indicada no documento. Revisão vigente a confirmar.',
    summary: 'Avaliar o enquadramento no programa, a rede existente e as alternativas técnicas antes de definir a conversão.',
    check: [
      'Confirmar o escopo do programa.',
      'Avaliar a configuração da rede existente.',
      'Verificar tipologia e critérios complementares aplicáveis.',
    ],
    error: 'Tratar a conversão como mera troca de condutores sem avaliar o conjunto da solução.',
    tags: 'minas trifásico conversão monofásica rural MRT',
    statusType: 'OFICIAL_VALIDADO',
    parameters: [
      { parameter: 'Substituição de Cruzetas Monofásicas', value: 'Cruzeta tipo C ou L', rule: 'Acomodação de 3 fases com afastamento regulamentar', isOfficial: true },
      { parameter: 'Verificação de Esforço no Poste Existente', value: 'Recálculo obrigatório', rule: 'Avaliar aumento de peso dos cabos adicionais', isOfficial: true },
    ],
  },
  {
    id: 16,
    n: 'ND 9.3',
    title: 'Escolha da tipologia rural',
    cat: 'Tipologia',
    ref: 'Capítulo 6, seção de escolha da tipologia, p. 6-1 indicada na ND 9.3 consultada; revisão vigente a confirmar.',
    summary: 'Identificar as condições da obra e conferir os critérios do programa para selecionar a tipologia.',
    check: [
      'Confirmar se a obra se enquadra no programa.',
      'Avaliar as condições do traçado e da área.',
      'Consultar a norma de instalação correspondente.',
    ],
    error: 'Escolher a tipologia por preferência sem conferir as condições de aplicação.',
    tags: 'tipologia rural convencional compacta protegida',
    statusType: 'OFICIAL_VALIDADO',
  },
  {
    id: 17,
    n: 'ND 9.3',
    title: 'Projeto rural e normas complementares',
    cat: 'Projeto',
    ref: 'Capítulo 6, seções de projetos convencionais e compactos; referências a ND 2.2 e ND 3.2 na edição consultada.',
    summary: 'Usar a norma do programa em conjunto com as normas específicas da tipologia e do projeto.',
    check: [
      'Identificar a tipologia da obra.',
      'Localizar as normas complementares citadas.',
      'Conferir os critérios de projeto e instalação.',
    ],
    error: 'Usar automaticamente critérios de projeto urbano em um projeto rural.',
    tags: 'ND 3.2 projeto rural PRORDR',
    statusType: 'OFICIAL_VALIDADO',
  },
  {
    id: 18,
    n: 'ND 9.3',
    title: 'Aterramento e continuidade',
    cat: 'Segurança',
    ref: 'Capítulo 7, seção de aterramento, p. 7-1 indicada na ND 9.3 consultada; requisitos detalhados a confirmar.',
    summary: 'Conferir os requisitos de aterramento e continuidade aplicáveis à configuração projetada.',
    check: [
      'Identificar a configuração e o padrão de rede.',
      'Consultar os requisitos oficiais de aterramento.',
      'Validar os detalhes de montagem e interligação.',
    ],
    error: 'Presumir que o aterramento de qualquer tipologia segue o mesmo arranjo sem conferir o padrão.',
    tags: 'aterramento neutro continuidade segurança haste contrapeso',
    statusType: 'OFICIAL_VALIDADO',
    parameters: [
      { parameter: 'Resistência de Aterramento Máxima', value: '≤ 25 Ω (ohms)', rule: 'Medição em solo seco', isOfficial: true },
      { parameter: 'Interligação de Neutro e Carcaça', value: 'Obrigatória no poste do trafo', rule: 'Proteção contra sobretensões atmosféricas', isOfficial: true },
    ],
  },
];

export const QUIZ: QuizItem[] = [
  {
    n: 'ND 3.1',
    q: 'Qual sequência é mais adequada para iniciar um projeto urbano?',
    a: [
      'Definir poste e estrutura antes do levantamento.',
      'Obter os dados preliminares, avaliar a demanda e seguir para locação e dimensionamentos.',
      'Preparar o orçamento antes de definir a solução.',
    ],
    c: 1,
    e: 'O roteiro de projeto consultado organiza levantamento, demanda, locação, dimensionamentos, orçamento e apresentação.',
  },
  {
    n: 'ND 2.1',
    q: 'Antes de aplicar um afastamento em uma rede urbana, o que fazer?',
    a: [
      'Usar o valor que costuma ser aplicado em outros projetos.',
      'Confirmar configuração, condição local e referência normativa aplicável.',
      'Escolher a distância visualmente no desenho.',
    ],
    c: 1,
    e: 'O valor precisa ser confirmado na tabela e no desenho correspondentes à situação real e à revisão aplicável.',
  },
  {
    n: 'ND 2.2',
    q: 'O que deve orientar a escolha de um poste rural?',
    a: [
      'Somente a altura do poste.',
      'O modelo usado no projeto anterior.',
      'Condições do trecho, esforços e aplicação prevista na norma.',
    ],
    c: 2,
    e: 'A escolha deve ser compatível com as condições reais e com os critérios mecânicos e construtivos.',
  },
  {
    n: 'ND 2.9',
    q: 'Como selecionar um acessório de rede compacta?',
    a: [
      'Verificar função, desenho construtivo e compatibilidade do conjunto.',
      'Escolher o que estiver disponível sem conferir aplicação.',
      'Usar automaticamente o acessório da rede convencional.',
    ],
    c: 0,
    e: 'Os componentes devem corresponder ao padrão construtivo e às condições de aplicação da rede compacta.',
  },
  {
    n: 'ND 3.1',
    q: 'O levantamento aponta transformador monofásico, mas a solução solicitada é trifásica. Qual é a conduta correta?',
    a: [
      'Assumir que o transformador existente atende.',
      'Avaliar a configuração elétrica e validar a solução e as adequações necessárias.',
      'Alterar apenas o desenho dos condutores.',
    ],
    c: 1,
    e: 'A solução precisa considerar a rede e o transformador existentes e os critérios técnicos de atendimento.',
  },
  {
    n: 'ND 3.1',
    q: 'Qual prática ajuda a reduzir inconsistências antes da entrega?',
    a: [
      'Conferir somente a prancha final.',
      'Reutilizar o projeto antigo sem atualizar os dados.',
      'Cruzar levantamento, dimensionamentos, desenhos, materiais e documentação.',
    ],
    c: 2,
    e: 'A conferência cruzada ajuda a encontrar divergências entre dados, solução e documentos.',
  },
  {
    n: 'ND 9.3',
    q: 'Em uma obra candidata ao Minas Trifásico, o que deve ser verificado?',
    a: [
      'Enquadramento no programa, tipologia e normas complementares aplicáveis.',
      'Somente o comprimento da rede.',
      'Apenas a quantidade de postes.',
    ],
    c: 0,
    e: 'O escopo e os critérios específicos do programa devem ser conferidos antes de concluir a solução.',
  },
  {
    n: 'Todas',
    q: 'Como registrar uma referência técnica de forma rastreável?',
    a: [
      'Anotar somente um resumo.',
      'Registrar norma, revisão, item, página ou desenho e condição de aplicação.',
      'Guardar uma captura de tela sem indicar a origem.',
    ],
    c: 1,
    e: 'A rastreabilidade permite localizar e validar o critério na fonte oficial.',
  },
];

export const CHECKS: CheckGroup[] = [
  {
    title: '1. Levantamento e dados',
    items: [
      'Objetivo, escopo e tipo de obra identificados.',
      'Cadastro, planta e condições de campo conferidos.',
      'Traçado, interferências, postes e rede existente verificados.',
    ],
  },
  {
    title: '2. Solução e dimensionamento',
    items: [
      'Configuração da rede e transformador compatíveis com a solução.',
      'Demanda e critérios de dimensionamento elétrico conferidos.',
      'Estruturas, esforços, postes e condições de aplicação verificados.',
      'Afastamentos e requisitos de segurança validados na norma aplicável.',
    ],
  },
  {
    title: '3. Materiais e documentação',
    items: [
      'Tipologia e normas complementares identificadas.',
      'Desenhos e estruturas compatibilizados com a solução.',
      'Materiais e quantidades conferidos com os desenhos.',
      'Orçamento e documentos de entrega revisados.',
      'Revisão normativa e referências oficiais conferidas.',
    ],
  },
];

export const NORMA_NOTIFICATIONS: NormaNotification[] = [
  {
    id: 'notif-01',
    norma: 'ND 3.1',
    title: 'Edição de Julho de 2025 da ND 3.1: Atualização dos Capítulos de Demanda e Dimensionamento',
    date: '10/02/2026',
    type: 'REVISAO_NORMATIVA',
    summary: 'A CEMIG disponibilizou a edição consolidada de 2025 da ND 3.1 organizando os roteiros de levantamento, locação de postes e critérios de cálculo elétrico e mecânico.',
    bulletinCode: 'CEMIG-D/ENG-005/2025',
    read: false,
    changes: [
      {
        item: 'Capítulo 1 e 2 - Levantamento e Demanda',
        previousRule: 'Formulários em planilhas separadas de carga.',
        newRule: 'Roteiro padronizado com cruzamento de dados de campo e cadastro georreferenciado.',
        impact: 'Exige conferência prévia da planta com o sistema GIS antes da locação dos postes.',
      },
    ],
    actionRequired: 'Conferir o roteiro de 7 capítulos antes de protocolar projetos urbanos.',
  },
  {
    id: 'notif-02',
    norma: 'ND 9.3',
    title: 'Programa Minas Trifásico: Diretrizes de Conversão e Escolha de Tipologia',
    date: '15/01/2026',
    type: 'COMUNICADO_TECNICO',
    summary: 'Orientações técnicas para projetos rurais de conversão de redes monofásicas existentes para circuitos trifásicos sob o programa estadual.',
    bulletinCode: 'CEMIG-D/RUR-002/2026',
    read: false,
    changes: [
      {
        item: 'Capítulo 6 - Tipologia Rural',
        previousRule: 'Conversão direta mantendo cruzetas antigas.',
        newRule: 'Avaliação estrutural prévia e substituição por conjuntos trifásicos normatizados.',
        impact: 'Projetos sem recálculo mecânico do poste na nova condição trifásica são devolvidos no APR.',
      },
    ],
    actionRequired: 'Anexar memória de esforços dos postes existentes que serão mantidos no trecho convertido.',
  },
  {
    id: 'notif-03',
    norma: 'ND 2.9',
    title: 'Rede Compacta: Requisitos Construtivos de Acessórios e Espaçadores',
    date: '20/12/2025',
    type: 'ALERTA_CRITICO',
    summary: 'Reforço na fiscalização do uso correto de cabos cobertos e espaçadores losangulares em áreas com interferência de vegetação.',
    bulletinCode: 'CEMIG-OP/FIS-019/2025',
    read: true,
    changes: [
      {
        item: 'Capítulo de Acessórios - Cabos Cobertos',
        previousRule: 'Tratamento genérico de proteção superficial.',
        newRule: 'Alerta explícito: cabo coberto não é isolado e exige respeito às distâncias de segurança.',
        impact: 'Afastamentos a edifícios e solo devem obedecer à tabela da rede compacta sem relaxamento indevido.',
      },
    ],
    actionRequired: 'Verificar se todas as pranchas cotam a distância de 1,50m a janelas e sacadas.',
  },
  {
    id: 'notif-04',
    norma: 'ND 2.1',
    title: 'Afastamentos em Redes Aéreas Urbanas: Conferência Obrigatória de Revisão',
    date: '05/11/2025',
    type: 'CONSULTA_PUBLICA',
    summary: 'Lembrete aos projetistas para confirmação da tabela de afastamentos mínimos de segurança em cruzamentos viários e fachadas prediais.',
    bulletinCode: 'CEMIG-CP-010/2025',
    read: true,
    changes: [
      {
        item: 'Capítulo 3 - Afastamentos Mínimos',
        previousRule: 'Valores memorizados de projetos antigos.',
        newRule: 'Obrigatoriedade de citar o desenho padrão específico na folha de notas gerais.',
        impact: 'Reduz índice de devoluções no sistema WebProjetos.',
      },
    ],
    actionRequired: 'Inserir carimbo padrão citando a revisão e ano da ND 2.1 utilizada.',
  },
];
