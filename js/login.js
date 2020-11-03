// export const username = 'bert';
// export const password = 'moeilijk@1234';

import { TaskGenerator } from './taskgenerator.js';
var tg = new TaskGenerator();
let username;
let password;
window.localStorage.setItem("loggedin",false);

console.log(window.localStorage.getItem("loggedin"));

let form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    authorize(username, password);
})

function authorize(username, password) {
    let tasks = tg.getStatus();

    let request = {
        user: username,
        credential: password,
        task: tasks
    }

    let json = JSON.stringify(request)


    fetch('https://localhost/api/' + json)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            handleData(data);
        })

}


function handleData(data) {
    let success = data.successful;
    if(success) {
        window.localStorage.setItem("username",username);
        window.localStorage.setItem("password",password);
        window.localStorage.setItem("loggedin",true);
        window.location.replace("http://localhost:8080/homepage.html");
    } else{
        let alert = document.getElementById('alert');
        let html = `<div class="error-alert">
        <h2> Something went wrong, please try again </h2>
        <h2> Error: ${data.error}</h2>
        </div>
    `;
        alert.innerHTML = html;
    }
}