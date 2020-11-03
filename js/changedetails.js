// console.log("Hello");
import { TaskGenerator } from './taskgenerator.js';
import { username as loginUsername, password as loginPassword } from './login.js';
var tg = new TaskGenerator();

let form = document.querySelector('form');
form.addEventListener('submit', e => {
    // console.log("entered");
    e.preventDefault();
    // console.log(e);
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;
    let pin = document.getElementById('pin').value;
    // console.log(username);
    // console.log(password);
    setUser(username, password, name, pin);
})


function setUser(username, password, name, pin) {
    let list = {};
    if (username != "") list["user"] = username;
    if (password != "") list["credential"] = password;
    if (name != "") list["name"] = name;
    if (pin != "") list["pin"] = pin;

    console.log(list);


    let tasks = tg.setUser(list);

    let request = {
        user: loginUsername,
        credential: loginPassword,
        task: tasks
    };

    let json = JSON.stringify(request)

    fetch('https://localhost/api/' + json)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            handleData(data);
        })

}

//{"user": "bert", "credential": "moeilijk@1234", "task": {"function": "database", "type": "user", "action": "set", "input": 
//{"userdata": {"user": "bert", "credential": "password"}}, "log": true}}'{'datetime': '2020-10-29 22:44:25.039583', 
//'successful': True, 'data': {'user': 'bert', 'credential': 'password'}}

//request = dict(user = 'bert', credential ='moeilijk@1234', task = tg.setUser(dict(user = 'bert', credential='password')))

/*
{"datetime": "2020-10-29 22:44:25.039583", "successful": true, "data": {"user": "bert", "credential": "password"}, 
"task": {"function": "database", "type": "user", "action": "set", "input": {"userdata": {"user": "bert", "credential": "password"}, 
"action": "set", "type": "user"}, "log": true}, "type": null}
*/

function handleData(data) {
    console.log(data);
    let results = data.successful;
    if (results) {
        let alert = document.getElementById('alert');
        let html = `<div class="success-alert">
        <h2 id="alert-text"> User Details have been successfully updated!!! </h2>
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
    console.log(results);

}