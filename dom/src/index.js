//database to store data 
var todos = [];
// target the elements
var form = document.getElementById("form"); //form assertion
var input = document.getElementById("inputvalue");
var listitems = document.getElementById("items");

//adding task
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = input.value;
    var newtask = {
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
    var _loop_1 = function (i) {
        var display = todos[i];
        var li = document.createElement("li");
        var delbtn_1 = document.createElement("button");
        var Edtbtn = document.createElement("button");
        delbtn_1.style.backgroundColor = "red";
        Edtbtn.style.backgroundColor = "Cyan";
        li.innerHTML = display.task.toString().concat(" - - - - - ").concat(display.id.toString());
        delbtn_1.innerHTML = "Delete";
        li.appendChild(delbtn_1);
        Edtbtn.innerHTML = "Edit";
        li.appendChild(Edtbtn);
        listitems.appendChild(li);
        delbtn_1.addEventListener("click", function () {
            todos = todos.filter(function (todo) { return todo.id !== display.id; });
            render();
        });
        Edtbtn.addEventListener("click", function () {
            var newItem = document.createElement("input");
            newItem.value = display.task;
            newItem.type = "text";
            li.innerHTML = "";
            li.appendChild(newItem);
            newItem.focus();
            var saveEdit = function () {
                var item = todos.find(function (todo) { return todo.id === display.id; });
                if (item) {
                    item.task = newItem.value;
                    render();
                }
            };
            newItem.addEventListener("blur", saveEdit);
            newItem.addEventListener("keypress", function (e) {
                if (e.key === "Enter")
                    saveEdit();
            });
        });
    };
    for (var i = 0; i < todos.length; i++) {
        _loop_1(i);
    }
}
// //deleting task
// delbtn.addEventListener("click", (e) => {
//     todos = [];
//     listitems.innerHTML = ""; //empty UI
// });
