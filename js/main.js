let addr = "192.168.137.45";
export const ipaddress = "https://" + addr + '/api/';

console.log(ipaddress);



window.addEventListener("load", function() {
    // console.log("finished lading");
    document.querySelector(".loader-wrapper").style.display = "none";
})