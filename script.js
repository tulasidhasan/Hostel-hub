function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Replace "admin" and "password" with your actual admin credentials
    if (username === "admin" && password === "password") {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
}
