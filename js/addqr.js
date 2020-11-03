import { TaskGenerator } from './taskgenerator.js';
import { username as loginUsername, password as loginPassword } from './checklogin.js';
import { ipaddress } from './main.js';
var tg = new TaskGenerator();

let form = document.querySelector('form');
form.addEventListener('submit', e => {
    // console.log("entered");
    e.preventDefault();
    // console.log(e);
    let uses = parseInt(document.getElementById('uses').value);
    let date = document.getElementById('date').value;
    let qrpin = document.getElementById('qrpin').value;
    addQR(uses, date, qrpin);
})


function addQR(uses, date, qrpin) {
    let list = {
        uses: uses,
        valid: true,
        pin: qrcode,
        mode: "uses",
        user: loginUsername
    };

    if (date != "") list["dateRestriction"] = date;

    let tasks = tg.addTempQR(list);

    let request = {
        user: loginUsername,
        credential: loginPassword,
        task: tasks
    };

    let json = JSON.stringify(request)

    fetch(ipaddress + json)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            handleData(data);
        })

}

function handleData(data) {
    console.log(data);
    let results = data.successful;
    if (results) {
        let alert = document.getElementById('alert');
        let html = `<div class="success-alert">
        <h2 id="alert-text"> QR Code has been successfully Added!!! </h2>
        </div>
    `;
        alert.innerHTML = html;
    }
    else{
        let alert = document.getElementById('alert');
        let html = `<div class="error-alert">
        <h2> Something went wrong, please try again </h2>
        <h2> Error: ${data.error}</h2>
        <h2> Reason: ${data.reason}</h2>
        </div>
    `;
        alert.innerHTML = html;
    }

}