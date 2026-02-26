async function getUser() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        console.log("User:", data);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        console.log("Request finished");
    }
}

getUser();