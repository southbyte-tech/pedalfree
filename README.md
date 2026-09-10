# PedalFree

Landing page em português para apresentar o projeto e atrair patrocinadores, investidores e apoiadores. Feita em React, TypeScript e Vite, com GSAP, ScrollTrigger, SplitText e Canvas 2D.

## Executar

Requer Node.js 22.12+ (desenvolvido com Node 24).

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`. Para gerar os arquivos de publicação:

```bash
npm run build
npm run preview
```

O resultado está em `dist/` e pode ser hospedado como site estático. Nenhum serviço externo é necessário para fontes, imagens ou animações em produção.

## O que está implementado

- Abertura com e-bike conceitual, tipografia animada por palavras e parallax em camadas.
- Manifesto com revelação progressiva de texto durante o scroll.
- Comunidade de ciclistas que se expande com o scroll, inspirada no vídeo enviado. O visitante também pode controlar o número de pessoas por slider, com suporte a teclado.
- Simulação explícita de e-bikes, trajetos e horas de atividade. Premissas em `src/lib/impact.ts`; os valores não são resultados atuais nem projeções de alcance da marca.
- Expansão da fotografia ao rolar, cartões com ilustrações animadas e três conceitos interativos para campanhas nos pontos de ônibus.
- Crédito à Woie e menção ao apoio de Unidavi, Cinf e Unimed, conforme o briefing. Os nomes são apresentados como texto; arquivos de logotipos oficiais não foram fornecidos.
- Apresentações específicas para patrocinadores, investidores e parceiros.
- FAQ, menu para celular, formulário com validação, diálogo com foco contido e retorno de foco, redução de movimento e controle para pausar animações.

## Contato

O briefing não informa o destino dos contatos. Por isso, a versão inicial prepara uma apresentação real para o visitante copiar ou baixar como `.txt`; a interface informa que nada foi enviado. Não existe simulação de cadastro bem-sucedido, banco de leads ou transmissão automática.

Para habilitar os canais, copie `.env.example` para `.env.local` e preencha pelo menos um valor:

```dotenv
VITE_CONTACT_EMAIL=seu-email@dominio.com.br
VITE_CONTACT_WHATSAPP=5547999999999
```

Reinicie o servidor ou gere um novo build. A tela de apresentação passará a oferecer e-mail e/ou WhatsApp com a mensagem preenchida; o visitante confirma o envio no aplicativo escolhido. Variáveis `VITE_*` ficam públicas no navegador, portanto não coloque segredos nelas.

## Verificação

```bash
npm run lint
npm run build
npx playwright install chromium
npm test
```

Testes de navegador em desktop e celular cobrem slider e cálculos, navegação, campanhas, FAQ, validação, download da apresentação, retorno de foco e auditoria de acessibilidade com axe. O projeto respeita `prefers-reduced-motion` e adapta as seções fixas a telas pequenas e a janelas baixas.

## Personalizar

| Arquivo | Conteúdo |
| --- | --- |
| `src/App.tsx` | Seções, textos, FAQ, campanhas e parceiros |
| `src/styles.css` | Identidade visual, composição e responsividade |
| `src/components/ImpactSection.tsx` | Narrativa com scroll e controle de apoio |
| `src/components/ui/CrowdCanvas.tsx` | Desenho e expansão dos ciclistas |
| `src/lib/impact.ts` | Premissas do simulador |
| `src/components/ContactDialog.tsx` | Formulário e apresentação para contato |
| `public/images/` | Imagens conceituais locais e otimizadas |
| `docs/design-notes.md` | Decisões e referências utilizadas |
| `docs/image-prompts.md` | Proveniência das imagens e prompts completos |

Nome, preço, regras de acesso, especificações da bicicleta e data de operação ainda precisam de definição pelo projeto. A página apresenta uma proposta em desenvolvimento e não promete gratuidade, resultados médicos ou retorno financeiro. Configure o canal de contato antes de usar a LP em campanhas de captação.
