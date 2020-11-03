let loggedin = window.localStorage.getItem("loggedin");
if(loggedin !== "true") {
    window.location.replace("http://localhost:8080/login.html");
}

export let username = window.localStorage.getItem("username");
export let password = window.localStorage.getItem("password");