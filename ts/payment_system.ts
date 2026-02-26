interface Payment {
    amount: number;
    method: "credit" | "debit" | "upi";
}

function processPayment(p: Payment) {
    console.log(`Processing ${p.method} payment of Rs${p.amount}`);
}

processPayment({ amount: 500, method: "upi" });