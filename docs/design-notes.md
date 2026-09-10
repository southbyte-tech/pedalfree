# Direção visual e referências

## Conceito

“O futuro vai de bike.” Verde floresta (`#173d32`), lima (`#d1ee87`) e papel (`#f4f3ed`) relacionam mobilidade urbana, energia e uma rotina mais ativa. Manrope nos títulos, DM Sans na leitura e serifas itálicas em palavras de destaque. As fontes e imagens são servidas pelo próprio projeto.

## Materiais locais examinados

- `/home/lucas/Downloads/Sites Design.pdf`: componente de mídia que se expande durante o scroll e cartões com conexões animadas.
- `/home/lucas/Downloads/Sites Design-1.pdf`: camadas de parallax, seções fixas, animações com atraso entre elementos, transições e interações.
- `/home/lucas/Downloads/3b70a510-4988-4d3d-9908-f0f35d91af82.mp4`: aproximadamente 19 segundos. A referência mostra um pequeno grupo de pessoas crescendo até formar uma multidão, com um controle numérico. Foram inspecionados quadros ao longo do vídeo.

As referências foram reinterpretadas para este projeto em React/Vite. A animação de expansão é código nativo em Canvas 2D: cada figura representa uma pessoa em uma e-bike, com roupa e pele variadas, capacete, bicicleta e movimento dos pedais. O código controla a disposição em espiral, profundidade, entrada das figuras e aproximação da câmera conforme a comunidade cresce.

Não é necessário carregar o MP4 original na página. Isso permite que a cena acompanhe o controle interativo e os números da simulação. O áudio e os elementos visuais do vídeo original não foram reutilizados.

O scroll usa a navegação nativa, sem interceptar a roda do mouse ou os gestos de toque. As cenas fixas são desativadas em telas pequenas, janelas baixas e no modo de movimento reduzido.

## Referências online

- [SplitText com elementos ignorados — GreenSock](https://codepen.io/GreenSock/pen/JojaebV): referência de animação de palavras. A abertura usa uma composição própria com SplitText e mascaramento de palavras.
- [Segundo exemplo GreenSock fornecido](https://codepen.io/GreenSock/pen/JoRZaLY): o acesso automatizado retornou erro; nenhum comportamento específico foi presumido a partir desse link.
- [ScrollTrigger — documentação oficial GSAP](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): implementação de animações ligadas ao scroll e callbacks do simulador.
- [gsap.matchMedia — documentação oficial GSAP](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/): contexto e limpeza de animações.
- [Acqua.Tís](https://acquatis.com/): referência fornecida para a ideia de marcas viabilizando acesso e presença na vida real. O texto do PedalFree é próprio; preços e resultados de outra empresa não foram transferidos para o projeto.

## Conteúdo e limites

- Woie: idealização e convite ao grupo para desenvolver o projeto.
- Unidavi, Cinf e Unimed: apoio informado no briefing, sem níveis de patrocínio inventados.
- Acesso: apoio de marcas para facilitar o acesso às e-bikes; preço e subsídio ainda em definição.
- Números: cenário ilustrativo, 1 pessoa por e-bike, 22 dias por mês, 2 trajetos e 30 minutos de pedal por dia. São cenários de uso, não garantia de adesão, saúde ou publicidade.
- Imagens: conceitos criados para a LP, não fotografias da frota ou de participantes reais.
- Campanhas: três prévias de pôsteres; locais, autorizações, QR code e condições comerciais precisam ser definidos para uma campanha real.
- Formulário: funciona como preparação de apresentação para copiar ou baixar enquanto o canal oficial não está configurado. Nenhum contato é transmitido automaticamente.
