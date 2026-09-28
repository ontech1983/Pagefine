// Carrega os gastos armazenados no navegador ou inicia com uma lista vazia
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const form = document.getElementById('finance-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const expenseList = document.getElementById('expense-list');
const totalMonthEl = document.getElementById('total-month');

// Preenche o campo de data com o dia de hoje por padrão
if (dateInput) {
  dateInput.value = new Date().toISOString().split('T')[0];
}

// Converte a data do formato AAAA-MM-DD para DD/MM/AAAA
function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

// Atualiza a tabela na tela e recalcula o total acumulado
function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach((expense) => {
    total += parseFloat(expense.amount);

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${formatDate(expense.date)}</td>
      <td>${expense.desc}</td>
      <td>${expense.category}</td>
      <td>R$ ${parseFloat(expense.amount).toFixed(2).replace('.', ',')}</td>
    `;
    expenseList.appendChild(row);
  });

  totalMonthEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Processa o envio do formulário ao clicar em Salvar Gasto
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newExpense = {
    desc: descInput.value,
    amount: parseFloat(amountInput.value),
    category: categoryInput.value,
    date: dateInput.value
  };

  expenses.push(newExpense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Reset de campos
  descInput.value = '';
  amountInput.value = '';

  renderExpenses();
});

// Renderiza os dados já gravados ao abrir a página
renderExpenses();
