# Golden Raspberry Awards API

Esta aplicação permite consultar informações sobre produtores vencedores do prêmio "Pior Filme" do Golden Raspberry Awards.

## Requisitos

- Node.js v18 ou superior
- npm ou yarn

## Como executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/swirfneblin/ws-rest-movelist.git
   cd ws-rest-movelist
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute a aplicação:
   ```bash
   npm start
   ```

A API estará disponível em `http://localhost:3000`.

## Endpoints

### GET producers/intervals

Retorna os menores e maiores intervalos entre prêmios consecutivos dos produtores vencedores.

## Testes

Para rodar os testes de integração:

```bash
npm test
```
