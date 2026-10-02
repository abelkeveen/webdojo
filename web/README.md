# Automação de Testes Web — Webdojo

Projeto de **testes automatizados para a aplicação Webdojo**, desenvolvido com [Cypress](https://www.cypress.io/).

O objetivo do projeto é automatizar cenários de teste da aplicação Webdojo, permitindo validar funcionalidades de forma rápida, repetível e confiável, além de facilitar a execução dos testes em diferentes resoluções.

---

## 📋 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Executando a aplicação Webdojo](#-executando-a-aplicação-webdojo)
- [Executando os testes](#-executando-os-testes)
  - [Todos os testes](#executar-todos-os-testes)
  - [Cypress em modo interativo](#executar-o-cypress-em-modo-interativo)
  - [Testes de Login](#executar-apenas-os-testes-de-login)
  - [Teste de Login em dispositivo móvel](#executar-o-teste-de-login-em-dispositivo-móvel)
- [Organização dos testes](#-organização-dos-testes)
- [Fixtures](#-fixtures)
- [Actions e comandos customizados](#-actions-e-comandos-customizados)
- [Boas práticas](#-boas-práticas)

---

## 🎯 Sobre o projeto

Este projeto utiliza o **Cypress** para automação de testes end-to-end (E2E) da aplicação Webdojo.

A automação contempla a organização dos testes por funcionalidade, utilização de **fixtures** para dados de teste e criação de **comandos e actions reutilizáveis**, buscando manter os testes simples, legíveis e fáceis de manter.

A aplicação Webdojo está localizada no **mesmo repositório** do projeto de automação. Por esse motivo, antes de executar os testes é necessário iniciar a aplicação localmente.

---

## 🛠 Tecnologias utilizadas

- **Cypress** — automação de testes E2E
- **JavaScript** — linguagem utilizada nos testes e comandos
- **Node.js / npm** — gerenciamento do projeto e execução dos scripts
- **Webdojo** — aplicação utilizada como sistema sob teste

---

## 📁 Estrutura do projeto

A estrutura principal relacionada à automação está organizada da seguinte forma:

```text
web/
├── cypress/
│   ├── e2e/
│   │   └── *.cy.js
│   │
│   ├── fixtures/
│   │   ├── cep.json
│   │   ├── consultancy.json
│   │   └── document.pdf
│   │
│   └── support/
│       ├── actions/
│       │   └── consultancy.actions.js
│       │
│       ├── commands.js
│       ├── e2e.js
│       └── utils.js
│
├── package.json
└── ...
```

### `cypress/e2e`

Contém os arquivos de especificação dos testes automatizados.

Os arquivos seguem a convenção:

```text
nome-do-cenario.cy.js
```

Exemplo:

```text
login.cy.js
consultancy.cy.js
```

Cada arquivo pode conter um ou mais cenários relacionados a uma determinada funcionalidade da aplicação.

### `cypress/fixtures`

Contém dados e arquivos utilizados durante os testes.

Atualmente, o projeto possui:

- `cep.json` — dados relacionados a CEP utilizados nos cenários;
- `consultancy.json` — massa de dados utilizada nos testes do formulário de consultoria;
- `document.pdf` — arquivo utilizado em cenários que necessitam de upload de documento.

O uso de fixtures permite separar os **dados de teste** da lógica dos cenários automatizados.

### `cypress/support`

Contém configurações e recursos compartilhados entre os testes.

#### `actions/`

Armazena actions reutilizáveis para operações específicas da aplicação.

Exemplo:

```text
consultancy.actions.js
```

A ideia é centralizar operações mais complexas ou recorrentes, evitando duplicação de código nos arquivos de teste.

#### `commands.js`

Contém **comandos customizados do Cypress**, utilizados para encapsular comportamentos reutilizáveis.

Por exemplo, comandos relacionados a:

```javascript
cy.login()
cy.goTo(...)
```

Isso permite que os testes tenham uma escrita mais simples e próxima da linguagem do negócio.

#### `e2e.js`

Arquivo de suporte carregado pelo Cypress antes da execução dos testes E2E.

É utilizado para configurações e imports globais necessários para a automação.

#### `utils.js`

Contém funções utilitárias que podem ser reutilizadas em diferentes partes da automação.

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- **Node.js**
- **npm**

Para verificar as versões instaladas:

```bash
node --version
npm --version
```

---

## 📦 Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd <PASTA_DO_PROJETO>
```

Instale as dependências:

```bash
npm install
```

> A instalação deve ser realizada antes da primeira execução dos testes.

---

## 🚀 Executando a aplicação Webdojo

Como a aplicação Webdojo está no **mesmo repositório** dos testes, primeiro é necessário iniciar o servidor local.

Execute:

```bash
npm run dev
```

Esse comando inicia a aplicação utilizando:

```bash
serve -s dist -p 3000
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

### Fluxo recomendado

Para executar os testes, mantenha o servidor da aplicação em execução:

**Terminal 1 — Aplicação Webdojo**

```bash
npm run dev
```

**Terminal 2 — Testes Cypress**

```bash
npm test
```

Dessa forma, o Cypress consegue acessar a aplicação que está sendo executada localmente.

---

# 🧪 Executando os testes

O projeto possui scripts npm para facilitar a execução dos testes.

| Comando | Descrição |
|---|---|
| `npm test` | Executa todos os testes em modo headless com viewport de `1440x900` |
| `npm run test:ui` | Abre o Cypress em modo interativo |
| `npm run test:login` | Executa somente os testes de login em `1440x900` |
| `npm run test:login:mobile` | Executa somente os testes de login em `414x896` |

---

## Executar todos os testes

Para executar toda a suíte de testes:

```bash
npm test
```

Esse comando executa:

```bash
npx cypress run --config viewportWidth=1440,viewportHeight=900
```

A execução ocorre em modo **headless**, sendo adequada para execução automatizada e pipelines de CI/CD.

A resolução utilizada é:

```text
Largura: 1440px
Altura: 900px
```

---

## Executar o Cypress em modo interativo

Para abrir a interface do Cypress:

```bash
npm run test:ui
```

Esse comando executa:

```bash
npx cypress open
```

O modo interativo é recomendado durante o desenvolvimento e manutenção dos testes, pois permite selecionar e executar os cenários individualmente e acompanhar a execução no navegador.

---

## Executar apenas os testes de Login

Para executar somente o arquivo de testes de login:

```bash
npm run test:login
```

Esse comando utiliza:

```bash
npx cypress run \
  --spec cypress/e2e/login.cy.js \
  --config viewportWidth=1440,viewportHeight=900
```

A execução utiliza a resolução:

```text
1440x900
```

---

## Executar o teste de Login em dispositivo móvel

Para executar os testes de login utilizando uma resolução mobile:

```bash
npm run test:login:mobile
```

O comando utiliza:

```bash
npx cypress run \
  --spec cypress/e2e/login.cy.js \
  --config viewportWidth=414,viewportHeight=896
```

A resolução utilizada é:

```text
414x896
```

Esse cenário permite validar o comportamento da tela de login em uma viewport compatível com dispositivos móveis.

---

# 🧩 Organização dos testes

Os testes são organizados por funcionalidade dentro da pasta:

```text
cypress/e2e/
```

A recomendação é manter cada arquivo relacionado a uma funcionalidade ou fluxo específico da aplicação.

Exemplo:

```text
cypress/e2e/
├── login.cy.js
├── consultancy.cy.js
└── ...
```

Um teste pode seguir uma estrutura semelhante a:

```javascript
describe('Funcionalidade', () => {

  beforeEach(() => {
    // Pré-condições
  })

  it('Deve executar determinado fluxo', () => {
    // Ações
    // Validações
  })

})
```

---

# 🗃️ Fixtures

As fixtures são utilizadas para armazenar dados que serão consumidos pelos testes.

Por exemplo, uma massa de dados pode ser mantida em:

```text
cypress/fixtures/consultancy.json
```

Isso evita colocar grandes quantidades de dados diretamente dentro dos arquivos `.cy.js`.

Uma estrutura de fixture pode ser organizada por contexto:

```json
{
  "personal": {},
  "company": {}
}
```

Dessa forma, o teste pode carregar diferentes massas de dados de acordo com o cenário.

### Benefícios

- Separação entre dados e lógica do teste;
- Reutilização de massas;
- Maior legibilidade;
- Facilidade para manutenção;
- Possibilidade de utilizar diferentes dados para diferentes cenários.

---

# ♻️ Actions e comandos customizados

Para evitar repetição de código, o projeto utiliza recursos reutilizáveis.

### Actions

As actions ficam em:

```text
cypress/support/actions/
```

Exemplo:

```text
consultancy.actions.js
```

As actions podem encapsular fluxos compostos por várias interações com a aplicação.

### Custom Commands

Os comandos customizados ficam em:

```text
cypress/support/commands.js
```

Exemplo de utilização:

```javascript
cy.login()
cy.goTo('Formulários', 'Consultoria')
```

Essa abordagem deixa o teste mais próximo de uma descrição do comportamento esperado:

```javascript
beforeEach(() => {
  cy.login()
  cy.goTo('Formulários', 'Consultoria')
})
```

Em vez de repetir todos os detalhes de implementação em cada cenário.

---

# ✅ Boas práticas

Algumas práticas adotadas no projeto:

### 1. Separar dados de teste da implementação

Utilizar `fixtures` para massas de dados sempre que fizer sentido:

```text
cypress/fixtures/
```

### 2. Reutilizar comportamentos

Quando uma operação é utilizada em vários testes, considerar transformá-la em:

- Custom Command;
- Action;
- Função utilitária.

### 3. Evitar duplicação

Evitar repetir sequências de comandos iguais em vários cenários.

### 4. Nomear os testes de forma clara

Preferir descrições que expliquem o comportamento esperado:

```javascript
it('Deve solicitar consultoria Individual', () => {
  // ...
})
```

### 5. Manter os testes independentes

Sempre que possível, cada teste deve conseguir ser executado de forma independente dos demais.

### 6. Validar o comportamento esperado

Os testes devem possuir asserções que comprovem se o resultado obtido corresponde ao resultado esperado.

### 7. Utilizar diferentes resoluções quando necessário

Além da execução padrão em:

```text
1440x900
```

o projeto possui uma execução específica para login em:

```text
414x896
```

permitindo também verificar o comportamento da aplicação em uma viewport mobile.

---

# 🔄 Fluxo de execução

O fluxo básico para executar a automação é:

```text
┌──────────────────────────┐
│  Instalar dependências   │
│      npm install         │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  Iniciar Webdojo         │
│      npm run dev         │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  Executar Cypress        │
│      npm test            │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  Testes automatizados    │
│  E2E da aplicação Web    │
└──────────────────────────┘
```

---

# 📌 Scripts disponíveis

No `package.json`, os scripts relacionados ao projeto são:

```json
{
  "scripts": {
    "dev": "serve -s dist -p 3000",
    "test": "npx cypress run --config viewportWidth=1440,viewportHeight=900",
    "test:ui": "npx cypress open",
    "test:login": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=1440,viewportHeight=900",
    "test:login:mobile": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=414,viewportHeight=896"
  }
}
```

---

## 👨‍💻 Autor

**Abel Keven Oliveira da Silva**

Projeto desenvolvido para prática e evolução em **Qualidade de Software (QA)** e **Automação de Testes**, utilizando Cypress e JavaScript.

---
