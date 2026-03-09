// console.log("Hello this is login page")
document.getElementById("sign-btn").addEventListener("click", () => {

    // 1-get the username & pass from the input's
    const usernameInput = document.getElementById("username-input");
    const username = usernameInput.value;
    // console.log(username);

    const passInput = document.getElementById("password-input");
    const password = passInput.value;
    // console.log(password)


    // 2- match username and password
    if (username === "admin" && password === "admin123") {
        alert("Login Successful");
        window.location.assign("home.html");
    } else {
        alert("Login Failed");
        return;
    }

})