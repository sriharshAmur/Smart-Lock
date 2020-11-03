import { TaskGenerator } from './taskgenerator.js';
import { username as loginUsername, password as loginPassword } from './checklogin.js';
import { ipaddress } from './main.js';
var tg = new TaskGenerator();

console.log(loginUsername);

let form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;
    let pin = document.getElementById('pin').value;
    let card = document.getElementById('card').value;
    setUser(username, password, name, pin, card);
})


function setUser(username, password, name, pin, card) {
    let list = {
        user: username,
        credential: password
    };

    if (name != "") list["name"] = name;
    if (pin != "") list["pin"] = pin;
    if (card != "") list["card"] = card;

    let tasks = tg.addUser(list);

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
    let results = data.successful;
    if (results) {
        let alert = document.getElementById('alert');
        let html = `<div class="success-alert">
        <h2 id="alert-text"> User Details have been successfully Added!!! </h2>
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