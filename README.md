# Jogo da Memória

## 📝 Descrição

Um jogo da memória interativo desenvolvido com tecnologias web modernas.

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado
- NPM ou Yarn

### Instalação

```bash
Clone o repositório
git clone [url-do-seu-repositorio]
Entre na pasta do projeto
cd [nome-da-pasta]
Instale as dependências
npm install
ou
yarn install
```

### Executando o Projeto

#### Modo Desenvolvimento

```bash
npm run dev
ou
yarn dev
```

#### Modo Produção

```bash
Fazer o build
npm run build
ou
yarn build
Executar versão de produção
npm start
ou
yarn start
```

## 📁 Estrutura do Projeto

### Imagens do Jogo

- Coloque suas imagens na pasta `public/images/`
- Use imagens de dimensões consistentes (recomendado: 100x100px)

### Personalização

- Edite as paletas de cores em `src/styles/theme.ts`
- Ajuste as dicas e referências do jogo no componente `src/components/reference-sidebar/index.tsx`

## 📜 Regras do Jogo

1. O jogo começa com todas as cartas viradas para baixo
2. O jogador pode virar duas cartas por vez
3. Se as cartas forem iguais, elas permanecem viradas
4. Se forem diferentes, elas são viradas para baixo novamente
5. O objetivo é encontrar todos os pares de cartas
6. O jogo termina quando todos os pares forem encontrados
7. Pontuação é baseada no número de tentativas e tempo gasto

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Por favor, leia o guia de contribuição antes de submeter alterações.

## 📞 Contato

Delfim Celestino - delfimcelestinoamissepastola@gmail.com

Link do Projeto: https://blind-code.vercel.app/
