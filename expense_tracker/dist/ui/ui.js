import { addTransaction, deleteTransaction, updateTransaction, getTransactions, calculateBalance } from "../logic/transaction.js";
export function renderUI(filter = "") {
    const tbody = document.getElementById("transactionBody");
    const template = document.getElementById("transactionRow");
    const balanceEl = document.getElementById("balance");
    tbody.innerHTML = "";
    // Normalize search keyword
    const keyword = filter.toLowerCase();
    const filtered = getTransactions().filter(t => t.title.toLowerCase().includes(keyword) ||
        t.category.toLowerCase().includes(keyword) ||
        t.amount.toString().includes(keyword));
    filtered.forEach(t => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".t-title").textContent = t.title;
        clone.querySelector(".t-amount").textContent = "₹" + t.amount;
        clone.querySelector(".t-category").textContent = t.category;
        clone.querySelector(".edit-btn").setAttribute("data-id", String(t.id));
        clone.querySelector(".delete-btn").setAttribute("data-id", String(t.id));
        tbody.appendChild(clone);
    });
    balanceEl.textContent = calculateBalance().toString();
}
export function initUI() {
    const addBtn = document.getElementById("addBtn");
    const title = document.getElementById("title");
    const amount = document.getElementById("amount");
    const category = document.getElementById("category");
    const searchBar = document.getElementById("search");
    // ADD TRANSACTION
    addBtn.addEventListener("click", () => {
        addTransaction({
            id: Date.now(),
            title: title.value,
            amount: Number(amount.value),
            category: category.value
        });
        title.value = "";
        amount.value = "";
        renderUI();
    });
    // DELETE + EDIT HANDLERS
    document.addEventListener("click", e => {
        const target = e.target;
        // DELETE TRANSACTION
        if (target.classList.contains("delete-btn")) {
            deleteTransaction(Number(target.dataset.id));
            renderUI();
        }
        // EDIT TRANSACTION
        if (target.classList.contains("edit-btn")) {
            const id = Number(target.dataset.id);
            const existing = getTransactions().find(t => t.id === id);
            if (!existing)
                return;
            const newTitle = prompt("New Title (leave empty to keep same):", existing.title);
            const newAmountStr = prompt("New Amount (leave empty to keep same):", existing.amount.toString());
            const newCategory = prompt("New Category (leave empty to keep same):", existing.category);
            const update = {};
            // TITLE (ignore blank)
            if (newTitle !== null && newTitle.trim() !== "") {
                update.title = newTitle;
            }
            // AMOUNT (ignore blank + invalid)
            if (newAmountStr !== null && newAmountStr.trim() !== "") {
                const num = Number(newAmountStr);
                if (!isNaN(num)) {
                    update.amount = num;
                }
            }
            // CATEGORY (ignore blank)
            if (newCategory !== null && newCategory.trim() !== "") {
                update.category = newCategory;
            }
            updateTransaction(id, update);
            renderUI();
        }
    });
    searchBar.addEventListener("input", () => {
        const searchText = searchBar.value;
        renderUI(searchText);
    });
}
