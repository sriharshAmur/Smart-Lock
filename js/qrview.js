import { TaskGenerator } from './taskgenerator.js';
import { username as loginUsername, password as loginPassword } from './checklogin.js';
import { ipaddress } from './main.js';
var tg = new TaskGenerator();

let qrcode = window.localStorage.getItem("qrcode");
let qrnumber = window.localStorage.getItem("qrnumber");

document.getElementById('user-title').innerHTML = qrnumber;
document.getElementById('user-title').title = qrcode;

var qrcoviewde = new QRCode(document.getElementById("qrcode"), {
    text: qrcode,
    width: 500,
    height: 500,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
    });

let tasks = tg.getTempQR(qrcode);

    let request = {
        user: loginUsername,
        credential: loginPassword,
        task: tasks
    };
    let json = JSON.stringify(request)

fetch(ipaddress + json)
    .then(function (response) {
        // console.log(response);
        return response.json();
    })
    .then(function (data) {
        update(data);
    })

function update(data){
    console.log(data);
    console.log(data.data.valid);
    if(data.data.valid){
        document.querySelector("#validh2").innerHTML = "Valid"
    }
    else{
        document.querySelector("#validh2").innerHTML = "Invalid"
    }

    document.querySelector("#code").value = qrcode;
}

document.querySelector("#copy").addEventListener("click", function () {
    var copyText = document.getElementById("code");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    this.innerHTML = "Copied !!!";

})



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

    fetch(ipaddress + json)
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

