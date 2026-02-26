interface TODO {
    id: string; //for unique id we are using string
    task: string;
}
//database to store data 
let todos: TODO[] = [];

// target the elements
let form = document.getElementById("form") as HTMLFormElement;//form assertion
let input = document.getElementById("inputvalue") as HTMLInputElement;
let listitems = document.getElementById("items") as HTMLUListElement;
let delbtn = document.getElementById("delbtn") as HTMLButtonElement;


//adding task
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let value = input.value;
    let newtask: TODO = {
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

