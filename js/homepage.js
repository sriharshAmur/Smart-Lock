import { TaskGenerator } from './taskgenerator.js';
import { username as loginUsername, password as loginPassword } from './checklogin.js';
var tg = new TaskGenerator();

console.log(loginUsername);
console.log(loginPassword);

refresh();
document.querySelector(".refresh-btn").addEventListener("click", event => {
    refresh();
});


function refresh() {
    // console.log("refresh");
    let tasks = tg.getStatus();

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
            update(data);
        })

}
//data: {lock: "locked", buzzer: "started", sensor: null}
function update(data) {

    if (data.successful) {
        if (data.data.lock === 'locked') {
            let lockStatus = document.querySelector(".status");
            lockStatus.innerHTML = "Locked"

            let tochange = document.querySelector(".status-tochange");
            tochange.innerHTML = "Unlock"
        }
        else {
            let lockStatus = document.querySelector(".status");
            lockStatus.innerHTML = "Unlocked."

            let tochange = document.querySelector(".status-tochange");
            tochange.innerHTML = "Unlocked"
        }
    }

}


document.querySelector(".change-border").addEventListener("click", event => {
    let tasks = tg.grantAccess();

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
            unlocked(data);
        })
})


function unlocked(data) {
    console.log(data);

    let lockStatus = document.querySelector(".status");
    lockStatus.innerHTML = "Unlocked."

    let tochange = document.querySelector(".status-tochange");
    tochange.innerHTML = "Unlocked"

}