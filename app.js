const TodoList = document.querySelector("#todo-list");
const Form = document.querySelector("#todo-form");

// create element and render cafe

const renderTodo = (doc) => {
  let li = document.createElement("li");
  let Task = document.createElement("span");
  let Priority = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  Task.textContent = doc.data().Task;
  Priority.textContent = doc.data().priority;
  cross.textContent = "X";
  li.appendChild(Task);
  li.appendChild(Priority);
  li.appendChild(cross);

  TodoList.appendChild(li);
  //deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("Todo").doc(id).delete();
  });
};

//getting the data
// db.collection("Todo")
//   // .orderBy("priority") //we can sort based on conditions
//   // // we can also combile orderBy and where (setpu index)
//   // //.where('Task','==',"design")   //( we can get data based on condintions  (making Quires) )
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderTodo(doc);
//     });
//   });

//saving the data

Form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("Todo").add({
    Task: Form.task.value,
    priority: Form.priority.value,
  });
  Form.task.value = "";
  Form.priority.value = "";
});

//added real time listner
db.collection("Todo")
  .orderBy("priority")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderTodo(change.doc);
      } else if (change.type == "removed") {
        let li = TodoList.querySelector("[data-id=" + change.doc.id + "]");
        TodoList.removeChild(li);
      }
    });
  });

/*

-------with update()
id of the particular document you want to edit
db.collection("Todo").doc(id).update({
  name:'updated'
})

----with set
db.collection("Todo").doc(id).set({
  name:'updated'
})

note 
update:
only change the value you eneterd into updaye method 

set: it update all the value in the document


*/
