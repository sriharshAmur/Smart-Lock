let form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    console.log("entered");
    let code = document.querySelector("#code").value;
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: code, 
        width: 500,
        height: 500,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
        });
})
