// Banco de conteúdo do app Endolaser — baseado no repositório sem-varizes (Método Sem Varizes / Dr. José Rosa)
// Educacional. Conduta ética: explicar expectativas, nunca prometer resultado.

const TRILHA = [
  {
    id: "l1", titulo: "Fundamentos do Endolaser", icone: "🔬",
    questions: [
      { q: "O que é o endolaser?",
        opts: ["Terapia endovenosa a laser: fecha a veia doente por dentro com energia do laser",
                "Cirurgia aberta que remove a veia pela pele",
                "Uma pomada que dissolve as varizes"],
        correct: 0,
        exp: "Endolaser = terapia endovenosa a laser. A veia é tratada por dentro, com a energia do laser, de forma minimamente invasiva." },
      { q: "O endolaser é um procedimento:",
        opts: ["Minimamente invasivo", "Cirurgia de grande porte com internação longa", "Apenas estético, sem efeito na veia"],
        correct: 0,
        exp: "É minimamente invasivo, com recuperação mais rápida que a cirurgia aberta." },
      { q: "O endolaser trata a veia:",
        opts: ["Por dentro (endovenoso), guiado por ultrassom", "Por fora, cortando a pele em vários pontos", "Com massagem e meia elástica apenas"],
        correct: 0,
        exp: "É um procedimento endovenoso: trata a veia por dentro, guiado por ultrassom." },
      { q: "Antes de indicar o endolaser, o exame essencial é:",
        opts: ["Eco-Doppler venoso (ultrassom das veias)", "Raio-X da perna", "Apenas olhar a pele"],
        correct: 0,
        exp: "O ultrassom/eco-Doppler mostra o mapa real: qual veia tem refluxo e calibre. Sem ele, trata-se só o que aparece e a variz volta." }
    ]
  },
  {
    id: "l2", titulo: "Como funciona", icone: "💡",
    questions: [
      { q: "O que é inserido na veia durante o endolaser?",
        opts: ["Uma fibra óptica muito fina", "Uma agulha grossa de metal", "Um balão inflável"],
        correct: 0,
        exp: "Uma fibra óptica fina é inserida por uma pequena incisão e guiada até a veia por ultrassom." },
      { q: "A fibra é guiada até a veia usando:",
        opts: ["Ultrassom", "Ressonância magnética", "Apenas o toque das mãos"],
        correct: 0,
        exp: "O ultrassom guia a fibra com precisão até o segmento doente." },
      { q: "O calor do laser faz com que a veia:",
        opts: ["Tenha a parede danificada, colapse e feche", "Seja removida inteira na hora", "Fique maior e mais cheia"],
        correct: 0,
        exp: "O calor danifica a parede da veia, fazendo-a colapsar e fechar (ablação)." },
      { q: "A energia do laser é aplicada enquanto a fibra é:",
        opts: ["Retirada lentamente", "Empurrada rapidamente para dentro", "Deixada parada no mesmo ponto"],
        correct: 0,
        exp: "O laser é ativado e a fibra é recuada lentamente, tratando o trajeto insuficiente." },
      { q: "Depois que a veia doente é selada, o sangue:",
        opts: ["É naturalmente desviado para veias saudáveis", "Para de circular na perna", "Fica preso sem saída"],
        correct: 0,
        exp: "O organismo redireciona o fluxo para as veias saudáveis." }
    ]
  },
  {
    id: "l3", titulo: "Indicação e critério", icone: "🎯",
    questions: [
      { q: "O endolaser é mais indicado para veias:",
        opts: ["De médio a grande calibre, com refluxo", "Apenas microvasinhos finos na superfície", "Totalmente saudáveis"],
        correct: 0,
        exp: "O endolaser atua em troncos/veias com refluxo. Microvasinhos finos têm outra técnica." },
      { q: "No Método Sem Varizes, a sequência correta é:",
        opts: ["Mapa (ultrassom) → Critério (técnica certa) → Segurança (protocolo)",
                "Tratar primeiro o que aparece na pele",
                "Escolher a técnica sem exame"],
        correct: 0,
        exp: "Mapa, Critério e Segurança: ultrassom mostra a causa, o critério escolhe a técnica, o protocolo garante a segurança." },
      { q: "Para microvasinhos finos superficiais, a técnica geralmente indicada é:",
        opts: ["Microlaser", "Endolaser de tronco", "Cirurgia aberta"],
        correct: 0,
        exp: "Cada caso, uma técnica: microlaser para vasinhos finos; endolaser/espuma para troncos com refluxo." },
      { q: "Tratar só o vasinho que aparece na pele, sem ultrassom, tende a:",
        opts: ["Fazer a variz voltar (recidiva)", "Curar de forma definitiva", "Nunca mais ter problema"],
        correct: 0,
        exp: "Se há uma veia com pressão alta alimentando por baixo, tratar só a superfície faz voltar." },
      { q: "Com refluxo venoso profundo ou veia de grande calibre, indicar microlaser é:",
        opts: ["Inadequado — não resolve a causa", "Sempre a melhor escolha"],
        correct: 0,
        exp: "Sem critério, indicar microlaser nesses casos só gera gasto e frustração." }
    ]
  },
  {
    id: "l4", titulo: "Procedimento e pós", icone: "🩺",
    questions: [
      { q: "O endolaser de safena costuma ser feito sob:",
        opts: ["Anestesia local (em ambiente hospitalar)", "Anestesia geral obrigatória", "Sem nenhuma anestesia"],
        correct: 0,
        exp: "Em geral anestesia local, com monitorização, em ambiente hospitalar." },
      { q: "Logo após o procedimento, recomenda-se:",
        opts: ["Deambulação precoce (andar logo)", "Repouso absoluto por 15 dias"],
        correct: 0,
        exp: "Deambular logo após ajuda a recuperação; alta costuma ser no mesmo dia." },
      { q: "No pós-operatório é comum o uso de:",
        opts: ["Meias de compressão graduada", "Gesso na perna", "Tala rígida"],
        correct: 0,
        exp: "Meias elásticas de compressão graduada e acompanhamento ecográfico seriado." },
      { q: "A alta hospitalar após o endolaser costuma ser:",
        opts: ["No mesmo dia", "Após uma semana internado"],
        correct: 0,
        exp: "Procedimento minimamente invasivo: deambulação precoce e alta no mesmo dia." },
      { q: "Comparada à cirurgia aberta, a recuperação do endolaser é:",
        opts: ["Mais rápida, com menos dor", "Mais lenta e dolorosa"],
        correct: 0,
        exp: "Menos dor e retorno mais rápido às atividades." }
    ]
  },
  {
    id: "l5", titulo: "Casos, laudo e termos", icone: "📋",
    questions: [
      { q: "\"Refluxo da veia safena magna até o terço distal\" indica:",
        opts: ["Insuficiência venosa a ser corrigida", "Uma veia totalmente saudável"],
        correct: 0,
        exp: "Refluxo = válvulas falhando, sangue voltando; é a insuficiência que se corrige." },
      { q: "A \"junção safenofemoral\" é:",
        opts: ["O ponto onde a safena magna deságua na veia femoral", "Uma pequena veia do pé"],
        correct: 0,
        exp: "É a junção da safena magna com o sistema venoso profundo (femoral) — referência importante no tratamento." },
      { q: "Endolaser combinado com espuma ecoguiada no mesmo planejamento é:",
        opts: ["Possível (tratamento combinado)", "Proibido em qualquer caso"],
        correct: 0,
        exp: "Pode-se usar endolaser em um segmento e espuma ecoguiada no refluxo residual/tributárias." },
      { q: "EHIT (trombo induzido por calor endovenoso) é:",
        opts: ["Uma possível complicação a monitorar no pós", "O nome do aparelho de laser"],
        correct: 0,
        exp: "É uma complicação possível da ablação térmica — por isso o acompanhamento ecográfico." },
      { q: "Sobre resultados, a conduta ética é:",
        opts: ["Explicar expectativas, sem prometer cura garantida", "Garantir 100% de resultado para todos"],
        correct: 0,
        exp: "Nunca prometer resultado. Educa-se com expectativas realistas e segurança." }
    ]
  }
];

