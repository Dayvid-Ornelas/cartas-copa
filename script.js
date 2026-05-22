const salesData = [
  { id: 1, client: "Ornelas Tech", product: "Landing Page", value: 1800, status: "Pago", date: "2026-05-20" },
  { id: 2, client: "Elite Fitness", product: "CRM Módulo Leads", value: 3200, status: "Pendente", date: "2026-05-21" },
  { id: 3, client: "Mercado Sol", product: "Identidade Visual", value: 900, status: "Pago", date: "2026-05-16" },
  { id: 4, client: "Studio Nova", product: "Gestão de Tráfego", value: 2500, status: "Cancelado", date: "2026-05-14" },
  { id: 5, client: "Casa Lima", product: "Site Institucional", value: 2100, status: "Pago", date: "2026-05-22" },
  { id: 6, client: "Alpha Odonto", product: "Automação WhatsApp", value: 1500, status: "Pendente", date: "2026-05-19" },
  { id: 7, client: "Café Aurora", product: "Cardápio Digital", value: 700, status: "Pago", date: "2026-05-18" },
  { id: 8, client: "Bela Estética", product: "Pacote Social", value: 1300, status: "Pendente", date: "2026-05-15" }
];

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const sortBy = document.getElementById("sortBy");
const tbody = document.getElementById("salesTableBody");
const summaryCards = document.getElementById("summaryCards");

function formatBRL(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("pt-BR");
}

function getFilteredAndSortedData() {
  const term = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  const sort = sortBy.value;

  let data = salesData.filter((sale) => {
    const matchesSearch =
      sale.client.toLowerCase().includes(term) || sale.product.toLowerCase().includes(term);
    const matchesStatus = status === "all" || sale.status === status;
    return matchesSearch && matchesStatus;
  });

  data.sort((a, b) => {
    switch (sort) {
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "value-asc":
        return a.value - b.value;
      case "value-desc":
        return b.value - a.value;
      default:
        return 0;
    }
  });

  return data;
}

function renderTable(data) {
  tbody.innerHTML = "";

  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty">Nenhuma venda encontrada.</td></tr>`;
    return;
  }

  for (const sale of data) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>#${sale.id}</td>
      <td>${sale.client}</td>
      <td>${sale.product}</td>
      <td>${formatBRL(sale.value)}</td>
      <td class="status ${sale.status}">${sale.status}</td>
      <td>${formatDate(sale.date)}</td>
    `;
    tbody.appendChild(row);
  }
}

function renderSummary(data) {
  const totalSales = data.length;
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);
  const paidValue = data.filter((item) => item.status === "Pago").reduce((acc, item) => acc + item.value, 0);
  const pendingCount = data.filter((item) => item.status === "Pendente").length;

  summaryCards.innerHTML = `
    <article class="card">
      <p class="label">Total de vendas</p>
      <p class="value">${totalSales}</p>
    </article>
    <article class="card">
      <p class="label">Valor total</p>
      <p class="value">${formatBRL(totalValue)}</p>
    </article>
    <article class="card">
      <p class="label">Recebido (Pago)</p>
      <p class="value">${formatBRL(paidValue)}</p>
    </article>
    <article class="card">
      <p class="label">Pendentes</p>
      <p class="value">${pendingCount}</p>
    </article>
  `;
}

function updateDashboard() {
  const data = getFilteredAndSortedData();
  renderTable(data);
  renderSummary(data);
}

[searchInput, statusFilter, sortBy].forEach((el) => el.addEventListener("input", updateDashboard));

updateDashboard();
