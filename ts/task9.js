function fetchProducts() {
    return new Promise(function (resolve, reject) {
        var success = true;
        if (success) {
            resolve(["Laptop", "Phone", "Tablet"]);
        }
        else {
            reject("Failed to fetch products");
        }
    });
}
fetchProducts()
    .then(function (products) { return console.log(products); })
    .catch(function (error) { return console.log(error); });
//   .finally(() => console.log("Request finished"));
