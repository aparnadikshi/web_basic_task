function processPayment(p) {
    console.log("Processing ".concat(p.method, " payment of Rs").concat(p.amount));
}
processPayment({ amount: 500, method: "upi" });