const FLASHCARDS = [
  ["Endolaser (EVLA)", "Ablação térmica endovenosa: fecha a veia doente por dentro com energia do laser, guiado por ultrassom."],
  ["Eco-Doppler venoso", "Ultrassom que mapeia refluxo e calibre das veias. É ele que define a técnica certa."],
  ["Refluxo venoso", "Sangue voltando pela veia por falha das válvulas — a causa das varizes."],
  ["Veia safena magna", "Principal veia superficial da perna; alvo comum do endolaser quando tem refluxo."],
  ["Junção safenofemoral", "Ponto onde a safena magna deságua na veia femoral (sistema profundo)."],
  ["Fibra óptica", "Filamento fino que leva a energia do laser para dentro da veia."],
  ["Espuma ecoguiada", "Escleroterapia com espuma guiada por ultrassom; pode complementar o endolaser."],
  ["Microlaser", "Técnica para microvasinhos finos superficiais — não para troncos com refluxo."],
  ["EHIT", "Trombo induzido por calor endovenoso: complicação possível a monitorar no pós."],
  ["Deambulação precoce", "Andar logo após o procedimento — ajuda na recuperação."],
  ["CEAP", "Classificação clínica da insuficiência venosa (C0 a C6)."],
  ["Método Sem Varizes", "Mapa (ultrassom) → Critério (técnica certa) → Segurança (protocolo)."]
];
