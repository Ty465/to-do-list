// this is how we grab id elements from html
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let input = document.querySelector("input");

//addTask() is the id for the button
function addTask() {
  if (inputBox.value === "") {
    alert("You must add a note!");
  } else {
    let li = document.createElement("li");
    li.textContent = inputBox.value.replace(/</g, "&lt;").replace(/>/g, "&gt;"); 
    listContainer.appendChild(li);

    counter++;
    input.value = counter;
    localStorage.setItem("counter", counter);

    /*span is the css for an x */
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

inputBox.addEventListener("keypress", function (event) {
  let key = event.key;
  let regex = new RegExp("^[a-zA-Z0-9 ]+$"); 
  if (!regex.test(key)) {
    event.preventDefault();
    return false;
  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();

      counter--;
      input.value = counter;
      localStorage.setItem("counter", counter);

      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");

  counter = parseInt(localStorage.getItem("counter")) || 0;
  input.value = counter;
}
showTask();
