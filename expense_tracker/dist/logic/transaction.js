let transactions = loadTransactions();
/* Load initial data from localStorage */
function loadTransactions() {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
}
/* Save to localStorage */
function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}
export function getTransactions() {
    return transactions;
}
export function addTransaction(t) {
    transactions.push(t);
    saveTransactions();
}
export function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions();
}
export function updateTransaction(id, update) {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
        const current = transactions[index];
        // SAFELY UPDATE — ignore undefined or empty values
        transactions[index] = Object.assign(Object.assign({}, current), { title: update.title && update.title.trim() !== "" ? update.title : current.title, amount: update.amount !== undefined && !isNaN(update.amount)
                ? update.amount
                : current.amount, category: update.category && update.category.trim() !== ""
                ? update.category
                : current.category });
    }
    saveTransactions();
}
/* Balance calculator */
export function calculateBalance() {
    return transactions.reduce((acc, t) => {
        if (t.category.toLowerCase() === "credit") {
            return acc + t.amount;
        }
        if ((t.category.toLowerCase() === "stocks")) {
            return acc + t.amount;
        }
        else {
            return acc - t.amount;
        }
    }, 0);
}
