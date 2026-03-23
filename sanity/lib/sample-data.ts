import type { EventPost } from "@/sanity/lib/types";

const coverA =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPB9kc4vqM9QZlUhAgEGhxy8pQEcKyC_LDpUyCI1PrPauAOmr62wlfUovhk0Bk7oDIfXs45OIsf4wOmS6y-cj2Vo3UhlIGJ_GI8z6WK8uihqfjqKmWbBN7oqBmFCS0PUrGUseI_uN5waYkQFG2cNbVVad-Ku2owVQfGH8IvBsBWCPfW9lyateEw75_6ZU3iNMY72IYvNwZ__k1x4zAY4A75CHCyOu8UesZjvjs16ekJDGdFpATcUdcfamxkSmD6tfdq1tB_RY1sWQ";
const coverB =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC-fc2eGu4cUGl0WQvzM-E5vJ7NdVLdH7iSEt_ZmCf7GedgU-t6MP8H0f6MLlRV6YfXjpjlp_Cgd7SJwvbbwD2zq2U8E7UB2WAQRBnU4ofU35Qs_U4QYGDWeqEuuk24rTatXduH3gVCjM73Hmi66wAm4mxB61Pulf2BHK18jVGaTku2e5t7o1Y9tegWAA6tyCFLidFf8lbU2XBO0IT_cCuWv443frBdYmRtbk10CAn9IRycwCyV4LP7fvdki6j9rCgr4avGseauUsA";
const coverC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDx1t5VcjUCeOllOPJhyq2lEo479hgwT9FWNq9iQi9s-jRQQ9kfRXG5MLqOAbmN1s_NvtonlUF908Zy1HryK_JaKTok0z_uQywO17TZ7u8MJaQVBvqYgOSF7CFGMaO1jGiXsKPl-dKx2O-D4ALQ68egDGWeekn_6rr86p4WBr_SCv719iQC0pPUK2WaVJa9mkm-cLhZqfLtHWkRYIFRBxLypqMtOvbXP1HabKrcP8_ks2pTevBq__mV5gHBInVq4uhCr-uwA-rXi88";
const coverD =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA4ee_qzG3Xo5weVz8kowndiOZZBseh3VFsxYnarCVgyD3Dtdg8L3m7gWzAYBSbTonthDHi8WRsoOF9fH9RNI4p_3U7JZpSmK-ELek5coL8dGRuAWTJNTj3sxqkyYLnobFGMCZR7XdFv1qEnKvm5cRuI5gy9H5oLbodxVTHo0MlQDfIGXqU5jxsT65zdoqdKoiq4VStm7Dz124Yu723BBMDQ7wjxf_kCbX3YiSEFEUFNz_TAilWsJ_u8NG4LuuqAjXaPf7Sv2J79yw";

export const sampleEvents: EventPost[] = [
  {
    _id: "sample-1",
    title: "Premiação do I Concurso de Redação e Desenho",
    slug: "premiacao-concurso-redacao-desenho",
    eventDate: "2025-12-15T10:00:00-03:00",
    excerpt:
      "A escola sediou a premiação do concurso realizado em parceria com a Unitins, valorizando criatividade, escrita e consciência histórica.",
    location: "Auditório da escola",
    coverImageUrl: coverA,
    coverAlt: "Premiação de concurso escolar",
    galleryCount: 3,
    showOnHome: true,
    body: [],
    fallbackBody: [
      "A premiação reuniu estudantes, educadores e parceiros em um momento de valorização da escrita, da criatividade e do protagonismo estudantil.",
      "Além do registro fotográfico, a atividade reforçou o compromisso da escola com iniciativas que estimulam leitura, produção textual e participação da comunidade escolar.",
    ],
    galleryUrls: [coverA, coverB, coverD],
  },
  {
    _id: "sample-2",
    title: "Parceria Unitins e PIBIC-EM",
    slug: "parceria-unitins-pibic-em",
    eventDate: "2025-10-17T09:00:00-03:00",
    excerpt:
      "A unidade passou a integrar ações de iniciação científica e letramento com bolsas para estudantes do ensino médio.",
    location: "Araguatins - TO",
    coverImageUrl: coverB,
    coverAlt: "Estudantes em atividade de pesquisa",
    galleryCount: 3,
    showOnHome: true,
    body: [],
    fallbackBody: [
      "A parceria com a Unitins ampliou as possibilidades de pesquisa, leitura e produção acadêmica entre os estudantes da escola.",
      "Com ações desse tipo, a comunidade acompanha mais de perto projetos formativos que fortalecem o ensino e incentivam novas trajetórias estudantis.",
    ],
    galleryUrls: [coverB, coverA, coverC],
  },
  {
    _id: "sample-3",
    title: "Reconhecimento por conquistas no esporte",
    slug: "reconhecimento-conquistas-esporte",
    eventDate: "2025-10-21T08:00:00-03:00",
    excerpt:
      "Estudantes e professor da escola receberam votos de aplausos após resultados expressivos no JETs e no JEBs.",
    location: "Tocantins",
    coverImageUrl: coverC,
    coverAlt: "Atividade esportiva escolar",
    galleryCount: 2,
    showOnHome: true,
    body: [],
    fallbackBody: [
      "O reconhecimento público das conquistas no esporte valoriza o empenho dos estudantes e destaca o trabalho desenvolvido dentro e fora da escola.",
      "Registros como este ajudam a preservar a memória institucional e a celebrar resultados que inspiram toda a comunidade escolar.",
    ],
    galleryUrls: [coverC, coverB],
  },
];
