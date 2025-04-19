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
    li.textContent = inputBox.value;
    listContainer.appendChild(li);
    {
      input.value = parseInt(input.value) + 1;
    }

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
  let regex = new RegExp("^[a-zA-Z0-9]+$");
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
      {
        input.value = parseInt(input.value) - 1;
      }
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
}
showTask();
