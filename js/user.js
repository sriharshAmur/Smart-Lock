import { TaskGenerator } from './taskgenerator.js';
import { username as loginUsername, password as loginPassword } from './checklogin.js';
var tg = new TaskGenerator();

let userview = window.localStorage.getItem("userview");

document.getElementById('user-title').innerHTML = userview;


document.getElementById('remove').addEventListener("click", event => {
    
    let tasks = tg.removeUser(userview);

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
            removeData(data);
        })
})

document.getElementById('change').addEventListener("click", event => {
    let list = {
                user: userview,
                permissions: "admin"
            };
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
                    adminData(data);
                })
})

function adminData(data) {
    let results = data.successful;
    if (results) {
        let alert = document.getElementById('alert');
        let html = `<div class="success-alert">
        <h2 id="alert-text">User has been successfully made Admin!!! </h2>
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

function removeData(data) {
    let results = data.successful;
    
    let alert = document.getElementById('alert');
    let html = `<div class="success-alert">
    <h2 id="alert-text">User has been successfully removed!!! </h2>
    </div>
`;
    alert.innerHTML = html;
    
    // if (results) {
    //     let alert = document.getElementById('alert');
    //     let html = `<div class="success-alert">
    //     <h2 id="alert-text">User has been successfully removed!!! </h2>
    //     </div>
    // `;
    //     alert.innerHTML = html;
    // }
    // else{
    //     let alert = document.getElementById('alert');
    //     let html = `<div class="error-alert">
    //     <h2> Something went wrong, please try again </h2>
    //     <h2> Error: ${data.error}</h2>
    //     <h2> Reason: ${data.cause}</h2>
    //     </div>
    // `;
    //     alert.innerHTML = html;
    // }
}