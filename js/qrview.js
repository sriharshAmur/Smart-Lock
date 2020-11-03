import { TaskGenerator } from './taskgenerator.js';
import { username as loginUsername, password as loginPassword } from './login.js';
var tg = new TaskGenerator();

let qrcode = window.localStorage.getItem("qrcode");
let qrnumber = window.localStorage.getItem("qrnumber");

document.getElementById('user-title').innerHTML = qrnumber;
document.getElementById('user-title').title = qrcode;

// let tasks = tg.getTempQRs();

document.getElementById('remove').addEventListener("click", event => {
    // console.log(qrcode);
    let tasks = tg.removeTempQR(qrcode);

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

function removeData(data) {
    let results = data.successful;
    
    let alert = document.getElementById('alert');
    let html = `<div class="success-alert">
    <h2 id="alert-text">QR Code has been successfully removed!!! </h2>
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

