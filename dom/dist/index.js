//database to store data 
let todos = [];
// target the elements
let form = document.getElementById("form"); //form assertion
let input = document.getElementById("inputvalue");
let listitems = document.getElementById("items");
let delbtn = document.getElementById("delbtn");
let editbtn = document.getElementById("editbtn");
//adding task
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let value = input.value;
    let newtask = {
        id: Date.now().toString(),
        task: value,
    };
    todos.push(newtask);
    input.value = "";
    console.log(newtask);
    render();
});
function render() {
    listitems.innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
        let display = todos[i];
        let li = document.createElement("li");
        li.textContent = display.task;
        listitems.append(li);
    }
}
//deleting task
delbtn.addEventListener("click", (e) => {
    todos = [];
    listitems.innerHTML = ""; //empty UI
});
export {};
