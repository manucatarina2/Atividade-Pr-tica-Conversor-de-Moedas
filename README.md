#  Conversor Global de Moedas

Aplicação web desenvolvida em React para conversão de moedas em tempo real, visualização do histórico de cotações e exibição de notícias financeiras relacionadas às moedas selecionadas.

##  Sobre o Projeto

O Conversor Global de Moedas foi desenvolvido como atividade prática com o objetivo de integrar:

* Consumo de APIs externas
* Gerenciamento de estado no React
* Tratamento de erros e carregamento
* Visualização de dados através de gráficos
* Desenvolvimento de interfaces modernas e responsivas

A aplicação permite converter valores entre diversas moedas internacionais, acompanhar a variação histórica da cotação e visualizar notícias relacionadas ao mercado financeiro.

---

##  Funcionalidades

###  Conversão de Moedas

* Conversão em tempo real.
* Seleção de moeda de origem e destino.
* Atualização automática dos valores.
* Suporte para diversas moedas internacionais.

###  Histórico de Cotações

* Exibição gráfica da variação cambial.
* Consulta de dados históricos.
* Atualização dinâmica conforme o par de moedas selecionado.
* Visualização dos últimos dias de negociação.

###  Notícias Financeiras

* Notícias relacionadas à moeda selecionada.
* Exibição de:

  * Título
  * Fonte
  * Data
  * Link para leitura completa

###  Tratamento de Estados

* Indicadores de carregamento.
* Mensagens de erro amigáveis.
* Funcionamento independente dos módulos da aplicação.

---

##  Tecnologias Utilizadas

* React
* Vite
* JavaScript
* Tailwind CSS
* Axios
* Recharts
* Framer Motion

---

##  APIs Utilizadas

### Frankfurter API

Responsável pela obtenção das cotações e histórico de moedas.

Recursos utilizados:

* Cotação atual
* Histórico de cotações
* Lista de moedas disponíveis

### GNews API

Responsável pela busca de notícias relacionadas às moedas e ao mercado financeiro.

---

##  Estrutura do Projeto

```bash
src/
│
├── components/
│   ├── CurrencyConverter.jsx
│   ├── CurrencyChart.jsx
│   └── CurrencyNews.jsx
│
├── assets/
│
├── App.jsx
├── main.jsx
└── index.css
```

---

##  Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/manucatarina2/Atividade-Pr-tica-Conversor-de-Moedas.git
```

### 2. Entrar na pasta

```bash
cd Atividade-Pr-tica-Conversor-de-Moedas
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_GNEWS_API_KEY=SUA_CHAVE_AQUI
```

### 5. Executar o projeto

```bash
npm run dev
```

---

## 📸 Funcionalidades Demonstradas

✔ Conversão de moedas em tempo real

✔ Histórico de cotações em gráfico

✔ Notícias financeiras atualizadas

✔ Interface responsiva

✔ Consumo de APIs externas

✔ Tratamento de erros e carregamento

---

##  Objetivos de Aprendizagem

Este projeto foi desenvolvido para praticar:

* React Hooks
* Componentização
* Consumo de APIs REST
* Manipulação de estados
* Visualização de dados
* Responsividade
* Boas práticas de desenvolvimento Front-End

---

##  Autora

**Manuela Catarina Vitório dos Santos**

Projeto desenvolvido para fins acadêmicos e de aprendizado.
