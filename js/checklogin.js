let loggedin = window.localStorage.getItem("loggedin");
if(loggedin !== "true") {
    window.location.replace("/login.html");
}

export let username = window.localStorage.getItem("username");
export let password = window.localStorage.getItem("password");