const users = JSON.parse(localStorage.getItem("users")) || [];

const loginRegisterInfo = () => {
  let registerForm = document.querySelector(".registerform");
  let loginForm = document.querySelector(".loginform");
  let login = document.querySelector(".login");
  let register = document.querySelector(".register");
  let loginHere = document.querySelector(".loginhere");
  let registerHere = document.querySelector(".registerhere");
  let dashboard = document.querySelector(".app-container")
  let loginRegister = document.querySelector(".loginregister");
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    loginRegister.style.display = "none";
    dashboard.style.display = "flex";
  }

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let username = registerForm[0].value;
    let password = registerForm[1].value;

    users.push({
      username,
      password,
    });

    localStorage.setItem("users", JSON.stringify(users));
    login.style.display = "flex";
    register.style.display = "none";
    alert("Registration Successfull");
  });


  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let username = loginForm[0].value;
    let password = loginForm[1].value;

    const user = users.find((item) => {
      return item.username === username && item.password === password;
    });
    localStorage.setItem("currentUser", JSON.stringify(user));


    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      ;

      alert("login Successfull");
      loginRegister.style.display = "none";
      register.style.display = "none";
      dashboard.style.display = "flex"

    } else {
      alert("Please Register First");
    }
    console.log(currentUser)
  });


  loginHere.addEventListener("click", (e) => {
    e.preventDefault()
    login.style.display = "flex";
    register.style.display = "none";

  });

  registerHere.addEventListener("click", (e) => {
    e.preventDefault()
    login.style.display = "none";
    register.style.display = "flex";
  });


};


let logoutBtn = document.querySelector(".logout-btn");

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("currentUser");

    document.querySelector(".loginregister").style.display = "flex";
    document.querySelector(".app-container").style.display = "none";

    document.querySelector(".login").style.display = "flex";
    document.querySelector(".register").style.display = "none";

});

/// ************************





let addBtn = document.querySelector(".add-btn");
let addTransectionDiv = document.querySelector(".add-transections");
let closeBtn = document.querySelector(".closebtn");

addBtn.addEventListener("click", () => {
  addTransectionDiv.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  addTransectionDiv.style.display = "none";
});



//**************************** */

let transectionForm = document.querySelector("#transform");

let totalIncomedisplay = document.querySelector(".total-income");
let currentBalance = document.querySelector(".current-balance");
let totalExpensedisplay = document.querySelector(".total-expense");
let totalTransection = document.querySelector(".total-transection");
let tableBody = document.querySelector("tbody");
let tableHead = document.querySelector("thead");

let expenseArr = JSON.parse(localStorage.getItem("expense")) || [];
let updateTask = null;

let totalIncome = 0;
let totalExpense = 0;

// Cards Update Function
function updateCards() {
  totalIncome = 0;
  totalExpense = 0;
  tableBody.innerHTML = "";
  expenseArr.forEach((elem, index) => {
    if (elem.type === "Income") {
      totalIncome += elem.amount;
    } else {
      totalExpense += elem.amount;
    }
    tableHead.innerHTML = ` <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Action</th>`;

    tableBody.innerHTML += ` <tr>
                    <td>${elem.date}</td>
                    <td>${elem.description}</td>
                    <td>${elem.catagory}</td>
                    <td>${elem.amount}</td>
                    <td>
                     <i class="fa-solid fa-pen edit-icon" onclick=editTable("${elem.id}")></i>
                     <i class="fa-solid fa-trash delete-icon"  onclick=deleteTask("${index}") ></i>
                     </td>
                  </tr>`;
  });

  let balance = totalIncome - totalExpense;

  currentBalance.innerText = balance;
  totalIncomedisplay.innerText = totalIncome;
  totalExpensedisplay.innerText = totalExpense;
  totalTransection.innerText = expenseArr.length;
}

const expense = () => {
  transectionForm.addEventListener("submit", (e) => {
    e.preventDefault();


    let type = e.target[0].value;
    let description = e.target[1].value;
    let amount = Number(e.target[2].value);
    let date = e.target[3].value;
    let catagory = e.target[4].value;

    const obj = {
      id: Date.now(),
      type,
      description,
      amount,
      date,
      catagory,
    };
    if (updateTask != null) {
      expenseArr[updateTask] = obj
      updateTask = null
    }
    else {
      expenseArr.push(obj)

    }


    localStorage.setItem("expense", JSON.stringify(expenseArr));

    updateCards();
    addTransectionDiv.style.display = "none";
    transectionForm.reset();
  });
};

const editTable = (id) => {
  addTransectionDiv.style.display = "flex";
  const edit = expenseArr.find(elem => Number(elem.id) === Number(id));
  updateTask = expenseArr.findIndex(elem => Number(elem.id) === Number(id));
  updateTask = expenseArr.findIndex(elem => elem.id == id)
  transectionForm[0].value = edit.type
  transectionForm[1].value = edit.description
  transectionForm[2].value = edit.amount
  transectionForm[3].value = edit.date
  transectionForm[4].value = edit.catagory
}

const deleteTask = (index) => {

  expenseArr.splice(index, 1)
  localStorage.setItem("expense", JSON.stringify(expenseArr));
  updateCards();
  expense();

}


//************************************************ */



let settings = document.querySelector(".setting")
let dashboardBtn = document.querySelector(".dashboard-btn")
let settingBtn = document.querySelector(".setting-btn")
let midContent = document.querySelector("#mid-content")
let prodileName = document.querySelector(".name")


settingBtn.addEventListener("click", () => {
  midContent.style.display = "none"
  settings.style.display = "block"





})













expense();
updateCards();

loginRegisterInfo()
