// Carrega os gastos armazenados no navegador ou inicia com uma lista vazia// Carrega os gastos armazenados no navegador ou inicia com uma lista vazia
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('finance-form');
  const descInput = document.getElementById('desc');
  const amountInput = document.getElementById('amount');
  const categoryInput = document.getElementById('category');
  const dateInput = document.getElementById('date');
  const expenseList = document.getElementById('expense-list');
  const totalMonthEl = document.getElementById('total-month');

  if (dateInput) {
    const today = new Date();
    const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    dateInput.value = localDate;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  // Função global para apagar um gasto pelo índice
  window.deleteExpense = function(index) {
    expenses.splice(index, 1); // Remove o item da lista
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Atualiza no navegador
    renderExpenses(); // Recarrega a tabela e recalcula o total
  };

  function renderExpenses() {
    if (!expenseList || !totalMonthEl) return;

    expenseList.innerHTML = '';
    let total = 0;

    expenses.forEach((expense, index) => {
      total += parseFloat(expense.amount);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${formatDate(expense.date)}</td>
        <td>${expense.desc}</td>
        <td>${expense.category}</td>
        <td>R$ ${parseFloat(expense.amount).toFixed(2).replace('.', ',')}</td>
        <td>
          <button class="btn-delete" onclick="deleteExpense(${index})">🗑️ Excluir</button>
        </td>
      `;
      expenseList.appendChild(row);
    });

    totalMonthEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  if (form) {
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

      descInput.value = '';
      amountInput.value = '';

      renderExpenses();
    });
  }

  renderExpenses();
});;
