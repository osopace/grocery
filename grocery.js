// ITEMS
//
const subBTN = document.querySelector(".submit-btn");
const forBTN = document.querySelector(".grocery-form");
const groItem = document.getElementById("grocery");
const groList = document.querySelector(".grocery-list");
const Alert = document.querySelector(".alert");
const groCON = document.querySelector(".grocery-container");
const clear = document.querySelector(".clear-btn");

let editElement;
let editID = "";
let editFLag = false;
forBTN.addEventListener("submit", addItem);
window.addEventListener("DOMContentLoaded", setuplist);
function addItem(e) {
  e.preventDefault();
  const id = new Date().getTime().toString();

  const groValue = groItem.value;
  if (groValue === "") {
    DisplayAlert("empty-value", "danger");
  }
  if (groValue && !editFLag) {
    // groValue !== "" ? itemS.push(groValue) : console.log("bug!");
    // const itemList = itemS.map((list) => {
    createList(id, groValue);

    //console.log(itemList);
    DisplayAlert("Item-added", "success");
    setDefault();
    addLocalstorage(id, groValue);
    if (groList.offsetHeight > 0) {
      clear.classList.remove("show-container");
    }
  } else if (groValue && editFLag) {
    editElement.innerHTML = groValue;
    editLocalstorage(editID, groValue);
    setDefault();
    DisplayAlert("Item-changed", "success");
  } else {
    console.log("working");
  }
}

clear.addEventListener("click", () => {
  groList.innerHTML = "";
  clear.classList.add("show-container");
});
//

function editing(e) {
  editFLag = true;
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  groItem.value = editElement.innerHTML;
  subBTN.textContent = "Edit";
  editID = element.dataset.id;
  console.log(editElement);
}

function setDefault() {
  groItem.value = "";
  editFLag = false;
  subBTN.textContent = "Submit";
}

function DisplayAlert(text, action) {
  Alert.classList.add(`alert-${action}`);
  Alert.textContent = text;
  setInterval(() => {
    Alert.classList.remove(`alert-${action}`);
  }, 2800);
}
function deleted(e) {
  //console.log("deleted");
  const item = e.currentTarget.parentElement.parentElement;
  groList.removeChild(item);
  const value = groItem.value;
  const id = item.dataset.id;
  delLocalstorage(id, value);
  DisplayAlert("Item-removed", "danger");
  const tt = groList.offsetHeight;
  console.log(tt);
  if (tt === 0) {
    clear.classList.add("show-container");
  }
}
function addLocalstorage(id, value) {
  const grocery = { id, value };
  const itemi = setLocalstorage();
  console.log(itemi);
  itemi.push(grocery);
  localStorage.setItem("list", JSON.stringify(itemi));
  // setitem;
  // getitem
  // removeitem
  // local stoarage Api
}
function editLocalstorage(id, value) {
  let itemEd = setLocalstorage();
  itemEd = itemEd.filter(function (itemss) {
    if (id === itemss.id) {
      itemss.value = value;
    }
    return itemEd;
  });
  localStorage.setItem("list", JSON.stringify(itemEd));
}

function delLocalstorage(id, value) {
  let itemy = setLocalstorage();
  itemy = itemy.filter(function (itemsi) {
    if (id !== itemsi.id) {
      return itemsi;
    }
  });

  localStorage.setItem("list", JSON.stringify(itemy));
}
function setLocalstorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function setuplist() {
  let itemy = setLocalstorage();
  itemy = itemy.filter(function (items) {
    if (itemy.length > 0) {
      createList(items.id, items.value);
      clear.classList.remove("show-container");
    }
  });
}
function createList(id, value) {
  const element = document.createElement("article");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `
   <p class="grtext">${value} </p>
          <div class="iconBTN">
            <button class="edit-btn">
              <ion-icon  name="create-outline"></ion-icon>
            </button>
            <button class="delete-btn">
              <ion-icon  name="trash"></ion-icon>
            </button>
          </div>
        `;
  groList.appendChild(element);

  const dlet = element.querySelector(".delete-btn");
  const edit = element.querySelector(".edit-btn");
  dlet.addEventListener("click", deleted);

  edit.addEventListener("click", editing);
  groCON.style.visibility = "visible";
}
//localStorage.setItem("oranges", JSON.stringify(["test", "test2"]));
//const oranges = JSON.parse(localStorage.getItem("oranges"));
