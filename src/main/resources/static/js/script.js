const BASE_URL = "http://localhost:8080";

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    //  captcha response
    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse) {
        alert("Please complete the captcha");
        return;
    }

    fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            captcha: captchaResponse   // send to backend
        })
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        window.location.href = "/dashboard.html";
    })
    .catch(err => {
        console.error(err);
        alert("Something went wrong");
    });
}


function signup() {
    const name = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse) {
        alert("Please complete the captcha");
        return;
    }
    if (!email.includes("@")) {
        alert("Enter valid email");
        return;
    }
    if (!name || !email || !password) {
        alert("All fields required");
        return;
    }

    fetch(`http://localhost:8080/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
   .then(res => res.text())
   .then(data => {
       console.log(data);

       if (data.includes("Successfully")) {
           alert(data);
           window.location.href = "/login.html";
       } else {
           alert(data);
       }
   })
   .catch(err => {
       console.error(err);
       alert("Something went wrong");
   });
}

let captcha = "";

function generateCaptcha() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    captcha = "";

    for (let i = 0; i < 5; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById("captchaText").innerText = captcha;
}