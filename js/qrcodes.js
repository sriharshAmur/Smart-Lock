import { TaskGenerator } from './taskgenerator.js';
import { username as loginUsername, password as loginPassword } from './checklogin.js';
var tg = new TaskGenerator();


let tasks = tg.getTempQRs();

let request = {
    user: loginUsername,
    credential: loginPassword,
    task: tasks
}

let json = JSON.stringify(request)


fetch('https://localhost/api/' + json)
    .then(function (response) {
        // console.log(response);
        return response.json();
    })
    .then(function (data) {
        handleData(data);
    })

function handleData(data) {
    // console.log("Hello");
    let results = data.data
    // console.log(results);
    let userList = document.getElementById('qr-list');
    let html = "";
    for (let i = 0; i < results.length; i++) {
        html += `
    <div class="data">
    <a class="qr-code" href = "qrview.html" title="${results[i]}"><h2 class="qr-number">QR Code ${i+1}</h2></a>
    </div>  
    `;
    };
    

    userList.innerHTML = html;
    console.log(document.querySelectorAll(".qr-code")[0].querySelector(".qr-number").innerHTML);
    document.querySelectorAll(".qr-code").forEach(item => {
        item.addEventListener('click', event => {
            console.log("hello");
            console.log(item.title);
            window.localStorage.setItem("qrcode",item.title.trim());
            window.localStorage.setItem("qrnumber",item.querySelector(".qr-number").innerHTML);
        })
    });
}

