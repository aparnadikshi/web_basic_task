fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => console.log("Products:", data))
    .catch(err => console.error("Error:", err))
    .finally(() => console.log("Fetch completed"));