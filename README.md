# Painel de Vendas (Atividade de Faculdade)

Projeto front-end feito com **HTML + CSS + JavaScript puro**, focado em manipulação de DOM para:
- renderizar dados na tabela,
- filtrar e ordenar vendas,
- atualizar resumo dinâmico em tempo real.

## Objetivo da atividade

Construir uma interface para visualizar dados de vendas com:
- filtro,
- ordenação,
- análise rápida por cards de resumo.

---

## Como executar

Como é um projeto estático, você pode abrir de 2 formas:

1. **Live Server (VS Code)**
   - Clique com botão direito em `index.html`
   - `Open with Live Server`

2. **Abrindo o arquivo direto no navegador**
   - Duplo clique em `index.html`

---

## Estrutura do projeto

- `index.html` → estrutura da interface (filtros, tabela e área de resumo)
- `style.css` → visual e responsividade
- `script.js` → lógica do painel (dados, filtros, ordenação e renderização dinâmica)

---

## O que é dinâmico no HTML

No `index.html` existem duas áreas que o JavaScript preenche em tempo real:

- `<section id="summaryCards"></section>`
  - recebe os cards de resumo gerados no JS.

- `<tbody id="salesTableBody"></tbody>`
  - recebe as linhas da tabela de vendas geradas no JS.

Ou seja: o HTML define os "slots", e o JavaScript injeta o conteúdo conforme os filtros.

---

## Explicação do JavaScript (colinha para apresentação)

## 1) Base de dados

No começo do arquivo existe o array `salesData`, com objetos de venda:

- `id`
- `client`
- `product`
- `value`
- `status`
- `date`

Esse array simula dados recebidos do back-end.

## 2) Captura de elementos do DOM

```js
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const sortBy = document.getElementById("sortBy");
const tbody = document.getElementById("salesTableBody");
const summaryCards = document.getElementById("summaryCards");
```

Aqui o script pega os campos de filtro e os containers que serão atualizados.

## 3) Funções utilitárias

- `formatBRL(value)`
  - formata número para moeda brasileira.

- `formatDate(dateStr)`
  - formata data para padrão `pt-BR`.

## 4) Função principal de processamento: `getFilteredAndSortedData()`

Essa função:

1. lê os controles da tela (busca, status e ordenação),
2. filtra o array por texto e por status,
3. ordena por data ou valor (crescente/decrescente),
4. retorna o array final pronto para renderizar.

## 5) Renderização da tabela: `renderTable(data)`

- limpa o `<tbody>`
- se não houver dados, mostra mensagem de vazio
- se houver dados, cria `<tr>` dinamicamente com `createElement` + `innerHTML`

## 6) Resumo dinâmico: `renderSummary(data)`

Calcula e mostra:
- total de vendas,
- valor total,
- valor recebido (status `Pago`),
- quantidade pendente.

## 7) Ciclo de atualização: `updateDashboard()`

```js
function updateDashboard() {
  const data = getFilteredAndSortedData();
  renderTable(data);
  renderSummary(data);
}
```

É a função central do sistema. Sempre que o usuário altera um filtro, ela recalcula e re-renderiza tudo.

## 8) Eventos em tempo real

```js
[searchInput, statusFilter, sortBy].forEach((el) =>
  el.addEventListener("input", updateDashboard)
);
```

Qualquer mudança nos controles dispara atualização imediata do painel.

No final, `updateDashboard();` faz a primeira renderização ao carregar a página.

---

## Resumo rápido para falar ao professor

"Eu separei o painel em três etapas: processar os dados (filtro e ordenação), renderizar tabela e renderizar resumo. A cada mudança do usuário, uma função central atualiza tudo em tempo real com manipulação de DOM."
