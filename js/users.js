import { TaskGenerator } from './taskgenerator.js';
import { username as loginUsername, password as loginPassword } from './checklogin.js';
import { ipaddress } from './main.js';
// console.log("Entered User.js");
var tg = new TaskGenerator();
let tasks = tg.getUsers();

let request = {
    user: loginUsername,
    credential: loginPassword,
    task: tasks
}

let json = JSON.stringify(request)


fetch(ipaddress + json)
    .then(function (response) {
        // console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        handleData(data);
    })

function handleData(data) {
    // console.log("Hello");
    let results = data.data;
    // console.log(results);
    let userList = document.getElementById('data-list');
    let html = "";
    for (let i = 0; i < results.length; i++) {
        html += `
    <div class="data">
    <a href = "user.html" ><h2 class="username">${results[i]}</h2></a>
    </div>  
    `;
    };
    

    userList.innerHTML = html;

    document.querySelectorAll(".username").forEach(item => {
        item.addEventListener('click', event => {
            window.localStorage.setItem("userview",item.innerHTML.trim());
        })
    });
}

